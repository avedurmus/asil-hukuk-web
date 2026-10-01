import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Scale, ShieldCheck, MessageCircle, Phone } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { PHONE_HREF, whatsappHref } from "@/lib/contact";
import OpenChatButton from "@/components/OpenChatButton";

const trustPoints = [
    { icon: Scale, label: "İstanbul Barosu Üyesi" },
    { icon: ShieldCheck, label: "Kayıtlı Arabulucu" },
    { icon: Award, label: "2004'ten Beri" },
];

// Ziyaretçiyi doğrudan ilgili alan sayfasına taşıyan kısa yollar
const quickTopics = [
    { label: "Boşanma", href: "/calisma-alanlarimiz/bosanma-ve-aile-hukuku" },
    { label: "Ceza Davası", href: "/calisma-alanlarimiz/ceza-hukuku" },
    { label: "Kira & Tahliye", href: "/calisma-alanlarimiz/gayrimenkul-hukuku" },
    { label: "İşe İade", href: "/calisma-alanlarimiz/is-ve-sosyal-guvenlik-hukuku" },
    { label: "Şirket Danışmanlığı", href: "/calisma-alanlarimiz/ticaret-ve-sirketler-hukuku" },
    { label: "Arabuluculuk", href: "/calisma-alanlarimiz/arabuluculuk" },
];

export default function Hero() {
    return (
        <section className="relative isolate overflow-hidden bg-ivory-100 pb-20 pt-32 dark:bg-slate-950 lg:pb-28 lg:pt-40">
            {/* --- Arka plan: sakin, zarif katmanlar --- */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_85%_20%,rgb(26_41_66/0.10),transparent_60%),radial-gradient(ellipse_60%_50%_at_0%_100%,rgb(192_150_82/0.14),transparent_60%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_85%_20%,rgb(79_111_158/0.20),transparent_60%),radial-gradient(ellipse_60%_50%_at_0%_100%,rgb(192_150_82/0.10),transparent_60%)]"
            />
            {/* İnce dikey çizgiler — klasik sütun ritmi */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 text-primary-900 opacity-[0.05] dark:text-white dark:opacity-[0.06]"
                style={{
                    backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px)",
                    backgroundSize: "120px 100%",
                    maskImage: "linear-gradient(to bottom, black, transparent 85%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
                }}
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.10] dark:opacity-[0.06]" />

            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
                {/* --- Metin --- */}
                <div className="animate-fade-up text-center lg:col-span-7 lg:text-left">
                    <h1 className="font-serif text-[2.6rem] font-medium leading-[1.08] tracking-tight text-primary-950 dark:text-white sm:text-6xl lg:text-[4.25rem]">
                        {/* Arama motorları için sayfanın konusunu ve konumunu başlığa taşır. */}
                        <span className="eyebrow mb-7 !flex justify-center font-sans text-[11px] sm:text-xs lg:justify-start">
                            Kartal Avukat ve Hukuk Bürosu
                        </span>
                        Haklarınızı <em className="font-normal italic text-gold-700 dark:text-gold-400">deneyim</em>
                        <br className="hidden sm:block" /> ve{" "}
                        <em className="font-normal italic text-gold-700 dark:text-gold-400">özenle</em> savunuyoruz.
                    </h1>

                    <p className="mx-auto mt-8 max-w-xl text-lg font-light leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl lg:mx-0">
                        {siteContent.hero.subtitle}
                    </p>

                    {/* Eylem düğmeleri */}
                    <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
                        <Link
                            href="/iletisim#randevu"
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary-900 px-8 py-4 text-base font-semibold text-white shadow-elegant transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-800 hover:shadow-gold-glow dark:bg-gold-500 dark:text-slate-950 dark:hover:bg-gold-400"
                        >
                            Randevu Talep Edin
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        <a
                            href={whatsappHref()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-900/15 bg-white/80 px-7 py-4 text-base font-semibold text-primary-900 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500 hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-gold-500"
                        >
                            <MessageCircle className="h-5 w-5 text-green-600" />
                            WhatsApp&apos;tan Yazın
                        </a>
                    </div>

                    <a
                        href={PHONE_HREF}
                        className="mt-5 inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-primary-900 dark:text-slate-400 dark:hover:text-white"
                    >
                        <Phone className="h-4 w-4 text-gold-600" />
                        veya hemen arayın:
                        <span className="font-semibold text-primary-900 underline decoration-gold-500/50 underline-offset-4 dark:text-white">
                            {siteContent.contact.phone}
                        </span>
                    </a>
                    <OpenChatButton
                        label="Hero - Asistan"
                        className="mt-3 flex w-full items-center justify-center gap-2 text-sm text-slate-600 transition-colors hover:text-primary-900 dark:text-slate-400 dark:hover:text-white lg:justify-start"
                    >
                        <Scale className="h-4 w-4 text-gold-600" />
                        ya da
                        <span className="font-semibold text-primary-900 underline decoration-gold-500/50 underline-offset-4 dark:text-white">
                            Asil Asistan&apos;la randevu alın
                        </span>
                    </OpenChatButton>

                    {/* Hızlı konu seçimi */}
                    <div className="mt-12 border-t border-primary-900/10 pt-8 dark:border-white/10">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                            Size nasıl yardımcı olabiliriz?
                        </p>
                        <ul className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                            {quickTopics.map((t) => (
                                <li key={t.href}>
                                    <Link
                                        href={t.href}
                                        className="inline-flex items-center rounded-full border border-slate-300/80 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500 hover:text-primary-900 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:text-white"
                                    >
                                        {t.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* --- Portre --- */}
                <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:150ms] lg:col-span-5 lg:max-w-none">
                    {/* Arkadaki altın kemer çerçeve */}
                    <div
                        aria-hidden="true"
                        className="absolute -right-4 -top-4 bottom-10 left-8 rounded-t-[12rem] rounded-b-3xl border border-gold-500/50"
                    />
                    <div className="relative aspect-[4/5] overflow-hidden rounded-t-[12rem] rounded-b-3xl bg-primary-900 shadow-elegant">
                        <Image
                            src="/images/emre-durmus.jpg"
                            alt="Av. Emre Durmuş, Asil Hukuk Bürosu kurucu avukatı"
                            fill
                            priority
                            sizes="(max-width: 1024px) 90vw, 40vw"
                            className="object-cover object-[60%_20%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-primary-950/10 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                            <p className="font-serif text-2xl">Av. Emre Durmuş</p>
                            <p className="mt-1 text-sm text-slate-300">Kurucu Avukat · Arabulucu</p>
                        </div>
                    </div>

                    {/* Yüzen deneyim kartı */}
                    <div className="absolute -left-4 top-10 rounded-2xl border border-slate-200/70 bg-white/95 px-5 py-4 shadow-elegant backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 sm:-left-10">
                        <p className="font-serif text-4xl font-semibold leading-none text-primary-900 dark:text-white">
                            20<span className="text-gold-600">+</span>
                        </p>
                        <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                            Yıllık Tecrübe
                        </p>
                    </div>

                    {/* Güven göstergeleri */}
                    <ul className="relative -mt-6 mx-4 flex flex-wrap justify-center gap-x-5 gap-y-2 rounded-2xl border border-slate-200/70 bg-white/95 px-5 py-4 shadow-card backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
                        {trustPoints.map(({ icon: Icon, label }) => (
                            <li key={label} className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-700 dark:text-slate-200">
                                <Icon className="h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400" />
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
