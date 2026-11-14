import { appointmentSettings as cfg, type MeetingType } from "@/data/appointmentSettings";
import { isRedisConfigured, pipeline, redis, type RedisCommand } from "@/lib/redis";

/**
 * Randevu kayıt deposu (Upstash Redis).
 *
 * Takvim bağlantısından bağımsız çalışır: her randevu burada saklanır, seçilen
 * saat atomik bir kilitle (SET NX) tutulur. Böylece Google Takvim'e
 * ulaşılamadığında bile aynı saate iki randevu verilmez; randevu referans
 * koduyla sorgulanabilir, ertelenebilir ve iptal edilebilir.
 *
 * Anahtarlar:
 *   bk:rec:<ref>       randevu kaydı (JSON)
 *   bk:slot:<startMs>  saat kilidi → ref
 *   bk:active          sıralı küme: etkin randevular (puan = başlangıç)
 *   bk:all             sıralı küme: tüm randevular (puan = başlangıç)
 *   bk:phone:<no>      küme: telefon numarasına ait referanslar
 *   bk:blocked         küme: büronun kapattığı günler (YYYY-MM-DD)
 */

export type RecordStatus = "pending" | "confirmed" | "cancelled";
export type BookingChannel = "web" | "form" | "whatsapp";

export interface BookingRecord {
    reference: string;
    status: RecordStatus;
    startMs: number;
    endMs: number;
    meetingType: MeetingType;
    name: string;
    phone: string;
    email?: string;
    practiceArea: string;
    summary: string;
    channel: BookingChannel;
    createdAt: number;
    updatedAt: number;
    /** Takvime yazıldıysa etkinlik kimliği (iptal ve ertelemede silinir). */
    calendarEventId?: string;
    cancelledBy?: "client" | "office";
    /** Kaç kez ertelendiği. */
    rescheduled?: number;
}

const DAY_SECONDS = 86_400;
const key = {
    record: (ref: string) => `bk:rec:${ref}`,
    slot: (startMs: number) => `bk:slot:${startMs}`,
    phone: (phoneKey: string) => `bk:phone:${phoneKey}`,
    active: "bk:active",
    all: "bk:all",
    blocked: "bk:blocked",
};

export function isStoreConfigured(): boolean {
    return isRedisConfigured();
}

/** Karşılaştırma için numaranın son 10 hanesi (ülke kodu ve baştaki 0 atılır). */
export function phoneKey(phone: string): string {
    return phone.replace(/\D/g, "").slice(-10);
}

function retentionSeconds(startMs: number): number {
    const untilEnd = Math.ceil((startMs - Date.now()) / 1000);
    return Math.max(untilEnd, 0) + cfg.retentionDays * DAY_SECONDS;
}

/** Saati bu referans için kilitler; saat başka bir randevuya aitse false döner. */
export async function lockSlot(startMs: number, reference: string): Promise<boolean> {
    const ttl = Math.max(Math.ceil((startMs - Date.now()) / 1000), 0) + DAY_SECONDS;
    return (await redis(["SET", key.slot(startMs), reference, "EX", ttl, "NX"])) === "OK";
}

/** Kilidi yalnızca bu referansa aitse kaldırır. */
export async function releaseSlot(startMs: number, reference: string): Promise<void> {
    if ((await redis(["GET", key.slot(startMs)])) === reference) await redis(["DEL", key.slot(startMs)]);
}

export async function saveRecord(record: BookingRecord): Promise<void> {
    const ttl = retentionSeconds(record.startMs);
    const commands: RedisCommand[] = [
        ["SET", key.record(record.reference), JSON.stringify(record), "EX", ttl],
        ["ZADD", key.all, record.startMs, record.reference],
        record.status === "cancelled"
            ? ["ZREM", key.active, record.reference]
            : ["ZADD", key.active, record.startMs, record.reference],
        ["SADD", key.phone(phoneKey(record.phone)), record.reference],
        ["EXPIRE", key.phone(phoneKey(record.phone)), ttl],
    ];
    await pipeline(commands);
}

/** Kaydı ve dizinlerdeki izlerini tümüyle siler (yarım kalan kayıtları geri almak için). */
export async function deleteRecord(record: BookingRecord): Promise<void> {
    await pipeline([
        ["DEL", key.record(record.reference)],
        ["ZREM", key.all, record.reference],
        ["ZREM", key.active, record.reference],
        ["SREM", key.phone(phoneKey(record.phone)), record.reference],
    ]);
}

function parseRecord(raw: unknown): BookingRecord | null {
    if (typeof raw !== "string") return null;
    try {
        const parsed = JSON.parse(raw) as BookingRecord;
        return parsed && typeof parsed.reference === "string" && typeof parsed.startMs === "number" ? parsed : null;
    } catch {
        return null;
    }
}

export async function getRecord(reference: string): Promise<BookingRecord | null> {
    return parseRecord(await redis(["GET", key.record(reference)]));
}

async function getRecords(references: string[]): Promise<BookingRecord[]> {
    if (references.length === 0) return [];
    const raw = await redis(["MGET", ...references.map(key.record)]);
    return (Array.isArray(raw) ? raw : []).flatMap((item) => {
        const record = parseRecord(item);
        return record ? [record] : [];
    });
}

/** Verilen aralıkta etkin (iptal edilmemiş) randevuların başlangıç zamanları. */
export async function activeStarts(fromMs: number, toMs: number): Promise<number[]> {
    const raw = await redis(["ZRANGEBYSCORE", key.active, fromMs, toMs, "WITHSCORES"]);
    const flat = Array.isArray(raw) ? raw : [];
    const starts: number[] = [];
    for (let i = 1; i < flat.length; i += 2) starts.push(Number(flat[i]));
    return starts;
}

/** Verilen aralıktaki tüm randevular (iptaller dahil), başlangıca göre sıralı. */
export async function listRecords(fromMs: number, toMs: number): Promise<BookingRecord[]> {
    const raw = await redis(["ZRANGEBYSCORE", key.all, fromMs, toMs]);
    const references = (Array.isArray(raw) ? raw : []).filter((r): r is string => typeof r === "string");
    const records = await getRecords(references);
    // Süresi dolmuş kayıtların dizindeki izlerini temizle.
    const found = new Set(records.map((r) => r.reference));
    const stale = references.filter((r) => !found.has(r));
    if (stale.length) await pipeline(stale.flatMap((r): RedisCommand[] => [["ZREM", key.all, r], ["ZREM", key.active, r]]));
    return records.sort((a, b) => a.startMs - b.startMs);
}

/** Telefon numarasına ait randevular, başlangıca göre sıralı. */
export async function recordsByPhone(phone: string): Promise<BookingRecord[]> {
    const raw = await redis(["SMEMBERS", key.phone(phoneKey(phone))]);
    const references = (Array.isArray(raw) ? raw : []).filter((r): r is string => typeof r === "string");
    return (await getRecords(references)).sort((a, b) => a.startMs - b.startMs);
}

// ———————————————————————————————————————— Büronun kapattığı günler
export async function blockedDates(): Promise<string[]> {
    const raw = await redis(["SMEMBERS", key.blocked]);
    return (Array.isArray(raw) ? raw : []).filter((d): d is string => typeof d === "string").sort();
}

export async function blockDate(date: string): Promise<void> {
    await redis(["SADD", key.blocked, date]);
}

export async function unblockDate(date: string): Promise<void> {
    await redis(["SREM", key.blocked, date]);
}
