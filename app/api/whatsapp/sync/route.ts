import { NextRequest, NextResponse } from "next/server";
import { isWhatsAppConfigured, requestAppSync } from "@/lib/whatsapp/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Birlikte kullanım kurulumundan sonraki 24 saat içinde bir kez açılır:
 *   /api/whatsapp/sync?key=<WHATSAPP_VERIFY_TOKEN>&type=contacts
 *   /api/whatsapp/sync?key=<WHATSAPP_VERIFY_TOKEN>&type=history
 * Rehberdeki kişiler ve eski sohbetler webhook'a gelir; asistan bu numaralara
 * hiç yanıt vermez.
 */
export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams;
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
    if (!verifyToken || params.get("key") !== verifyToken) {
        return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    if (!isWhatsAppConfigured()) {
        return NextResponse.json({ error: "WhatsApp ortam değişkenleri tanımlı değil" }, { status: 503 });
    }
    const type = params.get("type") === "history" ? "history" : "contacts";
    try {
        const result = await requestAppSync(type);
        return NextResponse.json({ ok: true, type, result });
    } catch (error) {
        return NextResponse.json({ ok: false, type, error: error instanceof Error ? error.message : String(error) }, { status: 502 });
    }
}
