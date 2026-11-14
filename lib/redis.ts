/**
 * Upstash Redis'in REST arayüzü için küçük istemci (ek paket gerekmez).
 * Vercel → Storage → Upstash Redis eklendiğinde ortam değişkenleri otomatik
 * tanımlanır. Randevu kayıtları ve WhatsApp asistanının durumu burada tutulur.
 */

export type RedisValue = string | number | null | RedisValue[];
export type RedisCommand = (string | number)[];

export class RedisError extends Error {}

const TIMEOUT_MS = 8_000;

function credentials(): { url: string; token: string } | null {
    const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export function isRedisConfigured(): boolean {
    return credentials() !== null;
}

async function request<T>(path: string, body: unknown): Promise<T> {
    const creds = credentials();
    if (!creds) throw new RedisError("Upstash Redis tanımlı değil");
    let res: Response;
    try {
        res = await fetch(`${creds.url}${path}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${creds.token}`, "Content-Type": "application/json" },
            body: JSON.stringify(body),
            cache: "no-store",
            signal: AbortSignal.timeout(TIMEOUT_MS),
        });
    } catch (error) {
        throw new RedisError(`Redis'e ulaşılamadı: ${error instanceof Error ? error.message : String(error)}`);
    }
    const data = (await res.json().catch(() => null)) as T | null;
    if (!res.ok || data === null) {
        const detail = (data as { error?: string } | null)?.error ?? `HTTP ${res.status}`;
        throw new RedisError(`Redis hatası: ${detail}`);
    }
    return data;
}

/** Tek bir Redis komutu çalıştırır. */
export async function redis(command: RedisCommand): Promise<RedisValue> {
    const data = await request<{ result?: RedisValue; error?: string }>("", command);
    if (data.error) throw new RedisError(`Redis hatası: ${data.error}`);
    return data.result ?? null;
}

/** Birden çok komutu tek istekte, sırayla çalıştırır (işlem değildir). */
export async function pipeline(commands: RedisCommand[]): Promise<RedisValue[]> {
    if (commands.length === 0) return [];
    const data = await request<{ result?: RedisValue; error?: string }[]>("/pipeline", commands);
    if (!Array.isArray(data)) throw new RedisError("Redis hatası: beklenmeyen yanıt");
    return data.map((item) => {
        if (item.error) throw new RedisError(`Redis hatası: ${item.error}`);
        return item.result ?? null;
    });
}
