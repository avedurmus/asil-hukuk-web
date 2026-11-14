import Anthropic from "@anthropic-ai/sdk";
import { appointmentSettings } from "@/data/appointmentSettings";
import { siteContent } from "@/data/siteContent";
import {
    bookAppointment,
    BookingError,
    cancelAppointment,
    findAppointment,
    findAppointmentsByPhone,
    listAvailableSlots,
    MANAGE_PAGE_URL,
    rescheduleAppointment,
    type Booking,
    type BookingInput,
    type PartOfDay,
} from "@/lib/booking";
import { describeNow } from "@/lib/booking/slots";
import type { DaySlots } from "@/lib/booking/types";
import { buildSystemPrompt, type ChatChannel } from "@/lib/chatbot/systemPrompt";
import { recentHits } from "@/lib/rateLimit";

export { rateLimited, recentHits } from "@/lib/rateLimit";

/**
 * Sitedeki sohbet penceresi ile WhatsApp asistanının ortak çekirdeği: Claude
 * API çağrısı, randevu araçları ve araç döngüsü. Kanala özgü işler (HTTP
 * isteği, WhatsApp'a gönderim, sohbet geçmişinin saklanması) çağıran tarafta.
 *
 * Randevu araçları, takvimli randevu sayfasıyla aynı çekirdeği (lib/booking)
 * kullanır: asistanın oluşturduğu randevu sayfadan, sayfadan alınan randevu
 * asistandan sorgulanabilir, ertelenebilir ve iptal edilebilir.
 */

const MODEL = process.env.CHATBOT_MODEL || "claude-opus-5-5";
const EFFORT = (process.env.CHATBOT_EFFORT as "low" | "medium" | "high" | undefined) || "low";
const MAX_TOOL_ROUNDS = 8;

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

const SLOT_ID_HINT = "YYYY-MM-DDTHH:MM:00+03:00 biçiminde İstanbul saati (örn. 2026-11-17T10:00:00+03:00)";
const PHONE_HINT = "Randevu alınırken verilen telefon numarası. WhatsApp'ta boş bırakılırsa kullanıcının yazdığı numara kullanılır.";

const bookingTools: Anthropic.Beta.BetaTool[] = [
    {
        name: "list_available_slots",
        description:
            "Av. Emre Durmuş'un ön görüşme için boş olan randevu saatlerini getirir. Kullanıcıya saat önermeden önce mutlaka çağır; yalnızca bu aracın döndürdüğü saatleri sun. Tarih verilmezse en yakın uygun saatler döner. Sonuçtaki later_days, sunulanlardan sonra da boş saati olan günlerdir.",
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
                slot_id: { type: "string", description: `Kullanıcının seçtiği saat: list_available_slots sonucundaki slot_id; ${SLOT_ID_HINT}.` },
                full_name: { type: "string", description: "Kullanıcının adı soyadı." },
                phone: { type: "string", description: "Kullanıcının telefon numarası." },
                email: { type: "string", description: "E-posta adresi; kullanıcı vermediyse boş bırak." },
                practice_area: {
                    type: "string",
                    enum: Array.from(new Set([...siteContent.services.map((s) => s.title), "Miras Hukuku", "İcra Hukuku", "Diğer / Emin değilim"])),
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
    {
        name: "find_appointment",
        description:
            "Mevcut bir randevuyu getirir (tarih, saat, görüşme şekli, durum). Kullanıcı randevusunu sorduğunda, ertelemek veya iptal etmek istediğinde önce bunu çağır. Referans kodu (AH-XXXXXX) ve randevu alınırken verilen telefon numarası birlikte gerekir.",
        input_schema: {
            type: "object",
            properties: {
                reference: {
                    type: "string",
                    description: "Randevu referans kodu, örn. AH-7K2M9Q. WhatsApp'ta kullanıcı kodu bilmiyorsa boş bırak; yazdığı numaraya ait randevular listelenir.",
                },
                phone: { type: "string", description: PHONE_HINT },
            },
            additionalProperties: false,
        },
    },
    {
        name: "cancel_appointment",
        description:
            "Randevuyu iptal eder ve saati yeniden randevuya açar. Yalnızca find_appointment ile randevuyu gösterdikten ve kullanıcı iptali açıkça onayladıktan sonra çağır.",
        input_schema: {
            type: "object",
            properties: {
                reference: { type: "string", description: "Randevu referans kodu (AH-XXXXXX)." },
                phone: { type: "string", description: PHONE_HINT },
            },
            required: ["reference"],
            additionalProperties: false,
        },
    },
    {
        name: "reschedule_appointment",
        description:
            "Mevcut randevuyu yeni bir saate taşır; referans kodu aynı kalır. Önce list_available_slots ile boş saatleri sun; kullanıcı yeni saati açıkça seçtikten sonra çağır.",
        input_schema: {
            type: "object",
            properties: {
                reference: { type: "string", description: "Randevu referans kodu (AH-XXXXXX)." },
                phone: { type: "string", description: PHONE_HINT },
                new_slot_id: { type: "string", description: `Yeni saat: list_available_slots sonucundaki slot_id; ${SLOT_ID_HINT}.` },
            },
            required: ["reference", "new_slot_id"],
            additionalProperties: false,
        },
    },
];

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
    /** Kanalın doğruladığı telefon numarası (WhatsApp); randevu sorgularında varsayılan olur. */
    verifiedPhone?: string;
    extraTools?: ExtraTool[];
}

/** Bu yanıtta randevuya ne olduğu; sohbet penceresi kartı buna göre gösterir. */
export type BookingEvent = "created" | "found" | "rescheduled" | "cancelled";

export interface AssistantResult {
    /** false ise yanıt üretilemedi; reply yedek mesajdır. */
    ok: boolean;
    reply: string;
    /** Bu yanıtta oluşturulan, getirilen veya değiştirilen randevu. */
    booking: Booking | null;
    bookingEvent: BookingEvent | null;
    /** Asistanın bu yanıtta sunduğu boş saatler (sohbet penceresinde tıklanabilir gösterilir). */
    slots: DaySlots[] | null;
}

/** Yanıt metni üretilemese bile kullanıcının mutlaka görmesi gereken değişiklikler. */
const CHANGE_REPLIES: Partial<Record<BookingEvent, string>> = {
    created: "Randevu bilgileriniz kaydedildi.",
    rescheduled: "Randevunuz yeni saate taşındı.",
    cancelled: "Randevunuz iptal edildi.",
};

const describeBooking = (b: Booking) => ({
    reference: b.reference,
    status: b.status,
    date_time: b.slotLabel,
    slot_id: b.slotId,
    meeting_type: b.meetingTypeLabel,
    name: b.name,
    practice_area: b.practiceArea,
    can_change_online: b.canChange,
    manage_page: MANAGE_PAGE_URL,
});

export async function runAssistant({ channel, history, limiterKey, context, verifiedPhone, extraTools = [] }: AssistantRequest): Promise<AssistantResult> {
    const messages: Anthropic.Beta.BetaMessageParam[] = [
        ...history,
        // Güncel tarih sistem talimatına değil buraya eklenir; böylece sabit
        // sistem talimatı ve bilgi tabanı önbellekten okunabilir.
        { role: "system", content: [`Güncel tarih ve saat: ${describeNow(Date.now())}.`, context].filter(Boolean).join("\n") },
    ];
    const tools = [...bookingTools, ...extraTools.map((t) => t.definition)];
    const replyParts: string[] = [];
    const state: { created: boolean; booking: Booking | null; event: BookingEvent | null; slots: DaySlots[] | null } = {
        created: false,
        booking: null,
        event: null,
        slots: null,
    };
    const changeReply = () => (state.event ? CHANGE_REPLIES[state.event] : undefined);

    /** Referans + telefonla yapılan sorgular; hatalı denemeler sınırlanır ki kodlar deneme yoluyla bulunamasın. */
    async function withLookup<T>(input: unknown, run: (reference: string, phone: string) => Promise<T>): Promise<T> {
        const args = (input ?? {}) as { reference?: string; phone?: string };
        const phone = args.phone?.trim() || verifiedPhone || "";
        if (!phone) throw new BookingError("invalid", "Randevuyu bulmak için randevu alınırken verilen telefon numarası gerekli.");
        const failures = recentHits(`lookup:${limiterKey}`, 3_600_000);
        if (failures.length >= 6) {
            throw new BookingError("limit", `Çok sayıda hatalı sorgu yapıldı. Kullanıcıyı ${PHONE} numarasına yönlendirin.`);
        }
        try {
            return await run(args.reference ?? "", phone);
        } catch (error) {
            if (error instanceof BookingError && error.code === "not_found") failures.push(Date.now());
            throw error;
        }
    }

    async function runTool(name: string, input: unknown): Promise<string> {
        if (name === "list_available_slots") {
            const args = (input ?? {}) as { start_date?: string; end_date?: string; part_of_day?: PartOfDay };
            const { days, ...result } = await listAvailableSlots(args);
            state.slots = days.length ? days : null;
            return JSON.stringify(result);
        }
        if (name === "book_appointment") {
            if (state.created) throw new BookingError("limit", "Bu sohbette zaten bir randevu oluşturuldu.");
            // Yalnızca başarılı randevular sayılır; hatalı denemeler kullanıcıyı kilitlemez.
            const booked = recentHits(`book:${limiterKey}`, 86_400_000);
            if (booked.length >= 3) {
                throw new BookingError("limit", `Bugün çok sayıda randevu talebi alındı. Kullanıcıyı ${PHONE} numarasına yönlendirin.`);
            }
            const booking = await bookAppointment(input as BookingInput, channel);
            booked.push(Date.now());
            Object.assign(state, { created: true, booking, event: "created", slots: null });
            return JSON.stringify({ success: true, ...describeBooking(booking) });
        }
        if (name === "find_appointment") {
            const args = (input ?? {}) as { reference?: string };
            if (!args.reference?.trim() && verifiedPhone) {
                const found = await findAppointmentsByPhone(verifiedPhone);
                if (found.length === 1 && !state.event) Object.assign(state, { booking: found[0], event: "found" });
                return JSON.stringify({
                    appointments: found.map(describeBooking),
                    note: found.length ? undefined : "Bu numaraya kayıtlı ileri tarihli randevu yok.",
                });
            }
            const found = await withLookup(input, findAppointment);
            if (!state.event) Object.assign(state, { booking: found, event: "found" });
            return JSON.stringify(describeBooking(found));
        }
        if (name === "cancel_appointment") {
            const booking = await withLookup(input, (reference, phone) => cancelAppointment(reference, phone, channel));
            Object.assign(state, { booking, event: "cancelled", slots: null });
            return JSON.stringify({ success: true, ...describeBooking(booking) });
        }
        if (name === "reschedule_appointment") {
            const { new_slot_id } = (input ?? {}) as { new_slot_id?: string };
            const booking = await withLookup(input, (reference, phone) => rescheduleAppointment(reference, phone, new_slot_id ?? "", channel));
            Object.assign(state, { booking, event: "rescheduled", slots: null });
            return JSON.stringify({ success: true, ...describeBooking(booking) });
        }
        const extra = extraTools.find((t) => t.definition.name === name);
        if (extra) return extra.run(input);
        throw new BookingError("invalid", `Bilinmeyen araç: ${name}`);
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
                        error instanceof BookingError ? error.message : `Sisteme şu an ulaşılamıyor. Kullanıcıyı ${PHONE} numarasına yönlendirin.`;
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
        // Randevu bu turda kaydedildiyse ya da değiştiyse kullanıcı bunu mutlaka görmeli.
        if (!changeReply()) return { ok: false, reply: FALLBACK_REPLY, booking: null, bookingEvent: null, slots: null };
    }

    const reply = replyParts.join("\n\n") || changeReply() || FALLBACK_REPLY;
    return {
        ok: Boolean(replyParts.length || changeReply()),
        reply,
        booking: state.booking,
        bookingEvent: state.event,
        slots: state.slots,
    };
}
