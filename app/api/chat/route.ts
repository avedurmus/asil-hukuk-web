import { NextRequest, NextResponse } from "next/server";
import { siteContent } from "@/data/siteContent";
import { FALLBACK_REPLY, isAssistantConfigured, runAssistant, sanitizeHistory } from "@/lib/chatbot/agent";
import { clientIp } from "@/lib/booking/http";
import { limitHit } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PHONE = siteContent.contact.phone;

function hostOf(origin: string): string | null {
    try {
        return new URL(origin).host;
    } catch {
        return null;
    }
}

export async function POST(req: NextRequest) {
    if (!isAssistantConfigured()) {
        return NextResponse.json({ error: "unavailable", reply: FALLBACK_REPLY }, { status: 503 });
    }

    const origin = req.headers.get("origin");
    if (origin && hostOf(origin) !== req.headers.get("host")) {
        return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    // Her mesaj ücretli bir yapay zekâ çağrısıdır. Sayaçlar Redis'te tutulur ki
    // sınır tüm sunucu örneklerinde ortak olsun (bellekteki sayaç örnek başınaydı).
    const ip = clientIp(req);
    if ((await limitHit(`chat:${ip}`, 40, 600)) || (await limitHit(`chat-day:${ip}`, 200, 86_400))) {
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
