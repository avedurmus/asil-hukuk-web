import { NextRequest } from "next/server";
import { findAppointment } from "@/lib/booking";
import { fail, failFrom, guard, ok, readJson } from "@/lib/booking/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Referans kodu ve telefonla randevuyu getirir. */
export async function POST(req: NextRequest) {
    // Sınır düşük tutulur ki referans kodları deneme yoluyla bulunamasın.
    const blocked = await guard(req, "lookup", 12, 600);
    if (blocked) return blocked;
    const body = await readJson<{ reference: string; phone: string }>(req);
    if (!body) return fail("invalid", "İstek okunamadı.", 400);
    try {
        return ok({ booking: await findAppointment(String(body.reference ?? ""), String(body.phone ?? "")) });
    } catch (error) {
        return failFrom(error, "randevu sorgusu");
    }
}
