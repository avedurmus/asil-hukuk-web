import { siteContent } from "@/data/siteContent";
import { notifyOffice } from "@/lib/booking";
import { isAssistantConfigured, runAssistant, sanitizeHistory, type ExtraTool } from "@/lib/chatbot/agent";
import { OFFICE_HOURS } from "@/lib/contact";
import { SITE_URL } from "@/lib/seo";
import { formatLocalPhone, markReadWithTyping, normalizeWaId, sendText } from "./api";
import * as store from "./store";

/**
 * WhatsApp asistanının karar mantığı. İki çalışma modu vardır:
 *
 * - Ayrı numara (varsayılan): Bot yalnızca kendisine ayrılmış bir numarada
 *   (ör. büronun sabit hattı) çalışır ve o numaraya yazan herkese yanıt verir.
 *   Sohbet avukata devredildiğinde avukata e-posta gider, avukat müvekkile
 *   kendi numarasından döner; bot sohbette yardımcı olmayı sürdürür.
 *
 * - Birlikte kullanım (WHATSAPP_COEXISTENCE=true): Numara aynı zamanda
 *   telefondaki WhatsApp Business uygulamasında kişisel olarak kullanılır.
 *   "Şüphede sus" ilkesiyle şu numaralara HİÇ yanıt verilmez: telefon
 *   rehberindeki kişiler, kurulumdan önce yazışılmış herkes, avukatın
 *   telefondan yazdığı ve asistanın avukata devrettiği sohbetler
 *   (WHATSAPP_HUMAN_HOURS süresince).
 *
 * Her iki modda da WHATSAPP_PERSONAL_NUMBERS listesine yanıt verilmez ve depo
 * (Redis) okunamazsa asistan susar.
 */

const PHONE = siteContent.contact.phone;
const COEXISTENCE = process.env.WHATSAPP_COEXISTENCE === "true";
const HUMAN_HOURS = Number(process.env.WHATSAPP_HUMAN_HOURS) || 72;
/** Art arda gönderilen mesajları tek yanıtta toplamak için bekleme süresi. */
const BURST_WAIT_MS = 2500;

const INTRO_MESSAGE = [
    "Merhaba, Asil Hukuk Bürosu'na hoş geldiniz.",
    "Ben büronun yapay zekâ destekli dijital asistanıyım. Size genel bilgi verebilir, Av. Emre Durmuş ile ön görüşme randevusu oluşturabilirim. Verdiğim bilgiler hukuki danışmanlık yerine geçmez.",
    "Avukatımızla doğrudan görüşmek isterseniz *avukat* yazmanız yeterli.",
    `Lütfen kimlik numarası, sağlık bilgisi gibi hassas bilgiler paylaşmayın. Mesajlarınız yanıt üretmek amacıyla yapay zekâ hizmet sağlayıcımız tarafından işlenir: ${SITE_URL}/kvkk`,
].join("\n\n");

const UNREADABLE_MESSAGE = COEXISTENCE
    ? `Sesli mesaj, fotoğraf ve belgeleri okuyamıyorum; gönderdikleriniz avukatımıza ulaşır. Konunuzu birkaç cümleyle yazarsanız size yardımcı olabilirim. Acil durumlarda ${PHONE} numarasını arayabilirsiniz.`
    : `Sesli mesaj, fotoğraf ve belgeleri okuyamıyorum. Konunuzu birkaç cümleyle yazarsanız size yardımcı olabilirim; belgelerinizi ön görüşmede avukatımız inceleyecektir. Acil durumlarda ${PHONE} numarasını arayabilirsiniz.`;

const WA_FALLBACK = `Şu anda yanıt veremiyorum. Mesajınız büromuza ulaştı; mesai saatlerinde (${OFFICE_HOURS}) dönüş yapılacaktır. Acil durumlarda ${PHONE} numarasını arayabilirsiniz.`;

/** Devirden sonra kullanıcıya nasıl dönüş yapılacağı. */
const HANDOVER_NEXT_STEP = COEXISTENCE
    ? `Mesai saatlerinde (${OFFICE_HOURS}) bu sohbetten dönüş yapılacak.`
    : `Mesai saatlerinde (${OFFICE_HOURS}) Av. Emre Durmuş ${PHONE} numarasından kullanıcıyla iletişime geçecek.`;

const HANDOVER_REPLY = COEXISTENCE
    ? `Mesajınızı Av. Emre Durmuş'a ilettim. Mesai saatlerinde (${OFFICE_HOURS}) bu sohbetten size dönüş yapılacaktır. Acil bir durum varsa lütfen ${PHONE} numarasını arayın.`
    : `Mesajınızı Av. Emre Durmuş'a ilettim. Mesai saatlerinde (${OFFICE_HOURS}) sizinle ${PHONE} numarasından iletişime geçilecektir. Acil bir durum varsa bu numarayı hemen arayabilirsiniz.`;

function numberList(name: string): Set<string> {
    return new Set(
        (process.env[name] ?? "")
            .split(/[,;\n]/)
            .map((n) => normalizeWaId(n))
            .filter(Boolean),
    );
}

function botEnabled(): boolean {
    return process.env.WHATSAPP_BOT_ENABLED === "true" && isAssistantConfigured() && store.isStoreConfigured();
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ———————————————————————————————————————— Webhook biçimleri (yalnızca kullanılan alanlar)
interface WaMessage {
    id: string;
    from: string;
    to?: string;
    timestamp?: string;
    type: string;
    text?: { body?: string };
    button?: { text?: string };
    interactive?: { button_reply?: { title?: string }; list_reply?: { title?: string } };
}

interface WaChangeValue {
    metadata?: { phone_number_id?: string };
    contacts?: { wa_id?: string; profile?: { name?: string } }[];
    messages?: WaMessage[];
    message_echoes?: WaMessage[];
    state_sync?: { type?: string; action?: string; contact?: { phone_number?: string } }[];
    history?: { threads?: { id?: string }[] }[];
}

export interface WaWebhookPayload {
    object?: string;
    entry?: { changes?: { field?: string; value?: WaChangeValue }[] }[];
}

function textOf(message: WaMessage): string | null {
    const text =
        message.text?.body ??
        message.button?.text ??
        message.interactive?.button_reply?.title ??
        message.interactive?.list_reply?.title;
    return text?.trim() ? text.trim() : null;
}

/** Webhook'taki tüm olayları işler. Hatalar kaydedilir, dışarı fırlatılmaz. */
export async function handleWebhook(payload: WaWebhookPayload): Promise<void> {
    const ownPhoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const jobs: Promise<void>[] = [];

    for (const entry of payload.entry ?? []) {
        for (const change of entry.changes ?? []) {
            const value = change.value ?? {};
            if (ownPhoneNumberId && value.metadata?.phone_number_id && value.metadata.phone_number_id !== ownPhoneNumberId) continue;

            switch (change.field) {
                case "messages": {
                    const names = new Map((value.contacts ?? []).map((c) => [normalizeWaId(c.wa_id ?? ""), c.profile?.name ?? ""]));
                    for (const message of value.messages ?? []) {
                        const waId = normalizeWaId(message.from);
                        jobs.push(handleInbound(message, waId, names.get(waId) ?? ""));
                    }
                    break;
                }
                case "smb_message_echoes":
                    // Avukat telefondaki uygulamadan yazdı: asistan bu sohbette susar.
                    for (const echo of value.message_echoes ?? []) jobs.push(handleOwnerMessage(echo));
                    break;
                case "smb_app_state_sync":
                    // Rehberdeki kişiler kişisel kabul edilir. Rehberden silinen kişi
                    // yine kişisel kalır (şüphede sus).
                    for (const item of value.state_sync ?? []) {
                        const number = item.contact?.phone_number;
                        if (item.type === "contact" && item.action !== "remove" && number) {
                            jobs.push(store.markPersonal(normalizeWaId(number), "rehber"));
                        }
                    }
                    break;
                case "history":
                    // Kurulumdan önce yazışılmış herkes kişisel kabul edilir. Mesaj
                    // içerikleri saklanmaz; yalnızca numara işaretlenir.
                    for (const chunk of value.history ?? []) {
                        for (const thread of chunk.threads ?? []) {
                            if (thread.id) jobs.push(store.markPersonal(normalizeWaId(thread.id), "gecmis"));
                        }
                    }
                    break;
            }
        }
    }

    const results = await Promise.allSettled(jobs);
    for (const r of results) if (r.status === "rejected") console.error("[whatsapp] webhook işleme hatası", r.reason);
}

async function handleOwnerMessage(echo: WaMessage): Promise<void> {
    if (!COEXISTENCE || !echo.to || !store.isStoreConfigured()) return;
    if (await store.wasSentByBot(echo.id)) return;
    const waId = normalizeWaId(echo.to);
    await store.setHumanMode(waId, HUMAN_HOURS);
    await store.clearPending(waId);
}

/** Bu numaraya asistan yanıt verebilir mi? */
async function mayReply(waId: string): Promise<boolean> {
    if (!botEnabled()) return false;
    if (numberList("WHATSAPP_PERSONAL_NUMBERS").has(waId)) return false;
    const testNumbers = numberList("WHATSAPP_ALLOWED_NUMBERS");
    if (testNumbers.size > 0 && !testNumbers.has(waId)) return false;
    if (await store.isPersonal(waId)) return false;
    if (await store.isHumanMode(waId)) return false;
    return true;
}

async function handleInbound(message: WaMessage, waId: string, profileName: string): Promise<void> {
    if (!botEnabled()) return;
    if (!(await store.markSeen(message.id))) return;
    if (!(await mayReply(waId))) return;

    if (message.type === "reaction" || message.type === "system" || message.type === "unsupported") return;

    const text = textOf(message);
    if (!text) {
        // Ses, görsel, belge, konum vb.: altı saatte en fazla bir kez bilgi ver.
        if (await store.claimOnce("unreadable", waId, 6 * 3600)) await send(waId, UNREADABLE_MESSAGE);
        return;
    }

    const at = message.timestamp ? Number(message.timestamp) * 1000 : Date.now();
    await store.pushPending(waId, { role: "user", content: text.slice(0, 2000), at });
    if (process.env.WHATSAPP_MARK_READ === "true") {
        await markReadWithTyping(message.id).catch((error) => console.warn("[whatsapp] okundu bilgisi gönderilemedi", error));
    }
    await processConversation(waId, profileName);
}

/**
 * Bekleyen mesajları tek bir işlem yanıtlar. Kilit başka bir işlemdeyse o işlem
 * kuyruğu zaten boşaltacaktır; kilit bırakıldıktan sonra kuyruk yeniden kontrol
 * edilir ki arada gelen mesaj kaybolmasın.
 */
async function processConversation(waId: string, profileName: string): Promise<void> {
    for (let attempt = 0; attempt < 3; attempt++) {
        if (!(await store.acquireLock(waId))) return;
        try {
            await drainPending(waId, profileName);
        } finally {
            await store.releaseLock(waId);
        }
        if (!(await store.hasPending(waId))) return;
    }
}

async function send(waId: string, text: string): Promise<void> {
    const id = await sendText(waId, text);
    if (id) await store.rememberSent(id);
}

async function drainPending(waId: string, profileName: string): Promise<void> {
    await sleep(BURST_WAIT_MS);

    for (let round = 0; round < 4; round++) {
        const pending = await store.popPending(waId);
        if (!pending.length) return;
        if (await store.isHumanMode(waId)) return;

        const history = await store.getHistory(waId);
        const firstContact = !history.some((m) => m.role === "assistant");
        history.push(...pending);
        await store.saveHistory(waId, history);

        const latest = pending[pending.length - 1].content.toLocaleLowerCase("tr").replace(/[.!\s]+$/g, "");
        if (latest === "avukat") {
            const summary = pending.map((m) => m.content).join(" / ").slice(0, 600);
            await transferToLawyer(waId, profileName, "kullanici_talebi", `Kullanıcı "avukat" yazdı. Son mesajları: ${summary}`);
            await send(waId, HANDOVER_REPLY);
            history.push({ role: "assistant", content: HANDOVER_REPLY, at: Date.now() });
            await store.saveHistory(waId, history);
            return;
        }

        const conversation = sanitizeHistory(history);
        if (!conversation) return;

        let transferred = false;
        const transferTool: ExtraTool = {
            definition: {
                name: "transfer_to_lawyer",
                description:
                    "Sohbeti Av. Emre Durmuş'a devreder: avukata konu özetiyle e-posta bildirimi gider. Kullanıcı avukatla görüşmek istediğinde, mevcut müvekkil kendi dosyası hakkında yazdığında, acil durumlarda veya yardımcı olamadığında çağır. Sonuçtaki next_step bilgisini kullanıcıya aktar; already_transferred=true ise talebin zaten iletildiğini söyle.",
                input_schema: {
                    type: "object",
                    properties: {
                        reason: {
                            type: "string",
                            enum: ["kullanici_talebi", "mevcut_muvekkil", "acil", "yardimci_olunamadi"],
                            description: "Devretme nedeni.",
                        },
                        summary: {
                            type: "string",
                            description: "Avukat için 1-3 cümlelik tarafsız özet: kullanıcı kim (söylediyse adı), konu ne, ne istiyor. Hassas kişisel veri yazma.",
                        },
                    },
                    required: ["reason", "summary"],
                    additionalProperties: false,
                },
            },
            run: async (input) => {
                const { reason, summary } = (input ?? {}) as { reason?: string; summary?: string };
                const result = await transferToLawyer(waId, profileName, reason ?? "belirtilmedi", summary ?? "");
                transferred = COEXISTENCE;
                return JSON.stringify({ success: true, ...result, next_step: HANDOVER_NEXT_STEP });
            },
        };

        const context = [
            `Kullanıcının WhatsApp numarası: ${formatLocalPhone(waId)}.`,
            profileName ? `WhatsApp profil adı: "${profileName}" (gerçek adı olmayabilir; randevu için ad soyadı yine sor).` : "",
        ]
            .filter(Boolean)
            .join(" ");

        const result = await runAssistant({
            channel: "whatsapp",
            history: conversation,
            limiterKey: `wa:${waId}`,
            context,
            // Numara WhatsApp tarafından doğrulanmıştır; kullanıcı kendi randevularını kod söylemeden sorgulayabilir.
            verifiedPhone: formatLocalPhone(waId),
            extraTools: [transferTool],
        });

        // Asistan düşünürken avukat telefondan yazdıysa yanıt gönderilmez.
        if (!transferred && (await store.isHumanMode(waId))) return;

        const reply = result.ok ? result.reply : WA_FALLBACK;
        if (firstContact) await send(waId, INTRO_MESSAGE);
        await send(waId, reply);

        history.push({ role: "assistant", content: reply, at: Date.now() });
        await store.saveHistory(waId, history);
        if (!result.ok) {
            // Yanıt üretilemediyse avukatın haberi olsun.
            await transferToLawyer(waId, profileName, "sistem_hatasi", conversation[conversation.length - 1].content.slice(0, 600));
            return;
        }
        if (transferred) return;
    }
}

async function transferToLawyer(
    waId: string,
    profileName: string,
    reason: string,
    summary: string,
): Promise<{ lawyer_notified: boolean; already_transferred: boolean }> {
    if (COEXISTENCE) {
        await store.setHumanMode(waId, HUMAN_HOURS);
    } else if (!(await store.claimOnce("transfer", waId, HUMAN_HOURS * 3600))) {
        // Ayrı numara modunda bot sohbete devam eder; aynı kişi için avukata
        // tekrar tekrar e-posta gönderilmez.
        return { lawyer_notified: true, already_transferred: true };
    }
    const phone = formatLocalPhone(waId);
    const notified = await notifyOffice({
        _subject: `WhatsApp: avukat dönüşü bekleniyor – ${profileName || phone}`,
        name: profileName || "-",
        phone,
        topic: "WhatsApp asistanı – sohbet devri",
        message: summary || "-",
        reason,
        whatsapp: `https://wa.me/${waId}`,
        source: "WhatsApp asistanı",
        note: COEXISTENCE
            ? `Asistan bu sohbette ${HUMAN_HOURS} saat yanıt vermeyecek. Telefonunuzdaki WhatsApp Business uygulamasından yanıtlayabilirsiniz.`
            : `Kullanıcıya ${PHONE} numarasından dönüş yapılacağı söylendi. Bu kişiyle ilgili ${HUMAN_HOURS} saat içinde tekrar bildirim gönderilmez.`,
    });
    return { lawyer_notified: notified, already_transferred: false };
}
