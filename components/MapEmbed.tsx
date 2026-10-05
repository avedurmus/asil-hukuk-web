"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { COOKIE_POLICY_PATH } from "@/lib/legal";
import { OFFICE_MAP_URL } from "@/lib/seo";

/**
 * Google Haritalar gömülü haritası üçüncü taraf çerezleri yüklediği için
 * yalnızca ziyaretçi açıkça istediğinde yüklenir.
 */
export default function MapEmbed() {
    const [loaded, setLoaded] = useState(false);

    if (loaded) {
        return (
            <iframe
                src={siteContent.contact.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                title="Asil Hukuk Bürosu konumu"
                className="absolute inset-0 grayscale-[35%] dark:opacity-85"
            ></iframe>
        );
    }

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-ivory-50 px-6 text-center dark:bg-slate-900">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/15 text-gold-700 dark:text-gold-400">
                <MapPin className="h-6 w-6" />
            </span>
            <p className="max-w-sm text-sm text-slate-700 dark:text-slate-300">{siteContent.contact.address}</p>
            <div className="flex flex-wrap justify-center gap-3">
                <button
                    type="button"
                    onClick={() => setLoaded(true)}
                    className="rounded-full bg-primary-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800 dark:bg-gold-500 dark:text-slate-950 dark:hover:bg-gold-400"
                >
                    Haritayı göster
                </button>
                <a
                    href={OFFICE_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-gold-500 dark:border-slate-700 dark:text-slate-200"
                >
                    Yol tarifi al <ArrowUpRight className="h-4 w-4" />
                </a>
            </div>
            <p className="max-w-xs text-xs text-slate-500 dark:text-slate-400">
                Harita Google tarafından sağlanır; gösterildiğinde Google çerezleri yüklenebilir.{" "}
                <Link href={COOKIE_POLICY_PATH} className="underline underline-offset-2">
                    Çerez Politikası
                </Link>
            </p>
        </div>
    );
}
