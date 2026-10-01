import { createSign } from "crypto";
import type { BusyInterval } from "./slots";

/**
 * Avukatın Google Takvimi ile isteğe bağlı entegrasyon (hizmet hesabı ile).
 *
 * Gerekli ortam değişkenleri:
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL  hizmet hesabının e-postası
 *   GOOGLE_PRIVATE_KEY            hizmet hesabının özel anahtarı (\n kaçışlı olabilir)
 *   GOOGLE_CALENDAR_ID            randevuların yazılacağı takvim (örn. emre@asilhukuk.net)
 *
 * Takvim, hizmet hesabıyla "Etkinliklerde değişiklik yapma" yetkisiyle
 * paylaşılmalıdır. Ek kütüphane gerektirmemek için JWT burada imzalanır.
 */

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_BASE = "https://www.googleapis.com/calendar/v3";
const SCOPE = "https://www.googleapis.com/auth/calendar";

function config() {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    return email && key && calendarId ? { email, key, calendarId } : null;
}

export function isCalendarConfigured(): boolean {
    return config() !== null;
}

let cachedToken: { value: string; expiresAt: number } | null = null;

const base64url = (input: string | Buffer) => Buffer.from(input).toString("base64url");

async function accessToken(): Promise<string> {
    const cfg = config();
    if (!cfg) throw new Error("Google Takvim yapılandırılmamış.");
    if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;

    const now = Math.floor(Date.now() / 1000);
    const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
    const claims = base64url(JSON.stringify({ iss: cfg.email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }));
    const signature = createSign("RSA-SHA256").update(`${header}.${claims}`).sign(cfg.key);
    const assertion = `${header}.${claims}.${base64url(signature)}`;

    const res = await fetch(TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
        cache: "no-store",
    });
    if (!res.ok) throw new Error(`Google kimlik doğrulaması başarısız: HTTP ${res.status}`);
    const data = (await res.json()) as { access_token: string; expires_in: number };
    cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
    return data.access_token;
}

async function calendarFetch<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${await accessToken()}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
    });
    if (!res.ok) throw new Error(`Google Takvim isteği başarısız: HTTP ${res.status}`);
    return (await res.json()) as T;
}

/** Verilen aralıkta takvimdeki dolu zaman dilimlerini döner. */
export async function fetchBusy(fromMs: number, toMs: number): Promise<BusyInterval[]> {
    const cfg = config()!;
    const data = await calendarFetch<{
        calendars: Record<string, { busy?: { start: string; end: string }[]; errors?: unknown[] }>;
    }>("/freeBusy", {
        timeMin: new Date(fromMs).toISOString(),
        timeMax: new Date(toMs).toISOString(),
        items: [{ id: cfg.calendarId }],
    });
    const entry = data.calendars?.[cfg.calendarId];
    if (!entry || entry.errors?.length) throw new Error("Takvim doluluk bilgisi okunamadı.");
    return (entry.busy ?? []).map((b) => ({ startMs: Date.parse(b.start), endMs: Date.parse(b.end) }));
}

export async function createEvent(event: {
    summary: string;
    description: string;
    startMs: number;
    endMs: number;
    location?: string;
}): Promise<string> {
    const cfg = config()!;
    const data = await calendarFetch<{ id: string }>(`/calendars/${encodeURIComponent(cfg.calendarId)}/events`, {
        summary: event.summary,
        description: event.description,
        location: event.location,
        start: { dateTime: new Date(event.startMs).toISOString(), timeZone: "Europe/Istanbul" },
        end: { dateTime: new Date(event.endMs).toISOString(), timeZone: "Europe/Istanbul" },
        reminders: { useDefault: true },
    });
    return data.id;
}
