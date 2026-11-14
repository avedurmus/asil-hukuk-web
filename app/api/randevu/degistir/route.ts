import { NextRequest } from "next/server";
import { rescheduleAppointment } from "@/lib/booking";
import { fail, failFrom, guard, ok, readJson } from "@/lib/booking/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Randevuyu yeni bir saate taşır; referans kodu aynı kalır. */
export async function POST(req: NextRequest) {
    const blocked = await guard(req, "lookup", 12, 600);
    if (blocked) return blocked;
    const body = await readJson<{ reference: string; phone: string; slot_id: string }>(req);
    if (!body) return fail("invalid", "İstek okunamadı.", 400);
    try {
        const booking = await rescheduleAppointment(String(body.reference ?? ""), String(body.phone ?? ""), String(body.slot_id ?? ""), "form");
        return ok({ booking });
    } catch (error) {
        return failFrom(error, "randevu erteleme");
    }
}
