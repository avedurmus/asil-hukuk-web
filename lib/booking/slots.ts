import { appointmentSettings as cfg } from "@/data/appointmentSettings";

export interface Slot {
    /** Yerel saat ve UTC farkıyla ISO zaman, örn. "2026-10-05T10:00:00+03:00". Asistan bunu kimlik olarak kullanır. */
    id: string;
    /** Okunabilir etiket, örn. "5 Ekim 2026 Pazartesi, 10:00". */
    label: string;
    startMs: number;
    endMs: number;
}

export interface BusyInterval {
    startMs: number;
    endMs: number;
}

const MONTHS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const WEEKDAYS = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

const OFFSET_MS = cfg.utcOffsetMinutes * 60_000;
const DAY_MS = 86_400_000;
const pad = (n: number) => String(n).padStart(2, "0");
const OFFSET_SUFFIX = `${cfg.utcOffsetMinutes >= 0 ? "+" : "-"}${pad(Math.floor(Math.abs(cfg.utcOffsetMinutes) / 60))}:${pad(Math.abs(cfg.utcOffsetMinutes) % 60)}`;

/** UTC milisaniyeyi İstanbul yerel tarih parçalarına çevirir. */
function localParts(ms: number) {
    const d = new Date(ms + OFFSET_MS);
    return {
        year: d.getUTCFullYear(),
        month: d.getUTCMonth(),
        day: d.getUTCDate(),
        weekday: d.getUTCDay(),
        hour: d.getUTCHours(),
        minute: d.getUTCMinutes(),
    };
}

/** Yerel tarihi "YYYY-MM-DD" biçiminde verir. */
export function localDateKey(ms: number): string {
    const p = localParts(ms);
    return `${p.year}-${pad(p.month + 1)}-${pad(p.day)}`;
}

/** Yerel tarihin gece yarısını UTC milisaniye olarak verir. */
function localMidnightMs(ms: number): number {
    const p = localParts(ms);
    return Date.UTC(p.year, p.month, p.day) - OFFSET_MS;
}

export function formatLocal(ms: number, withTime = true): string {
    const p = localParts(ms);
    const date = `${p.day} ${MONTHS[p.month]} ${p.year} ${WEEKDAYS[p.weekday]}`;
    return withTime ? `${date}, ${pad(p.hour)}:${pad(p.minute)}` : date;
}

function toSlotId(ms: number): string {
    const p = localParts(ms);
    return `${p.year}-${pad(p.month + 1)}-${pad(p.day)}T${pad(p.hour)}:${pad(p.minute)}:00${OFFSET_SUFFIX}`;
}

/** "YYYY-MM-DD" dizesini yerel gece yarısına (UTC ms) çevirir; geçersizse null. */
export function parseDateKey(value: string): number | null {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!m) return null;
    const ms = Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])) - OFFSET_MS;
    return localDateKey(ms) === value ? ms : null;
}

/**
 * Çalışma programına göre, verilen tarih aralığındaki (yerel günler, uçlar dahil)
 * tüm aday randevu saatlerini üretir. Asgari bildirim süresi ve ileri tarih
 * sınırı uygulanır; dolu aralıklarla çakışan saatler elenir.
 */
export function generateSlots(opts: { nowMs: number; fromMs?: number; toMs?: number; busy?: BusyInterval[] }): Slot[] {
    const { nowMs, busy = [] } = opts;
    const earliest = nowMs + cfg.minNoticeHours * 3_600_000;
    const firstDay = localMidnightMs(Math.max(opts.fromMs ?? nowMs, nowMs));
    const horizonEnd = localMidnightMs(nowMs) + (cfg.horizonDays + 1) * DAY_MS;
    const lastDayEnd = Math.min(opts.toMs !== undefined ? localMidnightMs(opts.toMs) + DAY_MS : horizonEnd, horizonEnd);
    const durationMs = cfg.durationMinutes * 60_000;

    const slots: Slot[] = [];
    for (let day = firstDay; day < lastDayEnd; day += DAY_MS) {
        const key = localDateKey(day);
        if (cfg.holidays.includes(key) || cfg.blockedDates.includes(key)) continue;
        const halfDay = cfg.halfDays.includes(key);
        const times = cfg.weeklySchedule[localParts(day).weekday] ?? [];

        for (const time of times) {
            const [h, m] = time.split(":").map(Number);
            if (halfDay && h >= 13) continue;
            const startMs = day + (h * 60 + m) * 60_000;
            const endMs = startMs + durationMs;
            if (startMs < earliest) continue;
            if (busy.some((b) => startMs < b.endMs && b.startMs < endMs)) continue;
            slots.push({ id: toSlotId(startMs), label: formatLocal(startMs), startMs, endMs });
        }
    }
    return slots;
}

/** Asistanın gönderdiği slot kimliğini çözer; programa uymayan saatler için null döner. */
export function resolveSlotId(id: string, nowMs: number, busy: BusyInterval[] = []): Slot | null {
    const startMs = Date.parse(id);
    if (Number.isNaN(startMs)) return null;
    const candidates = generateSlots({ nowMs, fromMs: startMs, toMs: startMs, busy });
    return candidates.find((s) => s.startMs === startMs) ?? null;
}

/** Asistana bağlam olarak verilen "şu an" bilgisi. */
export function describeNow(nowMs: number): string {
    return `${formatLocal(nowMs)} (İstanbul saati, tarih: ${localDateKey(nowMs)})`;
}
