import { NextRequest, NextResponse } from "next/server";
import { officeBlockDate, officeCancel, officeConfirm } from "@/lib/booking";
import { ADMIN_COOKIE, ADMIN_COOKIE_MAX_AGE, adminKey, isAdminKey } from "@/lib/booking/admin";
import { normalizeReference } from "@/lib/booking/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Yönlendirmeler isteğin geldiği alan adına yapılır (önizleme ortamlarında da çalışsın). */
function panelUrl(req: NextRequest, params: Record<string, string> = {}, hash = ""): URL {
    const url = new URL("/randevu/yonetim", req.nextUrl.origin);
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
    url.hash = hash;
    return url;
}

/**
 * Bildirim e-postasındaki bağlantı buraya gelir: anahtar doğruysa yalnızca
 * sunucunun okuyabildiği bir çereze taşınır ve panel anahtarsız adresle açılır.
 * Böylece anahtar tarayıcı geçmişinde veya ziyaret istatistiklerinde kalmaz.
 */
export async function GET(req: NextRequest) {
    const key = req.nextUrl.searchParams.get("k");
    if (!isAdminKey(key)) return NextResponse.redirect(panelUrl(req, { durum: "yetkisiz" }), 303);
    const reference = normalizeReference(req.nextUrl.searchParams.get("ref") ?? "");
    const res = NextResponse.redirect(panelUrl(req, {}, reference ?? ""), 303);
    res.cookies.set(ADMIN_COOKIE, adminKey()!, {
        httpOnly: true,
        secure: req.nextUrl.protocol === "https:",
        sameSite: "lax",
        path: "/",
        maxAge: ADMIN_COOKIE_MAX_AGE,
    });
    return res;
}

/** Paneldeki düğmeler: talebi onayla, randevuyu iptal et, günü kapat / aç, çıkış. */
export async function POST(req: NextRequest) {
    // Çerez SameSite=Lax olsa da başka siteden gönderilen formlar ayrıca reddedilir.
    const origin = req.headers.get("origin");
    if (origin && new URL(origin).host !== req.headers.get("host")) {
        return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    if (!isAdminKey(req.cookies.get(ADMIN_COOKIE)?.value)) {
        return NextResponse.redirect(panelUrl(req, { durum: "yetkisiz" }), 303);
    }

    const form = await req.formData().catch(() => null);
    const action = String(form?.get("islem") ?? "");
    const reference = String(form?.get("ref") ?? "");
    const date = String(form?.get("tarih") ?? "");

    try {
        switch (action) {
            case "onayla":
                await officeConfirm(reference);
                return NextResponse.redirect(panelUrl(req, { durum: "onaylandi" }, normalizeReference(reference) ?? ""), 303);
            case "iptal":
                await officeCancel(reference);
                return NextResponse.redirect(panelUrl(req, { durum: "iptal" }), 303);
            case "gun-kapat":
                return NextResponse.redirect(panelUrl(req, { durum: (await officeBlockDate(date, true)) ? "gun-kapandi" : "hata" }), 303);
            case "gun-ac":
                return NextResponse.redirect(panelUrl(req, { durum: (await officeBlockDate(date, false)) ? "gun-acildi" : "hata" }), 303);
            case "cikis": {
                const res = NextResponse.redirect(panelUrl(req, { durum: "cikis" }), 303);
                res.cookies.delete(ADMIN_COOKIE);
                return res;
            }
            default:
                return NextResponse.redirect(panelUrl(req, { durum: "hata" }), 303);
        }
    } catch (error) {
        console.error("[randevu] yönetim işlemi başarısız", action, error);
        return NextResponse.redirect(panelUrl(req, { durum: "hata" }), 303);
    }
}
