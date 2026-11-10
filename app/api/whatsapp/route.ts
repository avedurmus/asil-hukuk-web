import { waitUntil } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";
import { verifySignature } from "@/lib/whatsapp/api";
import { handleWebhook, type WaWebhookPayload } from "@/lib/whatsapp/bot";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Yanıt hemen döner; mesaj arka planda (waitUntil) işlenir.
export const maxDuration = 120;

/** Meta'nın webhook doğrulaması: hub.verify_token eşleşirse hub.challenge geri döner. */
export function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams;
    const expected = process.env.WHATSAPP_VERIFY_TOKEN;
    if (expected && params.get("hub.mode") === "subscribe" && params.get("hub.verify_token") === expected) {
        return new NextResponse(params.get("hub.challenge") ?? "", { status: 200, headers: { "Content-Type": "text/plain" } });
    }
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
}

export async function POST(req: NextRequest) {
    const rawBody = await req.text();

    // Meta isteği App Secret ile imzalar. İmza göndermeyen iş ortakları (ör.
    // 360dialog) için webhook adresine ?key=<WHATSAPP_VERIFY_TOKEN> eklenir.
    const appSecret = process.env.WHATSAPP_APP_SECRET;
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
    const authorized = appSecret
        ? verifySignature(rawBody, req.headers.get("x-hub-signature-256"), appSecret)
        : Boolean(verifyToken) && req.nextUrl.searchParams.get("key") === verifyToken;
    if (!authorized) {
        console.warn("[whatsapp] imzası doğrulanamayan webhook isteği reddedildi");
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    let payload: WaWebhookPayload;
    try {
        payload = JSON.parse(rawBody);
    } catch {
        return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }

    // Meta birkaç saniye içinde 200 bekler, aksi hâlde aynı olayı tekrar gönderir.
    waitUntil(handleWebhook(payload).catch((error) => console.error("[whatsapp] işlenemedi", error)));
    return NextResponse.json({ ok: true });
}
