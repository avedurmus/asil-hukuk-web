import { randomBytes } from "crypto";
import { appointmentSettings as cfg, meetingTypeLabels, type MeetingType } from "@/data/appointmentSettings";
import { siteContent } from "@/data/siteContent";
import { SITE_URL } from "@/lib/seo";
import { adminLoginUrl } from "./admin";
import { calendarHealth, createEvent, isCalendarConfigured, SlotTakenError, tryDeleteEvent, tryFetchBusy, trySendGmail, type CalendarHealth } from "./calendar";
import { formatLocal, generateSlots, groupByDay, parseDateKey, resolveSlotId, slotAt, type BusyInterval, type Slot } from "./slots";
import * as store from "./store";
import type { BookingChannel, BookingRecord } from "./store";
import { normalizeReference, type Availability, type Booking, type DaySlots } from "./types";

export type { Booking } from "./types";
export type { BookingChannel, BookingRecord } from "./store";

/**
 * Randevu sisteminin çekirdeği. Takvimli randevu sayfası, sitedeki sohbet
 * asistanı ve WhatsApp asistanı aynı işlevleri kullanır.
 *
 * Tasarım ilkesi: hiçbir dış bağlantı tek başına sistemi durduramaz.
 * - Google Takvim'e ulaşılamazsa saatler çalışma programından sunulur ve
 *   randevu "talep" olarak kaydedilir (büro teyit eder).
 * - Kayıt deposuna (Redis) ulaşılamazsa randevu yine alınır; yalnızca
 *   çevrimiçi sorgulama / erteleme / iptal kullanılamaz.
 * - Bildirimler Gmail ile (Google köprüsü üzerinden) gönderilir; köprüye
 *   ulaşılamazsa Formspree e-postası yedek yoldur.
 * - Bir randevunun başarılı sayılması için büronun mutlaka haberdar olması
 *   gerekir: ya takvime yazılmış ya da e-posta bildirimi gitmiş olmalıdır.
 */

/** Asistanın tek seferde sunacağı en fazla saat sayısı. */
const MAX_SLOTS_RETURNED = 12;
const HOUR_MS = 3_600_000;
const DAY_MS = 86_400_000;
const PHONE = siteContent.contact.phone;

export type PartOfDay = "sabah" | "ogleden_sonra" | "farketmez";

export type BookingErrorCode = "invalid" | "slot_taken" | "not_found" | "too_late" | "limit" | "unavailable";

/**
 * Kullanıcıya gösterilebilecek bir randevu hatası. `userMessage` doğrudan
 * arayüzde gösterilir; `message` ayrıca asistana yönelik ipucunu içerir.
 */
export class BookingError extends Error {
    constructor(
        public readonly code: BookingErrorCode,
        public readonly userMessage: string,
        assistantHint?: string,
    ) {
        super(assistantHint ? `${userMessage} ${assistantHint}` : userMessage);
    }
}

const slotTaken = () =>
    new BookingError(
        "slot_taken",
        "Seçtiğiniz saat artık uygun değil. Lütfen başka bir saat seçin.",
        "list_available_slots ile güncel saatleri alıp kullanıcıya yeniden sunun.",
    );

const storeUnavailable = () =>
    new BookingError(
        "unavailable",
        `Randevu kayıtlarına şu an ulaşılamıyor. Lütfen biraz sonra tekrar deneyin veya ${PHONE} numarasından büromuza ulaşın.`,
    );

function logStoreError(action: string, error: unknown) {
    console.error(`[randevu] Kayıt deposu hatası (${action}):`, error instanceof Error ? error.message : error);
}

// ———————————————————————————————————————— Uygunluk
interface Constraints {
    busy: BusyInterval[];
    blocked: string[];
    /** Takvim okunabildi mi? false ise randevular "talep" olarak alınır. */
    calendarOk: boolean;
}

/** Takvimdeki dolu saatler, depodaki etkin randevular ve kapalı günler. */
async function loadConstraints(fromMs: number, toMs: number, fresh = false): Promise<Constraints> {
    const durationMs = cfg.durationMinutes * 60_000;
    const storeOn = store.isStoreConfigured();
    const [calendar, starts, blocked] = await Promise.all([
        tryFetchBusy(fromMs, toMs, { fresh }),
        storeOn
            ? store.activeStarts(fromMs - durationMs, toMs).catch((error) => {
                  logStoreError("etkin randevular", error);
                  return [] as number[];
              })
            : ([] as number[]),
        storeOn
            ? store.blockedDates().catch((error) => {
                  logStoreError("kapalı günler", error);
                  return [] as string[];
              })
            : ([] as string[]),
    ]);
    return {
        busy: [...calendar.busy, ...starts.map((startMs) => ({ startMs, endMs: startMs + durationMs }))],
        blocked,
        calendarOk: calendar.ok,
    };
}

const bookingWindow = `Randevular en az ${cfg.minNoticeHours} saat sonrası ve en fazla ${cfg.horizonDays} gün ilerisi için verilebilir.`;

async function availableSlots(nowMs: number, fromMs?: number, toMs?: number) {
    const windowEnd = nowMs + (cfg.horizonDays + 2) * DAY_MS;
    const constraints = await loadConstraints(nowMs, windowEnd);
    const slots = generateSlots({ nowMs, fromMs, toMs, busy: constraints.busy, blockedDates: constraints.blocked });
    return { slots, mode: (constraints.calendarOk ? "takvim_bagli" : "talep") as Availability["mode"] };
}

/** Takvimli randevu sayfası için: randevu penceresindeki tüm boş saatler, günlere ayrılmış. */
export async function getAvailability(): Promise<Availability> {
    const { slots, mode } = await availableSlots(Date.now());
    return { mode, days: groupByDay(slots), durationMinutes: cfg.durationMinutes, window: bookingWindow };
}

/** Asistan için: istenen aralıktaki en yakın boş saatler. */
export async function listAvailableSlots(input: { start_date?: string; end_date?: string; part_of_day?: PartOfDay }) {
    const nowMs = Date.now();
    const fromMs = input.start_date ? parseDateKey(input.start_date) : nowMs;
    const toMs = input.end_date ? parseDateKey(input.end_date) : undefined;
    if (fromMs === null || toMs === null) {
        throw new BookingError("invalid", "Tarihler YYYY-MM-DD biçiminde olmalıdır.");
    }

    const { slots: all, mode } = await availableSlots(nowMs, fromMs, toMs);
    let slots = all;
    if (input.part_of_day === "sabah") slots = slots.filter((s) => Number(s.id.slice(11, 13)) < 13);
    if (input.part_of_day === "ogleden_sonra") slots = slots.filter((s) => Number(s.id.slice(11, 13)) >= 13);

    const offered = slots.slice(0, MAX_SLOTS_RETURNED);
    return {
        mode,
        slots: offered.map((s) => ({ slot_id: s.id, label: s.label })),
        more_available: slots.length > MAX_SLOTS_RETURNED,
        /** Sunulan saatlerden sonra da boş saati olan günler; kullanıcı başka gün isterse buradan önerin. */
        later_days: groupByDay(slots.slice(MAX_SLOTS_RETURNED))
            .slice(0, 10)
            .map((d) => `${d.date} ${d.weekday}`),
        booking_window: bookingWindow,
        note:
            slots.length === 0
                ? "Bu aralıkta uygun saat yok. Farklı bir tarih aralığı deneyin veya kullanıcıyı telefona yönlendirin."
                : undefined,
        /** Sohbet penceresinde tıklanabilir düğme olarak gösterilir; modele gönderilmez. */
        days: groupByDay(offered) as DaySlots[],
    };
}

// ———————————————————————————————————————— Doğrulama
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
    const bare = digits.replace(/\+/g, "");
    if (bare.length < 10 || bare.length > 15) return null;
    // Türkiye cep numaraları okunur biçimde saklanır: 0532 111 22 33.
    const mobile = /^(?:90|0)?(5\d{2})(\d{3})(\d{2})(\d{2})$/.exec(bare);
    if (mobile) return `0${mobile[1]} ${mobile[2]} ${mobile[3]} ${mobile[4]}`;
    return digits.startsWith("+") ? `+${bare}` : bare;
}

function validate(input: BookingInput) {
    if (input.kvkk_consent !== true) {
        throw new BookingError("invalid", "Randevu oluşturabilmemiz için KVKK aydınlatma metnini onaylamanız gerekir.");
    }
    const name = (input.full_name ?? "").trim().replace(/\s+/g, " ");
    if (name.length < 3 || name.length > 80) throw new BookingError("invalid", "Lütfen adınızı ve soyadınızı yazın.");
    const phone = normalizePhone(input.phone ?? "");
    if (!phone) throw new BookingError("invalid", "Telefon numarası geçersiz. Lütfen 05XX XXX XX XX biçiminde yazın.");
    const email = input.email?.trim() || undefined;
    if (email && (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
        throw new BookingError("invalid", "E-posta adresi geçersiz.");
    }
    if (!cfg.meetingTypes.includes(input.meeting_type)) throw new BookingError("invalid", "Lütfen görüşme şeklini seçin.");
    const summary = (input.case_summary ?? "").trim().slice(0, 1200);
    if (summary.length < 5) throw new BookingError("invalid", "Lütfen konuyu birkaç kelimeyle özetleyin.");
    const area = (input.practice_area ?? "").trim().slice(0, 80) || "Belirtilmedi";
    return { name, phone, email, summary, area, meetingType: input.meeting_type };
}

/** Okurken karışmayan harf ve rakamlardan (0/O, 1/I yok) referans kodu üretir. */
function newReference(): string {
    const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    const code = Array.from(randomBytes(6), (b) => alphabet[b & 31]).join("");
    return `AH-${code}`;
}

// ———————————————————————————————————————— Bildirim
/** Bildirim e-postasındaki alanların Türkçe etiketleri (sıra korunur). */
const FIELD_LABELS: Record<string, string> = {
    appointment: "Randevu",
    eski_randevu: "Önceki randevu",
    durum: "Durum",
    uyari: "Uyarı",
    name: "Ad Soyad",
    phone: "Telefon",
    email: "E-posta",
    topic: "Konu",
    preferred_contact: "Görüşme şekli",
    message: "Özet",
    reference: "Referans",
    source: "Kaynak",
    reason: "Neden",
    whatsapp: "WhatsApp",
    note: "Not",
    kvkk_onay: "KVKK onayı",
    yonetim: "Yönetim paneli",
};

async function sendViaFormspree(fields: Record<string, string>): Promise<boolean> {
    const formId = process.env.FORMSPREE_FORM_ID || "mblnkeke";
    try {
        const res = await fetch(`https://formspree.io/f/${formId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(fields),
            cache: "no-store",
            signal: AbortSignal.timeout(10_000),
        });
        if (!res.ok) console.error(`[randevu] Yedek bildirim e-postası (Formspree) gönderilemedi: HTTP ${res.status}`);
        return res.ok;
    } catch (error) {
        console.error("[randevu] Yedek bildirim e-postası (Formspree) gönderilemedi:", error instanceof Error ? error.message : error);
        return false;
    }
}

/**
 * Avukata e-posta bildirimi; başarılıysa true döner. Önce Google köprüsü
 * üzerinden Gmail denenir; köprüye ulaşılamazsa bildirim kaybolmasın diye
 * iletişim formunun kullandığı Formspree adresine gönderilir.
 */
export async function notifyOffice(fields: Record<string, string>): Promise<boolean> {
    const { _subject: subject = "Asil Hukuk bildirimi", ...rest } = fields;
    const keys = [...Object.keys(FIELD_LABELS).filter((k) => k in rest), ...Object.keys(rest).filter((k) => !(k in FIELD_LABELS))];
    const rows = keys.filter((k) => rest[k]).map((k): [string, string] => [FIELD_LABELS[k] ?? k, rest[k]]);
    const replyTo = rest.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rest.email) ? rest.email : undefined;
    if (await trySendGmail({ subject, rows, replyTo })) return true;
    return sendViaFormspree(fields);
}

const channelLabels: Record<BookingChannel, string> = {
    form: "Web sitesindeki randevu sayfası",
    web: "Web sitesindeki sohbet asistanı",
    whatsapp: "WhatsApp asistanı",
};

/** Takvim tanımlı ama çalışmıyorsa bildirim e-postasına eklenen uyarı. */
function calendarWarning(calendarWritten: boolean): Record<string, string> {
    if (calendarWritten || !isCalendarConfigured()) return {};
    const health = calendarHealth();
    return {
        uyari: `DİKKAT: Google Takvim bağlantısı çalışmıyor; bu randevu takviminize YAZILMADI ve saat takviminizdeki doluluğa bakılmadan verildi. Lütfen müvekkil adayını arayıp teyit edin.${health.error ? ` Hata: ${health.error}` : ""}`,
    };
}

function recordFields(record: BookingRecord): Record<string, string> {
    const panel = adminLoginUrl(record.reference);
    return {
        name: record.name,
        phone: record.phone,
        email: record.email ?? "",
        topic: record.practiceArea,
        message: record.summary,
        appointment: `${formatLocal(record.startMs)} (${cfg.durationMinutes} dk)`,
        preferred_contact: meetingTypeLabels[record.meetingType],
        reference: record.reference,
        source: channelLabels[record.channel],
        ...(panel ? { yonetim: panel } : {}),
    };
}

// ———————————————————————————————————————— Kayıt → kullanıcıya gösterilen hâl
function canChange(record: BookingRecord, nowMs: number): boolean {
    return record.status !== "cancelled" && record.startMs - nowMs >= cfg.changeCutoffHours * HOUR_MS;
}

function toPublic(record: BookingRecord, nowMs: number, stored = true): Booking {
    const slot = slotAt(record.startMs);
    return {
        reference: record.reference,
        status: record.status === "pending" ? "requested" : record.status,
        slotLabel: slot.label,
        slotId: slot.id,
        meetingType: record.meetingType,
        meetingTypeLabel: meetingTypeLabels[record.meetingType],
        name: record.name,
        practiceArea: record.practiceArea,
        durationMinutes: cfg.durationMinutes,
        canChange: stored && canChange(record, nowMs),
    };
}

function calendarEvent(record: BookingRecord) {
    const typeLabel = meetingTypeLabels[record.meetingType];
    return {
        summary: `Ön görüşme: ${record.name} (${typeLabel})`,
        description: [
            `Referans: ${record.reference}`,
            `Ad Soyad: ${record.name}`,
            `Telefon: ${record.phone}`,
            `E-posta: ${record.email ?? "-"}`,
            `Konu: ${record.practiceArea}`,
            `Görüşme şekli: ${typeLabel}`,
            `Özet: ${record.summary}`,
            "",
            `${channelLabels[record.channel]} üzerinden oluşturuldu. KVKK onayı alındı.`,
        ].join("\n"),
        startMs: record.startMs,
        endMs: record.endMs,
        location: record.meetingType === "buro" ? siteContent.contact.address : undefined,
    };
}

/**
 * İstenen saati çözer ve kilitler. Saat programa uymuyorsa, doluysa ya da
 * başkası az önce aldıysa slot_taken hatası verir.
 */
async function reserveSlot(slotId: string, reference: string, nowMs: number): Promise<{ slot: Slot; calendarOk: boolean; locked: boolean }> {
    const requested = Date.parse(slotId ?? "");
    if (Number.isNaN(requested)) throw slotTaken();

    // Kayıttan hemen önce takvime önbelleksiz yeniden bakılır.
    const constraints = await loadConstraints(requested - HOUR_MS, requested + HOUR_MS, true);
    const slot = resolveSlotId(slotId, nowMs, constraints.busy, constraints.blocked);
    if (!slot) throw slotTaken();

    let locked = false;
    if (store.isStoreConfigured()) {
        try {
            locked = await store.lockSlot(slot.startMs, reference);
        } catch (error) {
            // Depo çalışmıyorsa randevu yine alınır; çakışma denetimi takvime ve büronun teyidine kalır.
            logStoreError("saat kilidi", error);
            return { slot, calendarOk: constraints.calendarOk, locked: false };
        }
        if (!locked) throw slotTaken();
    }
    return { slot, calendarOk: constraints.calendarOk, locked };
}

async function releaseQuietly(startMs: number, reference: string) {
    await store.releaseSlot(startMs, reference).catch((error) => logStoreError("kilit bırakma", error));
}

/**
 * Etkinliği takvime yazmayı dener. Saat takvimde doluysa slot_taken hatası
 * verir; takvime ulaşılamıyorsa null döner (randevu talep olarak sürer).
 */
async function writeToCalendar(record: BookingRecord, calendarOk: boolean, onTaken: () => Promise<void>): Promise<string | null> {
    if (!calendarOk) return null;
    try {
        return await createEvent(calendarEvent(record));
    } catch (error) {
        if (error instanceof SlotTakenError) {
            await onTaken();
            throw slotTaken();
        }
        return null;
    }
}

// ———————————————————————————————————————— Randevu oluşturma
export async function bookAppointment(input: BookingInput, channel: BookingChannel = "web"): Promise<Booking> {
    const data = validate(input);
    const nowMs = Date.now();
    const storeOn = store.isStoreConfigured();

    if (storeOn) {
        const existing = await store.recordsByPhone(data.phone).catch((error) => {
            logStoreError("telefon sorgusu", error);
            return [] as BookingRecord[];
        });
        const upcoming = existing.filter((r) => r.status !== "cancelled" && r.startMs > nowMs);
        if (upcoming.length >= cfg.maxActivePerPhone) {
            throw new BookingError(
                "limit",
                `Bu telefon numarasıyla ileri tarihli ${upcoming.length} randevunuz bulunuyor (${upcoming.map((r) => `${r.reference}: ${formatLocal(r.startMs)}`).join("; ")}). Yeni randevu için önce mevcut randevunuzu erteleyebilir veya iptal edebilirsiniz.`,
            );
        }
    }

    const reference = newReference();
    const { slot, calendarOk, locked } = await reserveSlot(input.slot_id, reference, nowMs);

    const record: BookingRecord = {
        reference,
        status: "pending",
        startMs: slot.startMs,
        endMs: slot.endMs,
        meetingType: data.meetingType,
        name: data.name,
        phone: data.phone,
        email: data.email,
        practiceArea: data.area,
        summary: data.summary,
        channel,
        createdAt: nowMs,
        updatedAt: nowMs,
    };

    const eventId = await writeToCalendar(record, calendarOk, async () => {
        if (locked) await releaseQuietly(slot.startMs, reference);
    });
    if (eventId) {
        record.status = "confirmed";
        record.calendarEventId = eventId;
    }

    let stored = false;
    if (storeOn) {
        try {
            await store.saveRecord(record);
            stored = true;
        } catch (error) {
            logStoreError("randevu kaydı", error);
        }
    }

    const notified = await notifyOffice({
        _subject: `${eventId ? "Yeni randevu" : "Randevu talebi"}: ${slot.label} – ${data.name}`,
        ...recordFields(record),
        durum: eventId ? "Takviminize işlendi" : "Teyit bekliyor – müvekkil adayına büronun arayıp teyit edeceği söylendi",
        kvkk_onay: "Onaylandı",
        ...calendarWarning(Boolean(eventId)),
    });

    // Takvime yazılamadıysa ve bildirim de gitmediyse büronun randevudan haberi olmaz.
    if (!eventId && !notified) {
        if (stored) await store.deleteRecord(record).catch((error) => logStoreError("kayıt geri alma", error));
        if (locked) await releaseQuietly(slot.startMs, reference);
        throw new BookingError(
            "unavailable",
            `Randevu sistemi şu an talebinizi büromuza iletemedi. Lütfen ${PHONE} numarasını arayın veya WhatsApp'tan yazın.`,
        );
    }

    return toPublic(record, nowMs, stored);
}

// ———————————————————————————————————————— Sorgulama, iptal, erteleme
async function requireRecord(referenceRaw: string, phone: string): Promise<BookingRecord> {
    if (!store.isStoreConfigured()) throw storeUnavailable();
    const notFound = () =>
        new BookingError(
            "not_found",
            "Bu referans kodu ve telefon numarasıyla eşleşen bir randevu bulunamadı. Kodu (AH-XXXXXX) ve randevuyu alırken verdiğiniz telefon numarasını kontrol edin.",
        );
    const reference = normalizeReference(referenceRaw ?? "");
    if (!reference || store.phoneKey(phone ?? "").length < 10) throw notFound();
    let record: BookingRecord | null;
    try {
        record = await store.getRecord(reference);
    } catch (error) {
        logStoreError("randevu sorgusu", error);
        throw storeUnavailable();
    }
    // Kod doğru, telefon yanlışsa da aynı yanıt verilir; kodlar deneme yoluyla bulunamasın.
    if (!record || store.phoneKey(record.phone) !== store.phoneKey(phone)) throw notFound();
    return record;
}

export async function findAppointment(reference: string, phone: string): Promise<Booking> {
    return toPublic(await requireRecord(reference, phone), Date.now());
}

/** Telefon numarası doğrulanmış kanallar (WhatsApp) için: numaraya ait ileri tarihli randevular. */
export async function findAppointmentsByPhone(phone: string): Promise<Booking[]> {
    if (!store.isStoreConfigured()) throw storeUnavailable();
    const nowMs = Date.now();
    try {
        const records = await store.recordsByPhone(phone);
        return records.filter((r) => r.status !== "cancelled" && r.endMs > nowMs).map((r) => toPublic(r, nowMs));
    } catch (error) {
        logStoreError("telefon sorgusu", error);
        throw storeUnavailable();
    }
}

function assertChangeable(record: BookingRecord, nowMs: number) {
    if (record.status === "cancelled") throw new BookingError("invalid", "Bu randevu daha önce iptal edilmiş. Dilerseniz yeni bir randevu oluşturabilirsiniz.");
    if (record.startMs - nowMs < cfg.changeCutoffHours * HOUR_MS) {
        throw new BookingError(
            "too_late",
            record.startMs <= nowMs
                ? "Bu randevunun saati geçmiş."
                : `Randevunuza ${cfg.changeCutoffHours} saatten az kaldığı için değişiklik çevrimiçi yapılamıyor. Lütfen ${PHONE} numarasını arayın.`,
        );
    }
}

async function cancelRecord(record: BookingRecord, by: "client" | "office", channel?: BookingChannel): Promise<void> {
    const nowMs = Date.now();
    record.status = "cancelled";
    record.cancelledBy = by;
    record.updatedAt = nowMs;
    try {
        await store.saveRecord(record);
        await store.releaseSlot(record.startMs, record.reference);
    } catch (error) {
        logStoreError("iptal", error);
        throw storeUnavailable();
    }

    const hadEvent = Boolean(record.calendarEventId);
    const removed = record.calendarEventId ? await tryDeleteEvent(record.calendarEventId) : false;
    if (by === "client") {
        await notifyOffice({
            _subject: `Randevu İPTAL edildi: ${formatLocal(record.startMs)} – ${record.name}`,
            ...recordFields(record),
            source: channel ? channelLabels[channel] : channelLabels[record.channel],
            durum: "Müvekkil adayı randevuyu iptal etti; saat yeniden randevuya açıldı.",
            ...(hadEvent && !removed ? { uyari: "Takviminizdeki etkinlik otomatik silinemedi; lütfen elle silin." } : {}),
        });
    }
}

export async function cancelAppointment(reference: string, phone: string, channel: BookingChannel): Promise<Booking> {
    const record = await requireRecord(reference, phone);
    const nowMs = Date.now();
    if (record.status === "cancelled") return toPublic(record, nowMs);
    assertChangeable(record, nowMs);
    await cancelRecord(record, "client", channel);
    return toPublic(record, nowMs);
}

export async function rescheduleAppointment(reference: string, phone: string, newSlotId: string, channel: BookingChannel): Promise<Booking> {
    const record = await requireRecord(reference, phone);
    const nowMs = Date.now();
    assertChangeable(record, nowMs);
    if (Date.parse(newSlotId ?? "") === record.startMs) {
        throw new BookingError("invalid", "Randevunuz zaten bu saatte. Lütfen farklı bir saat seçin.");
    }

    const { slot, calendarOk, locked } = await reserveSlot(newSlotId, record.reference, nowMs);
    const previous = { startMs: record.startMs, eventId: record.calendarEventId };
    const updated: BookingRecord = {
        ...record,
        startMs: slot.startMs,
        endMs: slot.endMs,
        status: "pending",
        calendarEventId: undefined,
        updatedAt: nowMs,
        rescheduled: (record.rescheduled ?? 0) + 1,
    };

    const eventId = await writeToCalendar(updated, calendarOk, async () => {
        if (locked) await releaseQuietly(slot.startMs, record.reference);
    });
    if (eventId) {
        updated.status = "confirmed";
        updated.calendarEventId = eventId;
    }

    const notified = await notifyOffice({
        _subject: `Randevu ERTELENDİ: ${slot.label} – ${record.name} (eski: ${formatLocal(previous.startMs)})`,
        ...recordFields(updated),
        source: channelLabels[channel],
        eski_randevu: formatLocal(previous.startMs),
        durum: eventId ? "Yeni saat takviminize işlendi" : "Yeni saat teyit bekliyor",
        ...calendarWarning(Boolean(eventId)),
    });
    if (!eventId && !notified) {
        if (locked) await releaseQuietly(slot.startMs, record.reference);
        throw new BookingError(
            "unavailable",
            `Değişiklik şu an büromuza iletilemedi; randevunuz eski saatinde duruyor. Lütfen ${PHONE} numarasını arayın.`,
        );
    }

    try {
        await store.saveRecord(updated);
        await store.releaseSlot(previous.startMs, record.reference);
    } catch (error) {
        logStoreError("erteleme", error);
        throw storeUnavailable();
    }
    if (previous.eventId) await tryDeleteEvent(previous.eventId);
    return toPublic(updated, nowMs);
}

// ———————————————————————————————————————— Büro yönetim paneli
export interface OfficeOverview {
    upcoming: BookingRecord[];
    /** Son 30 günün geçmiş ve iptal edilmiş randevuları (yeniden eskiye). */
    past: BookingRecord[];
    blockedDates: string[];
    calendar: CalendarHealth;
}

export async function officeOverview(): Promise<OfficeOverview> {
    const nowMs = Date.now();
    const [records, blocked] = await Promise.all([
        store.listRecords(nowMs - 30 * DAY_MS, nowMs + (cfg.horizonDays + 30) * DAY_MS),
        store.blockedDates(),
        // Panel açıldığında takvim bağlantısının güncel durumu da görülsün.
        tryFetchBusy(nowMs, nowMs + DAY_MS, { fresh: true }),
    ]);
    return {
        upcoming: records.filter((r) => r.status !== "cancelled" && r.endMs > nowMs),
        past: records.filter((r) => r.status === "cancelled" || r.endMs <= nowMs).reverse(),
        blockedDates: blocked.filter((d) => (parseDateKey(d) ?? 0) + DAY_MS > nowMs),
        calendar: calendarHealth(),
    };
}

/** Bekleyen talebi onaylar; takvim çalışıyorsa etkinliği de yazar. */
export async function officeConfirm(referenceRaw: string): Promise<BookingRecord | null> {
    const reference = normalizeReference(referenceRaw);
    const record = reference ? await store.getRecord(reference) : null;
    if (!record || record.status !== "pending") return record;
    record.status = "confirmed";
    record.updatedAt = Date.now();
    if (!record.calendarEventId && isCalendarConfigured()) {
        // Avukat saati bilerek onayladı; takvimdeki çakışma onayı engellemez.
        record.calendarEventId = (await createEvent(calendarEvent(record)).catch(() => null)) ?? undefined;
    }
    await store.saveRecord(record);
    return record;
}

export async function officeCancel(referenceRaw: string): Promise<BookingRecord | null> {
    const reference = normalizeReference(referenceRaw);
    const record = reference ? await store.getRecord(reference) : null;
    if (!record || record.status === "cancelled") return record;
    await cancelRecord(record, "office");
    return record;
}

export async function officeBlockDate(date: string, blocked: boolean): Promise<boolean> {
    if (parseDateKey(date) === null) return false;
    if (blocked) await store.blockDate(date);
    else await store.unblockDate(date);
    return true;
}

/** Randevu sayfasının bağlantısı (asistan ve bildirimlerde kullanılır). */
export const BOOKING_PAGE_URL = `${SITE_URL}/randevu`;
export const MANAGE_PAGE_URL = `${SITE_URL}/randevu/sorgula`;
