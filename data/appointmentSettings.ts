/**
 * Sohbet asistanının randevu verirken uyduğu çalışma programı.
 *
 * Asistan yalnızca burada tanımlı saatleri önerir. Google Takvim bağlantısı
 * yapılandırılmışsa (bkz. docs/sohbet-asistani.md) avukatın takvimindeki dolu
 * saatler ayrıca elenir ve onaylanan randevu takvime doğrudan işlenir.
 *
 * Saatler İstanbul saatidir (UTC+3; Türkiye 2016'dan beri yaz saati
 * uygulamadığı için sabit fark kullanılır).
 */

export type MeetingType = "buro" | "online" | "telefon";

export const meetingTypeLabels: Record<MeetingType, string> = {
    buro: "Büroda yüz yüze görüşme",
    online: "Online (görüntülü) görüşme",
    telefon: "Telefonla görüşme",
};

export const appointmentSettings = {
    timeZone: "Europe/Istanbul",
    utcOffsetMinutes: 180,

    /** Ön görüşmenin takvimde kapladığı süre (dakika). */
    durationMinutes: 45,

    /**
     * Haftanın günlerine göre randevu başlangıç saatleri (0 = Pazar, 6 = Cumartesi).
     * Sabahlar çoğunlukla duruşmalara ayrıldığından ilk görüşme 10:00'dadır.
     * Boş dizi o gün randevu verilmeyeceği anlamına gelir.
     */
    weeklySchedule: {
        0: [],
        1: ["10:00", "11:00", "13:30", "14:30", "15:30", "16:30"],
        2: ["10:00", "11:00", "13:30", "14:30", "15:30", "16:30"],
        3: ["10:00", "11:00", "13:30", "14:30", "15:30", "16:30"],
        4: ["10:00", "11:00", "13:30", "14:30", "15:30", "16:30"],
        5: ["10:00", "11:00", "13:30", "14:30", "15:30", "16:30"],
        6: [],
    } as Record<number, string[]>,

    /** Şu andan itibaren en az kaç saat sonrasına randevu verilebilir. */
    minNoticeHours: 3,

    /** Kaç gün ileriye kadar randevu verilebilir. */
    horizonDays: 21,

    /**
     * Resmî tatiller (YYYY-MM-DD). Dinî bayram tarihleri Diyanet takvimine göre
     * her yıl kontrol edilip güncellenmelidir.
     */
    holidays: [
        // 2026
        "2026-01-01", "2026-03-20", "2026-03-21", "2026-03-22", "2026-04-23",
        "2026-05-01", "2026-05-19", "2026-05-27", "2026-05-28", "2026-05-29",
        "2026-05-30", "2026-07-15", "2026-08-30", "2026-10-29",
        // 2027
        "2027-01-01", "2027-03-09", "2027-03-10", "2027-03-11", "2027-04-23",
        "2027-05-01", "2027-05-16", "2027-05-17", "2027-05-18", "2027-05-19",
        "2027-07-15", "2027-08-30", "2027-10-29",
    ],

    /** Yarım gün çalışılan arife günleri; yalnızca öğleden önceki saatler verilir. */
    halfDays: ["2026-03-19", "2026-05-26", "2026-10-28", "2027-03-08", "2027-05-15", "2027-10-28"],

    /** İzin, seyahat vb. nedeniyle tamamen kapalı günler (YYYY-MM-DD). */
    blockedDates: [] as string[],

    meetingTypes: ["buro", "online", "telefon"] as MeetingType[],
};
