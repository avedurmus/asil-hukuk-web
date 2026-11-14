"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CalendarClock, CalendarX, Loader2, Phone, Search } from "lucide-react";
import { appointmentSettings } from "@/data/appointmentSettings";
import { siteContent } from "@/data/siteContent";
import { recallBooking, rememberBooking } from "@/lib/booking/ics";
import type { Availability, Booking, BookingApiError, SlotOption } from "@/lib/booking/types";
import { PHONE_HREF } from "@/lib/contact";
import BookingDetails from "./BookingDetails";
import SlotPicker from "./SlotPicker";

const inputClass =
    "w-full rounded-xl border border-slate-200 bg-ivory-50 px-4 py-3.5 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-gold-500 focus:bg-white focus:ring-4 focus:ring-gold-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:bg-slate-900";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";

type Mode = "view" | "reschedule" | "cancel";

async function post<T>(path: string, body: unknown): Promise<{ ok: true; data: T } | { ok: false; message: string }> {
    try {
        const res = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        const data = (await res.json().catch(() => ({}))) as T & Partial<BookingApiError>;
        if (res.ok) return { ok: true, data };
        return { ok: false, message: data.message ?? "İşlem tamamlanamadı. Lütfen tekrar deneyin." };
    } catch {
        return { ok: false, message: "Bağlantıda bir sorun oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin." };
    }
}

/** Referans kodu ve telefonla randevuyu getirir; erteleme ve iptal burada yapılır. */
export default function ManageBooking() {
    const searchParams = useSearchParams();
    const [reference, setReference] = useState("");
    const [phone, setPhone] = useState("");
    const [booking, setBooking] = useState<Booking | null>(null);
    const [mode, setMode] = useState<Mode>("view");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [done, setDone] = useState("");
    const [availability, setAvailability] = useState<Availability | null>(null);
    const [newSlot, setNewSlot] = useState<SlotOption | null>(null);

    const lookup = useCallback(async (ref: string, tel: string) => {
        setBusy(true);
        setError("");
        setDone("");
        const result = await post<{ booking: Booking }>("/api/randevu/sorgula", { reference: ref, phone: tel });
        setBusy(false);
        if (!result.ok) return setError(result.message);
        setBooking(result.data.booking);
        setMode("view");
        rememberBooking(result.data.booking.reference, tel);
    }, []);

    // Randevu sayfasından gelindiyse kod ve telefon hazırdır; randevu doğrudan gösterilir.
    useEffect(() => {
        const fromUrl = searchParams.get("ref") ?? "";
        const remembered = recallBooking();
        if (fromUrl) setReference(fromUrl.toUpperCase());
        if (remembered && (!fromUrl || remembered.reference === fromUrl.toUpperCase())) {
            setReference(remembered.reference);
            setPhone(remembered.phone);
            void lookup(remembered.reference, remembered.phone);
        }
    }, [searchParams, lookup]);

    const startReschedule = async () => {
        setMode("reschedule");
        setNewSlot(null);
        setError("");
        setDone("");
        setAvailability(null);
        try {
            const res = await fetch("/api/randevu/slots", { cache: "no-store" });
            if (!res.ok) throw new Error();
            setAvailability((await res.json()) as Availability);
        } catch {
            setError("Uygun saatler şu an getirilemedi. Lütfen biraz sonra tekrar deneyin.");
        }
    };

    const confirmReschedule = async () => {
        if (!booking || !newSlot) return;
        setBusy(true);
        setError("");
        const result = await post<{ booking: Booking }>("/api/randevu/degistir", { reference: booking.reference, phone, slot_id: newSlot.id });
        setBusy(false);
        if (!result.ok) {
            setError(result.message);
            return void startRescheduleRefresh();
        }
        setBooking(result.data.booking);
        setMode("view");
        setDone("Randevunuz yeni saate taşındı.");
    };

    /** Saat başkasına gittiyse listeyi tazeler, hata mesajını korur. */
    const startRescheduleRefresh = async () => {
        setNewSlot(null);
        try {
            const res = await fetch("/api/randevu/slots", { cache: "no-store" });
            if (res.ok) setAvailability((await res.json()) as Availability);
        } catch {
            /* liste eski hâliyle kalır */
        }
    };

    const confirmCancel = async () => {
        if (!booking) return;
        setBusy(true);
        setError("");
        const result = await post<{ booking: Booking }>("/api/randevu/iptal", { reference: booking.reference, phone });
        setBusy(false);
        if (!result.ok) return setError(result.message);
        setBooking(result.data.booking);
        setMode("view");
        setDone("Randevunuz iptal edildi.");
    };

    // ———————————————————————————————————————— Sorgulama formu
    if (!booking) {
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    void lookup(reference, phone);
                }}
                className="space-y-5"
            >
                <div>
                    <label htmlFor="mb-ref" className={labelClass}>
                        Referans kodunuz
                    </label>
                    <input
                        id="mb-ref"
                        value={reference}
                        onChange={(e) => setReference(e.target.value.toUpperCase())}
                        required
                        maxLength={12}
                        autoComplete="off"
                        autoCapitalize="characters"
                        spellCheck={false}
                        className={`${inputClass} font-mono tracking-widest`}
                        placeholder="AH-XXXXXX"
                    />
                </div>
                <div>
                    <label htmlFor="mb-phone" className={labelClass}>
                        Randevuyu alırken verdiğiniz telefon
                    </label>
                    <input
                        id="mb-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className={inputClass}
                        placeholder="05XX XXX XX XX"
                    />
                </div>
                {error && (
                    <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
                        {error}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={busy}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-900 px-8 py-4 font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-wait disabled:opacity-60 dark:bg-gold-500 dark:text-slate-950 dark:hover:bg-gold-400"
                >
                    {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                    Randevumu Göster
                </button>
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    Kodunuzu bulamıyor musunuz?{" "}
                    <a href={PHONE_HREF} className="font-semibold text-primary-800 underline underline-offset-2 dark:text-gold-400">
                        {siteContent.contact.phone}
                    </a>
                </p>
            </form>
        );
    }

    // ———————————————————————————————————————— Randevu ve işlemler
    const cancelled = booking.status === "cancelled";
    return (
        <div className="space-y-5">
            {done && (
                <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                    {done}
                </p>
            )}

            <BookingDetails booking={booking} />

            {error && (
                <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
                    {error}
                </p>
            )}

            {mode === "view" && !cancelled && booking.canChange && (
                <div className="flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => void startReschedule()}
                        className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-800 dark:bg-gold-500 dark:text-slate-950"
                    >
                        <CalendarClock className="h-4 w-4" /> Saati değiştir
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setMode("cancel");
                            setError("");
                            setDone("");
                        }}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-red-400 hover:text-red-700 dark:border-slate-700 dark:text-slate-200"
                    >
                        <CalendarX className="h-4 w-4" /> Randevuyu iptal et
                    </button>
                </div>
            )}

            {mode === "view" && !cancelled && !booking.canChange && (
                <p className="rounded-xl bg-ivory-100 px-4 py-3 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-400">
                    Randevunuza {appointmentSettings.changeCutoffHours} saatten az kaldığı için değişiklik çevrimiçi yapılamıyor. Lütfen{" "}
                    <a href={PHONE_HREF} className="inline-flex items-center gap-1 font-semibold text-primary-800 underline underline-offset-2 dark:text-gold-400">
                        <Phone className="h-3.5 w-3.5" /> {siteContent.contact.phone}
                    </a>{" "}
                    numarasını arayın.
                </p>
            )}

            {mode === "cancel" && (
                <div className="rounded-2xl border border-red-200 bg-red-50/60 p-5 dark:border-red-900 dark:bg-red-950/30">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">Randevunuzu iptal etmek istediğinize emin misiniz?</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{booking.slotLabel} tarihli randevunuz iptal edilecek ve saat başkalarına açılacak.</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                        <button
                            type="button"
                            disabled={busy}
                            onClick={() => void confirmCancel()}
                            className="inline-flex items-center gap-2 rounded-full bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-800 disabled:cursor-wait disabled:opacity-60"
                        >
                            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Evet, iptal et
                        </button>
                        <button type="button" onClick={() => setMode("view")} className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 underline underline-offset-4 dark:text-slate-300">
                            Vazgeç
                        </button>
                    </div>
                </div>
            )}

            {mode === "reschedule" && (
                <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">Yeni günü ve saati seçin</p>
                    <div className="mt-4 min-h-[12rem]">
                        {!availability && !error && (
                            <div className="flex h-48 items-center justify-center gap-3 text-sm text-slate-500">
                                <Loader2 className="h-5 w-5 animate-spin text-gold-600" /> Uygun saatler getiriliyor…
                            </div>
                        )}
                        {availability && availability.days.length === 0 && (
                            <p className="text-sm text-slate-600 dark:text-slate-400">Şu an boş saat görünmüyor. Lütfen bizi arayın: {siteContent.contact.phone}</p>
                        )}
                        {availability && availability.days.length > 0 && (
                            <SlotPicker days={availability.days} selectedId={newSlot?.id ?? null} onSelect={setNewSlot} />
                        )}
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                        <button
                            type="button"
                            disabled={!newSlot || busy}
                            onClick={() => void confirmReschedule()}
                            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                            {newSlot ? `${newSlot.label} olarak değiştir` : "Bir saat seçin"}
                        </button>
                        <button type="button" onClick={() => setMode("view")} className="rounded-full px-4 py-3 text-sm font-semibold text-slate-700 underline underline-offset-4 dark:text-slate-300">
                            Vazgeç
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-100 pt-5 text-sm dark:border-slate-800">
                {cancelled && (
                    <Link href="/randevu" className="inline-flex items-center gap-1.5 font-semibold text-primary-800 dark:text-gold-400">
                        Yeni randevu oluştur <ArrowRight className="h-4 w-4" />
                    </Link>
                )}
                <button
                    type="button"
                    onClick={() => {
                        setBooking(null);
                        setReference("");
                        setError("");
                        setDone("");
                    }}
                    className="font-semibold text-slate-600 underline underline-offset-4 dark:text-slate-400"
                >
                    Başka bir randevu sorgula
                </button>
            </div>
        </div>
    );
}
