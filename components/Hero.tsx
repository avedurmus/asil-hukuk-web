import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Scale, ShieldCheck, MessageCircle, Phone } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { PHONE_HREF, whatsappHref } from "@/lib/contact";

const trustPoints = [
    { icon: Scale, label: "İstanbul Barosu Üyesi" },
    { icon: ShieldCheck, label: "Kayıtlı Arabulucu" },
    { icon: Award, label: "2004'ten Beri" },
];

// Ziyaretçinin kendi cümlesiyle derdini seçip doğrudan ilgili sayfaya gitmesi için kısa yollar
const quickTopics = [
    { label: "Boşanmak istiyorum", href: "/calisma-alanlarimiz/bosanma-ve-aile-hukuku" },
    { label: "İşten çıkarıldım", href: "/calisma-alanlarimiz/is-ve-sosyal-guvenlik-hukuku" },
    { label: "Kira / tahliye sorunu", href: "/calisma-alanlarimiz/gayrimenkul-hukuku" },
    { label: "İfadeye çağrıldım", href: "/calisma-alanlarimiz/ceza-hukuku" },
    { label: "Şirketim için destek", href: "/calisma-alanlarimiz/ticaret-ve-sirketler-hukuku" },
    { label: "Arabulucu arıyorum", href: "/calisma-alanlarimiz/arabuluculuk" },
];

export default function Hero() {
    return (
        <section className="relative isolate overflow-hidden bg-ivory-100 pb-16 pt-28 dark:bg-slate-950 lg:pb-24 lg:pt-36">
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_85%_20%,rgb(26_41_66/0.07),transparent_60%)] dark:bg-[radial-gradient(ellipse_70%_60%_at_85%_20%,rgb(79_111_158/0.16),transparent_60%)]"
            />

            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
                {/* --- Metin --- (animasyonsuz: sayfanın en büyük öğesi, gecikmeden görünmeli) */}
                <div className="text-center lg:col-span-8 lg:text-left">
                    <h1 className="font-serif text-[2.4rem] font-medium leading-[1.1] tracking-tight text-primary-950 dark:text-white sm:text-5xl lg:text-6xl">
                        {/* Arama motorları için sayfanın konusunu ve konumunu başlığa taşır. */}
                        <span className="eyebrow mb-6 !flex justify-center font-sans text-[11px] sm:text-xs lg:justify-start">
                            Kartal Avukat ve Hukuk Bürosu
                        </span>
                        Hukuki bir sorununuz mu var?{" "}
                        <em className="font-normal italic text-gold-700 dark:text-gold-400">Birlikte çözelim.</em>
                    </h1>

                    <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 lg:mx-0">
                        {siteContent.hero.subtitle}
                    </p>

                    {/* Eylem düğmeleri */}
                    <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
                        <Link
                            href="/iletisim#randevu"
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary-900 px-8 py-4 text-base font-semibold text-white transition-colors duration-300 hover:bg-primary-800 dark:bg-gold-500 dark:text-slate-950 dark:hover:bg-gold-400"
                        >
                            Randevu Alın
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        <a
                            href={whatsappHref()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-900/15 bg-white px-7 py-4 text-base font-semibold text-primary-900 transition-colors duration-300 hover:border-gold-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-gold-500"
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

                    {/* Hızlı konu seçimi */}
                    <div className="mt-10 border-t border-primary-900/10 pt-7 dark:border-white/10">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Durumunuzu seçin, ne yapabileceğinizi anlatalım:
                        </p>
                        <ul className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                            {quickTopics.map((t) => (
                                <li key={t.href}>
                                    <Link
                                        href={t.href}
                                        className="inline-flex items-center rounded-full border border-slate-300/80 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-300 hover:border-gold-500 hover:text-primary-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white"
                                    >
                                        {t.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* --- Portre --- */}
                <figure className="mx-auto w-full max-w-[240px] animate-fade-up [animation-delay:150ms] sm:max-w-[280px] lg:col-span-4 lg:max-w-[320px]">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-t-[10rem] rounded-b-3xl bg-primary-900 shadow-elegant">
                        <Image
                            src="/images/emre-durmus-800.webp"
                            alt="Av. Emre Durmuş, Asil Hukuk Bürosu kurucu avukatı"
                            fill
                            priority
                            sizes="(max-width: 640px) 240px, 320px"
                            className="object-cover object-[60%_20%]"
                        />
                    </div>
                    <figcaption className="mt-4 text-center">
                        <span className="block font-serif text-xl text-primary-950 dark:text-white">Av. Emre Durmuş</span>
                        <span className="mt-0.5 block text-sm text-slate-500 dark:text-slate-400">Kurucu Avukat · Arabulucu</span>
                    </figcaption>
                    <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
                        {trustPoints.map(({ icon: Icon, label }) => (
                            <li key={label} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                                <Icon className="h-3.5 w-3.5 shrink-0 text-gold-600 dark:text-gold-400" />
                                {label}
                            </li>
                        ))}
                    </ul>
                </figure>
            </div>
        </section>
    );
}
