"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { trackEvent, whatsappHref } from "@/lib/contact";

/**
 * Masaüstünde sağ altta, sohbet asistanı düğmesinin üzerinde beliren WhatsApp düğmesi. Mobilde alt gezinme çubuğu
 * aynı işlevi gördüğü için gizlidir.
 */
export default function FloatingWhatsApp() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click_whatsapp", "Floating Button - WhatsApp")}
            aria-label="WhatsApp üzerinden yazın"
            className={`group fixed bottom-28 right-6 z-40 hidden items-center gap-3 rounded-full bg-[#1f9d55] py-3 pl-3 pr-5 text-white shadow-elegant transition-all duration-500 hover:bg-[#198048] md:flex ${
                visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
            }`}
        >
            <span className="flex h-10 w-10 animate-soft-pulse items-center justify-center rounded-full bg-white/15">
                <MessageCircle className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold leading-tight">
                Sorunuzu yazın
                <span className="block text-[11px] font-normal text-white/80">WhatsApp ile hızlı iletişim</span>
            </span>
        </a>
    );
}
