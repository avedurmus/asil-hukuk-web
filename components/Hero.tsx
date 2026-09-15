import Link from "next/link";
import { ArrowRight, Award, Scale, ShieldCheck } from "lucide-react";
import { siteContent } from "@/data/siteContent";

const trustPoints = [
    { icon: Scale, label: "İstanbul Barosu Üyesi" },
    { icon: ShieldCheck, label: "Adalet Bakanlığı Kayıtlı Arabulucu" },
    { icon: Award, label: "2004'ten Beri Hizmetinizde" },
];

export default function Hero() {
    return (
        <section className="relative isolate overflow-hidden bg-slate-50 dark:bg-slate-950 pt-36 pb-24 lg:pt-48 lg:pb-32 transition-colors duration-300">
            {/* --- Soyut arka plan katmanları --- */}

            {/* Yumuşak gradyan taban */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />

            {/* Hareketli gradyan kütleleri */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full bg-primary-200/40 dark:bg-primary-900/20 blur-3xl animate-blob" />
                <div className="absolute -bottom-48 -right-24 h-[34rem] w-[34rem] rounded-full bg-gold-100/60 dark:bg-gold-700/10 blur-3xl animate-blob animation-delay-4000" />
                <div className="absolute top-1/3 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-indigo-200/30 dark:bg-indigo-900/15 blur-3xl animate-blob animation-delay-2000" />
            </div>

            {/* İnce ızgara — merkeze doğru solan soyut doku */}
            <div
                className="absolute inset-0 -z-10 text-slate-900 dark:text-slate-100 opacity-[0.06] dark:opacity-[0.10] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                    maskImage:
                        "radial-gradient(ellipse 75% 60% at 50% 38%, black 35%, transparent 100%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 75% 60% at 50% 38%, black 35%, transparent 100%)",
                }}
            />

            {/* Film grenli doku */}
            <div className="absolute inset-0 -z-10 bg-noise opacity-[0.15] dark:opacity-[0.08] pointer-events-none" />

            {/* --- İçerik --- */}
            <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                {/* Üst rozet */}
                <div className="inline-flex items-center gap-2.5 rounded-full border border-gold-300/70 dark:border-gold-700/50 bg-white/70 dark:bg-slate-900/60 px-4 py-1.5 backdrop-blur-sm shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-200">
                        {siteContent.about.stats[0].value} {siteContent.about.stats[0].label}
                    </span>
                </div>

                {/* Başlık */}
                <h1 className="mt-8 font-serif font-bold tracking-tight text-slate-900 dark:text-white text-[2.75rem] leading-[1.08] sm:text-6xl lg:text-7xl">
                    Adalet, Güven ve
                    <span className="relative mt-3 block w-fit mx-auto pb-4">
                        <span className="bg-gradient-to-r from-primary-800 via-primary-600 to-primary-500 dark:from-primary-300 dark:via-primary-400 dark:to-primary-200 bg-clip-text text-transparent">
                            Modern Çözümler
                        </span>
                        {/* Altın vurgu çizgisi */}
                        <span
                            aria-hidden="true"
                            className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-gold-500/0 via-gold-500 to-gold-500/0"
                        />
                    </span>
                </h1>

                {/* Alt başlık */}
                <p className="mx-auto mt-10 max-w-2xl text-lg sm:text-xl font-light leading-relaxed text-slate-600 dark:text-slate-300">
                    {siteContent.hero.subtitle}
                </p>

                {/* Eylem düğmeleri */}
                <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
                    <Link
                        href="/iletisim"
                        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary-900 px-8 py-4 text-lg font-medium text-white shadow-lg ring-1 ring-primary-900/20 transition-all duration-300 hover:bg-primary-800 hover:shadow-gold-glow hover:-translate-y-0.5 dark:bg-white dark:text-slate-950 dark:ring-white/20 dark:hover:bg-gold-100"
                    >
                        {siteContent.hero.cta}
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href="/#uzmanliklar"
                        className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 px-8 py-4 text-lg font-medium text-slate-900 dark:text-slate-100 backdrop-blur-sm transition-all duration-300 hover:border-gold-400 hover:bg-white dark:hover:border-gold-600 dark:hover:bg-slate-800 hover:-translate-y-0.5"
                    >
                        {siteContent.hero.secondaryCta}
                    </Link>
                </div>

                {/* Güven göstergeleri */}
                <div className="mt-14">
                    <div aria-hidden="true" className="mx-auto h-px w-28 rule-gold opacity-70" />
                    <ul className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                        {trustPoints.map(({ icon: Icon, label }) => (
                            <li
                                key={label}
                                className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-sm"
                            >
                                <Icon className="h-4 w-4 shrink-0 text-gold-600 dark:text-gold-500" />
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
