import Anthropic from "@anthropic-ai/sdk";
import { appointmentSettings } from "@/data/appointmentSettings";
import { siteContent } from "@/data/siteContent";
import {
    bookAppointment,
    BookingError,
    listAvailableSlots,
    type Booking,
    type BookingInput,
    type PartOfDay,
} from "@/lib/booking";
import { describeNow } from "@/lib/booking/slots";
import { buildSystemPrompt, type ChatChannel } from "@/lib/chatbot/systemPrompt";

/**
 * Sitedeki sohbet penceresi ile WhatsApp asistanının ortak çekirdeği: Claude
 * API çağrısı, randevu araçları ve araç döngüsü. Kanala özgü işler (HTTP
 * isteği, WhatsApp'a gönderim, sohbet geçmişinin saklanması) çağıran tarafta.
 */

const MODEL = process.env.CHATBOT_MODEL || "claude-opus-5-5";
const EFFORT = (process.env.CHATBOT_EFFORT as "low" | "medium" | "high" | undefined) || "low";
const MAX_TOOL_ROUNDS = 6;

export const MAX_HISTORY = 40;
export const MAX_MESSAGE_CHARS = 2000;

const PHONE = siteContent.contact.phone;
export const FALLBACK_REPLY = `Şu anda yanıt veremiyorum. Dilerseniz ${PHONE} numarasından bizi arayabilir veya WhatsApp'tan yazabilirsiniz.`;

const SYSTEM_PROMPTS: Record<ChatChannel, string> = {
    web: buildSystemPrompt("web"),
    whatsapp: buildSystemPrompt("whatsapp"),
};

let client: Anthropic | null = null;
function getClient() {
    client ??= new Anthropic();
    return client;
}

export function isAssistantConfigured(): boolean {
    return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

const bookingTools: Anthropic.Beta.BetaTool[] = [
    {
        name: "list_available_slots",
        description:
            "Av. Emre Durmuş'un ön görüşme için boş olan randevu saatlerini getirir. Kullanıcıya saat önermeden önce mutlaka çağır; yalnızca bu aracın döndürdüğü slot_id değerlerini kullan. Tarih verilmezse en yakın uygun saatler döner.",
        input_schema: {
            type: "object",
            properties: {
                start_date: { type: "string", description: "Aralığın ilk günü, YYYY-MM-DD (İstanbul saatiyle). İsteğe bağlı." },
                end_date: { type: "string", description: "Aralığın son günü (dahil), YYYY-MM-DD. İsteğe bağlı." },
                part_of_day: {
                    type: "string",
                    enum: ["sabah", "ogleden_sonra", "farketmez"],
                    description: "Kullanıcının tercih ettiği gün dilimi.",
                },
            },
            additionalProperties: false,
        },
    },
    {
        name: "book_appointment",
        description:
            "Seçilen saate ön görüşme randevusu oluşturur. Yalnızca kullanıcı özetlenen bilgileri ve KVKK açık rızasını sohbette açıkça onayladıktan sonra çağır.",
        input_schema: {
            type: "object",
            properties: {
                slot_id: { type: "string", description: "list_available_slots sonucundaki slot_id değeri." },
                full_name: { type: "string", description: "Kullanıcının adı soyadı." },
                phone: { type: "string", description: "Kullanıcının telefon numarası." },
                email: { type: "string", description: "E-posta adresi; kullanıcı vermediyse boş bırak." },
                practice_area: {
                    type: "string",
                    enum: [...siteContent.services.map((s) => s.title), "Miras Hukuku", "İcra Hukuku", "Diğer / Emin değilim"],
                    description: "Konunun ilgili olduğu çalışma alanı.",
                },
                case_summary: {
                    type: "string",
                    description: "Avukat için 1-3 cümlelik tarafsız konu özeti. Hassas kişisel veri (kimlik no, sağlık bilgisi vb.) içermemeli.",
                },
                meeting_type: { type: "string", enum: appointmentSettings.meetingTypes, description: "buro, online veya telefon." },
                kvkk_consent: { type: "boolean", description: "Kullanıcı KVKK onayını açıkça verdiyse true." },
            },
            required: ["slot_id", "full_name", "phone", "practice_area", "case_summary", "meeting_type", "kvkk_consent"],
            additionalProperties: false,
        },
    },
];

// ———————————————————————————————————————— Basit kötüye kullanım koruması
// Sunucusuz ortamda örnekler arasında paylaşılmaz; amaç kaba otomasyonları
// yavaşlatmaktır. Daha sıkı koruma için Vercel Firewall kuralları eklenebilir.
const hits = new Map<string, number[]>();
export function recentHits(key: string, windowMs: number): number[] {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    hits.set(key, recent);
    if (hits.size > 5000) hits.clear();
    return recent;
}
export function rateLimited(key: string, limit: number, windowMs: number): boolean {
    const recent = recentHits(key, windowMs);
    if (recent.length >= limit) return true;
    recent.push(Date.now());
    return false;
}

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

/**
 * Geçmişi API'nin beklediği biçime getirir: ardışık aynı roldeki mesajlar
 * birleştirilir, ilk mesaj kullanıcıdan olur. Son mesaj kullanıcıdan değilse
 * veya biçim bozuksa null döner.
 */
export function sanitizeHistory(raw: unknown): ChatMessage[] | null {
    if (!Array.isArray(raw)) return null;
    const messages: ChatMessage[] = [];
    for (const m of raw.slice(-MAX_HISTORY)) {
        if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") return null;
        const content = m.content.trim().slice(0, MAX_MESSAGE_CHARS);
        if (!content) continue;
        const last = messages[messages.length - 1];
        if (last && last.role === m.role) last.content += `\n\n${content}`;
        else messages.push({ role: m.role, content });
    }
    while (messages.length && messages[0].role !== "user") messages.shift();
    if (!messages.length || messages[messages.length - 1].role !== "user") return null;
    return messages;
}

/** Kanala özgü ek araç (ör. WhatsApp'ta sohbeti avukata devretmek). */
export interface ExtraTool {
    definition: Anthropic.Beta.BetaTool;
    run: (input: unknown) => Promise<string>;
}

export interface AssistantRequest {
    channel: ChatChannel;
    history: ChatMessage[];
    /** Randevu sınırının uygulanacağı anahtar (IP adresi veya WhatsApp numarası). */
    limiterKey: string;
    /** Güncel tarihin yanına eklenecek kanal bilgisi (ör. kullanıcının numarası). */
    context?: string;
    extraTools?: ExtraTool[];
}

export interface AssistantResult {
    /** false ise yanıt üretilemedi; reply yedek mesajdır. */
    ok: boolean;
    reply: string;
    booking: Booking | null;
}

export async function runAssistant({ channel, history, limiterKey, context, extraTools = [] }: AssistantRequest): Promise<AssistantResult> {
    const messages: Anthropic.Beta.BetaMessageParam[] = [
        ...history,
        // Güncel tarih sistem talimatına değil buraya eklenir; böylece sabit
        // sistem talimatı ve bilgi tabanı önbellekten okunabilir.
        { role: "system", content: [`Güncel tarih ve saat: ${describeNow(Date.now())}.`, context].filter(Boolean).join("\n") },
    ];
    const tools = [...bookingTools, ...extraTools.map((t) => t.definition)];
    const bookings: Booking[] = [];
    const replyParts: string[] = [];

    async function runTool(name: string, input: unknown): Promise<string> {
        if (name === "list_available_slots") {
            const args = (input ?? {}) as { start_date?: string; end_date?: string; part_of_day?: PartOfDay };
            return JSON.stringify(await listAvailableSlots(args));
        }
        if (name === "book_appointment") {
            if (bookings.length > 0) throw new BookingError("Bu sohbette zaten bir randevu oluşturuldu.");
            // Yalnızca başarılı randevular sayılır; hatalı denemeler kullanıcıyı kilitlemez.
            const booked = recentHits(`book:${limiterKey}`, 86_400_000);
            if (booked.length >= 3) {
                throw new BookingError(`Bugün çok sayıda randevu talebi alındı. Kullanıcıyı ${PHONE} numarasına yönlendirin.`);
            }
            const booking = await bookAppointment(input as BookingInput, channel);
            booked.push(Date.now());
            bookings.push(booking);
            return JSON.stringify({ success: true, ...booking });
        }
        const extra = extraTools.find((t) => t.definition.name === name);
        if (extra) return extra.run(input);
        throw new BookingError(`Bilinmeyen araç: ${name}`);
    }

    try {
        for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
            const response = await getClient().beta.messages.create({
                model: MODEL,
                max_tokens: 16000,
                betas: ["server-side-fallback-2026-07-01"],
                fallbacks: "default",
                output_config: { effort: EFFORT },
                cache_control: { type: "ephemeral" },
                system: [{ type: "text", text: SYSTEM_PROMPTS[channel], cache_control: { type: "ephemeral" } }],
                tools,
                messages,
            });

            if (response.stop_reason === "refusal") {
                replyParts.length = 0;
                replyParts.push(`Bu konuda yardımcı olamıyorum. Büromuza ${PHONE} numarasından ulaşabilirsiniz.`);
                break;
            }

            for (const block of response.content) {
                if (block.type === "text" && block.text.trim()) replyParts.push(block.text.trim());
            }

            if (response.stop_reason === "pause_turn") {
                messages.push({ role: "assistant", content: response.content });
                continue;
            }
            if (response.stop_reason !== "tool_use") break;

            messages.push({ role: "assistant", content: response.content });
            const toolUses = response.content.filter((b): b is Anthropic.Beta.BetaToolUseBlock => b.type === "tool_use");
            const results: Anthropic.Beta.BetaToolResultBlockParam[] = [];
            for (const tool of toolUses) {
                try {
                    results.push({ type: "tool_result", tool_use_id: tool.id, content: await runTool(tool.name, tool.input) });
                } catch (error) {
                    const message =
                        error instanceof BookingError ? error.message : "Sisteme şu an ulaşılamıyor. Kullanıcıyı telefona yönlendirin.";
                    if (!(error instanceof BookingError)) console.error(`[${channel}] tool error`, tool.name, error);
                    results.push({ type: "tool_result", tool_use_id: tool.id, content: message, is_error: true });
                }
            }
            messages.push({ role: "user", content: results });
        }
    } catch (error) {
        if (error instanceof Anthropic.RateLimitError) {
            console.warn(`[${channel}] Anthropic rate limit`);
        } else if (error instanceof Anthropic.APIError) {
            console.error(`[${channel}] Anthropic API error ${error.status}:`, error.message);
        } else {
            console.error(`[${channel}] unexpected error`, error);
        }
        // Randevu bu turda kaydedildiyse kullanıcı bunu mutlaka görmeli.
        if (!bookings.length) return { ok: false, reply: FALLBACK_REPLY, booking: null };
    }

    const reply = replyParts.join("\n\n") || (bookings.length ? "Randevu bilgileriniz kaydedildi." : FALLBACK_REPLY);
    return { ok: Boolean(replyParts.length || bookings.length), reply, booking: bookings[0] ?? null };
}
