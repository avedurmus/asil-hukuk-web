import Link from "next/link";
import { ArrowRight, Award, Scale, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { siteContent } from "@/data/siteContent";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/30 border border-primary-100 dark:border-primary-900/30">
                    <span className="text-sm font-semibold text-primary-700 dark:text-primary-400 tracking-wide uppercase">
                        {siteContent.about.stats[0].value} {siteContent.about.stats[0].label}
                    </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-8 leading-tight tracking-tight">
                    Adalet, Güven ve <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-primary-500 dark:from-primary-400 dark:to-primary-300">
                        Modern Çözümler
                    </span>
                </h1>
                <p className="border-l-4 border-primary-500 pl-6 text-xl text-slate-600 dark:text-slate-350 max-w-2xl mx-auto mb-10 font-light text-left md:text-center md:border-l-0 md:pl-0">
                    {siteContent.hero.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        href="/iletisim"
                        className="flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-250 dark:text-slate-950 text-white rounded-lg transition-all text-lg font-medium shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        {siteContent.hero.cta} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                        href="/#uzmanliklar"
                        className="flex items-center justify-center px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-lg font-medium hover:-translate-y-1"
                    >
                        {siteContent.hero.secondaryCta}
                    </Link>
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        İstanbul Barosu Üyesi
                    </span>
                    <span className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        Adalet Bakanlığı Kayıtlı Arabulucu
                    </span>
                    <span className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        2004'ten Beri Hizmetinizde
                    </span>
                </div>
            </div>

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.png"
                    alt="Asil Hukuk Ofis"
                    fill
                    className="object-cover opacity-10"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/80 to-slate-50/90 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/95"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-100/40 dark:bg-indigo-950/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-blue-100/40 dark:bg-blue-950/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
                <div className="absolute top-[20%] right-[20%] w-[30rem] h-[30rem] bg-slate-200/40 dark:bg-slate-800/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000"></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-10 z-0"></div>
        </section>
    );
}
