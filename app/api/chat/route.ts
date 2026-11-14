import { NextRequest, NextResponse } from "next/server";
import { siteContent } from "@/data/siteContent";
import { FALLBACK_REPLY, isAssistantConfigured, rateLimited, runAssistant, sanitizeHistory } from "@/lib/chatbot/agent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PHONE = siteContent.contact.phone;

export async function POST(req: NextRequest) {
    if (!isAssistantConfigured()) {
        return NextResponse.json({ error: "unavailable", reply: FALLBACK_REPLY }, { status: 503 });
    }

    const origin = req.headers.get("origin");
    if (origin && new URL(origin).host !== req.headers.get("host")) {
        return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.ip || "unknown";
    if (rateLimited(`chat:${ip}`, 40, 10 * 60_000)) {
        return NextResponse.json(
            { error: "rate_limited", reply: `Kısa sürede çok fazla mesaj gönderildi. Biraz sonra tekrar deneyebilir veya ${PHONE} numarasından bize ulaşabilirsiniz.` },
            { status: 429 },
        );
    }

    let body: { messages?: unknown };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }
    const history = sanitizeHistory(body.messages);
    if (!history) return NextResponse.json({ error: "bad_request" }, { status: 400 });

    const result = await runAssistant({ channel: "web", history, limiterKey: ip });
    if (!result.ok) return NextResponse.json({ error: "upstream", reply: result.reply }, { status: 502 });
    return NextResponse.json({ reply: result.reply, booking: result.booking, bookingEvent: result.bookingEvent, slots: result.slots });
}
