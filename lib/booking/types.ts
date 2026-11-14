import type { MeetingType } from "@/data/appointmentSettings";

/**
 * Randevu sisteminin tarayıcı ile sunucu arasında paylaşılan türleri. Bu dosya
 * istemci bileşenlerinden de içe aktarılır; sunucuya özgü hiçbir şey içermez.
 */

/**
 * confirmed: randevu avukatın takvimine işlendi ya da büro tarafından onaylandı.
 * requested: talep alındı, büro teyit edecek.
 * cancelled: iptal edildi.
 */
export type BookingStatus = "confirmed" | "requested" | "cancelled";

/** Randevunun müvekkil adayına gösterilen hâli (özet ve telefon gibi ayrıntılar içermez). */
export interface Booking {
    reference: string;
    status: BookingStatus;
    /** Örn. "17 Kasım 2026 Pazartesi, 10:00". */
    slotLabel: string;
    /** Yerel saat ve UTC farkıyla ISO zaman, örn. "2026-11-17T10:00:00+03:00". */
    slotId: string;
    meetingType: MeetingType;
    meetingTypeLabel: string;
    name: string;
    practiceArea: string;
    durationMinutes: number;
    /** Kullanıcı bu randevuyu hâlâ kendisi erteleyebilir / iptal edebilir mi? */
    canChange: boolean;
}

export interface SlotOption {
    /** Randevu oluştururken sunucuya gönderilen kimlik (ISO zaman). */
    id: string;
    /** "10:00" */
    time: string;
    /** "17 Kasım 2026 Pazartesi, 10:00" */
    label: string;
}

export interface DaySlots {
    /** "2026-11-17" */
    date: string;
    /** "Pazartesi" */
    weekday: string;
    /** "17 Kasım" */
    dayLabel: string;
    slots: SlotOption[];
}

export interface Availability {
    /**
     * takvim_bagli: saatler avukatın takvimine göre süzüldü, randevu anında kesinleşir.
     * talep: seçilen saat büro tarafından teyit edilir.
     */
    mode: "takvim_bagli" | "talep";
    days: DaySlots[];
    durationMinutes: number;
    /** Kullanıcıya gösterilecek randevu penceresi açıklaması. */
    window: string;
}

/** Sunucunun randevu uç noktalarından döndürdüğü hata gövdesi. */
export interface BookingApiError {
    error: string;
    message: string;
}

/** "AH-7K2M9Q" biçimine getirir; biçim uymuyorsa null. */
export function normalizeReference(raw: string): string | null {
    const compact = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
    const match = /^AH([A-Z0-9]{6})$/.exec(compact);
    return match ? `AH-${match[1]}` : null;
}
