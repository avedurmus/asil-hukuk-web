import { isRedisConfigured, pipeline } from "@/lib/redis";

/**
 * Basit kötüye kullanım koruması.
 *
 * Bellekteki sayaçlar sunucusuz ortamda örnekler arasında paylaşılmaz; amaç
 * kaba otomasyonları yavaşlatmaktır. Randevu gibi önemli işlemler için
 * `limitHit` Redis varsa ortak sayaç kullanır.
 */

const hits = new Map<string, number[]>();

export function recentHits(key: string, windowMs: number): number[] {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    hits.set(key, recent);
    if (hits.size > 5000) hits.clear();
    return recent;
}

export function rateLimited(key: string, limit: number, windowMs: number): boolean {
    const recent = recentHits(key, windowMs);
    if (recent.length >= limit) return true;
    recent.push(Date.now());
    return false;
}

/**
 * İsteği sayar ve sınır aşıldıysa true döner. Redis tanımlıysa sayaç tüm
 * sunucu örnekleri arasında ortaktır; Redis'e ulaşılamazsa bellekteki sayaca
 * düşülür (koruma hiçbir zaman isteği engelleyen bir hataya dönüşmez).
 */
export async function limitHit(key: string, limit: number, windowSeconds: number): Promise<boolean> {
    if (isRedisConfigured()) {
        try {
            const name = `rl:${key}`;
            const [count] = await pipeline([
                ["INCR", name],
                ["EXPIRE", name, windowSeconds, "NX"],
            ]);
            return Number(count) > limit;
        } catch {
            /* bellekteki sayaca düş */
        }
    }
    return rateLimited(key, limit, windowSeconds * 1000);
}
