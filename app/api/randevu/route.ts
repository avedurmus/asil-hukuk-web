import { NextRequest } from "next/server";
import { bookAppointment, type BookingInput } from "@/lib/booking";
import { fail, failFrom, guard, ok, readJson } from "@/lib/booking/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Takvimli randevu sayfasından randevu oluşturur. */
export async function POST(req: NextRequest) {
    const blocked = await guard(req, "book", 6, 3600);
    if (blocked) return blocked;

    const body = await readJson<BookingInput & { website: string }>(req);
    if (!body) return fail("invalid", "İstek okunamadı.", 400);
    // Görünmeyen alanı yalnızca otomatik form doldurucular doldurur.
    if (body.website) return fail("invalid", "İstek reddedildi.", 400);

    try {
        const booking = await bookAppointment(
            {
                slot_id: String(body.slot_id ?? ""),
                full_name: String(body.full_name ?? ""),
                phone: String(body.phone ?? ""),
                email: body.email ? String(body.email) : undefined,
                practice_area: String(body.practice_area ?? ""),
                case_summary: String(body.case_summary ?? ""),
                meeting_type: body.meeting_type as BookingInput["meeting_type"],
                kvkk_consent: body.kvkk_consent === true,
            },
            "form",
        );
        return ok({ booking });
    } catch (error) {
        return failFrom(error, "randevu oluşturma");
    }
}
