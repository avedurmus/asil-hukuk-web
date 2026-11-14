"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Building2, CalendarClock, Check, Loader2, Lock, Phone, RefreshCw, Video } from "lucide-react";
import { appointmentSettings, type MeetingType } from "@/data/appointmentSettings";
import { siteContent } from "@/data/siteContent";
import { rememberBooking } from "@/lib/booking/ics";
import type { Availability, Booking, BookingApiError, SlotOption } from "@/lib/booking/types";
import { PHONE_HREF, openChatAssistant, trackEvent, whatsappHref } from "@/lib/contact";
import BookingDetails from "./BookingDetails";
import SlotPicker from "./SlotPicker";

const OTHER_TOPIC = "Diğer / Emin değilim";
const topics = [...siteContent.services.map((s) => s.title), OTHER_TOPIC];

const meetingOptions: { type: MeetingType; title: string; note: string; icon: typeof Building2 }[] = [
    { type: "buro", title: "Büroda yüz yüze", note: "Kartal, Mai Residence", icon: Building2 },
    { type: "online", title: "Online görüşme", note: "Görüntülü, bağlantı size iletilir", icon: Video },
    { type: "telefon", title: "Telefonla", note: "Sizi biz ararız", icon: Phone },
];

const inputClass =
    "w-full rounded-xl border border-slate-200 bg-ivory-50 px-4 py-3.5 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-gold-500 focus:bg-white focus:ring-4 focus:ring-gold-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:bg-slate-900";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";

const steps = ["Tarih ve saat", "Bilgileriniz", "Onay"];

function Stepper({ current }: { current: number }) {
    return (
        <ol className="flex items-center gap-2 text-xs font-semibold sm:gap-3 sm:text-sm">
            {steps.map((label, i) => {
                const done = i < current;
                const active = i === current;
                return (
                    <li key={label} className="flex items-center gap-2 sm:gap-3">
                        <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs transition-colors ${
                                done
                                    ? "bg-gold-500 text-slate-950"
                                    : active
                                      ? "bg-primary-900 text-white dark:bg-gold-500 dark:text-slate-950"
                                      : "bg-slate-150 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                            }`}
                        >
                            {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                        </span>
                        <span className={active || done ? "text-slate-900 dark:text-slate-100" : "text-slate-500 dark:text-slate-400"}>{label}</span>
                        {i < steps.length - 1 && <span aria-hidden="true" className="h-px w-4 bg-slate-250 dark:bg-slate-700 sm:w-8" />}
                    </li>
                );
            })}
        </ol>
    );
}

/** Takvimden gün ve saat seçilerek randevu oluşturulan adım adım form. */
export default function BookingWizard() {
    const searchParams = useSearchParams();
    const [availability, setAvailability] = useState<Availability | null>(null);
    const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");
    const [step, setStep] = useState<0 | 1>(0);
    const [slot, setSlot] = useState<SlotOption | null>(null);
    const [meetingType, setMeetingType] = useState<MeetingType>("buro");
    const [topic, setTopic] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [booking, setBooking] = useState<Booking | null>(null);
    const topRef = useRef<HTMLDivElement>(null);

    const loadSlots = useCallback(async () => {
        setLoadState("loading");
        try {
            const res = await fetch("/api/randevu/slots", { cache: "no-store" });
            if (!res.ok) throw new Error(String(res.status));
            setAvailability((await res.json()) as Availability);
            setLoadState("ready");
        } catch {
            setLoadState("error");
        }
    }, []);

    useEffect(() => {
        void loadSlots();
    }, [loadSlots]);

    // Hizmet sayfalarından gelen "?konu=" konuyu önceden seçer.
    useEffect(() => {
        const konu = searchParams.get("konu");
        if (!konu) return;
        const match = topics.find((t) => t.toLocaleLowerCase("tr-TR") === konu.toLocaleLowerCase("tr-TR"));
        setTopic(match ?? OTHER_TOPIC);
    }, [searchParams]);

    const goTo = (next: 0 | 1) => {
        setStep(next);
        setError("");
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!slot || submitting) return;
        const data = new FormData(e.currentTarget);
        const phone = String(data.get("phone") ?? "");
        setSubmitting(true);
        setError("");
        try {
            const res = await fetch("/api/randevu", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    slot_id: slot.id,
                    full_name: data.get("name"),
                    phone,
                    email: data.get("email"),
                    practice_area: topic || OTHER_TOPIC,
                    case_summary: data.get("summary"),
                    meeting_type: meetingType,
                    kvkk_consent: data.get("kvkk") === "on",
                    website: data.get("website"),
                }),
            });
            const body = (await res.json().catch(() => ({}))) as { booking?: Booking } & Partial<BookingApiError>;
            if (res.ok && body.booking) {
                setBooking(body.booking);
                rememberBooking(body.booking.reference, phone);
                topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
                gtag?.("event", "generate_lead", {
                    event_category: "Booking",
                    event_label: body.booking.status === "confirmed" ? "Booking Page Confirmed" : "Booking Page Requested",
                    value: 1.0,
                    currency: "TRY",
                });
                return;
            }
            if (body.error === "slot_taken") {
                // Saat az önce dolduysa güncel saatlerle ilk adıma dön.
                setSlot(null);
                setNotice(body.message ?? "Seçtiğiniz saat artık uygun değil. Lütfen başka bir saat seçin.");
                goTo(0);
                void loadSlots();
                return;
            }
            setError(body.message ?? "Randevu oluşturulamadı. Lütfen tekrar deneyin ya da bizi arayın.");
        } catch {
            setError("Bağlantıda bir sorun oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.");
        } finally {
            setSubmitting(false);
        }
    };

    // ———————————————————————————————————————— Onay ekranı
    if (booking) {
        return (
            <div ref={topRef} className="scroll-mt-28">
                <Stepper current={2} />
                <h2 className="mt-7 font-serif text-3xl text-slate-900 dark:text-slate-100">
                    {booking.status === "confirmed" ? "Randevunuz oluşturuldu" : "Talebiniz bize ulaştı"}
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                    Sayın {booking.name}, referans kodunuzu not almanızı öneririz; randevunuzu bu kodla görüntüleyebilir, erteleyebilir veya
                    iptal edebilirsiniz.
                </p>
                <div className="mt-6">
                    <BookingDetails booking={booking} />
                </div>

                <div className="mt-6 rounded-2xl bg-ivory-100 p-5 dark:bg-slate-950">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Görüşmeye hazırlanırken</p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li className="flex gap-2">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" /> Varsa tebligat, sözleşme, tapu gibi belgeleri hazır bulundurun.
                        </li>
                        <li className="flex gap-2">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" /> Olayların kısa bir tarih sıralamasını not edin.
                        </li>
                        {booking.meetingType === "buro" && (
                            <li className="flex gap-2">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" /> Adres: {siteContent.contact.address}
                            </li>
                        )}
                    </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        href={`/randevu/sorgula?ref=${booking.reference}`}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-gold-500 dark:border-slate-700 dark:text-slate-200"
                    >
                        <CalendarClock className="h-4 w-4" /> Randevumu yönet
                    </Link>
                    <Link href="/blog" className="rounded-full px-5 py-2.5 text-sm font-semibold text-primary-800 underline underline-offset-4 dark:text-gold-400">
                        Bu arada blogumuza göz atın
                    </Link>
                </div>
            </div>
        );
    }

    const requestMode = availability?.mode === "talep";

    return (
        <div ref={topRef} className="scroll-mt-28">
            <Stepper current={step} />

            {/* ———————————————————————————————————————— 1. adım: tarih ve saat */}
            {step === 0 && (
                <div className="mt-7">
                    <h2 className="font-serif text-3xl text-slate-900 dark:text-slate-100">Size uygun günü ve saati seçin</h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        Ön görüşmeler {appointmentSettings.durationMinutes} dakikadır. Saatler İstanbul saatiyledir.
                    </p>

                    {notice && (
                        <p role="alert" className="mt-5 rounded-xl border border-gold-500/50 bg-gold-50 px-4 py-3 text-sm text-gold-900 dark:bg-gold-950/40 dark:text-gold-200">
                            {notice}
                        </p>
                    )}

                    <div className="mt-6 min-h-[18rem]">
                        {loadState === "loading" && (
                            <div className="flex h-72 flex-col items-center justify-center gap-3 text-sm text-slate-500" aria-live="polite">
                                <Loader2 className="h-6 w-6 animate-spin text-gold-600" />
                                Uygun saatler getiriliyor…
                            </div>
                        )}

                        {loadState === "error" && (
                            <div className="flex h-72 flex-col items-center justify-center gap-4 text-center">
                                <p className="max-w-sm text-sm text-slate-600 dark:text-slate-400">
                                    Uygun saatler şu an getirilemedi. Tekrar deneyebilir ya da bize doğrudan ulaşabilirsiniz.
                                </p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => void loadSlots()}
                                        className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-gold-500 dark:text-slate-950"
                                    >
                                        <RefreshCw className="h-4 w-4" /> Tekrar dene
                                    </button>
                                    <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 dark:border-slate-700 dark:text-slate-200">
                                        <Phone className="h-4 w-4" /> {siteContent.contact.phone}
                                    </a>
                                </div>
                            </div>
                        )}

                        {loadState === "ready" && availability && availability.days.length === 0 && (
                            <div className="flex h-72 flex-col items-center justify-center gap-4 text-center">
                                <p className="max-w-sm text-sm text-slate-600 dark:text-slate-400">
                                    Önümüzdeki {appointmentSettings.horizonDays} gün için boş randevu saati görünmüyor. Lütfen bizi arayın ya da
                                    WhatsApp&apos;tan yazın; size uygun bir zaman bulalım.
                                </p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-gold-500 dark:text-slate-950">
                                        <Phone className="h-4 w-4" /> {siteContent.contact.phone}
                                    </a>
                                    <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 dark:border-slate-700 dark:text-slate-200">
                                        WhatsApp
                                    </a>
                                </div>
                            </div>
                        )}

                        {loadState === "ready" && availability && availability.days.length > 0 && (
                            <SlotPicker
                                days={availability.days}
                                selectedId={slot?.id ?? null}
                                onSelect={(s) => {
                                    setSlot(s);
                                    setNotice("");
                                }}
                            />
                        )}
                    </div>

                    <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-slate-600 dark:text-slate-400" aria-live="polite">
                            {slot ? (
                                <>
                                    Seçiminiz: <strong className="font-semibold text-slate-900 dark:text-slate-100">{slot.label}</strong>
                                </>
                            ) : (
                                availability?.window
                            )}
                        </p>
                        <button
                            type="button"
                            disabled={!slot}
                            onClick={() => {
                                trackEvent("booking_slot_selected", "Booking Page - Slot", "Booking");
                                goTo(1);
                            }}
                            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary-900 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-gold-500 dark:text-slate-950 dark:hover:bg-gold-400"
                        >
                            Devam et
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-enabled:group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            )}

            {/* ———————————————————————————————————————— 2. adım: bilgiler */}
            {step === 1 && slot && (
                <form onSubmit={handleSubmit} className="mt-7 space-y-6">
                    <div className="flex items-center justify-between gap-4 rounded-2xl bg-primary-900 px-5 py-4 text-white">
                        <div className="min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300">Seçtiğiniz saat</p>
                            <p className="mt-0.5 truncate font-serif text-lg">{slot.label}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => goTo(0)}
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/25 px-3.5 py-2 text-xs font-semibold transition-colors hover:border-gold-400"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" /> Değiştir
                        </button>
                    </div>

                    <fieldset>
                        <legend className={labelClass}>Görüşme şekli</legend>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                            {meetingOptions.map((option) => {
                                const active = meetingType === option.type;
                                return (
                                    <button
                                        key={option.type}
                                        type="button"
                                        aria-pressed={active}
                                        onClick={() => setMeetingType(option.type)}
                                        className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 sm:flex-col sm:items-start sm:gap-2 ${
                                            active
                                                ? "border-primary-900 bg-primary-900 text-white dark:border-gold-500 dark:bg-gold-500 dark:text-slate-950"
                                                : "border-slate-200 bg-ivory-50 text-slate-800 hover:border-gold-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                                        }`}
                                    >
                                        <option.icon className={`h-5 w-5 shrink-0 ${active ? "" : "text-gold-600"}`} />
                                        <span>
                                            <span className="block text-sm font-semibold">{option.title}</span>
                                            <span className={`block text-xs ${active ? "opacity-80" : "text-slate-500 dark:text-slate-400"}`}>{option.note}</span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </fieldset>

                    {/* Otomatik form doldurucular için görünmeyen alan */}
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <label htmlFor="bk-name" className={labelClass}>
                                Adınız Soyadınız
                            </label>
                            <input id="bk-name" name="name" type="text" required minLength={3} maxLength={80} autoComplete="name" className={inputClass} placeholder="Adınız Soyadınız" />
                        </div>
                        <div>
                            <label htmlFor="bk-phone" className={labelClass}>
                                Cep Telefonunuz
                            </label>
                            <input
                                id="bk-phone"
                                name="phone"
                                type="tel"
                                required
                                inputMode="tel"
                                autoComplete="tel"
                                pattern="[0-9+\s\(\)\-]{10,20}"
                                title="Örn. 0530 123 45 67"
                                className={inputClass}
                                placeholder="05XX XXX XX XX"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <label htmlFor="bk-topic" className={labelClass}>
                                Konu
                            </label>
                            <select id="bk-topic" required value={topic} onChange={(e) => setTopic(e.target.value)} className={inputClass}>
                                <option value="" disabled>
                                    Seçiniz
                                </option>
                                {topics.map((t) => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="bk-email" className={labelClass}>
                                E-posta <span className="font-normal text-slate-400">(isteğe bağlı)</span>
                            </label>
                            <input id="bk-email" name="email" type="email" maxLength={120} autoComplete="email" className={inputClass} placeholder="ornek@eposta.com" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="bk-summary" className={labelClass}>
                            Konuyu kısaca anlatın
                        </label>
                        <textarea
                            id="bk-summary"
                            name="summary"
                            required
                            minLength={5}
                            maxLength={1200}
                            rows={4}
                            className={`${inputClass} resize-y`}
                            placeholder="Birkaç cümle yeterli; ayrıntıları görüşmede konuşuruz. Lütfen T.C. kimlik numarası gibi hassas bilgiler yazmayın."
                        />
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        <input type="checkbox" name="kvkk" required className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 accent-[#1a2942]" />
                        <span>
                            Paylaştığım bilgilerin randevumun planlanması ve bana dönüş yapılması amacıyla{" "}
                            <Link href="/kvkk" target="_blank" className="font-semibold text-primary-800 underline underline-offset-2 dark:text-gold-400">
                                KVKK Aydınlatma Metni
                            </Link>{" "}
                            kapsamında işlenmesini onaylıyorum.
                        </span>
                    </label>

                    {error && (
                        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
                            {error}
                        </p>
                    )}

                    <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                        <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <Lock className="h-3.5 w-3.5 shrink-0" />
                            {requestMode
                                ? "Saat sizin için ayrılır; büromuz arayarak teyit eder."
                                : "Bilgileriniz gizli tutulur, yalnızca randevunuz için kullanılır."}
                        </p>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold-500 px-8 py-4 font-semibold text-slate-950 shadow-gold-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 disabled:cursor-wait disabled:opacity-60"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" /> Gönderiliyor…
                                </>
                            ) : (
                                <>
                                    {requestMode ? "Randevu Talebini Gönder" : "Randevuyu Oluştur"}
                                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}

            {!booking && (
                <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                    Hangi alana başvuracağınızdan emin değil misiniz?{" "}
                    <button
                        type="button"
                        onClick={() => {
                            trackEvent("click_chat_cta", "Booking Page - Asistan", "Chat");
                            openChatAssistant();
                        }}
                        className="font-semibold text-primary-800 underline underline-offset-2 dark:text-gold-400"
                    >
                        Asil Asistan&apos;a sorun
                    </button>
                    ; randevunuzu sohbet ederek de oluşturabilirsiniz.
                </p>
            )}
        </div>
    );
}
