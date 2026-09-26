"use client";

import Link from "next/link";
import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { PHONE_HREF, trackEvent, whatsappHref } from "@/lib/contact";

export default function MobileBottomNav() {
    return (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/80 bg-ivory-50/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_-12px_rgb(15_26_44/0.25)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 md:hidden">
            <div className="grid grid-cols-3 gap-2 px-3 py-2.5">
                <a
                    href={PHONE_HREF}
                    onClick={() => trackEvent("click_phone", "Mobile Bottom Nav - Call Now")}
                    className="flex flex-col items-center justify-center gap-1 rounded-xl bg-primary-900 py-2.5 text-white transition-colors active:bg-primary-800 dark:bg-slate-800"
                >
                    <Phone className="h-5 w-5" />
                    <span className="text-[11px] font-bold">Hemen Ara</span>
                </a>
                <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("click_whatsapp", "Mobile Bottom Nav - WhatsApp Click")}
                    className="flex flex-col items-center justify-center gap-1 rounded-xl bg-[#1f9d55] py-2.5 text-white transition-colors active:bg-[#198048]"
                >
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-[11px] font-bold">WhatsApp</span>
                </a>
                <Link
                    href="/iletisim#randevu"
                    onClick={() => trackEvent("click_appointment_button", "Mobile Bottom Nav - Randevu")}
                    className="flex flex-col items-center justify-center gap-1 rounded-xl bg-gold-500 py-2.5 text-slate-950 transition-colors active:bg-gold-400"
                >
                    <CalendarCheck className="h-5 w-5" />
                    <span className="text-[11px] font-bold">Randevu</span>
                </Link>
            </div>
        </div>
    );
}
