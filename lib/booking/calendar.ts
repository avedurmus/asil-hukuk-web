import * as appsScript from "./appsScriptCalendar";
import * as serviceAccount from "./googleCalendar";
import type { BusyInterval } from "./slots";

export { SlotTakenError } from "./appsScriptCalendar";

/**
 * Google bağlantısının (Takvim ve Gmail) hataya dayanıklı sarmalayıcısı.
 *
 * Önce Apps Script köprüsü, yoksa Google hizmet hesabı kullanılır. Bağlantı
 * tanımlı olsa bile ulaşılamıyorsa (ör. Apps Script dağıtımı silinmiş, HTTP
 * 404) randevu sistemi durmaz: çağıran taraf "talep" moduna düşer, saat kendi
 * deposundaki kilitle korunur ve büroya durum e-postayla bildirilir.
 */
function provider() {
    if (appsScript.isCalendarConfigured()) return appsScript;
    if (serviceAccount.isCalendarConfigured()) return serviceAccount;
    return null;
}

export function isCalendarConfigured(): boolean {
    return provider() !== null;
}

export interface CalendarHealth {
    configured: boolean;
    provider: "apps_script" | "service_account" | null;
    /** Son denemede takvime ulaşılabildi mi? Hiç denenmediyse null. */
    ok: boolean | null;
    error?: string;
    checkedAt?: number;
}

let lastCheck: { ok: boolean; error?: string; at: number } | null = null;

/** Başarısız bir bağlantı bu süre boyunca yeniden denenmez; her istek zaman aşımını beklemesin. */
const FAILURE_COOLDOWN_MS = 60_000;
/** Takvim sayfası açılırken aynı doluluk sorgusu art arda yapılmasın. */
const BUSY_CACHE_MS = 30_000;
let busyCache: { fromMs: number; toMs: number; busy: BusyInterval[]; at: number } | null = null;

function recordFailure(action: string, error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    // Aynı hata bekleme süresi içinde kayıtlara bir kez yazılır.
    if (!lastCheck || lastCheck.ok || lastCheck.error !== message) {
        console.error(`[randevu] Takvim bağlantısı çalışmıyor (${action}); sistem talep moduna düştü: ${message}`);
    }
    lastCheck = { ok: false, error: message, at: Date.now() };
    busyCache = null;
}

function inCooldown(): boolean {
    return lastCheck !== null && !lastCheck.ok && Date.now() - lastCheck.at < FAILURE_COOLDOWN_MS;
}

export function calendarHealth(): CalendarHealth {
    const p = provider();
    return {
        configured: p !== null,
        provider: p === appsScript ? "apps_script" : p === serviceAccount ? "service_account" : null,
        ok: lastCheck?.ok ?? null,
        error: lastCheck?.error,
        checkedAt: lastCheck?.at,
    };
}

export interface BusyResult {
    /** Takvim okunabildi mi? false ise doluluk bilinmiyor (talep modu). */
    ok: boolean;
    busy: BusyInterval[];
}

/**
 * Takvimdeki dolu aralıkları getirir. Takvim tanımlı değilse veya ulaşılamazsa
 * hata fırlatmaz; ok=false döner. `fresh` verilirse önbellek kullanılmaz
 * (randevu yazılmadan hemen önceki son denetim).
 */
export async function tryFetchBusy(fromMs: number, toMs: number, opts: { fresh?: boolean } = {}): Promise<BusyResult> {
    const p = provider();
    if (!p || inCooldown()) return { ok: false, busy: [] };

    if (!opts.fresh && busyCache && Date.now() - busyCache.at < BUSY_CACHE_MS && busyCache.fromMs <= fromMs && busyCache.toMs >= toMs) {
        return { ok: true, busy: busyCache.busy };
    }
    try {
        const busy = await p.fetchBusy(fromMs, toMs);
        lastCheck = { ok: true, at: Date.now() };
        if (!opts.fresh) busyCache = { fromMs, toMs, busy, at: Date.now() };
        return { ok: true, busy };
    } catch (error) {
        recordFailure("doluluk sorgusu", error);
        return { ok: false, busy: [] };
    }
}

export type CalendarEventInput = Parameters<typeof appsScript.createEvent>[0];

/**
 * Etkinliği takvime yazar. Saat takvimde doluysa SlotTakenError fırlatır;
 * başka her hata bağlantı sorunu olarak kaydedilir ve yeniden fırlatılır.
 */
export async function createEvent(event: CalendarEventInput): Promise<string> {
    const p = provider();
    if (!p) throw new Error("Takvim bağlantısı yapılandırılmamış.");
    try {
        const id = await p.createEvent(event);
        busyCache = null;
        return id;
    } catch (error) {
        if (!(error instanceof appsScript.SlotTakenError)) recordFailure("etkinlik oluşturma", error);
        throw error;
    }
}

/** Etkinliği takvimden siler; başarılıysa true. Hata fırlatmaz. */
export async function tryDeleteEvent(id: string): Promise<boolean> {
    const p = provider();
    if (!p || inCooldown()) return false;
    try {
        await p.deleteEvent(id);
        busyCache = null;
        return true;
    } catch (error) {
        console.error("[randevu] Takvim etkinliği silinemedi:", error instanceof Error ? error.message : error);
        return false;
    }
}

// ———————————————————————————————————————— Gmail bildirimi
/** Köprünün eski sürümü yayındaysa her bildirimde yeniden denenmez. */
let gmailUnsupportedAt = 0;
const GMAIL_RETRY_MS = 10 * 60_000;

/**
 * Bildirimi Apps Script köprüsü üzerinden Gmail ile gönderir; başarılıysa true.
 * Köprü tanımlı değilse, ulaşılamıyorsa ya da eski sürümdeyse false döner ve
 * çağıran taraf yedek e-posta yoluna (Formspree) geçer.
 */
export async function trySendGmail(mail: { subject: string; rows: [string, string][]; replyTo?: string }): Promise<boolean> {
    if (!appsScript.isCalendarConfigured() || inCooldown()) return false;
    if (Date.now() - gmailUnsupportedAt < GMAIL_RETRY_MS) return false;
    try {
        await appsScript.sendMail(mail);
        return true;
    } catch (error) {
        if (error instanceof appsScript.NotifyUnsupportedError) {
            gmailUnsupportedAt = Date.now();
            console.warn(`[randevu] ${error.message}`);
        } else {
            recordFailure("Gmail bildirimi", error);
        }
        return false;
    }
}
