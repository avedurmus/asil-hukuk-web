import type { BusyInterval } from "./slots";

/**
 * Avukatın kendi Google hesabında çalışan Apps Script web uygulaması üzerinden
 * Google Takvim ve Gmail bağlantısı. Google Cloud projesi veya takvim paylaşımı gerektirmez;
 * kurulum için bkz. docs/google-apps-script/Code.gs ve docs/randevu-sistemi.md.
 *
 * Gerekli ortam değişkenleri:
 *   APPS_SCRIPT_URL     web uygulamasının adresi (https://script.google.com/macros/s/.../exec)
 *   APPS_SCRIPT_SECRET  Code.gs içindeki SECRET ile aynı değer
 *
 * Hangi takvimlerin doluluğa bakılacağı ve randevunun hangi takvime yazılacağı
 * Apps Script kodunun içinde tanımlıdır.
 */

export class SlotTakenError extends Error {}

function config() {
    const url = process.env.APPS_SCRIPT_URL?.trim();
    const secret = process.env.APPS_SCRIPT_SECRET?.trim();
    return url && secret ? { url, secret } : null;
}

export function isCalendarConfigured(): boolean {
    return config() !== null;
}

/** HTTP durumuna göre, Vercel kayıtlarında sorunu doğrudan gösteren açıklama. */
function describeHttpError(status: number): string {
    if (status === 404) {
        return "Apps Script web uygulaması bulunamadı (HTTP 404). Dağıtım silinmiş ya da arşivlenmiş olabilir veya APPS_SCRIPT_URL hatalı; yeni bir dağıtım yapıp adresi güncelleyin (docs/randevu-sistemi.md → Takvim bağlantısını onarmak).";
    }
    if (status === 401 || status === 403) {
        return `Apps Script erişimi reddetti (HTTP ${status}). Web uygulaması "Erişimi olanlar: Herkes" olarak dağıtılmalı.`;
    }
    return `Apps Script isteği başarısız: HTTP ${status}`;
}

async function call<T>(payload: Record<string, unknown>, timeoutMs = 12_000): Promise<T> {
    const cfg = config()!;
    // Apps Script POST isteğini googleusercontent.com adresine yönlendirir;
    // yanıt bu yönlendirme izlenerek alınır.
    const res = await fetch(cfg.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, secret: cfg.secret }),
        redirect: "follow",
        cache: "no-store",
        signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) throw new Error(describeHttpError(res.status));
    const text = await res.text();
    let data: (T & { error?: string }) | null = null;
    try {
        data = JSON.parse(text);
    } catch {
        throw new Error("Apps Script JSON yerine sayfa döndürdü; web uygulaması 'Herkes' erişimine açık olarak dağıtıldı mı?");
    }
    if (!data) throw new Error("Apps Script boş yanıt döndürdü.");
    if (data.error === "slot_busy") throw new SlotTakenError("Seçilen saat takvimde dolu.");
    if (data.error === "unauthorized") throw new Error("Apps Script gizli anahtarı uyuşmuyor: Code.gs içindeki SECRET ile APPS_SCRIPT_SECRET aynı olmalı.");
    if (data.error) throw new Error(`Apps Script hatası: ${data.error}`);
    return data;
}

export async function fetchBusy(fromMs: number, toMs: number): Promise<BusyInterval[]> {
    const data = await call<{ busy: { start: string; end: string }[] }>(
        { action: "busy", timeMin: new Date(fromMs).toISOString(), timeMax: new Date(toMs).toISOString() },
        8_000,
    );
    return data.busy.map((b) => ({ startMs: Date.parse(b.start), endMs: Date.parse(b.end) }));
}

export async function createEvent(event: {
    summary: string;
    description: string;
    startMs: number;
    endMs: number;
    location?: string;
}): Promise<string> {
    const data = await call<{ id: string }>({
        action: "create",
        event: {
            summary: event.summary,
            description: event.description,
            location: event.location ?? "",
            start: new Date(event.startMs).toISOString(),
            end: new Date(event.endMs).toISOString(),
        },
    });
    return data.id;
}

/** Etkinliği takvimden siler (iptal ve erteleme). Köprünün güncel sürümünü gerektirir. */
export async function deleteEvent(id: string): Promise<void> {
    await call<{ deleted: boolean }>({ action: "delete", id });
}

/** Köprünün "notify" eylemini bilmeyen eski sürümü yayında ise fırlatılır. */
export class NotifyUnsupportedError extends Error {}

/**
 * Bildirimi avukatın kendi Gmail hesabından kendisine gönderir. Köprünün
 * 2. sürümünü gerektirir; eski sürümde NotifyUnsupportedError fırlatır.
 */
export async function sendMail(mail: { subject: string; rows: [string, string][]; replyTo?: string }): Promise<void> {
    try {
        await call<{ sent: boolean }>({ action: "notify", ...mail });
    } catch (error) {
        if (error instanceof Error && error.message.includes("unknown_action")) {
            throw new NotifyUnsupportedError("Apps Script köprüsü eski sürümde; Gmail bildirimi için Code.gs güncellenmeli.");
        }
        throw error;
    }
}
