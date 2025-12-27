"use client";

import { Phone, MessageCircle } from "lucide-react";
import { siteContent } from "@/data/siteContent";

export default function MobileBottomNav() {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 z-50 md:hidden pb-safe">
            <div className="grid grid-cols-2 gap-4 p-3">
                <a
                    href={`tel:${siteContent.contact.phone.replace(/\s/g, '')}`}
                    className="flex flex-col items-center justify-center bg-primary-600 text-white rounded-lg py-3 active:bg-primary-700 transition-colors shadow-sm"
                >
                    <Phone className="w-5 h-5 mb-1" />
                    <span className="text-xs font-bold">Hemen Ara</span>
                </a>
                <a
                    href={`https://wa.me/90${siteContent.contact.phone.replace(/\s+|^0/g, '')}?text=Merhaba,%20hukuki%20destek%20almak%20istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center bg-green-600 text-white rounded-lg py-3 active:bg-green-700 transition-colors shadow-sm"
                >
                    <MessageCircle className="w-5 h-5 mb-1" />
                    <span className="text-xs font-bold">WhatsApp</span>
                </a>
            </div>
        </div>
    );
}
