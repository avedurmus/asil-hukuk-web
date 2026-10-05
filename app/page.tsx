import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";
import { siteContent } from "@/data/siteContent";
import { faqs } from "@/data/faq";
import DailyArticles from "@/components/DailyArticles";
import { getAllPosts, getLatestDailyPosts } from "@/lib/posts";
import {
    ArrowRight,
    ArrowUpRight,
    MessagesSquare,
    ScrollText,
    Gavel,
    ShieldCheck,
    UserCheck,
    Eye,
    BookOpenCheck,
    PhoneCall,
    Plus,
} from "lucide-react";
import type { Metadata } from "next";

// Başlık, açıklama ve paylaşım bilgileri kök düzenden gelir.
export const metadata: Metadata = {
    alternates: { canonical: "/" },
};

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

const pillars = [
    {
        icon: UserCheck,
        title: "Kişisel İlgi",
        description: "Dosyanız, ilk görüşmeden sonuca kadar doğrudan avukatınız tarafından takip edilir.",
    },
    {
        icon: Eye,
        title: "Şeffaf Bilgilendirme",
        description: "Her aşamada ne olduğunu, sıradaki adımı ve olası sonuçları açıkça paylaşırız.",
    },
    {
        icon: BookOpenCheck,
        title: "Güncel İçtihat Takibi",
        description: "Stratejimizi güncel mevzuat ve Yargıtay kararlarıyla sürekli olarak sınarız.",
    },
    {
        icon: PhoneCall,
        title: "Ulaşılabilirlik",
        description: "Sorularınıza telefon, WhatsApp veya e-posta ile hızlıca dönüş yaparız.",
    },
];

// Ana sayfada gösterilecek öne çıkan sorular
const featuredFaqs = faqs.slice(0, 5);

// Hero altındaki şeritte tanıtılan günün makaleleri
const dailyPosts = getLatestDailyPosts(2);

// Şeritte gösterilenler dışındaki en yeni üç yazı — ziyaretçiyi sitede tutan içerik vitrini
const latestPosts = getAllPosts()
    .filter((post) => !dailyPosts.some((daily) => daily.id === post.id))
    .slice(0, 3);

function SectionHeading({
    eyebrow,
    title,
    description,
    align = "center",
}: {
    eyebrow: string;
    title: React.ReactNode;
    description?: string;
    align?: "center" | "left";
}) {
    const centered = align === "center";
    return (
        <Reveal className={`mb-16 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
            <span className={`eyebrow ${centered ? "justify-center" : ""}`}>{eyebrow}</span>
            <h2 className="mt-5 font-serif text-4xl font-medium leading-tight text-slate-900 dark:text-slate-100 lg:text-5xl">
                {title}
            </h2>
            {description && (
                <p className="mt-5 text-lg font-light leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
            )}
        </Reveal>
    );
}

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-ivory-100 transition-colors duration-300 dark:bg-slate-950">
            <Header />

            <main className="flex-grow">
                <Hero />

                <DailyArticles posts={dailyPosts} />

                {/* --- BÜROMUZ --- */}
                <section className="relative bg-white py-24 dark:bg-slate-900 lg:py-32">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-24 lg:px-8">
                        <Reveal className="relative order-2 lg:order-1">
                            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-elegant">
                                <Image
                                    src="/images/about-office.png"
                                    alt="Asil Hukuk Bürosu görüşme salonu"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary-950/40 to-transparent" />
                            </div>
                            <figure className="absolute -bottom-10 right-4 max-w-xs rounded-2xl bg-primary-900 p-6 text-white shadow-elegant sm:-right-6">
                                <div aria-hidden="true" className="mb-3 h-px w-12 bg-gold-400" />
                                <blockquote className="font-serif text-lg italic leading-snug">
                                    &ldquo;Adalet mülkün temelidir.&rdquo;
                                </blockquote>
                                <figcaption className="mt-2 text-xs uppercase tracking-[0.18em] text-gold-300">
                                    Büromuzun ilkesi
                                </figcaption>
                            </figure>
                        </Reveal>

                        <div className="order-1 lg:order-2">
                            <SectionHeading
                                align="left"
                                eyebrow="Büromuz"
                                title={
                                    <>
                                        Yirmi yılı aşkın birikim, <em className="italic text-gold-700 dark:text-gold-400">kişisel</em> bir hukuk hizmeti
                                    </>
                                }
                            />
                            <Reveal delay={100}>
                                <p className="-mt-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                                    {siteContent.about.description}
                                </p>
                                <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-400">
                                    Müvekkillerimizle kurduğumuz ilişkiyi yalnızca bir vekâlet ilişkisi olarak değil,
                                    karşılıklı güvene dayalı bir çözüm ortaklığı olarak görüyoruz.
                                </p>
                            </Reveal>

                            <Reveal delay={200}>
                                <dl className="mt-10 grid grid-cols-3 divide-x divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                                    {siteContent.about.stats.map((stat) => (
                                        <div key={stat.label} className="flex flex-col px-3 py-6 first:pl-0">
                                            <dd className="order-1 font-serif text-3xl font-medium text-primary-900 dark:text-white sm:text-4xl">
                                                {stat.value}
                                            </dd>
                                            <dt className="order-2 mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                                                {stat.label}
                                            </dt>
                                        </div>
                                    ))}
                                </dl>

                                <div className="mt-10 flex flex-wrap items-center gap-6">
                                    <Link
                                        href="/hakkimizda"
                                        className="group inline-flex items-center gap-2 rounded-full bg-primary-900 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-800 dark:bg-white dark:text-slate-950"
                                    >
                                        Av. Emre Durmuş&apos;u Tanıyın
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>
                                    <Link
                                        href="/iletisim#randevu"
                                        className="border-b border-gold-500 pb-0.5 font-semibold text-primary-900 transition-colors hover:text-gold-700 dark:text-slate-100 dark:hover:text-gold-400"
                                    >
                                        Randevu talep edin
                                    </Link>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* --- ÇALIŞMA ALANLARI --- */}
                <section id="uzmanliklar" className="relative bg-ivory-100 py-24 dark:bg-slate-950 lg:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            eyebrow="Çalışma Alanlarımız"
                            title="Hangi konuda desteğe ihtiyacınız var?"
                            description="Hukukun farklı alanlarındaki deneyimimizle, durumunuza en uygun yolu birlikte belirleyelim."
                        />

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {siteContent.services.map((service, i) => (
                                <Reveal key={service.id} delay={(i % 3) * 110} className="h-full">
                                    <ServiceCard
                                        id={service.id}
                                        index={i + 1}
                                        title={service.title}
                                        description={service.description}
                                        icon={service.icon}
                                    />
                                </Reveal>
                            ))}
                        </div>

                        <Reveal className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl border border-dashed border-gold-500/50 bg-white/60 px-8 py-7 text-center dark:bg-slate-900/60 sm:flex-row sm:text-left">
                            <p className="text-slate-700 dark:text-slate-300">
                                <span className="font-serif text-xl text-slate-900 dark:text-white">Konunuz listede yok mu?</span>
                                <span className="mt-1 block text-sm">
                                    Kısaca anlatın; sizi doğru hukuki yola yönlendirelim.
                                </span>
                            </p>
                            <Link
                                href="/iletisim#randevu"
                                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-500 px-6 py-3 font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
                            >
                                Bize Yazın
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Reveal>
                    </div>
                </section>

                {/* --- NEDEN ASİL HUKUK --- */}
                <section className="relative isolate overflow-hidden bg-primary-950 py-24 text-white lg:py-32">
                    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.08]" />
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_60%_at_0%_0%,rgb(192_150_82/0.16),transparent_60%),radial-gradient(ellipse_60%_60%_at_100%_100%,rgb(79_111_158/0.30),transparent_60%)]"
                    />

                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
                        <Reveal className="lg:col-span-5">
                            <span className="eyebrow !text-gold-400">Neden Asil Hukuk</span>
                            <h2 className="mt-5 font-serif text-4xl font-medium leading-tight lg:text-5xl">
                                Deneyim ve güvenin{" "}
                                <em className="italic text-gold-300">buluşma noktası</em>
                            </h2>
                            <p className="mt-6 text-lg font-light leading-relaxed text-slate-300">
                                Müvekkillerimize yalnızca hukuki danışmanlık değil, stratejik bir çözüm ortaklığı
                                sunuyoruz. Karmaşık davaları sonuç odaklı ve özenli bir yaklaşımla yürütüyoruz.
                            </p>
                            <Link
                                href="/hakkimizda"
                                className="group mt-10 inline-flex items-center gap-2 border-b border-gold-500 pb-1 font-medium text-white transition-colors hover:text-gold-300"
                            >
                                Çalışma anlayışımız
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Reveal>

                        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:col-span-7">
                            {pillars.map((p, i) => (
                                <Reveal key={p.title} delay={i * 100} className="bg-primary-950 p-8 transition-colors duration-500 hover:bg-primary-900">
                                    <p.icon className="h-7 w-7 text-gold-400" strokeWidth={1.5} />
                                    <h3 className="mt-6 font-serif text-xl">{p.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.description}</p>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- ÇALIŞMA SÜRECİMİZ --- */}
                <section className="relative bg-white py-24 dark:bg-slate-900 lg:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            eyebrow="Nasıl Çalışıyoruz"
                            title="İlk görüşmeden sonuca, adım adım"
                            description="Her aşamada ne olduğunu bilmenizi sağlıyoruz; süreç boyunca sorularınız yanıtsız kalmaz."
                        />

                        <ol className="relative grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent lg:block"
                            />
                            {processSteps.map((step, i) => (
                                <Reveal as="li" key={step.title} delay={i * 120} className="relative">
                                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                                        <div className="relative mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/40 bg-ivory-50 dark:bg-slate-950">
                                            <step.icon className="h-6 w-6 text-primary-800 dark:text-gold-400" strokeWidth={1.5} />
                                        </div>
                                        <span className="font-serif text-sm italic text-gold-700 dark:text-gold-400">
                                            Adım {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className="mb-2 mt-1 font-serif text-xl text-slate-900 dark:text-slate-100">
                                            {step.title}
                                        </h3>
                                        <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
                                            {step.description}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </ol>
                    </div>
                </section>

                <Testimonials />

                {/* --- GÜNCEL YAZILAR --- */}
                {latestPosts.length > 0 && (
                    <section className="border-t border-slate-200/70 bg-white py-24 dark:border-slate-800 dark:bg-slate-900 lg:py-32">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                                <Reveal className="max-w-2xl">
                                    <span className="eyebrow">Hukuk Blogu</span>
                                    <h2 className="mt-5 font-serif text-4xl font-medium leading-tight text-slate-900 dark:text-slate-100 lg:text-5xl">
                                        Haklarınızı bilmek, ilk adımdır
                                    </h2>
                                </Reveal>
                                <Reveal>
                                    <Link
                                        href="/blog"
                                        className="group inline-flex items-center gap-2 border-b border-gold-500 pb-1 font-semibold text-primary-900 dark:text-slate-100"
                                    >
                                        Tüm yazılar
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>
                                </Reveal>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {latestPosts.map((post, i) => (
                                    <Reveal key={post.id} delay={i * 110} className="h-full">
                                        <Link
                                            href={`/blog/${post.id}`}
                                            className="group flex h-full flex-col rounded-3xl border border-slate-200/80 bg-ivory-50 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-elegant dark:border-slate-800 dark:bg-slate-950"
                                        >
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-semibold uppercase tracking-[0.16em] text-gold-700 dark:text-gold-400">
                                                    {post.kind === "ictihat" ? "İçtihat Notu" : post.category}
                                                </span>
                                                <span className="text-slate-500">{post.readTime}</span>
                                            </div>
                                            <h3 className="mt-6 flex-grow font-serif text-2xl leading-snug text-slate-900 transition-colors group-hover:text-primary-800 dark:text-slate-100 dark:group-hover:text-gold-300">
                                                {post.title}
                                            </h3>
                                            <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
                                                {post.excerpt}
                                            </p>
                                            <div className="mt-8 flex items-center justify-between border-t border-slate-200/80 pt-5 dark:border-slate-800">
                                                <span className="text-sm text-slate-500">{post.date}</span>
                                                <ArrowUpRight className="h-5 w-5 text-primary-800 transition-transform duration-300 group-hover:rotate-45 dark:text-gold-400" />
                                            </div>
                                        </Link>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* --- SIKÇA SORULAN SORULAR --- */}
                <section className="bg-ivory-100 py-24 dark:bg-slate-950 lg:py-32">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
                        <Reveal className="lg:col-span-4">
                            <span className="eyebrow">Merak Edilenler</span>
                            <h2 className="mt-5 font-serif text-4xl font-medium leading-tight text-slate-900 dark:text-slate-100 lg:text-5xl">
                                Sıkça sorulan sorular
                            </h2>
                            <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-400">
                                Aradığınız cevabı bulamadıysanız, sorunuzu doğrudan bize iletebilirsiniz.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href="/sss"
                                    className="group inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition-all duration-300 hover:border-gold-500 dark:border-slate-700 dark:text-slate-100"
                                >
                                    Tüm sorular
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                                <Link
                                    href="/iletisim#randevu"
                                    className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-primary-800 dark:bg-gold-500 dark:text-slate-950"
                                >
                                    Soru sorun
                                </Link>
                            </div>
                        </Reveal>

                        <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800 lg:col-span-8">
                            {featuredFaqs.map((faq, i) => (
                                <Reveal key={faq.question} delay={i * 70}>
                                    <details className="group py-2">
                                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                                            <span>
                                                <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-700 dark:text-gold-400">
                                                    {faq.category}
                                                </span>
                                                <span className="mt-1.5 block font-serif text-xl text-slate-900 dark:text-slate-100">
                                                    {faq.question}
                                                </span>
                                            </span>
                                            <span className="mt-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 text-primary-900 transition-all duration-300 group-open:rotate-45 group-open:border-gold-500 group-open:bg-gold-500 group-open:text-white dark:border-slate-700 dark:text-slate-100">
                                                <Plus className="h-4 w-4" />
                                            </span>
                                        </summary>
                                        <div className="max-w-2xl pb-6 leading-relaxed text-slate-600 dark:text-slate-400">
                                            {faq.answer}
                                        </div>
                                    </details>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                <ContactCTA />
            </main>

            <Footer />
        </div>
    );
}
