"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
    AlertTriangle,
    ArrowRight,
    ArrowUpRight,
    Building,
    CalendarClock,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ClipboardCheck,
    Clock,
    Coins,
    ExternalLink,
    FileText,
    Gavel,
    Hammer,
    Landmark,
    ListChecks,
    Mail,
    Percent,
    Phone,
    Plus,
    RefreshCw,
    Scale,
    Search,
    Shield,
    Trash2,
    X,
} from "lucide-react";
import {
    BELGE_LISTESI,
    DONUSUM_ADIMLARI,
    ICTIHATLAR,
    PRATIK_PANOLAR,
    REHBER_SSS,
    SIHIRBAZ_SORULARI,
    SOZLESME_KONTROL,
    SURE_KURALLARI,
    sihirbazSonucu,
    type IconName,
    type Ictihat,
} from "@/data/kentselDonusum";
import { PHONE_HREF } from "@/lib/contact";

/* ——— Yardımcılar ——————————————————————————————————————————————— */

const ICONS: Record<IconName, React.ComponentType<{ className?: string }>> = {
    search: Search,
    mail: Mail,
    hammer: Hammer,
    gavel: Gavel,
    landmark: Landmark,
    building: Building,
    scale: Scale,
    coins: Coins,
    shield: Shield,
    clock: Clock,
    file: FileText,
};

/** Aşama rengi için sabit sınıf eşlemesi — Tailwind'in sınıfları üretebilmesi için. */
const ACCENT: Record<string, { text: string; bg: string; ring: string; soft: string }> = {
    sky: {
        text: "text-sky-600 dark:text-sky-400",
        bg: "bg-sky-500",
        ring: "ring-sky-500/30",
        soft: "bg-sky-500/10",
    },
    amber: {
        text: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-500",
        ring: "ring-amber-500/30",
        soft: "bg-amber-500/10",
    },
    orange: {
        text: "text-orange-600 dark:text-orange-400",
        bg: "bg-orange-500",
        ring: "ring-orange-500/30",
        soft: "bg-orange-500/10",
    },
    emerald: {
        text: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-500",
        ring: "ring-emerald-500/30",
        soft: "bg-emerald-500/10",
    },
    rose: {
        text: "text-rose-600 dark:text-rose-400",
        bg: "bg-rose-500",
        ring: "ring-rose-500/30",
        soft: "bg-rose-500/10",
    },
    violet: {
        text: "text-violet-600 dark:text-violet-400",
        bg: "bg-violet-500",
        ring: "ring-violet-500/30",
        soft: "bg-violet-500/10",
    },
};

const TR_DATE = new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "long", year: "numeric" });

/** YYYY-MM-DD metnini yerel gün başına çevirir (saat dilimi kaymasını önler). */
function parseISODate(value: string): Date | null {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) return null;
    const [, y, m, d] = match;
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    return Number.isNaN(date.getTime()) ? null : date;
}

function addDays(date: Date, days: number): Date {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
}

function startOfToday(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function diffInDays(from: Date, to: Date): number {
    return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

/* ——— Ortak kabuk bileşenleri ———————————————————————————————————— */

const SECTIONS = [
    { id: "yol-haritasi", label: "Yol Haritası" },
    { id: "araclar", label: "Hesaplayıcılar" },
    { id: "durum-analizi", label: "Durum Analizi" },
    { id: "ictihat", label: "İçtihat" },
    { id: "pratik-bilgiler", label: "Pratik Bilgiler" },
    { id: "sorular", label: "Sık Sorulanlar" },
];

function SectionHeading({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description?: React.ReactNode;
}) {
    return (
        <div className="mb-8 max-w-3xl">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mt-4 font-serif text-3xl font-medium text-slate-900 dark:text-slate-100 md:text-4xl">
                {title}
            </h2>
            {description && (
                <p className="mt-4 text-base leading-relaxed text-slate-650 dark:text-slate-400 md:text-lg">
                    {description}
                </p>
            )}
        </div>
    );
}

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
    return (
        <div
            className={`rounded-3xl border border-slate-200/80 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900 ${className}`}
        >
            {children}
        </div>
    );
}

/* ——— 1. Bölüm navigasyonu ——————————————————————————————————————— */

function SectionNav() {
    const [active, setActive] = useState(SECTIONS[0].id);

    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") return;
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
                if (visible) setActive(visible.target.id);
            },
            { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
        );
        SECTIONS.forEach(({ id }) => {
            const node = document.getElementById(id);
            if (node) observer.observe(node);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <nav
            aria-label="Rehber bölümleri"
            className="sticky top-20 z-30 -mx-4 mb-12 border-y border-slate-200/70 bg-ivory-100/85 px-4 py-3 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/85 sm:-mx-6 sm:px-6"
        >
            <ul className="flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {SECTIONS.map((section) => (
                    <li key={section.id} className="snap-start">
                        <a
                            href={`#${section.id}`}
                            aria-current={active === section.id ? "true" : undefined}
                            className={`inline-flex whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                                active === section.id
                                    ? "border-primary-900 bg-primary-900 text-white dark:border-gold-500 dark:bg-gold-500 dark:text-slate-950"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-gold-500"
                            }`}
                        >
                            {section.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

/* ——— 2. Yol haritası ———————————————————————————————————————————— */

function YolHaritasi({
    activeId,
    onChange,
    onIctihatSec,
}: {
    activeId: number;
    onChange: (id: number) => void;
    onIctihatSec: (id: string) => void;
}) {
    const adim = DONUSUM_ADIMLARI.find((item) => item.id === activeId) ?? DONUSUM_ADIMLARI[0];
    const accent = ACCENT[adim.accent];
    const Icon = ICONS[adim.icon];

    return (
        <Card className="overflow-hidden">
            {/* Aşama şeridi */}
            <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/30 sm:grid-cols-3 lg:grid-cols-6">
                {DONUSUM_ADIMLARI.map((item) => {
                    const ItemIcon = ICONS[item.icon];
                    const isActive = item.id === activeId;
                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onChange(item.id)}
                            aria-pressed={isActive}
                            className={`group relative flex flex-col gap-2 border-b-2 p-4 text-left transition-colors ${
                                isActive
                                    ? "border-gold-500 bg-white dark:bg-slate-900"
                                    : "border-transparent hover:bg-white/70 dark:hover:bg-slate-900/50"
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <span
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                                        isActive
                                            ? "bg-primary-900 text-white dark:bg-gold-500 dark:text-slate-950"
                                            : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                                    }`}
                                >
                                    <ItemIcon className="h-4 w-4" />
                                </span>
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                                    {item.id}. Aşama
                                </span>
                            </span>
                            <span
                                className={`text-sm font-semibold leading-snug ${
                                    isActive
                                        ? "text-primary-900 dark:text-gold-300"
                                        : "text-slate-700 dark:text-slate-300"
                                }`}
                            >
                                {item.title}
                            </span>
                        </button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={adim.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 md:p-10"
                    id={`adim-${adim.slug}`}
                >
                    {/* Başlık */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-4">
                            <span
                                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ring-1 ${accent.soft} ${accent.ring} ${accent.text}`}
                            >
                                <Icon className="h-7 w-7" />
                            </span>
                            <div>
                                <h3 className="font-serif text-2xl font-medium text-slate-900 dark:text-slate-100 md:text-3xl">
                                    {adim.title}
                                </h3>
                                <p className={`mt-1 text-sm font-semibold ${accent.text}`}>{adim.subtitle}</p>
                            </div>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
                            <Scale className="h-3.5 w-3.5 text-gold-500" />
                            {adim.dayanak}
                        </span>
                    </div>

                    <p className="mt-6 text-base leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">
                        {adim.ozet}
                    </p>

                    {/* Süre şeridi */}
                    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {adim.sureler.map((sure) => (
                            <div
                                key={sure.label}
                                className="rounded-2xl border border-slate-200/70 bg-ivory-50 p-4 dark:border-slate-800/70 dark:bg-slate-950/40"
                            >
                                <div className="flex items-baseline gap-2">
                                    <CalendarClock className="h-4 w-4 shrink-0 translate-y-0.5 text-gold-500" />
                                    <span className="font-serif text-xl font-medium text-primary-900 dark:text-gold-300">
                                        {sure.value}
                                    </span>
                                </div>
                                <p className="mt-1.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    {sure.label}
                                </p>
                                {sure.note && (
                                    <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-450">
                                        {sure.note}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Hükümler */}
                    <div className="mt-10">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-450 dark:text-slate-500">
                            Bu aşamada kanun ne diyor?
                        </h4>
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                            {adim.maddeler.map((madde) => (
                                <div
                                    key={madde.label}
                                    className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5 dark:border-slate-800/60 dark:bg-slate-950/30"
                                >
                                    <h5 className="flex items-start gap-2 font-semibold text-slate-900 dark:text-slate-100">
                                        <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.bg}`} />
                                        {madde.label}
                                    </h5>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                        {madde.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Yapılacaklar / Riskler */}
                    <div className="mt-10 grid gap-6 lg:grid-cols-2">
                        <div className="rounded-2xl border border-emerald-500/25 bg-emerald-50/50 p-6 dark:border-emerald-500/20 dark:bg-emerald-950/15">
                            <h4 className="flex items-center gap-2 font-serif text-lg font-medium text-emerald-800 dark:text-emerald-300">
                                <ListChecks className="h-5 w-5" />
                                Yapılacaklar listesi
                            </h4>
                            <ul className="mt-4 space-y-3">
                                {adim.yapilacaklar.map((item) => (
                                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-rose-500/25 bg-rose-50/50 p-6 dark:border-rose-500/20 dark:bg-rose-950/15">
                            <h4 className="flex items-center gap-2 font-serif text-lg font-medium text-rose-800 dark:text-rose-300">
                                <AlertTriangle className="h-5 w-5" />
                                Sık yapılan hatalar
                            </h4>
                            <ul className="mt-4 space-y-3">
                                {adim.riskler.map((item) => (
                                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                                        <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* İlgili içtihat */}
                    {adim.ictihatIds.length > 0 && (
                        <div className="mt-8 rounded-2xl border border-gold-500/30 bg-gold-50/60 p-6 dark:border-gold-700/40 dark:bg-gold-950/20">
                            <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-700 dark:text-gold-400">
                                <Gavel className="h-4 w-4" />
                                Bu aşamayı belirleyen kararlar
                            </h4>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {adim.ictihatIds.map((id) => {
                                    const karar = ICTIHATLAR.find((item) => item.id === id);
                                    if (!karar) return null;
                                    return (
                                        <button
                                            key={id}
                                            type="button"
                                            onClick={() => onIctihatSec(id)}
                                            className="group inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-white px-4 py-2 text-left text-xs font-semibold text-primary-900 transition-colors hover:border-gold-500 hover:bg-gold-50 dark:bg-slate-900 dark:text-gold-300 dark:hover:bg-slate-850"
                                        >
                                            {karar.mahkeme} {karar.daire} · {karar.tarih}
                                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Aşama gezinmesi */}
                    <div className="mt-10 flex items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
                        <button
                            type="button"
                            onClick={() => onChange(Math.max(1, adim.id - 1))}
                            disabled={adim.id === 1}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-gold-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:text-slate-300"
                        >
                            <ChevronLeft className="h-4 w-4" /> Önceki
                        </button>
                        <span className="text-sm font-medium text-slate-450 dark:text-slate-500">
                            {adim.id} / {DONUSUM_ADIMLARI.length}
                        </span>
                        <button
                            type="button"
                            onClick={() => onChange(Math.min(DONUSUM_ADIMLARI.length, adim.id + 1))}
                            disabled={adim.id === DONUSUM_ADIMLARI.length}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-gold-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:text-slate-300"
                        >
                            Sonraki <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </Card>
    );
}

/* ——— 3a. Süre hesaplayıcı ——————————————————————————————————————— */

function SureHesaplayici() {
    const [kuralId, setKuralId] = useState(SURE_KURALLARI[0].id);
    const [tarih, setTarih] = useState("");

    const kural = SURE_KURALLARI.find((item) => item.id === kuralId) ?? SURE_KURALLARI[0];
    const baslangic = parseISODate(tarih);

    const sonuc = useMemo(() => {
        if (!baslangic) return null;
        // Süreler tebliğ/olay gününü izleyen günden işlemeye başlar.
        const bitis = addDays(baslangic, kural.gun);
        const kalan = diffInDays(startOfToday(), bitis);
        return { bitis, kalan };
    }, [baslangic, kural.gun]);

    return (
        <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
                <label
                    htmlFor="sure-kurali"
                    className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-450 dark:text-slate-500"
                >
                    Hangi süreyi hesaplıyorsunuz?
                </label>
                <select
                    id="sure-kurali"
                    value={kuralId}
                    onChange={(event) => setKuralId(event.target.value)}
                    className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gold-500/60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                >
                    {SURE_KURALLARI.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.label} ({item.gun} gün)
                        </option>
                    ))}
                </select>

                <label
                    htmlFor="sure-tarih"
                    className="mt-6 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-450 dark:text-slate-500"
                >
                    Başlangıç tarihi
                </label>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{kural.baslangic}</p>
                <input
                    id="sure-tarih"
                    type="date"
                    value={tarih}
                    onChange={(event) => setTarih(event.target.value)}
                    className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gold-500/60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
            </div>

            <div className="lg:col-span-3">
                <div
                    className={`h-full rounded-2xl border p-6 transition-colors ${
                        sonuc && sonuc.kalan < 0
                            ? "border-rose-500/40 bg-rose-50/60 dark:border-rose-500/30 dark:bg-rose-950/20"
                            : "border-slate-200/70 bg-ivory-50 dark:border-slate-800/70 dark:bg-slate-950/40"
                    }`}
                >
                    {!sonuc ? (
                        <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center">
                            <CalendarClock className="h-10 w-10 text-slate-300 dark:text-slate-700" />
                            <p className="mt-4 max-w-xs text-sm text-slate-500 dark:text-slate-450">
                                Başlangıç tarihini girin; son günü ve kalan süreyi birlikte hesaplayalım.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-450 dark:text-slate-500">
                                    Son gün
                                </span>
                                <p className="mt-2 font-serif text-3xl font-medium text-primary-900 dark:text-gold-300 md:text-4xl">
                                    {TR_DATE.format(sonuc.bitis)}
                                </p>
                            </div>

                            <div
                                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                                    sonuc.kalan < 0
                                        ? "bg-rose-600 text-white"
                                        : sonuc.kalan <= 5
                                          ? "bg-amber-500 text-slate-950"
                                          : "bg-emerald-600 text-white"
                                }`}
                            >
                                {sonuc.kalan < 0 ? (
                                    <>
                                        <AlertTriangle className="h-4 w-4" />
                                        Süre {Math.abs(sonuc.kalan)} gün önce doldu
                                    </>
                                ) : sonuc.kalan === 0 ? (
                                    <>
                                        <AlertTriangle className="h-4 w-4" />
                                        Bugün son gün
                                    </>
                                ) : (
                                    <>
                                        <Clock className="h-4 w-4" />
                                        {sonuc.kalan} gün kaldı
                                    </>
                                )}
                            </div>

                            <div className="rounded-xl border border-slate-200/70 bg-white p-4 dark:border-slate-800/70 dark:bg-slate-900">
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-700 dark:text-gold-400">
                                    <Scale className="h-3.5 w-3.5" />
                                    {kural.dayanak}
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                                    {kural.aciklama}
                                </p>
                            </div>

                            {kural.kritik && (
                                <p className="flex gap-2 text-xs leading-relaxed text-rose-700 dark:text-rose-300">
                                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                                    Bu süre hak düşürücü niteliktedir; kaçırılması hakkın tümüyle kaybına yol açar.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ——— 3b. Arsa payı çoğunluk hesaplayıcı ———————————————————————— */

interface PaydasSatiri {
    key: number;
    ad: string;
    pay: string;
    katiliyor: boolean;
}

let paydasKey = 0;
const yeniSatir = (ad = "", pay = "", katiliyor = false): PaydasSatiri => ({
    key: paydasKey++,
    ad,
    pay,
    katiliyor,
});

function CogunlukHesaplayici() {
    const [satirlar, setSatirlar] = useState<PaydasSatiri[]>(() => [
        yeniSatir("1. Daire", "10", true),
        yeniSatir("2. Daire", "10", true),
        yeniSatir("3. Daire", "10", false),
        yeniSatir("Dükkân", "30", false),
    ]);

    const guncelle = (key: number, patch: Partial<PaydasSatiri>) =>
        setSatirlar((prev) => prev.map((row) => (row.key === key ? { ...row, ...patch } : row)));

    const hesap = useMemo(() => {
        let toplam = 0;
        let anlasan = 0;
        let kisi = 0;
        let anlasanKisi = 0;
        satirlar.forEach((row) => {
            const pay = Number(row.pay.replace(",", "."));
            if (!Number.isFinite(pay) || pay <= 0) return;
            toplam += pay;
            kisi += 1;
            if (row.katiliyor) {
                anlasan += pay;
                anlasanKisi += 1;
            }
        });
        const hisseOrani = toplam > 0 ? (anlasan / toplam) * 100 : 0;
        const kisiOrani = kisi > 0 ? (anlasanKisi / kisi) * 100 : 0;
        return {
            toplam,
            anlasan,
            kisi,
            anlasanKisi,
            hisseOrani,
            kisiOrani,
            saglandi: toplam > 0 && anlasan / toplam > 0.5,
            yanilsama: toplam > 0 && kisiOrani > 50 && hisseOrani <= 50,
        };
    }, [satirlar]);

    return (
        <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Her bağımsız bölümün tapudaki arsa payını (kesirin üst kısmını) girin ve karara katılan
                    paydaşları işaretleyin. Paydalar aynı olduğu için oran doğru hesaplanır.
                </p>

                <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-slate-950/40 dark:text-slate-450">
                            <tr>
                                <th className="px-4 py-3">Bağımsız bölüm</th>
                                <th className="px-4 py-3 w-28">Arsa payı</th>
                                <th className="px-4 py-3 w-24 text-center">Katılıyor</th>
                                <th className="px-2 py-3 w-12" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                            {satirlar.map((row) => (
                                <tr key={row.key} className="bg-white dark:bg-slate-900">
                                    <td className="px-4 py-2">
                                        <input
                                            type="text"
                                            value={row.ad}
                                            onChange={(event) => guncelle(row.key, { ad: event.target.value })}
                                            placeholder="Ör. 5. Daire"
                                            aria-label="Bağımsız bölüm adı"
                                            className="w-full rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-slate-900 transition-colors focus:border-gold-500/60 focus:outline-none dark:text-slate-100"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            type="number"
                                            inputMode="decimal"
                                            min="0"
                                            step="any"
                                            value={row.pay}
                                            onChange={(event) => guncelle(row.key, { pay: event.target.value })}
                                            aria-label="Arsa payı"
                                            className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-slate-900 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gold-500/60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                                        />
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <input
                                            type="checkbox"
                                            checked={row.katiliyor}
                                            onChange={(event) => guncelle(row.key, { katiliyor: event.target.checked })}
                                            aria-label={`${row.ad || "Bağımsız bölüm"} karara katılıyor`}
                                            className="h-5 w-5 cursor-pointer rounded border-slate-300 text-primary-900 accent-gold-500 focus:ring-gold-500 dark:border-slate-700"
                                        />
                                    </td>
                                    <td className="px-2 py-2 text-center">
                                        <button
                                            type="button"
                                            onClick={() => setSatirlar((prev) => prev.filter((item) => item.key !== row.key))}
                                            disabled={satirlar.length <= 1}
                                            aria-label="Satırı sil"
                                            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30 dark:hover:bg-rose-950/30"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => setSatirlar((prev) => [...prev, yeniSatir()])}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-gold-500 dark:border-slate-800 dark:text-slate-300"
                    >
                        <Plus className="h-4 w-4" /> Bağımsız bölüm ekle
                    </button>
                    <button
                        type="button"
                        onClick={() => setSatirlar(satirlar.map((row) => ({ ...row, katiliyor: false })))}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-gold-500 dark:border-slate-800 dark:text-slate-300"
                    >
                        <RefreshCw className="h-4 w-4" /> İşaretleri temizle
                    </button>
                </div>
            </div>

            <div className="lg:col-span-2">
                <div
                    className={`h-full rounded-2xl border p-6 ${
                        hesap.saglandi
                            ? "border-emerald-500/40 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-950/20"
                            : "border-amber-500/40 bg-amber-50/60 dark:border-amber-500/30 dark:bg-amber-950/20"
                    }`}
                >
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-450">
                        Hisse ağırlıklı oran
                    </span>
                    <p className="mt-2 font-serif text-5xl font-medium text-primary-900 dark:text-gold-300">
                        {hesap.hisseOrani.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}
                        <span className="text-2xl">%</span>
                    </p>
                    <div
                        className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
                        role="progressbar"
                        aria-valuenow={Math.round(hesap.hisseOrani)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Hisse ağırlıklı anlaşma oranı"
                    >
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${
                                hesap.saglandi ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                            style={{ width: `${Math.min(100, hesap.hisseOrani)}%` }}
                        />
                    </div>

                    <p
                        className={`mt-4 text-sm font-bold ${
                            hesap.saglandi
                                ? "text-emerald-700 dark:text-emerald-300"
                                : "text-amber-700 dark:text-amber-300"
                        }`}
                    >
                        {hesap.saglandi
                            ? "Salt çoğunluk sağlandı (%50'nin üzeri)"
                            : "Salt çoğunluk henüz sağlanmadı"}
                    </p>

                    <dl className="mt-5 space-y-2 border-t border-slate-200/70 pt-5 text-sm dark:border-slate-800/70">
                        <div className="flex justify-between gap-2">
                            <dt className="text-slate-600 dark:text-slate-400">Anlaşan arsa payı</dt>
                            <dd className="font-semibold text-slate-900 dark:text-slate-100">
                                {hesap.anlasan.toLocaleString("tr-TR", { maximumFractionDigits: 4 })} /{" "}
                                {hesap.toplam.toLocaleString("tr-TR", { maximumFractionDigits: 4 })}
                            </dd>
                        </div>
                        <div className="flex justify-between gap-2">
                            <dt className="text-slate-600 dark:text-slate-400">Kişi sayısına göre oran</dt>
                            <dd className="font-semibold text-slate-900 dark:text-slate-100">
                                {hesap.anlasanKisi} / {hesap.kisi} (
                                {hesap.kisiOrani.toLocaleString("tr-TR", { maximumFractionDigits: 1 })}%)
                            </dd>
                        </div>
                    </dl>

                    {hesap.yanilsama && (
                        <div className="mt-5 rounded-xl border border-rose-500/30 bg-rose-50 p-4 dark:border-rose-500/25 dark:bg-rose-950/25">
                            <p className="flex gap-2 text-xs font-semibold leading-relaxed text-rose-800 dark:text-rose-300">
                                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                                Dikkat: kişi sayısına göre çoğunluk var, hisse ağırlığına göre yok. 6306 sayılı
                                Kanun m.6/1 hisse oranını esas aldığından bu karar geçerli değildir.
                            </p>
                        </div>
                    )}

                    <p className="mt-5 text-xs leading-relaxed text-slate-500 dark:text-slate-450">
                        Hesaplama yalnızca bilgilendirme amaçlıdır. Tapu kayıtlarındaki güncel arsa payları,
                        mirasçılık durumu, hisseli mülkiyet ve vekaletnameler avukat denetiminde incelenmelidir.
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ——— 3c. Sözleşme kontrol listesi ——————————————————————————————— */

function SozlesmeKontrolListesi() {
    const [isaretli, setIsaretli] = useState<Record<string, boolean>>({});

    const toplamAgirlik = useMemo(
        () => SOZLESME_KONTROL.reduce((sum, item) => sum + item.agirlik, 0),
        []
    );
    const kazanilan = useMemo(
        () => SOZLESME_KONTROL.reduce((sum, item) => sum + (isaretli[item.id] ? item.agirlik : 0), 0),
        [isaretli]
    );
    const yuzde = Math.round((kazanilan / toplamAgirlik) * 100);
    const eksikKritik = SOZLESME_KONTROL.filter((item) => item.agirlik === 3 && !isaretli[item.id]);

    const durum =
        yuzde >= 85 && eksikKritik.length === 0
            ? { label: "Sözleşme güçlü korumalı", tone: "emerald" as const }
            : yuzde >= 55
              ? { label: "Önemli boşluklar var", tone: "amber" as const }
              : { label: "Yüksek risk", tone: "rose" as const };

    const toneClasses = {
        emerald: {
            box: "border-emerald-500/40 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-950/20",
            bar: "bg-emerald-500",
            text: "text-emerald-700 dark:text-emerald-300",
        },
        amber: {
            box: "border-amber-500/40 bg-amber-50/60 dark:border-amber-500/30 dark:bg-amber-950/20",
            bar: "bg-amber-500",
            text: "text-amber-700 dark:text-amber-300",
        },
        rose: {
            box: "border-rose-500/40 bg-rose-50/60 dark:border-rose-500/30 dark:bg-rose-950/20",
            bar: "bg-rose-500",
            text: "text-rose-700 dark:text-rose-300",
        },
    }[durum.tone];

    return (
        <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Elinizdeki arsa payı karşılığı inşaat sözleşmesinde bulunan maddeleri işaretleyin.
                    <span className="ml-1 font-semibold text-rose-700 dark:text-rose-300">Kırmızı etiketli</span>{" "}
                    maddeler olmazsa olmazdır.
                </p>
                <ul className="mt-5 space-y-2">
                    {SOZLESME_KONTROL.map((item) => {
                        const checked = Boolean(isaretli[item.id]);
                        return (
                            <li key={item.id}>
                                <label
                                    className={`flex cursor-pointer gap-3 rounded-2xl border p-4 transition-colors ${
                                        checked
                                            ? "border-emerald-500/40 bg-emerald-50/50 dark:border-emerald-500/30 dark:bg-emerald-950/15"
                                            : "border-slate-200/80 bg-white hover:border-gold-500/60 dark:border-slate-800 dark:bg-slate-900"
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={(event) =>
                                            setIsaretli((prev) => ({ ...prev, [item.id]: event.target.checked }))
                                        }
                                        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 accent-gold-500 focus:ring-gold-500 dark:border-slate-700"
                                    />
                                    <span className="min-w-0">
                                        <span className="flex flex-wrap items-center gap-2">
                                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                                                {item.baslik}
                                            </span>
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                                    item.agirlik === 3
                                                        ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                                                        : item.agirlik === 2
                                                          ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                                                          : "bg-slate-500/15 text-slate-600 dark:text-slate-400"
                                                }`}
                                            >
                                                {item.agirlik === 3
                                                    ? "Olmazsa olmaz"
                                                    : item.agirlik === 2
                                                      ? "Önemli"
                                                      : "İyi olur"}
                                            </span>
                                        </span>
                                        <span className="mt-1.5 block text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                            {item.aciklama}
                                        </span>
                                    </span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="lg:col-span-2">
                <div className={`sticky top-40 rounded-2xl border p-6 ${toneClasses.box}`}>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-450">
                        Koruma düzeyi
                    </span>
                    <p className="mt-2 font-serif text-5xl font-medium text-primary-900 dark:text-gold-300">
                        {yuzde}
                        <span className="text-2xl">%</span>
                    </p>
                    <div
                        className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
                        role="progressbar"
                        aria-valuenow={yuzde}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Sözleşme koruma düzeyi"
                    >
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${toneClasses.bar}`}
                            style={{ width: `${yuzde}%` }}
                        />
                    </div>
                    <p className={`mt-4 text-sm font-bold ${toneClasses.text}`}>{durum.label}</p>

                    {eksikKritik.length > 0 && (
                        <div className="mt-5 border-t border-slate-200/70 pt-5 dark:border-slate-800/70">
                            <p className="text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-300">
                                Eksik olmazsa olmaz maddeler ({eksikKritik.length})
                            </p>
                            <ul className="mt-3 space-y-1.5">
                                {eksikKritik.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex gap-2 text-sm leading-snug text-slate-700 dark:text-slate-300"
                                    >
                                        <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500" />
                                        {item.baslik}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <Link
                        href="/iletisim?konu=Kentsel%20D%C3%B6n%C3%BC%C5%9F%C3%BCm%20S%C3%B6zle%C5%9Fme%20%C4%B0ncelemesi#randevu"
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800 dark:bg-gold-500 dark:text-slate-950 dark:hover:bg-gold-400"
                    >
                        Sözleşmemi İnceletmek İstiyorum
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

/* ——— 3. Araçlar kabuğu ————————————————————————————————————————— */

const ARACLAR = [
    { id: "sure", label: "Süre Hesaplayıcı", icon: CalendarClock },
    { id: "cogunluk", label: "Arsa Payı Çoğunluk", icon: Percent },
    { id: "sozlesme", label: "Sözleşme Kontrolü", icon: ClipboardCheck },
] as const;

function Araclar() {
    const [aktif, setAktif] = useState<(typeof ARACLAR)[number]["id"]>("sure");

    return (
        <Card className="overflow-hidden">
            <div
                role="tablist"
                aria-label="Kentsel dönüşüm hesaplayıcıları"
                className="flex flex-col border-b border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/30 sm:flex-row"
            >
                {ARACLAR.map((arac) => {
                    const Icon = arac.icon;
                    const isActive = aktif === arac.id;
                    return (
                        <button
                            key={arac.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setAktif(arac.id)}
                            className={`flex flex-1 items-center justify-center gap-2.5 border-b-2 px-5 py-4 text-sm font-semibold transition-colors ${
                                isActive
                                    ? "border-gold-500 bg-white text-primary-900 dark:bg-slate-900 dark:text-gold-300"
                                    : "border-transparent text-slate-600 hover:bg-white/70 dark:text-slate-400 dark:hover:bg-slate-900/50"
                            }`}
                        >
                            <Icon className="h-4 w-4" />
                            {arac.label}
                        </button>
                    );
                })}
            </div>

            <div className="p-6 md:p-10">
                {aktif === "sure" && <SureHesaplayici />}
                {aktif === "cogunluk" && <CogunlukHesaplayici />}
                {aktif === "sozlesme" && <SozlesmeKontrolListesi />}
            </div>
        </Card>
    );
}

/* ——— 4. Durum analizi sihirbazı ————————————————————————————————— */

function DurumAnalizi({ onIctihatSec }: { onIctihatSec: (id: string) => void }) {
    const [adim, setAdim] = useState(0);
    const [cevaplar, setCevaplar] = useState<Record<string, string>>({});
    const [bitti, setBitti] = useState(false);

    const cevapla = (id: string, value: string) => {
        setCevaplar((prev) => ({ ...prev, [id]: value }));
        if (adim < SIHIRBAZ_SORULARI.length - 1) setAdim(adim + 1);
        else setBitti(true);
    };

    const sifirla = () => {
        setCevaplar({});
        setAdim(0);
        setBitti(false);
    };

    const soru = SIHIRBAZ_SORULARI[adim];
    const sonuc = bitti ? sihirbazSonucu(cevaplar) : null;
    const hedefAdim = sonuc ? DONUSUM_ADIMLARI.find((item) => item.slug === sonuc.adimSlug) : undefined;

    return (
        <div className="relative isolate overflow-hidden rounded-3xl bg-primary-950 p-6 text-white md:p-12">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.08]" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-hero-glow" />

            <div className="mx-auto max-w-3xl">
                <div className="text-center">
                    <span className="eyebrow justify-center !text-gold-400">Ücretsiz ön değerlendirme</span>
                    <h2 className="mt-5 font-serif text-3xl font-medium md:text-4xl">
                        Dosyanız hangi aşamada, ilk hamle ne olmalı?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-base font-light leading-relaxed text-slate-300">
                        Dört soruyu yanıtlayın; konumunuza göre öncelik sıranızı, somut adımları ve en büyük
                        hukuki riski birlikte görelim.
                    </p>
                </div>

                <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm md:p-8">
                    <AnimatePresence mode="wait">
                        {!bitti ? (
                            <motion.div
                                key={`soru-${adim}`}
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -24 }}
                                transition={{ duration: 0.22 }}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                        Soru {adim + 1} / {SIHIRBAZ_SORULARI.length}
                                    </span>
                                    <div className="flex gap-1.5" aria-hidden="true">
                                        {SIHIRBAZ_SORULARI.map((_, index) => (
                                            <span
                                                key={index}
                                                className={`h-1.5 w-7 rounded-full transition-colors ${
                                                    index <= adim ? "bg-gold-500" : "bg-white/15"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <h3 className="mt-5 font-serif text-xl font-medium md:text-2xl">{soru.soru}</h3>
                                {soru.ipucu && (
                                    <p className="mt-3 rounded-xl border-l-2 border-gold-500 bg-white/5 px-4 py-2.5 text-sm text-slate-300">
                                        {soru.ipucu}
                                    </p>
                                )}

                                <div className="mt-6 space-y-3">
                                    {soru.secenekler.map((secenek) => (
                                        <button
                                            key={secenek.value}
                                            type="button"
                                            onClick={() => cevapla(soru.id, secenek.value)}
                                            className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.03] px-5 py-4 text-left text-sm font-medium text-slate-200 transition-all hover:border-gold-400/60 hover:bg-white/[0.07] hover:text-white md:text-base"
                                        >
                                            <span>{secenek.text}</span>
                                            <ChevronRight className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-gold-400" />
                                        </button>
                                    ))}
                                </div>

                                {adim > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setAdim(adim - 1)}
                                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-gold-300"
                                    >
                                        <ChevronLeft className="h-4 w-4" /> Önceki soru
                                    </button>
                                )}
                            </motion.div>
                        ) : (
                            sonuc && (
                                <motion.div
                                    key="sonuc"
                                    initial={{ opacity: 0, scale: 0.97 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-6"
                                >
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="rounded-full bg-gold-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-950">
                                            {sonuc.badge}
                                        </span>
                                        <h3 className="font-serif text-2xl font-medium text-gold-200">
                                            {sonuc.title}
                                        </h3>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                            Öncelik
                                        </span>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-200">{sonuc.oncelik}</p>
                                    </div>

                                    <div>
                                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                            Şimdi yapılacaklar
                                        </span>
                                        <ol className="mt-3 space-y-3">
                                            {sonuc.adimlar.map((item, index) => (
                                                <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-200">
                                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-xs font-bold text-gold-300">
                                                        {index + 1}
                                                    </span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ol>
                                    </div>

                                    <div className="rounded-2xl border border-rose-500/25 bg-rose-950/25 p-5">
                                        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-rose-300">
                                            <AlertTriangle className="h-4 w-4" /> En büyük risk
                                        </span>
                                        <p className="mt-2 text-sm font-medium leading-relaxed text-rose-100">
                                            {sonuc.risk}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {hedefAdim && (
                                            <a
                                                href="#yol-haritasi"
                                                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-gold-400 hover:text-white"
                                            >
                                                İlgili aşama: {hedefAdim.id}. {hedefAdim.title}
                                                <ArrowUpRight className="h-3.5 w-3.5" />
                                            </a>
                                        )}
                                        {sonuc.ictihatIds.map((id) => {
                                            const karar = ICTIHATLAR.find((item) => item.id === id);
                                            if (!karar) return null;
                                            return (
                                                <button
                                                    key={id}
                                                    type="button"
                                                    onClick={() => onIctihatSec(id)}
                                                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-gold-400 hover:text-white"
                                                >
                                                    {karar.mahkeme} {karar.daire} · {karar.tarih}
                                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
                                        <Link
                                            href={`/iletisim?konu=${encodeURIComponent("Kentsel Dönüşüm — " + sonuc.title)}#randevu`}
                                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-4 text-sm font-semibold text-slate-950 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gold-400"
                                        >
                                            <Phone className="h-4 w-4" /> {sonuc.cta}
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={sifirla}
                                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-4 text-sm font-semibold text-slate-200 transition-colors hover:border-gold-400 hover:text-white"
                                        >
                                            <RefreshCw className="h-4 w-4" /> Baştan Başla
                                        </button>
                                    </div>
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

/* ——— 5. İçtihat ————————————————————————————————————————————————— */

function IctihatKarti({ karar, open }: { karar: Ictihat; open: boolean }) {
    return (
        <details
            id={`ictihat-${karar.id}`}
            open={open}
            className="group scroll-mt-40 overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-colors hover:border-gold-500/60 dark:border-slate-800 dark:bg-slate-900"
        >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-6">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold">
                        <span className="rounded-full bg-primary-900 px-2.5 py-1 text-white dark:bg-gold-500 dark:text-slate-950">
                            {karar.mahkeme}
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">{karar.daire}</span>
                        <span className="text-slate-450 dark:text-slate-500">
                            E. {karar.esas} · K. {karar.karar} · {karar.tarih}
                        </span>
                    </div>
                    <h3 className="mt-3 font-serif text-lg leading-snug text-slate-900 dark:text-slate-100 sm:text-xl">
                        {karar.konu}
                    </h3>
                </div>
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 text-primary-900 transition-all duration-300 group-open:rotate-180 group-open:border-gold-500 group-open:bg-gold-500 group-open:text-white dark:border-slate-700 dark:text-slate-100">
                    <ChevronDown className="h-4 w-4" />
                </span>
            </summary>

            <div className="border-t border-slate-100 px-6 pb-6 dark:border-slate-800/60">
                <div className="mt-5 rounded-xl border border-gold-300/70 bg-gold-50 p-5 dark:border-gold-700/50 dark:bg-gold-950/20">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700 dark:text-gold-400">
                        Karardaki ilke
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-slate-800 dark:text-slate-200">{karar.ilke}</p>
                </div>

                <div className="mt-4 rounded-xl border border-slate-200/70 bg-slate-50/70 p-5 dark:border-slate-800/60 dark:bg-slate-950/30">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-450">
                        Sizin için pratik sonucu
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {karar.pratikSonuc}
                    </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                    {karar.etiketler.map((etiket) => (
                        <span
                            key={etiket}
                            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400"
                        >
                            {etiket}
                        </span>
                    ))}
                </div>

                {karar.url ? (
                    <a
                        href={karar.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-800 underline decoration-gold-500/50 underline-offset-4 transition-colors hover:decoration-gold-500 dark:text-gold-400"
                    >
                        Kararın tam metni
                        <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                ) : (
                    karar.kaynakNotu && (
                        <p className="mt-5 text-xs italic text-slate-500 dark:text-slate-450">{karar.kaynakNotu}</p>
                    )
                )}
            </div>
        </details>
    );
}

function IctihatBolumu({ secili }: { secili: string }) {
    const [filtre, setFiltre] = useState<"tumu" | "Yargıtay" | "Danıştay" | "Anayasa Mahkemesi">("tumu");

    const liste = useMemo(
        () => (filtre === "tumu" ? ICTIHATLAR : ICTIHATLAR.filter((item) => item.mahkeme === filtre)),
        [filtre]
    );

    const sayac = (mahkeme: string) => ICTIHATLAR.filter((item) => item.mahkeme === mahkeme).length;

    return (
        <>
            <div className="mb-6 flex flex-wrap gap-2">
                {(
                    [
                        { id: "tumu" as const, label: `Tümü (${ICTIHATLAR.length})` },
                        { id: "Yargıtay" as const, label: `Yargıtay (${sayac("Yargıtay")})` },
                        { id: "Danıştay" as const, label: `Danıştay (${sayac("Danıştay")})` },
                        {
                            id: "Anayasa Mahkemesi" as const,
                            label: `Anayasa Mahkemesi (${sayac("Anayasa Mahkemesi")})`,
                        },
                    ]
                ).map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setFiltre(item.id)}
                        aria-pressed={filtre === item.id}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                            filtre === item.id
                                ? "border-primary-900 bg-primary-900 text-white dark:border-gold-500 dark:bg-gold-500 dark:text-slate-950"
                                : "border-slate-200 bg-white text-slate-700 hover:border-gold-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-gold-500"
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {liste.map((karar) => (
                    <IctihatKarti key={karar.id} karar={karar} open={secili === karar.id} />
                ))}
            </div>
        </>
    );
}

/* ——— 6. Pratik bilgiler ————————————————————————————————————————— */

function PratikBilgiler() {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
                {PRATIK_PANOLAR.map((pano) => {
                    const Icon = ICONS[pano.icon];
                    return (
                        <Card key={pano.id} className="flex flex-col p-6">
                            <div className="flex items-start gap-3">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500/12 text-gold-600 dark:text-gold-400">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="font-serif text-xl font-medium text-slate-900 dark:text-slate-100">
                                        {pano.baslik}
                                    </h3>
                                    <p className="mt-1 text-xs font-semibold text-slate-450 dark:text-slate-500">
                                        {pano.dayanak}
                                    </p>
                                </div>
                            </div>

                            <dl className="mt-6 flex-grow divide-y divide-slate-100 dark:divide-slate-800/70">
                                {pano.satirlar.map((satir) => (
                                    <div key={satir.label} className="py-3 first:pt-0">
                                        <div className="flex items-baseline justify-between gap-3">
                                            <dt className="text-sm text-slate-700 dark:text-slate-300">
                                                {satir.label}
                                            </dt>
                                            <dd className="shrink-0 text-right text-sm font-bold text-primary-900 dark:text-gold-300">
                                                {satir.value}
                                            </dd>
                                        </div>
                                        {satir.note && (
                                            <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-450">
                                                {satir.note}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </dl>

                            {pano.not && (
                                <p className="mt-5 rounded-xl border-l-2 border-gold-500 bg-ivory-100 px-4 py-3 text-xs leading-relaxed text-slate-700 dark:bg-slate-950/50 dark:text-slate-300">
                                    {pano.not}
                                </p>
                            )}
                        </Card>
                    );
                })}
            </div>

            <Card className="p-6 md:p-8">
                <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500/12 text-gold-600 dark:text-gold-400">
                        <FileText className="h-5 w-5" />
                    </span>
                    <div>
                        <h3 className="font-serif text-xl font-medium text-slate-900 dark:text-slate-100">
                            Pay Satışı Müracaatında İstenen Belgeler
                        </h3>
                        <p className="mt-1 text-xs font-semibold text-slate-450 dark:text-slate-500">
                            6306 Sayılı Kanunun Uygulama Yönetmeliği m.15/A-1
                        </p>
                    </div>
                </div>

                <ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {BELGE_LISTESI.map((belge, index) => (
                        <li
                            key={belge.baslik}
                            className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5 dark:border-slate-800/60 dark:bg-slate-950/30"
                        >
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-900 text-xs font-bold text-white dark:bg-gold-500 dark:text-slate-950">
                                {index + 1}
                            </span>
                            <h4 className="mt-3 font-semibold text-slate-900 dark:text-slate-100">{belge.baslik}</h4>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                {belge.aciklama}
                            </p>
                        </li>
                    ))}
                </ol>

                <p className="mt-6 flex gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                    Satış işleminin yapılabilmesi için yapıların yıktırılmış olması gerekmez. Dosyadaki tek bir
                    eksik belge, satış müracaatının reddine ve sürecin aylarca gecikmesine yol açar.
                </p>
            </Card>
        </div>
    );
}

/* ——— 7. SSS —————————————————————————————————————————————————————— */

function SorularBolumu() {
    return (
        <div className="space-y-4">
            {REHBER_SSS.map((item) => (
                <details
                    key={item.id}
                    id={item.id}
                    className="group scroll-mt-40 overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-colors hover:border-gold-500/60 dark:border-slate-800 dark:bg-slate-900"
                >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-6 text-slate-900 transition-colors hover:text-primary-800 dark:text-slate-100 dark:hover:text-gold-300">
                        <span className="font-serif text-lg leading-snug sm:text-xl">{item.soru}</span>
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 text-primary-900 transition-all duration-300 group-open:rotate-180 group-open:border-gold-500 group-open:bg-gold-500 group-open:text-white dark:border-slate-700 dark:text-slate-100">
                            <ChevronDown className="h-4 w-4" />
                        </span>
                    </summary>
                    <div className="space-y-4 border-t border-slate-100 px-6 pb-6 pt-5 leading-relaxed text-slate-600 dark:border-slate-800/60 dark:text-slate-400">
                        {item.cevap.map((paragraf, index) => (
                            <p key={index}>{paragraf}</p>
                        ))}
                    </div>
                </details>
            ))}
        </div>
    );
}

/* ——— Ana bileşen ———————————————————————————————————————————————— */

export default function KentselDonusumClient() {
    const [aktifAdim, setAktifAdim] = useState(1);
    const [seciliIctihat, setSeciliIctihat] = useState("");
    const ictihatRef = useRef<HTMLElement | null>(null);

    const ictihataGit = useCallback((id: string) => {
        setSeciliIctihat(id);
        // Kart açıldıktan sonra konumlandır.
        requestAnimationFrame(() => {
            document.getElementById(`ictihat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }, []);

    return (
        <div>
            <SectionNav />

            <div className="space-y-20">
                <section id="yol-haritasi" className="scroll-mt-40" aria-labelledby="yol-haritasi-baslik">
                    <SectionHeading
                        eyebrow="Adım adım süreç"
                        title="Kentsel Dönüşüm Yol Haritası"
                        description={
                            <>
                                Riskli yapı tespitinden anahtar teslimine kadar altı aşama. Her aşamada kanunun ne
                                dediğini, kaç gününüz olduğunu, ne yapmanız gerektiğini ve en sık yapılan hataları
                                bir arada görün.
                            </>
                        }
                    />
                    <YolHaritasi activeId={aktifAdim} onChange={setAktifAdim} onIctihatSec={ictihataGit} />
                </section>

                <section id="araclar" className="scroll-mt-40" aria-labelledby="araclar-baslik">
                    <SectionHeading
                        eyebrow="Hesaplayıcılar"
                        title="Kendi Dosyanız İçin Hesaplayın"
                        description="Süre hesaplayıcı son günü ve kalan günü verir; arsa payı hesaplayıcı salt çoğunluğun gerçekten sağlandığını gösterir; sözleşme kontrol listesi müteahhit sözleşmenizdeki boşlukları ortaya çıkarır."
                    />
                    <Araclar />
                </section>

                <section id="durum-analizi" className="scroll-mt-40" aria-label="Durum analizi">
                    <DurumAnalizi onIctihatSec={ictihataGit} />
                </section>

                <section
                    id="ictihat"
                    ref={ictihatRef as React.RefObject<HTMLElement>}
                    className="scroll-mt-40"
                    aria-labelledby="ictihat-baslik"
                >
                    <SectionHeading
                        eyebrow="Yargı kararları"
                        title="Uygulamayı Belirleyen İçtihatlar"
                        description="Kanun metni tek başına yeterli değildir; mahkemelerin bu metni nasıl uyguladığı sonucu belirler. Aşağıdaki kararların her birinde hem hukuki ilkeyi hem de sizin için somut sonucunu bulacaksınız."
                    />
                    <IctihatBolumu secili={seciliIctihat} />
                </section>

                <section id="pratik-bilgiler" className="scroll-mt-40" aria-labelledby="pratik-baslik">
                    <SectionHeading
                        eyebrow="Rakamlar ve haklar"
                        title="Pratik Bilgiler: Para, Süre ve Yeter Sayılar"
                        description="Kira yardımı süreleri, defaten ödeme katsayıları, vergi ve harç muafiyetleri ile karar yeter sayıları — hepsi güncel mevzuat metnine dayanarak tek tabloda."
                    />
                    <PratikBilgiler />
                </section>

                <section id="sorular" className="scroll-mt-40" aria-labelledby="sorular-baslik">
                    <SectionHeading
                        eyebrow="Sık sorulanlar"
                        title="En Çok Sorulan Sekiz Soru"
                        description="Kentsel dönüşüm görüşmelerinde en sık karşımıza çıkan sorular ve mevzuata dayalı net cevapları."
                    />
                    <SorularBolumu />
                </section>
            </div>

            {/* Yasal uyarı */}
            <div className="mt-16 rounded-2xl border border-slate-200/80 bg-ivory-50 p-6 dark:border-slate-800 dark:bg-slate-900/60">
                <h2 className="flex items-center gap-2 font-serif text-lg font-medium text-slate-900 dark:text-slate-100">
                    <Shield className="h-5 w-5 text-gold-500" />
                    Bu rehber hakkında
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Rehberdeki bilgiler 6306 sayılı Afet Riski Altındaki Alanların Dönüştürülmesi Hakkında Kanun ve
                    6306 Sayılı Kanunun Uygulama Yönetmeliği&rsquo;nin yürürlükteki metnine dayanır (son
                    değişiklikler: 7471 sayılı Kanun — 7/11/2023; Yönetmelik değişiklikleri — 21/5/2024 ve
                    4/2/2026). Kira yardımı tutarları Başkanlıkça her yıl güncellenir; başvuru anında geçerli
                    tutar ilgili müdürlükten teyit edilmelidir.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    İçerik genel bilgilendirme amaçlıdır, hukuki danışmanlık yerine geçmez ve somut olayın
                    özelliklerine göre değişebilir. Hesaplayıcı sonuçları yaklaşık değerlerdir; resmî tatiller,
                    adli tatil ve tebligat usulüne ilişkin özellikler dosyanıza göre ayrıca değerlendirilmelidir.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                        href="/iletisim?konu=Kentsel%20D%C3%B6n%C3%BC%C5%9F%C3%BCm#randevu"
                        className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-800 dark:bg-gold-500 dark:text-slate-950 dark:hover:bg-gold-400"
                    >
                        Dosyanızı Değerlendirelim <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                        href={PHONE_HREF}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-gold-500 dark:border-slate-800 dark:text-slate-300"
                    >
                        <Phone className="h-4 w-4" /> Telefonla Görüşün
                    </a>
                </div>
            </div>
        </div>
    );
}
