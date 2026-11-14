import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AlertTriangle, CalendarCheck, CalendarOff, CheckCircle2, Clock, LogOut, MessageCircle, Phone } from "lucide-react";
import Header from "@/components/Header";
import { appointmentSettings, meetingTypeLabels } from "@/data/appointmentSettings";
import { officeOverview, type BookingRecord, type OfficeOverview } from "@/lib/booking";
import { ADMIN_COOKIE, isAdminKey } from "@/lib/booking/admin";
import { formatLocal, localDateKey } from "@/lib/booking/slots";

export const metadata: Metadata = {
    title: "Randevu Yönetimi",
    robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const ACTION = "/api/randevu/yonetim";

const notices: Record<string, { text: string; tone: "ok" | "warn" }> = {
    onaylandi: { text: "Randevu onaylandı.", tone: "ok" },
    iptal: { text: "Randevu iptal edildi ve saat yeniden randevuya açıldı. Müvekkil adayına haber vermeyi unutmayın.", tone: "ok" },
    "gun-kapandi": { text: "Gün randevuya kapatıldı.", tone: "ok" },
    "gun-acildi": { text: "Gün yeniden randevuya açıldı.", tone: "ok" },
    cikis: { text: "Panelden çıkış yapıldı.", tone: "ok" },
    hata: { text: "İşlem tamamlanamadı. Lütfen tekrar deneyin.", tone: "warn" },
    yetkisiz: { text: "Bağlantı geçersiz. Lütfen en son randevu bildirim e-postanızdaki “Yönetim paneli” bağlantısını kullanın.", tone: "warn" },
};

const channelLabels: Record<BookingRecord["channel"], string> = {
    form: "Randevu sayfası",
    web: "Sohbet asistanı",
    whatsapp: "WhatsApp asistanı",
};

function waLink(record: BookingRecord): string {
    const digits = record.phone.replace(/\D/g, "");
    const international = digits.startsWith("90") ? digits : `90${digits.replace(/^0/, "")}`;
    const text = `Merhaba ${record.name}, Asil Hukuk Bürosu'ndan yazıyorum. ${formatLocal(record.startMs)} tarihli randevunuz (${record.reference}) hakkında bilgi vermek istiyorum.`;
    return `https://wa.me/${international}?text=${encodeURIComponent(text)}`;
}

function Shell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-ivory-100 dark:bg-slate-950">
            <Header />
            <main className="mx-auto w-full max-w-4xl flex-grow px-4 pb-32 pt-32 sm:px-6 lg:pt-40">{children}</main>
        </div>
    );
}

function Notice({ code }: { code?: string }) {
    const notice = code ? notices[code] : undefined;
    if (!notice) return null;
    return (
        <p
            role="status"
            className={`mb-6 rounded-xl border px-4 py-3 text-sm font-medium ${
                notice.tone === "ok"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                    : "border-gold-500/50 bg-gold-50 text-gold-900 dark:bg-gold-950/40 dark:text-gold-200"
            }`}
        >
            {notice.text}
        </p>
    );
}

function CalendarStatus({ calendar }: { calendar: OfficeOverview["calendar"] }) {
    if (!calendar.configured) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                <p className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                    <Clock className="h-4 w-4 text-gold-600" /> Google Takvim ve Gmail bağlı değil
                </p>
                <p className="mt-1">Randevular talep olarak alınır ve e-posta ile bildirilir. Kurulum: docs/randevu-sistemi.md.</p>
            </div>
        );
    }
    if (calendar.ok) {
        return (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                <p className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="h-4 w-4" /> Google Takvim bağlantısı çalışıyor
                </p>
                <p className="mt-1">Takviminizdeki dolu saatler önerilmiyor; yeni randevular takviminize işleniyor ve Gmail ile bildiriliyor.</p>
            </div>
        );
    }
    return (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
            <p className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="h-4 w-4" /> Google Takvim bağlantısı çalışmıyor
            </p>
            <p className="mt-1">
                Randevu sistemi çalışmaya devam ediyor, ancak randevular takviminize yazılamıyor ve saatler takviminizdeki doluluğa bakılmadan
                veriliyor. Yeni talepleri aşağıdan onaylayın; duruşma günlerinizi “Kapalı günler” bölümünden kapatabilirsiniz.
            </p>
            {calendar.error && <p className="mt-2 break-words font-mono text-xs opacity-80">{calendar.error}</p>}
        </div>
    );
}

function BookingCard({ record }: { record: BookingRecord }) {
    const pending = record.status === "pending";
    return (
        <article
            id={record.reference}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card target:border-gold-500 target:ring-2 target:ring-gold-500/30 dark:border-slate-800 dark:bg-slate-900"
        >
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="font-serif text-xl text-slate-900 dark:text-slate-100">{formatLocal(record.startMs)}</p>
                    <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                        {meetingTypeLabels[record.meetingType]} · {appointmentSettings.durationMinutes} dk · {channelLabels[record.channel]}
                    </p>
                </div>
                <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        pending ? "bg-gold-100 text-gold-900 dark:bg-gold-950 dark:text-gold-300" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    }`}
                >
                    {pending ? <Clock className="h-3.5 w-3.5" /> : <CalendarCheck className="h-3.5 w-3.5" />}
                    {pending ? "Teyit bekliyor" : record.calendarEventId ? "Onaylı · takvimde" : "Onaylı"}
                </span>
            </div>

            <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-500">Ad Soyad</dt>
                    <dd className="font-semibold text-slate-900 dark:text-slate-100">{record.name}</dd>
                </div>
                <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-500">Konu</dt>
                    <dd className="text-slate-800 dark:text-slate-200">{record.practiceArea}</dd>
                </div>
                <div className="sm:col-span-2">
                    <dt className="text-xs uppercase tracking-wider text-slate-500">Özet</dt>
                    <dd className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">{record.summary}</dd>
                </div>
            </dl>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                <a href={`tel:${record.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-1.5 rounded-full bg-primary-900 px-3.5 py-2 text-xs font-semibold text-white dark:bg-slate-800">
                    <Phone className="h-3.5 w-3.5" /> {record.phone}
                </a>
                <a href={waLink(record)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#167c43] px-3.5 py-2 text-xs font-semibold text-white">
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                </a>
                {record.email && (
                    <a href={`mailto:${record.email}`} className="text-xs font-semibold text-primary-800 underline underline-offset-2 dark:text-gold-400">
                        {record.email}
                    </a>
                )}
                <span className="ml-auto font-mono text-xs text-slate-500">{record.reference}</span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
                {pending && (
                    <form method="post" action={ACTION}>
                        <input type="hidden" name="islem" value="onayla" />
                        <input type="hidden" name="ref" value={record.reference} />
                        <button type="submit" className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-gold-400">
                            <CheckCircle2 className="h-4 w-4" /> Onayla
                        </button>
                    </form>
                )}
                <details className="group">
                    <summary className="cursor-pointer list-none rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-red-400 hover:text-red-700 dark:border-slate-700 dark:text-slate-300">
                        İptal et
                    </summary>
                    <form method="post" action={ACTION} className="mt-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
                        <input type="hidden" name="islem" value="iptal" />
                        <input type="hidden" name="ref" value={record.reference} />
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            Randevu iptal edilir, saat yeniden açılır ve (varsa) takviminizdeki etkinlik silinir. Müvekkil adayına otomatik bildirim
                            gitmez; lütfen kendiniz haber verin.
                        </p>
                        <button type="submit" className="mt-3 rounded-full bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800">
                            Evet, iptal et
                        </button>
                    </form>
                </details>
            </div>
        </article>
    );
}

export default async function OfficePanelPage({ searchParams }: { searchParams: { durum?: string } }) {
    const authorized = isAdminKey(cookies().get(ADMIN_COOKIE)?.value);

    if (!authorized) {
        return (
            <Shell>
                <Notice code={searchParams.durum} />
                <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-card dark:border-slate-800 dark:bg-slate-900">
                    <h1 className="font-serif text-3xl text-slate-900 dark:text-slate-100">Randevu Yönetimi</h1>
                    <p className="mx-auto mt-3 max-w-md text-slate-600 dark:text-slate-400">
                        Bu sayfa yalnızca büro içindir. Giriş için randevu bildirim e-postanızdaki “Yönetim paneli” bağlantısını açın.
                    </p>
                </div>
            </Shell>
        );
    }

    let overview: OfficeOverview;
    try {
        overview = await officeOverview();
    } catch (error) {
        console.error("[randevu] yönetim paneli yüklenemedi", error);
        return (
            <Shell>
                <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
                    <h1 className="font-serif text-2xl">Randevu kayıtlarına ulaşılamıyor</h1>
                    <p className="mt-2 text-sm">Kayıt deposu (Upstash Redis) şu an yanıt vermiyor. Biraz sonra sayfayı yenileyin.</p>
                </div>
            </Shell>
        );
    }

    const pendingCount = overview.upcoming.filter((r) => r.status === "pending").length;
    const today = localDateKey(Date.now());

    return (
        <Shell>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <span className="eyebrow">Büro Paneli</span>
                    <h1 className="mt-3 font-serif text-4xl text-slate-900 dark:text-slate-100">Randevu Yönetimi</h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        {overview.upcoming.length} yaklaşan randevu{pendingCount ? ` · ${pendingCount} tanesi teyit bekliyor` : ""}
                    </p>
                </div>
                <form method="post" action={ACTION}>
                    <input type="hidden" name="islem" value="cikis" />
                    <button type="submit" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 underline underline-offset-4 dark:text-slate-400">
                        <LogOut className="h-4 w-4" /> Çıkış
                    </button>
                </form>
            </div>

            <div className="mt-8">
                <Notice code={searchParams.durum} />
                <CalendarStatus calendar={overview.calendar} />
            </div>

            <section className="mt-10">
                <h2 className="font-serif text-2xl text-slate-900 dark:text-slate-100">Yaklaşan randevular</h2>
                {overview.upcoming.length === 0 ? (
                    <p className="mt-4 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700">
                        Yaklaşan randevu yok.
                    </p>
                ) : (
                    <div className="mt-4 space-y-4">
                        {overview.upcoming.map((record) => (
                            <BookingCard key={record.reference} record={record} />
                        ))}
                    </div>
                )}
            </section>

            <section className="mt-12">
                <h2 className="flex items-center gap-2 font-serif text-2xl text-slate-900 dark:text-slate-100">
                    <CalendarOff className="h-5 w-5 text-gold-600" /> Kapalı günler
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    İzin, duruşma veya seyahat günlerinizi kapatın; o gün için randevu sayfası ve asistan saat önermez. Mevcut randevular etkilenmez.
                </p>
                <form method="post" action={ACTION} className="mt-4 flex flex-wrap items-center gap-3">
                    <input type="hidden" name="islem" value="gun-kapat" />
                    <label htmlFor="kapali-gun" className="sr-only">
                        Kapatılacak gün
                    </label>
                    <input
                        id="kapali-gun"
                        type="date"
                        name="tarih"
                        required
                        min={today}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                    <button type="submit" className="rounded-full bg-primary-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-gold-500 dark:text-slate-950">
                        Günü kapat
                    </button>
                </form>
                {overview.blockedDates.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                        {overview.blockedDates.map((date) => (
                            <li key={date}>
                                <form method="post" action={ACTION} className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white py-1 pl-4 pr-1 text-sm dark:border-slate-700 dark:bg-slate-900">
                                    <input type="hidden" name="islem" value="gun-ac" />
                                    <input type="hidden" name="tarih" value={date} />
                                    <span className="text-slate-800 dark:text-slate-200">{formatLocal(Date.parse(`${date}T12:00:00+03:00`), false)}</span>
                                    <button type="submit" className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
                                        Aç
                                    </button>
                                </form>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {overview.past.length > 0 && (
                <section className="mt-12">
                    <h2 className="font-serif text-2xl text-slate-900 dark:text-slate-100">Geçmiş ve iptal edilenler</h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Son 30 gün.</p>
                    <ul className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white text-sm dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
                        {overview.past.map((record) => (
                            <li key={record.reference} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3">
                                <span className={`font-medium text-slate-900 dark:text-slate-100 ${record.status === "cancelled" ? "line-through opacity-70" : ""}`}>
                                    {formatLocal(record.startMs)}
                                </span>
                                <span className="text-slate-700 dark:text-slate-300">{record.name}</span>
                                <span className="text-slate-500">{record.phone}</span>
                                <span className="ml-auto text-xs text-slate-500">
                                    {record.status === "cancelled"
                                        ? `İptal (${record.cancelledBy === "office" ? "büro" : "müvekkil adayı"})`
                                        : record.status === "pending"
                                          ? "Teyit edilmedi"
                                          : "Tamamlandı"}{" "}
                                    · {record.reference}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </Shell>
    );
}
