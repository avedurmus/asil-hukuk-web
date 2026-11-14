import { NextRequest } from "next/server";
import { getAvailability } from "@/lib/booking";
import { failFrom, guard, ok } from "@/lib/booking/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

/** Randevu penceresindeki tüm boş saatler, günlere ayrılmış (takvimli randevu sayfası için). */
export async function GET(req: NextRequest) {
    const blocked = await guard(req, "slots", 90, 600);
    if (blocked) return blocked;
    try {
        return ok(await getAvailability());
    } catch (error) {
        return failFrom(error, "boş saat sorgusu");
    }
}
