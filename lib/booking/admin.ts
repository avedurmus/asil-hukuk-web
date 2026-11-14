import { createHmac, timingSafeEqual } from "crypto";
import { SITE_URL } from "@/lib/seo";
import { isStoreConfigured } from "./store";

/**
 * Büronun randevu yönetim panelinin (/randevu/yonetim) erişim anahtarı.
 *
 * BOOKING_ADMIN_KEY tanımlıysa o kullanılır. Tanımlı değilse anahtar, zaten
 * sunucuda bulunan bir gizli değerden (Redis erişim anahtarı) türetilir; böylece
 * ek kurulum gerekmez. Panel bağlantısı büroya giden her randevu bildirim
 * e-postasında yer alır; bağlantı açıldığında anahtar yalnızca sunucunun
 * okuyabildiği bir çereze taşınır ve adres çubuğundan kaldırılır.
 */

export const ADMIN_COOKIE = "rdv_yonetim";
export const ADMIN_COOKIE_MAX_AGE = 30 * 86_400;

export function adminKey(): string | null {
    if (!isStoreConfigured()) return null;
    const explicit = process.env.BOOKING_ADMIN_KEY?.trim();
    if (explicit && explicit.length >= 16) return explicit;
    const seed = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    return seed ? createHmac("sha256", seed).update("asil-randevu-yonetim-v1").digest("hex").slice(0, 40) : null;
}

export function isAdminKey(candidate: string | null | undefined): boolean {
    const expected = adminKey();
    if (!expected || !candidate) return false;
    const a = Buffer.from(candidate);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
}

/** Bildirim e-postasına eklenen panel bağlantısı; panel kullanılamıyorsa null. */
export function adminLoginUrl(reference?: string): string | null {
    const k = adminKey();
    if (!k) return null;
    const params = new URLSearchParams({ k });
    if (reference) params.set("ref", reference);
    return `${SITE_URL}/api/randevu/yonetim?${params}`;
}
