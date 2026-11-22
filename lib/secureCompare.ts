import { createHash, timingSafeEqual } from "crypto";

/**
 * Gizli değerleri (erişim anahtarları, doğrulama jetonları) sabit sürede
 * karşılaştırır; yanıt süresinden anahtarın tahmin edilmesini önler.
 * Uzunluk farkı da sızmasın diye iki taraf önce özetlenir.
 */
export function safeEqual(candidate: string | null | undefined, expected: string | null | undefined): boolean {
    if (!candidate || !expected) return false;
    const a = createHash("sha256").update(candidate).digest();
    const b = createHash("sha256").update(expected).digest();
    return timingSafeEqual(a, b);
}
