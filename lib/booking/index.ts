import { randomBytes } from "crypto";
import { appointmentSettings as cfg, meetingTypeLabels, type MeetingType } from "@/data/appointmentSettings";
import { siteContent } from "@/data/siteContent";
import { createEvent, fetchBusy, isCalendarConfigured } from "./googleCalendar";
import { formatLocal, generateSlots, parseDateKey, resolveSlotId, type BusyInterval, type Slot } from "./slots";

/** Asistanın tek seferde sunacağı en fazla saat sayısı. */
const MAX_SLOTS_RETURNED = 12;

export type PartOfDay = "sabah" | "ogleden_sonra" | "farketmez";

export interface Booking {
    reference: string;
    status: "confirmed" | "requested";
    slotLabel: string;
    slotId: string;
    meetingType: MeetingType;
    meetingTypeLabel: string;
    name: string;
    practiceArea: string;
}

export class BookingError extends Error {}

/** Takvim bağlıysa doluluk bilgisini getirir; bağlı değilse boş liste döner. */
async function busyBetween(fromMs: number, toMs: number): Promise<BusyInterval[]> {
    return isCalendarConfigured() ? fetchBusy(fromMs, toMs) : [];
}

export async function listAvailableSlots(input: {
    start_date?: string;
    end_date?: string;
    part_of_day?: PartOfDay;
}) {
    const nowMs = Date.now();
    const fromMs = input.start_date ? parseDateKey(input.start_date) : nowMs;
    const toMs = input.end_date ? parseDateKey(input.end_date) : undefined;
    if (fromMs === null || toMs === null) {
        throw new BookingError("Tarihler YYYY-MM-DD biçiminde olmalıdır.");
    }

    const windowEnd = nowMs + (cfg.horizonDays + 2) * 86_400_000;
    const busy = await busyBetween(nowMs, windowEnd);
    let slots = generateSlots({ nowMs, fromMs, toMs, busy });

    if (input.part_of_day === "sabah") slots = slots.filter((s) => Number(s.id.slice(11, 13)) < 13);
    if (input.part_of_day === "ogleden_sonra") slots = slots.filter((s) => Number(s.id.slice(11, 13)) >= 13);

    return {
        mode: isCalendarConfigured() ? "takvim_bagli" : "talep",
        slots: slots.slice(0, MAX_SLOTS_RETURNED).map((s) => ({ slot_id: s.id, label: s.label })),
        more_available: slots.length > MAX_SLOTS_RETURNED,
        booking_window: `Randevular en az ${cfg.minNoticeHours} saat sonrası ve en fazla ${cfg.horizonDays} gün ilerisi için verilebilir.`,
        note:
            slots.length === 0
                ? "Bu aralıkta uygun saat yok. Farklı bir tarih aralığı deneyin veya kullanıcıyı telefona yönlendirin."
                : undefined,
    };
}

export interface BookingInput {
    slot_id: string;
    full_name: string;
    phone: string;
    email?: string;
    practice_area: string;
    case_summary: string;
    meeting_type: MeetingType;
    kvkk_consent: boolean;
}

function normalizePhone(raw: string): string | null {
    const digits = raw.replace(/[^\d+]/g, "");
    const bare = digits.replace(/^\+/, "");
    if (bare.length < 10 || bare.length > 15) return null;
    return digits;
}

function validate(input: BookingInput) {
    if (input.kvkk_consent !== true) {
        throw new BookingError("Kullanıcının KVKK onayı alınmadan randevu oluşturulamaz.");
    }
    const name = input.full_name?.trim() ?? "";
    if (name.length < 3 || name.length > 80) throw new BookingError("Ad soyad eksik ya da geçersiz.");
    const phone = normalizePhone(input.phone ?? "");
    if (!phone) throw new BookingError("Telefon numarası geçersiz. 05XX XXX XX XX biçiminde isteyin.");
    const email = input.email?.trim() || undefined;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new BookingError("E-posta adresi geçersiz.");
    if (!cfg.meetingTypes.includes(input.meeting_type)) throw new BookingError("Görüşme şekli geçersiz.");
    const summary = (input.case_summary ?? "").trim().slice(0, 1200);
    if (summary.length < 5) throw new BookingError("Konunun kısa bir özeti gerekli.");
    const area = (input.practice_area ?? "").trim().slice(0, 80) || "Belirtilmedi";
    return { name, phone, email, summary, area, meetingType: input.meeting_type };
}

/** Avukata e-posta bildirimi (Formspree). Başarılıysa true döner. */
async function notifyOffice(fields: Record<string, string>): Promise<boolean> {
    const formId = process.env.FORMSPREE_FORM_ID || "mblnkeke";
    try {
        const res = await fetch(`https://formspree.io/f/${formId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(fields),
            cache: "no-store",
        });
        return res.ok;
    } catch {
        return false;
    }
}

export async function bookAppointment(input: BookingInput): Promise<Booking> {
    const data = validate(input);
    const nowMs = Date.now();

    // Saat programa uyuyor mu ve (takvim bağlıysa) hâlâ boş mu? Aynı anda
    // gelen iki talebin çakışmasını önlemek için kayıttan hemen önce yeniden bakılır.
    const requested = Date.parse(input.slot_id);
    const busy = Number.isNaN(requested) ? [] : await busyBetween(requested - 3_600_000, requested + 3_600_000);
    const slot: Slot | null = resolveSlotId(input.slot_id, nowMs, busy);
    if (!slot) {
        throw new BookingError("Seçilen saat artık uygun değil. list_available_slots ile güncel saatleri alıp kullanıcıya yeniden sunun.");
    }

    const reference = `AH-${randomBytes(3).toString("hex").toUpperCase()}`;
    const meetingTypeLabel = meetingTypeLabels[data.meetingType];
    const calendarMode = isCalendarConfigured();

    const details = [
        `Referans: ${reference}`,
        `Ad Soyad: ${data.name}`,
        `Telefon: ${data.phone}`,
        `E-posta: ${data.email ?? "-"}`,
        `Konu: ${data.area}`,
        `Görüşme şekli: ${meetingTypeLabel}`,
        `Özet: ${data.summary}`,
        "",
        "Web sitesindeki sohbet asistanı üzerinden oluşturuldu. KVKK onayı alındı.",
    ].join("\n");

    if (calendarMode) {
        await createEvent({
            summary: `Ön görüşme: ${data.name} (${meetingTypeLabel})`,
            description: details,
            startMs: slot.startMs,
            endMs: slot.endMs,
            location: data.meetingType === "buro" ? siteContent.contact.address : undefined,
        });
    }

    const notified = await notifyOffice({
        _subject: `${calendarMode ? "Yeni randevu" : "Randevu talebi"}: ${slot.label} – ${data.name}`,
        name: data.name,
        phone: data.phone,
        email: data.email ?? "",
        topic: data.area,
        message: data.summary,
        appointment: `${formatLocal(slot.startMs)} (${cfg.durationMinutes} dk)`,
        preferred_contact: meetingTypeLabel,
        reference,
        source: "Sohbet asistanı",
        kvkk_onay: "Onaylandı",
    });

    // Takvim bağlı değilken bildirim de gitmediyse talep hiçbir yere ulaşmamıştır.
    if (!calendarMode && !notified) {
        throw new BookingError(
            `Randevu sistemi şu an talebi iletemedi. Kullanıcıdan ${siteContent.contact.phone} numarasını aramasını veya WhatsApp'tan yazmasını isteyin.`,
        );
    }

    return {
        reference,
        status: calendarMode ? "confirmed" : "requested",
        slotLabel: slot.label,
        slotId: slot.id,
        meetingType: data.meetingType,
        meetingTypeLabel,
        name: data.name,
        practiceArea: data.area,
    };
}
