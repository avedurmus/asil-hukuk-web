import { NextRequest, NextResponse } from "next/server";
import { siteContent } from "@/data/siteContent";
import { limitHit } from "@/lib/rateLimit";
import { BookingError, type BookingErrorCode } from "./index";
import type { BookingApiError } from "./types";

/** Randevu uç noktalarının ortak yardımcıları. */

const PHONE = siteContent.contact.phone;

const STATUS: Record<BookingErrorCode, number> = {
    invalid: 400,
    slot_taken: 409,
    not_found: 404,
    too_late: 409,
    limit: 429,
    unavailable: 503,
};

export function clientIp(req: NextRequest): string {
    return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.ip || "unknown";
}

export function fail(error: string, message: string, status: number) {
    return NextResponse.json({ error, message } satisfies BookingApiError, { status, headers: { "Cache-Control": "no-store" } });
}

/** Hataları kullanıcıya gösterilebilir bir JSON yanıtına çevirir. */
export function failFrom(error: unknown, action: string) {
    if (error instanceof BookingError) return fail(error.code, error.userMessage, STATUS[error.code]);
    console.error(`[randevu] ${action} sırasında beklenmeyen hata`, error);
    return fail("unavailable", `Randevu sistemi şu an yanıt veremiyor. Lütfen ${PHONE} numarasından büromuza ulaşın.`, 503);
}

/**
 * Tarayıcıdan gelen isteklerin ortak denetimi: başka siteden gönderilen
 * istekler reddedilir ve IP başına hız sınırı uygulanır. Sorun yoksa null döner.
 */
export async function guard(req: NextRequest, bucket: string, limit: number, windowSeconds: number) {
    const origin = req.headers.get("origin");
    if (origin) {
        let host: string | null = null;
        try {
            host = new URL(origin).host;
        } catch {
            /* geçersiz origin başlığı */
        }
        if (host !== req.headers.get("host")) return fail("forbidden", "İstek reddedildi.", 403);
    }
    if (await limitHit(`${bucket}:${clientIp(req)}`, limit, windowSeconds)) {
        return fail("limit", `Kısa sürede çok fazla istek gönderildi. Biraz sonra tekrar deneyin veya ${PHONE} numarasından bize ulaşın.`, 429);
    }
    return null;
}

/** JSON gövdesini okur; okunamıyorsa null döner. */
export async function readJson<T>(req: NextRequest): Promise<Partial<T> | null> {
    try {
        const body = await req.json();
        return body && typeof body === "object" ? (body as Partial<T>) : null;
    } catch {
        return null;
    }
}

export function ok<T>(data: T) {
    return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}
