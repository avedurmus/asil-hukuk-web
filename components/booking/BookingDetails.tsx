"use client";

import { useState } from "react";
import { CalendarCheck, CalendarPlus, CalendarX, Check, Clock, Copy, MessageCircle } from "lucide-react";
import { icsFileName, icsHref } from "@/lib/booking/ics";
import type { Booking } from "@/lib/booking/types";
import { whatsappHref } from "@/lib/contact";

const STATUS = {
    confirmed: { label: "Randevunuz onaylandı", note: "Randevunuz avukatımızın takvimine işlendi.", icon: CalendarCheck, tone: "text-emerald-700 dark:text-emerald-400" },
    requested: {
        label: "Randevu talebiniz alındı",
        note: "Bu saat sizin için ayrıldı. Büromuz mesai saatleri içinde sizi arayarak teyit edecektir.",
        icon: Clock,
        tone: "text-gold-700 dark:text-gold-400",
    },
    cancelled: { label: "Randevu iptal edildi", note: "Dilerseniz yeni bir randevu oluşturabilirsiniz.", icon: CalendarX, tone: "text-slate-500 dark:text-slate-400" },
} as const;

/** Randevunun ayrıntıları: durum, tarih, görüşme şekli, referans kodu ve takvime ekleme düğmeleri. */
export default function BookingDetails({ booking, compact = false }: { booking: Booking; compact?: boolean }) {
    const [copied, setCopied] = useState(false);
    const status = STATUS[booking.status];
    const active = booking.status !== "cancelled";

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(booking.reference);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* pano erişimi yoksa kod zaten ekranda */
        }
    };

    return (
        <div
            className={`rounded-2xl border bg-gradient-to-br p-5 shadow-card ${
                active ? "border-gold-500/50 from-gold-50 to-white dark:from-gold-950/40 dark:to-slate-900" : "border-slate-200 from-slate-50 to-white dark:border-slate-700 dark:from-slate-900 dark:to-slate-900"
            } ${compact ? "!p-4" : ""}`}
        >
            <div className={`flex items-center gap-2 text-sm font-semibold ${status.tone}`}>
                <status.icon className="h-4 w-4" />
                {status.label}
            </div>
            <dl className="mt-3 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex gap-2">
                    <dt className="w-20 shrink-0 text-slate-500">Tarih</dt>
                    <dd className={`font-medium ${active ? "" : "line-through"}`}>{booking.slotLabel}</dd>
                </div>
                <div className="flex gap-2">
                    <dt className="w-20 shrink-0 text-slate-500">Görüşme</dt>
                    <dd>
                        {booking.meetingTypeLabel} · {booking.durationMinutes} dk
                    </dd>
                </div>
                <div className="flex items-center gap-2">
                    <dt className="w-20 shrink-0 text-slate-500">Referans</dt>
                    <dd className="flex items-center gap-2 font-mono font-semibold tracking-wider">
                        {booking.reference}
                        <button type="button" onClick={copy} aria-label="Referans kodunu kopyala" className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary-900 dark:hover:bg-slate-800">
                            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                    </dd>
                </div>
            </dl>
            <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{status.note}</p>
            {active && (
                <div className="mt-4 flex flex-wrap gap-2">
                    <a
                        href={icsHref(booking)}
                        download={icsFileName(booking)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary-900 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-800 dark:bg-gold-500 dark:text-slate-950 dark:hover:bg-gold-400"
                    >
                        <CalendarPlus className="h-3.5 w-3.5" /> Takvime ekle
                    </a>
                    <a
                        href={whatsappHref(`Merhaba, ${booking.slotLabel} için ${booking.reference} referanslı randevum hakkında yazıyorum.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-gold-500 dark:border-slate-700 dark:text-slate-200"
                    >
                        <MessageCircle className="h-3.5 w-3.5" /> WhatsApp ile yazın
                    </a>
                </div>
            )}
        </div>
    );
}
