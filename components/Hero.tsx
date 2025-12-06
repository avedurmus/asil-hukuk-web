import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteContent } from "@/data/siteContent";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100">
                    <span className="text-sm font-semibold text-primary-700 tracking-wide uppercase">
                        {siteContent.about.stats[0].value} {siteContent.about.stats[0].label}
                    </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                    Adalet, Güven ve <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-primary-500">
                        Modern Çözümler
                    </span>
                </h1>
                <p className="border-l-4 border-primary-500 pl-6 text-xl text-slate-600 max-w-2xl mx-auto mb-10 font-light text-left md:text-center md:border-l-0 md:pl-0">
                    {siteContent.hero.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        href="/iletisim"
                        className="flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all text-lg font-medium shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        {siteContent.hero.cta} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                        href="/#uzmanliklar"
                        className="flex items-center justify-center px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-lg font-medium hover:-translate-y-1"
                    >
                        {siteContent.hero.secondaryCta}
                    </Link>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-100/40 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
                <div className="absolute top-[20%] right-[20%] w-[30rem] h-[30rem] bg-slate-200/40 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
        </section>
    );
}
