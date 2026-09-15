import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import Testimonials from "@/components/Testimonials";
import Reveal from "@/components/Reveal";
import { siteContent } from "@/data/siteContent";
import { faqs } from "@/data/faq";
import {
    ArrowRight,
    HelpCircle,
    MessagesSquare,
    ScrollText,
    Gavel,
    ShieldCheck,
} from "lucide-react";
import Image from "next/image";

const processSteps = [
    {
        icon: MessagesSquare,
        title: "İlk Görüşme",
        description:
            "Durumunuzu dinliyor, hukuki sürecin sizin açınızdan ne anlama geldiğini sade bir dille aktarıyoruz.",
    },
    {
        icon: ScrollText,
        title: "Hukuki Analiz",
        description:
            "Belgeleri ve delilleri inceleyerek güncel mevzuat ve Yargıtay kararları ışığında yol haritası çıkarıyoruz.",
    },
    {
        icon: Gavel,
        title: "Süreç Yönetimi",
        description:
            "Dava veya arabuluculuk sürecini baştan sona yürütüyor, her aşamada sizi bilgilendiriyoruz.",
    },
    {
        icon: ShieldCheck,
        title: "Sonuç ve Takip",
        description:
            "Kararın uygulanmasını takip ediyor, hakkınızın fiilen teslim edilmesine kadar yanınızda kalıyoruz.",
    },
];

// Ana sayfada gösterilecek öne çıkan sorular
const featuredFaqs = faqs.slice(0, 4);

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <Header />

            <main className="flex-grow">
                <Hero />

                {/* --- RAKAMLAR ŞERİDİ --- */}
                <section className="relative border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <dl className="grid grid-cols-1 divide-y divide-slate-200 dark:divide-slate-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                            {siteContent.about.stats.map((stat, i) => (
                                <Reveal key={stat.label} delay={i * 100}>
                                    <div className="flex flex-col px-6 py-8 text-center sm:py-10">
                                        <dd className="order-1 font-serif text-4xl font-bold text-primary-900 dark:text-white sm:text-5xl">
                                            {stat.value}
                                        </dd>
                                        <dt className="order-2 mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                            {stat.label}
                                        </dt>
                                    </div>
                                </Reveal>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* --- UZMANLIK ALANLARI --- */}
                <section
                    id="uzmanliklar"
                    className="relative bg-slate-50 dark:bg-slate-950 py-24 lg:py-28 transition-colors duration-300"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
                            <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.18em] text-gold-600 dark:text-gold-500">
                                Faaliyet Alanlarımız
                            </span>
                            <h2 className="mb-4 font-serif text-4xl font-bold text-slate-900 dark:text-slate-100 lg:text-[2.75rem]">
                                Çalışma Alanlarımız
                            </h2>
                            <div aria-hidden="true" className="mx-auto mb-5 h-px w-20 rule-gold opacity-70" />
                            <p className="text-lg font-light text-slate-600 dark:text-slate-400">
                                Hukukun çeşitli alanlarındaki deneyimimizle, size en doğru hukuki desteği sunuyoruz.
                            </p>
                        </Reveal>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {siteContent.services.map((service, i) => (
                                <Reveal key={service.id} delay={(i % 3) * 120}>
                                    <ServiceCard
                                        id={service.id}
                                        title={service.title}
                                        description={service.description}
                                        icon={service.icon}
                                    />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- ÇALIŞMA SÜRECİMİZ --- */}
                <section className="relative overflow-hidden border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-24 lg:py-28 transition-colors duration-300">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
                            <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.18em] text-gold-600 dark:text-gold-500">
                                Nasıl Çalışıyoruz
                            </span>
                            <h2 className="mb-4 font-serif text-4xl font-bold text-slate-900 dark:text-slate-100 lg:text-[2.75rem]">
                                Çalışma Sürecimiz
                            </h2>
                            <div aria-hidden="true" className="mx-auto mb-5 h-px w-20 rule-gold opacity-70" />
                            <p className="text-lg font-light text-slate-600 dark:text-slate-400">
                                İlk görüşmeden sonuca kadar, her aşamada ne olduğunu bilmenizi sağlıyoruz.
                            </p>
                        </Reveal>

                        <ol className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                            {/* Adımları birbirine bağlayan yatay çizgi (geniş ekran) */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700 lg:block"
                            />

                            {processSteps.map((step, i) => (
                                <Reveal as="li" key={step.title} delay={i * 130} className="relative">
                                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                                        <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold-300 dark:border-gold-700/60 bg-white dark:bg-slate-900 shadow-sm">
                                            <step.icon
                                                className="h-6 w-6 text-primary-800 dark:text-gold-500"
                                                strokeWidth={1.75}
                                            />
                                            <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-slate-950">
                                                {i + 1}
                                            </span>
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                            {step.description}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* --- NEDEN BİZ --- */}
                <section className="relative overflow-hidden bg-slate-950 py-24 text-white lg:py-28">
                    <div className="absolute inset-0 bg-noise opacity-[0.12]" />
                    <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-800 opacity-25 blur-3xl animate-blob" />
                    <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gold-700 opacity-[0.14] blur-3xl animate-blob animation-delay-4000" />

                    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                            <Reveal>
                                <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.18em] text-gold-500">
                                    Neden Asil Hukuk
                                </span>
                                <h2 className="mb-6 font-serif text-4xl font-bold leading-tight lg:text-[2.75rem]">
                                    Deneyim ve Güvenin <br />
                                    <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                                        Buluşma Noktası
                                    </span>
                                </h2>
                                <p className="mb-10 text-lg leading-relaxed text-slate-300">
                                    Müvekkillerimize sadece hukuki danışmanlık değil, aynı zamanda stratejik çözüm
                                    ortaklığı sunuyoruz. Yirmi yılı aşkın tecrübemizle, karmaşık davaları sonuç odaklı
                                    bir yaklaşımla çözümlüyoruz.
                                </p>

                                <Link
                                    href="/hakkimizda"
                                    className="group inline-flex items-center gap-2 border-b border-gold-500 pb-1 font-medium text-white transition-colors hover:text-gold-400"
                                >
                                    Daha Fazla Bilgi
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </Reveal>

                            <Reveal delay={150}>
                                <div className="relative min-h-[420px] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                                    <Image
                                        src="/images/justice-symbol.png"
                                        alt="Adalet Sembolü"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                                    <div className="absolute bottom-0 left-0 z-10 p-8">
                                        <div aria-hidden="true" className="mb-4 h-px w-16 rule-gold" />
                                        <blockquote className="mb-2 font-serif text-xl italic leading-relaxed text-slate-100">
                                            &ldquo;Adalet mülkün temelidir. Biz bu temeli sağlam tutmak için
                                            çalışıyoruz.&rdquo;
                                        </blockquote>
                                        <cite className="font-bold not-italic text-gold-400">
                                            — {siteContent.brand.name}
                                        </cite>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                <Testimonials />

                {/* --- SIKÇA SORULAN SORULAR ÖNİZLEME --- */}
                <section className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-24 lg:py-28 transition-colors duration-300">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <Reveal className="mb-12 text-center">
                            <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.18em] text-gold-600 dark:text-gold-500">
                                Merak Edilenler
                            </span>
                            <h2 className="mb-4 font-serif text-4xl font-bold text-slate-900 dark:text-slate-100 lg:text-[2.75rem]">
                                Sıkça Sorulan Sorular
                            </h2>
                            <div aria-hidden="true" className="mx-auto h-px w-20 rule-gold opacity-70" />
                        </Reveal>

                        <div className="space-y-4">
                            {featuredFaqs.map((faq, i) => (
                                <Reveal key={faq.question} delay={i * 90}>
                                    <details className="group overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 transition-colors hover:border-gold-300 dark:hover:border-gold-700/60">
                                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6">
                                            <span className="flex min-w-0 items-center gap-4">
                                                <span className="hidden shrink-0 rounded bg-primary-50 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-700 dark:bg-primary-950/50 dark:text-primary-300 sm:inline-block">
                                                    {faq.category}
                                                </span>
                                                <span className="font-semibold text-slate-900 dark:text-slate-100">
                                                    {faq.question}
                                                </span>
                                            </span>
                                            <span className="shrink-0 text-gold-600 transition-transform duration-300 group-open:rotate-180 dark:text-gold-500">
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 9l6 6 6-6"
                                                    />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="border-t border-slate-200/70 px-6 pb-6 pt-4 leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-400">
                                            {faq.answer}
                                        </div>
                                    </details>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal className="mt-10 text-center">
                            <Link
                                href="/sss"
                                className="group inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3.5 font-medium text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 dark:border-slate-700 dark:text-slate-100 dark:hover:border-gold-600"
                            >
                                Tüm Soruları Görüntüle
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Reveal>
                    </div>
                </section>

                {/* --- KAPANIŞ ÇAĞRISI --- */}
                <section className="relative overflow-hidden bg-primary-900 py-20 text-white lg:py-24">
                    <div className="absolute inset-0 bg-noise opacity-[0.10]" />
                    <div className="absolute -bottom-32 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-gold-500 opacity-10 blur-3xl" />

                    <Reveal className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                        <HelpCircle className="mx-auto mb-6 h-14 w-14 text-gold-400" strokeWidth={1.5} />
                        <h2 className="mb-5 font-serif text-3xl font-bold md:text-4xl">
                            Hukuki Durumunuzu Birlikte Değerlendirelim
                        </h2>
                        <p className="mb-9 text-lg text-primary-100">
                            Sorularınızı dinleyip, hangi yolun sizin için doğru olduğunu açıkça anlatalım.
                        </p>
                        <Link
                            href="/iletisim"
                            className="group inline-flex items-center gap-2 rounded-xl bg-gold-500 px-8 py-4 font-bold text-slate-950 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-300"
                        >
                            Randevu Talep Edin
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Reveal>
                </section>
            </main>

            <Footer />
        </div>
    );
}
