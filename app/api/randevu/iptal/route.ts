import { NextRequest } from "next/server";
import { cancelAppointment } from "@/lib/booking";
import { fail, failFrom, guard, ok, readJson } from "@/lib/booking/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Randevuyu iptal eder ve saati yeniden randevuya açar. */
export async function POST(req: NextRequest) {
    const blocked = await guard(req, "lookup", 12, 600);
    if (blocked) return blocked;
    const body = await readJson<{ reference: string; phone: string }>(req);
    if (!body) return fail("invalid", "İstek okunamadı.", 400);
    try {
        return ok({ booking: await cancelAppointment(String(body.reference ?? ""), String(body.phone ?? ""), "form") });
    } catch (error) {
        return failFrom(error, "randevu iptali");
    }
}
