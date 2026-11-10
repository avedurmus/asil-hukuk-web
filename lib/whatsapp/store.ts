/**
 * WhatsApp asistanının küçük durum deposu: sohbet geçmişi, kişisel numaralar,
 * avukatın devraldığı sohbetler ve tekrar eden webhook'ların ayıklanması.
 *
 * Upstash Redis'in REST arayüzü kullanılır (Vercel → Storage → Upstash Redis
 * eklendiğinde ortam değişkenleri otomatik tanımlanır). Ek paket gerekmez.
 */

type RedisValue = string | number | null | RedisValue[];

function credentials(): { url: string; token: string } | null {
    const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export function isStoreConfigured(): boolean {
    return credentials() !== null;
}

export class StoreError extends Error {}

async function redis(command: (string | number)[]): Promise<RedisValue> {
    const creds = credentials();
    if (!creds) throw new StoreError("Upstash Redis tanımlı değil");
    const res = await fetch(creds.url, {
        method: "POST",
        headers: { Authorization: `Bearer ${creds.token}`, "Content-Type": "application/json" },
        body: JSON.stringify(command),
        cache: "no-store",
    });
    const data = (await res.json().catch(() => null)) as { result?: RedisValue; error?: string } | null;
    if (!res.ok || !data || data.error) throw new StoreError(`Redis hatası: ${data?.error ?? res.status}`);
    return data.result ?? null;
}

const KEY_PREFIX = "wa:";
const key = (...parts: string[]) => KEY_PREFIX + parts.join(":");

/** Anahtar yoksa oluşturur ve true döner; varsa false (kilit ve tekrar ayıklama için). */
async function claim(name: string, ttlSeconds: number): Promise<boolean> {
    return (await redis(["SET", name, "1", "EX", ttlSeconds, "NX"])) === "OK";
}

// ———————————————————————————————————————— Tekrar eden webhook'lar
/** Meta aynı mesajı birden fazla kez gönderebilir; ilk görüşte true döner. */
export function markSeen(messageId: string): Promise<boolean> {
    return claim(key("seen", messageId), 3 * 86_400);
}

// ———————————————————————————————————————— Asistanın gönderdiği mesajlar
export async function rememberSent(messageId: string): Promise<void> {
    await redis(["SET", key("sent", messageId), "1", "EX", 3 * 86_400]);
}
export async function wasSentByBot(messageId: string): Promise<boolean> {
    return (await redis(["EXISTS", key("sent", messageId)])) === 1;
}

// ———————————————————————————————————————— Kişisel numaralar
/** Asistanın hiç yanıt vermeyeceği numara (rehberdeki kişi, eski sohbet vb.). */
export async function markPersonal(waId: string, source: string): Promise<void> {
    await redis(["SET", key("personal", waId), source]);
}
export async function unmarkPersonal(waId: string): Promise<void> {
    await redis(["DEL", key("personal", waId)]);
}
export async function isPersonal(waId: string): Promise<boolean> {
    return (await redis(["EXISTS", key("personal", waId)])) === 1;
}

// ———————————————————————————————————————— Avukatın devraldığı sohbetler
export async function setHumanMode(waId: string, hours: number): Promise<void> {
    await redis(["SET", key("human", waId), String(Date.now()), "EX", Math.max(1, Math.round(hours * 3600))]);
}
export async function isHumanMode(waId: string): Promise<boolean> {
    return (await redis(["EXISTS", key("human", waId)])) === 1;
}

// ———————————————————————————————————————— Sohbet geçmişi
export interface StoredMessage {
    role: "user" | "assistant";
    content: string;
    /** Mesaj zamanı (ms). */
    at: number;
}

const HISTORY_TTL_SECONDS = 7 * 86_400;
const HISTORY_LIMIT = 40;

export async function getHistory(waId: string): Promise<StoredMessage[]> {
    const raw = await redis(["GET", key("history", waId)]);
    if (typeof raw !== "string") return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export async function saveHistory(waId: string, messages: StoredMessage[]): Promise<void> {
    const trimmed = messages.slice(-HISTORY_LIMIT);
    await redis(["SET", key("history", waId), JSON.stringify(trimmed), "EX", HISTORY_TTL_SECONDS]);
}

// ———————————————————————————————————————— Yanıt bekleyen mesajlar
// Gelen mesajlar önce bu kuyruğa yazılır; kilidi tutan tek işlem kuyruğu
// boşaltıp geçmişe ekler. Böylece geçmişe aynı anda iki yazan olmaz.
export async function pushPending(waId: string, message: StoredMessage): Promise<void> {
    await redis(["RPUSH", key("pending", waId), JSON.stringify(message)]);
    await redis(["EXPIRE", key("pending", waId), HISTORY_TTL_SECONDS]);
}

export async function popPending(waId: string): Promise<StoredMessage[]> {
    const raw = await redis(["LPOP", key("pending", waId), 50]);
    const items = Array.isArray(raw) ? (raw as unknown[]) : [];
    return items.flatMap((item) => {
        try {
            return typeof item === "string" ? [JSON.parse(item) as StoredMessage] : [];
        } catch {
            return [];
        }
    });
}

export async function hasPending(waId: string): Promise<boolean> {
    return Number(await redis(["LLEN", key("pending", waId)])) > 0;
}

export async function clearPending(waId: string): Promise<void> {
    await redis(["DEL", key("pending", waId)]);
}

// ———————————————————————————————————————— Sohbet kilidi
/** Aynı sohbete aynı anda iki yanıt üretilmesini önler. */
export function acquireLock(waId: string): Promise<boolean> {
    return claim(key("lock", waId), 180);
}
export async function releaseLock(waId: string): Promise<void> {
    await redis(["DEL", key("lock", waId)]);
}

/** Aynı numaraya belirli bir bildirimi süre içinde yalnızca bir kez göndermek için. */
export function claimOnce(name: string, waId: string, ttlSeconds: number): Promise<boolean> {
    return claim(key("once", name, waId), ttlSeconds);
}
