import { NextRequest, NextResponse } from "next/server";
import { getNumberStatus, isWhatsAppConfigured, registerNumber, requestAppSync, subscribeApp } from "@/lib/whatsapp/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Kurulum adımlarını tarayıcıdan yapabilmek için korumalı uç nokta. Her adres
 * WHATSAPP_VERIFY_TOKEN ile korunur:
 *
 *   /api/whatsapp/setup?key=…&action=status                 numaranın Meta'daki durumu
 *   /api/whatsapp/setup?key=…&action=register&pin=123456    numarayı Cloud API'ye kaydet
 *   /api/whatsapp/setup?key=…&action=subscribe&waba=…       uygulamayı WhatsApp hesabına abone et
 *   /api/whatsapp/setup?key=…&action=sync-contacts          (yalnızca birlikte kullanım) rehber eşitlemesi
 *   /api/whatsapp/setup?key=…&action=sync-history           (yalnızca birlikte kullanım) geçmiş eşitlemesi
 */
export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams;
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
    if (!verifyToken || params.get("key") !== verifyToken) {
        return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    if (!isWhatsAppConfigured()) {
        return NextResponse.json({ error: "WHATSAPP_ACCESS_TOKEN / WHATSAPP_PHONE_NUMBER_ID tanımlı değil" }, { status: 503 });
    }

    const action = params.get("action") ?? "status";
    try {
        let result: unknown;
        switch (action) {
            case "status":
                result = await getNumberStatus();
                break;
            case "register": {
                const pin = params.get("pin") ?? "";
                if (!/^\d{6}$/.test(pin)) return NextResponse.json({ error: "pin 6 haneli olmalı" }, { status: 400 });
                result = await registerNumber(pin);
                break;
            }
            case "subscribe": {
                const waba = params.get("waba") || process.env.WHATSAPP_WABA_ID || "";
                if (!/^\d+$/.test(waba)) return NextResponse.json({ error: "waba (WhatsApp Business hesap kimliği) gerekli" }, { status: 400 });
                result = await subscribeApp(waba);
                break;
            }
            case "sync-contacts":
                result = await requestAppSync("contacts");
                break;
            case "sync-history":
                result = await requestAppSync("history");
                break;
            default:
                return NextResponse.json({ error: "bilinmeyen action" }, { status: 400 });
        }
        return NextResponse.json({ ok: true, action, result });
    } catch (error) {
        return NextResponse.json({ ok: false, action, error: error instanceof Error ? error.message : String(error) }, { status: 502 });
    }
}
