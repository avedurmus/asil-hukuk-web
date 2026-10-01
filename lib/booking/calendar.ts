import * as appsScript from "./appsScriptCalendar";
import * as serviceAccount from "./googleCalendar";
import type { BusyInterval } from "./slots";

export { SlotTakenError } from "./appsScriptCalendar";

/**
 * Yapılandırılmış takvim bağlantısını seçer: önce Apps Script köprüsü, yoksa
 * Google hizmet hesabı. Hiçbiri yoksa asistan "randevu talebi" modunda çalışır.
 */
function provider() {
    if (appsScript.isCalendarConfigured()) return appsScript;
    if (serviceAccount.isCalendarConfigured()) return serviceAccount;
    return null;
}

export function isCalendarConfigured(): boolean {
    return provider() !== null;
}

export async function fetchBusy(fromMs: number, toMs: number): Promise<BusyInterval[]> {
    const p = provider();
    return p ? p.fetchBusy(fromMs, toMs) : [];
}

export async function createEvent(event: Parameters<typeof appsScript.createEvent>[0]): Promise<string> {
    const p = provider();
    if (!p) throw new Error("Takvim bağlantısı yapılandırılmamış.");
    return p.createEvent(event);
}
