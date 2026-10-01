import type { BusyInterval } from "./slots";

/**
 * Avukatın kendi Google hesabında çalışan Apps Script web uygulaması üzerinden
 * takvim bağlantısı. Google Cloud projesi veya takvim paylaşımı gerektirmez;
 * kurulum için bkz. docs/google-apps-script/Code.gs ve docs/sohbet-asistani.md.
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

async function call<T>(payload: Record<string, unknown>): Promise<T> {
    const cfg = config()!;
    // Apps Script POST isteğini googleusercontent.com adresine yönlendirir;
    // yanıt bu yönlendirme izlenerek alınır.
    const res = await fetch(cfg.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, secret: cfg.secret }),
        redirect: "follow",
        cache: "no-store",
        signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) throw new Error(`Apps Script isteği başarısız: HTTP ${res.status}`);
    const text = await res.text();
    let data: (T & { error?: string }) | null = null;
    try {
        data = JSON.parse(text);
    } catch {
        throw new Error("Apps Script JSON yerine sayfa döndürdü; web uygulaması 'Herkes' erişimine açık olarak dağıtıldı mı?");
    }
    if (!data) throw new Error("Apps Script boş yanıt döndürdü.");
    if (data.error === "slot_busy") throw new SlotTakenError("Seçilen saat takvimde dolu.");
    if (data.error) throw new Error(`Apps Script hatası: ${data.error}`);
    return data;
}

export async function fetchBusy(fromMs: number, toMs: number): Promise<BusyInterval[]> {
    const data = await call<{ busy: { start: string; end: string }[] }>({
        action: "busy",
        timeMin: new Date(fromMs).toISOString(),
        timeMax: new Date(toMs).toISOString(),
    });
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
