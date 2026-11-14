import { siteContent } from "@/data/siteContent";
import type { Booking } from "./types";

/** Randevuyu kullanıcının takvimine eklemek için .ics dosyası bağlantısı üretir (tarayıcıda çalışır). */
export function icsHref(booking: Booking): string {
    const start = new Date(booking.slotId);
    const end = new Date(start.getTime() + booking.durationMinutes * 60_000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const escape = (text: string) => text.replace(/\\/g, "\\\\").replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
    const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Asil Hukuk//Randevu//TR",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `UID:${booking.reference}@asilhukuk.net`,
        `DTSTAMP:${fmt(new Date())}`,
        `DTSTART:${fmt(start)}`,
        `DTEND:${fmt(end)}`,
        `SUMMARY:${escape(`Asil Hukuk – Ön görüşme (${booking.meetingTypeLabel})`)}`,
        ...(booking.meetingType === "buro" ? [`LOCATION:${escape(siteContent.contact.address)}`] : []),
        `DESCRIPTION:${escape(`Referans: ${booking.reference}. Değişiklik için: asilhukuk.net/randevu/sorgula veya ${siteContent.contact.phone}`)}`,
        "BEGIN:VALARM",
        "ACTION:DISPLAY",
        "DESCRIPTION:Asil Hukuk ön görüşme",
        "TRIGGER:-PT1H",
        "END:VALARM",
        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

export function icsFileName(booking: Booking): string {
    return `asil-hukuk-randevu-${booking.reference}.ics`;
}

/** Randevu sonrası sorgulama sayfasının telefonu yeniden sormaması için (yalnızca bu sekmede saklanır). */
const LAST_BOOKING_KEY = "asil-randevu-son";

export function rememberBooking(reference: string, phone: string) {
    try {
        sessionStorage.setItem(LAST_BOOKING_KEY, JSON.stringify({ reference, phone }));
    } catch {
        /* gizli sekme vb. */
    }
}

export function recallBooking(): { reference: string; phone: string } | null {
    try {
        const parsed = JSON.parse(sessionStorage.getItem(LAST_BOOKING_KEY) ?? "null");
        return parsed && typeof parsed.reference === "string" && typeof parsed.phone === "string" ? parsed : null;
    } catch {
        return null;
    }
}
