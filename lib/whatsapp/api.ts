import { createHmac, timingSafeEqual } from "crypto";

/**
 * WhatsApp Cloud API ile konuşan küçük istemci. İki bağlantı türü desteklenir:
 *
 * - "meta" (varsayılan): Meta'nın Graph API'si; Phone Number ID ve kalıcı
 *   erişim anahtarı (System User token) gerekir.
 * - "360dialog": Numara bir iş ortağı (BSP) üzerinden bağlandıysa. İstek ve
 *   webhook biçimleri Cloud API ile aynıdır; yalnızca adres ve kimlik
 *   doğrulama başlığı farklıdır.
 */

const PROVIDER = process.env.WHATSAPP_PROVIDER === "360dialog" ? "360dialog" : "meta";
const GRAPH_VERSION = process.env.WHATSAPP_GRAPH_VERSION || "v23.0";

/** WhatsApp metin mesajı üst sınırı 4096 karakterdir. */
const MAX_TEXT_LENGTH = 4000;

export function isWhatsAppConfigured(): boolean {
    if (PROVIDER === "360dialog") return Boolean(process.env.WHATSAPP_ACCESS_TOKEN);
    return Boolean(process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID);
}

function endpoint(path: "messages" | "smb_app_data"): string {
    if (PROVIDER === "360dialog") return `https://waba-v2.360dialog.io/${path}`;
    return `https://graph.facebook.com/${GRAPH_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/${path}`;
}

function authHeaders(): Record<string, string> {
    const token = process.env.WHATSAPP_ACCESS_TOKEN ?? "";
    return PROVIDER === "360dialog" ? { "D360-API-KEY": token } : { Authorization: `Bearer ${token}` };
}

async function post(path: "messages" | "smb_app_data", body: unknown): Promise<unknown> {
    const res = await fetch(endpoint(path), {
        method: "POST",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
        const message = (data as { error?: { message?: string } } | null)?.error?.message ?? `HTTP ${res.status}`;
        throw new Error(`WhatsApp API hatası (${path}): ${message}`);
    }
    return data;
}

/**
 * Claude'un yazdığı Markdown'ı WhatsApp biçimine çevirir: **kalın** → *kalın*,
 * [metin](adres) → metin: adres, başlık işaretleri atılır.
 */
export function toWhatsAppFormat(text: string): string {
    return text
        .replace(/\*\*(.+?)\*\*/g, "*$1*")
        .replace(/__(.+?)__/g, "_$1_")
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (_, label: string, url: string) => (label === url ? url : `${label}: ${url}`))
        .replace(/^#{1,6}\s+/gm, "")
        .trim();
}

/** Metin mesajı gönderir ve WhatsApp mesaj kimliğini döner. */
export async function sendText(to: string, text: string): Promise<string | null> {
    let body = toWhatsAppFormat(text);
    if (body.length > MAX_TEXT_LENGTH) body = `${body.slice(0, MAX_TEXT_LENGTH - 1)}…`;
    const data = (await post("messages", {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "text",
        text: { body, preview_url: true },
    })) as { messages?: { id?: string }[] } | null;
    return data?.messages?.[0]?.id ?? null;
}

/** Mesajı okundu olarak işaretler ve "yazıyor…" göstergesini açar. */
export async function markReadWithTyping(messageId: string): Promise<void> {
    await post("messages", {
        messaging_product: "whatsapp",
        status: "read",
        message_id: messageId,
        typing_indicator: { type: "text" },
    });
}

/**
 * Birlikte kullanımda (WhatsApp Business uygulaması + API), kurulumdan sonraki
 * 24 saat içinde rehber ve sohbet geçmişi eşitlemesi başlatılmalıdır. Sonuçlar
 * webhook'a "smb_app_state_sync" ve "history" olayları olarak gelir.
 */
export async function requestAppSync(type: "contacts" | "history"): Promise<unknown> {
    return post("smb_app_data", {
        messaging_product: "whatsapp",
        sync_type: type === "contacts" ? "smb_app_state_sync" : "history",
    });
}

// ———————————————————————————————————————— Kurulum yardımcıları (yalnızca Meta)
async function graph(method: "GET" | "POST", path: string, body?: unknown): Promise<unknown> {
    if (PROVIDER !== "meta") throw new Error("Bu işlem yalnızca Meta'ya doğrudan bağlantıda kullanılabilir.");
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${path}`, {
        method,
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body),
        cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
        const message = (data as { error?: { message?: string } } | null)?.error?.message ?? `HTTP ${res.status}`;
        throw new Error(`Meta API hatası: ${message}`);
    }
    return data;
}

/** Numaranın Meta'daki durumu (görünen ad, doğrulama, kalite, kayıt). */
export function getNumberStatus(): Promise<unknown> {
    return graph(
        "GET",
        `${process.env.WHATSAPP_PHONE_NUMBER_ID}?fields=display_phone_number,verified_name,name_status,code_verification_status,quality_rating,platform_type,status,messaging_limit_tier`,
    );
}

/** Numarayı Cloud API'ye kaydeder; pin, numaranın 6 haneli iki adımlı doğrulama kodudur. */
export function registerNumber(pin: string): Promise<unknown> {
    return graph("POST", `${process.env.WHATSAPP_PHONE_NUMBER_ID}/register`, { messaging_product: "whatsapp", pin });
}

/** Uygulamayı WhatsApp Business hesabına abone eder; mesaj webhook'ları için gereklidir. */
export function subscribeApp(wabaId: string): Promise<unknown> {
    return graph("POST", `${wabaId}/subscribed_apps`);
}

/** Meta'nın X-Hub-Signature-256 imzasını doğrular. */
export function verifySignature(rawBody: string, header: string | null, appSecret: string): boolean {
    if (!header?.startsWith("sha256=")) return false;
    const expected = createHmac("sha256", appSecret).update(rawBody, "utf8").digest();
    const received = Buffer.from(header.slice(7), "hex");
    return received.length === expected.length && timingSafeEqual(received, expected);
}

/**
 * Numarayı WhatsApp kimliği biçimine getirir: yalnızca rakamlar, ülke koduyla.
 * "0530 432 20 25", "+90 530 432 2025" ve "905304322025" aynı sonucu verir.
 */
export function normalizeWaId(raw: string): string {
    let digits = raw.replace(/\D/g, "");
    if (digits.startsWith("00")) digits = digits.slice(2);
    if (digits.length === 11 && digits.startsWith("0")) digits = `90${digits.slice(1)}`;
    if (digits.length === 10 && digits.startsWith("5")) digits = `90${digits}`;
    return digits;
}

/** 905301234567 → 0530 123 45 67 (Türkiye cep numaraları için okunur biçim). */
export function formatLocalPhone(waId: string): string {
    const m = /^90(5\d{2})(\d{3})(\d{2})(\d{2})$/.exec(waId);
    return m ? `0${m[1]} ${m[2]} ${m[3]} ${m[4]}` : `+${waId}`;
}
