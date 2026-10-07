import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";
import LatestPostsStrip from "@/components/LatestPostsStrip";
import { siteContent } from "@/data/siteContent";
import { faqs } from "@/data/faq";
import { getAllPosts, toSummary } from "@/lib/posts";
import { RSS_FEED } from "@/lib/seo";
import { ArrowRight, ArrowUpRight, UserCheck, Eye, Lock, PhoneCall, Plus } from "lucide-react";
import type { Metadata } from "next";

// Başlık, açıklama ve paylaşım bilgileri kök düzenden gelir.
export const metadata: Metadata = {
    alternates: { canonical: "/", types: { "application/rss+xml": [RSS_FEED] } },
};

const processSteps = [
    {
        title: "Bize ulaşın",
        description: "Telefon, WhatsApp veya form ile kısaca durumunuzu anlatın; size en kısa sürede dönelim.",
    },
    {
        title: "Görüşelim",
        description: "Belgelerinizi birlikte inceleyelim; haklarınızı, seçeneklerinizi ve olası masrafları açıkça anlatalım.",
    },
    {
        title: "Yol haritası çıkaralım",
        description: "Dava mı, arabuluculuk mu, anlaşma mı? Sizin için en uygun yolu birlikte seçelim.",
    },
    {
        title: "Süreci takip edelim",
        description: "Dosyanızı sonuna kadar takip ediyor, her gelişmeyi size anlaşılır bir dille bildiriyoruz.",
    },
];

const pillars = [
    { icon: UserCheck, title: "Dosyanızla avukatınız ilgilenir", description: "İlk görüşmeden sonuca kadar dosyanızı doğrudan avukatınız takip eder." },
    { icon: Eye, title: "Açık ve anlaşılır bilgi", description: "Ne olduğunu, sıradaki adımı ve olası sonuçları hukuk diliyle değil, sade bir dille anlatırız." },
    { icon: Lock, title: "Gizlilik", description: "Paylaştığınız her bilgi avukat–müvekkil gizliliğiyle korunur." },
    { icon: PhoneCall, title: "Kolay ulaşım", description: "Telefon, WhatsApp veya e-postayla sorularınıza hızlıca dönüş yaparız." },
];

// Ana sayfada, her alandan vatandaşın en sık sorduğu sorular (sade cevaplarıyla)
const featuredFaqIds = [
    "ise-iade-suresi",
    "anlasmali-bosanma-suresi",
    "kira-artis-orani",
    "ifadede-avukat",
    "mirasin-reddi",
    "adli-yardim",
];
const featuredFaqs = featuredFaqIds
    .map((id) => faqs.find((faq) => faq.id === id))
    .filter((faq): faq is (typeof faqs)[number] => Boolean(faq));

// Hero'nun altındaki şeritte blogun son eklenen dört yazısı (günlük makaleler dahil);
// sayfa sonundaki blog bölümü tekrara düşmemek için ardından gelen üç yazıyı gösterir.
const allPosts = getAllPosts();
const newestPosts = allPosts.slice(0, 4).map(toSummary);
const latestPosts = allPosts.slice(4, 7);

function SectionHeading({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: React.ReactNode;
    description?: string;
}) {
    return (
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <span className="eyebrow justify-center">{eyebrow}</span>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-slate-900 dark:text-slate-100 lg:text-4xl">
                {title}
            </h2>
            {description && (
                <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
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
                <LatestPostsStrip posts={newestPosts} />

                {/* --- ÇALIŞMA ALANLARI --- */}
                <section id="uzmanliklar" className="border-t border-slate-200/70 bg-white py-20 dark:border-slate-800 dark:bg-slate-900 lg:py-24">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            eyebrow="Çalışma Alanlarımız"
                            title="Hangi konuda yardıma ihtiyacınız var?"
                            description="Konunuzu seçin; haklarınızı ve ne yapmanız gerektiğini sade bir dille anlatalım."
                        />

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {siteContent.services.map((service, i) => (
                                <Reveal key={service.id} delay={(i % 3) * 90} className="h-full">
                                    <ServiceCard
                                        id={service.id}
                                        title={service.title}
                                        description={service.description}
                                        icon={service.icon}
                                    />
                                </Reveal>
                            ))}
                        </div>

                        <p className="mt-10 text-center text-slate-600 dark:text-slate-400">
                            Konunuz listede yok mu? Miras, icra ve diğer konular için de{" "}
                            <Link
                                href="/iletisim#randevu"
                                className="font-semibold text-primary-900 underline decoration-gold-500/60 underline-offset-4 hover:text-gold-700 dark:text-slate-100 dark:hover:text-gold-400"
                            >
                                bize yazın
                            </Link>
                            .
                        </p>
                    </div>
                </section>

                {/* --- SIKÇA SORULAN SORULAR --- */}
                <section className="bg-ivory-100 py-20 dark:bg-slate-950 lg:py-24">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            eyebrow="Merak Edilenler"
                            title="En çok sorulan sorular"
                            description="Kısa ve anlaşılır cevaplar. Ayrıntısını merak ederseniz bağlantıya tıklayın."
                        />

                        <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                            {featuredFaqs.map((faq) => (
                                <details key={faq.id} className="group">
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                                        <span>
                                            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-700 dark:text-gold-400">
                                                {faq.category}
                                            </span>
                                            <span className="mt-1 block font-serif text-lg text-slate-900 dark:text-slate-100 sm:text-xl">
                                                {faq.question}
                                            </span>
                                        </span>
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 text-primary-900 transition-all duration-300 group-open:rotate-45 group-open:border-gold-500 group-open:bg-gold-500 group-open:text-white dark:border-slate-700 dark:text-slate-100">
                                            <Plus className="h-4 w-4" />
                                        </span>
                                    </summary>
                                    <div className="pb-6 leading-relaxed text-slate-700 dark:text-slate-300">
                                        <p>{faq.shortAnswer ?? faq.answer.split("\n\n")[0]}</p>
                                        <Link
                                            href={`/sss#${faq.id}`}
                                            className="mt-3 inline-block text-sm font-semibold text-primary-800 hover:underline dark:text-gold-400"
                                        >
                                            Ayrıntılı cevabı okuyun →
                                        </Link>
                                    </div>
                                </details>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                href="/sss"
                                className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition-colors duration-300 hover:border-gold-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            >
                                Tüm soruları görün
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/iletisim#randevu"
                                className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-primary-800 dark:bg-gold-500 dark:text-slate-950"
                            >
                                Sorunuzu bize sorun
                            </Link>
                        </div>
                    </div>
                </section>

                {/* --- NASIL ÇALIŞIYORUZ --- */}
                <section className="bg-white py-20 dark:bg-slate-900 lg:py-24">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            eyebrow="Nasıl Çalışıyoruz"
                            title="Bize ulaştığınızda ne olur?"
                        />

                        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {processSteps.map((step, i) => (
                                <Reveal as="li" key={step.title} delay={i * 90} className="flex gap-4 lg:flex-col lg:gap-0">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-500/50 bg-ivory-50 font-serif text-lg text-primary-900 dark:bg-slate-950 dark:text-gold-400">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <h3 className="font-serif text-xl text-slate-900 dark:text-slate-100 lg:mt-5">{step.title}</h3>
                                        <p className="mt-2 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
                                            {step.description}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* --- BÜROMUZ --- */}
                <section className="bg-ivory-100 py-20 dark:bg-slate-950 lg:py-24">
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
                        <Reveal className="lg:col-span-5">
                            <span className="eyebrow">Büromuz</span>
                            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-slate-900 dark:text-slate-100 lg:text-4xl">
                                2004&apos;ten beri Kartal&apos;da, yanınızda
                            </h2>
                            <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                                {siteContent.about.description}
                            </p>
                            <Link
                                href="/hakkimizda"
                                className="group mt-8 inline-flex items-center gap-2 border-b border-gold-500 pb-0.5 font-semibold text-primary-900 transition-colors hover:text-gold-700 dark:text-slate-100 dark:hover:text-gold-400"
                            >
                                Av. Emre Durmuş&apos;u tanıyın
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Reveal>

                        <ul className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-7">
                            {pillars.map((p, i) => (
                                <Reveal as="li" key={p.title} delay={i * 80} className="flex gap-4">
                                    <p.icon className="mt-1 h-6 w-6 shrink-0 text-gold-600 dark:text-gold-400" strokeWidth={1.5} />
                                    <div>
                                        <h3 className="font-serif text-lg text-slate-900 dark:text-slate-100">{p.title}</h3>
                                        <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">{p.description}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* --- GÜNCEL YAZILAR --- */}
                {latestPosts.length > 0 && (
                    <section className="bg-white py-20 dark:bg-slate-900 lg:py-24">
                        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                                <Reveal>
                                    <span className="eyebrow">Hukuk Blogu</span>
                                    <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-slate-900 dark:text-slate-100 lg:text-4xl">
                                        Haklarınızı bilmek, ilk adımdır
                                    </h2>
                                </Reveal>
                                <Link
                                    href="/blog"
                                    className="group inline-flex items-center gap-2 border-b border-gold-500 pb-0.5 font-semibold text-primary-900 dark:text-slate-100"
                                >
                                    Tüm yazılar
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                {latestPosts.map((post, i) => (
                                    <Reveal key={post.id} delay={i * 90} className="h-full">
                                        <Link
                                            href={`/blog/${post.id}`}
                                            className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-ivory-50 p-6 transition-colors duration-300 hover:border-gold-500/60 dark:border-slate-800 dark:bg-slate-950"
                                        >
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-semibold uppercase tracking-[0.14em] text-gold-700 dark:text-gold-400">
                                                    {post.kind === "ictihat" ? "İçtihat Notu" : post.category}
                                                </span>
                                                <span className="text-slate-500">{post.readTime}</span>
                                            </div>
                                            <h3 className="mt-4 flex-grow font-serif text-xl leading-snug text-slate-900 transition-colors group-hover:text-primary-800 dark:text-slate-100 dark:group-hover:text-gold-300">
                                                {post.title}
                                            </h3>
                                            <div className="mt-6 flex items-center justify-between border-t border-slate-200/80 pt-4 dark:border-slate-800">
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

                <ContactCTA />
            </main>

            <Footer />
        </div>
    );
}
