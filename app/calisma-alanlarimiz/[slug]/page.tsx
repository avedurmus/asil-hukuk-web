import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services } from "@/data/services";
import { getAllPosts } from "@/lib/posts";
import { faqs } from "@/data/faq";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock, MessageCircle, Phone, CalendarCheck, Plus } from "lucide-react";
import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";
import { OFFICE_HOURS, PHONE_HREF, whatsappHref } from "@/lib/contact";
import { siteContent } from "@/data/siteContent";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { breadcrumbJsonLd, ORGANIZATION_ID, pageMetadata, SITE_URL } from "@/lib/seo";

interface Props {
    params: {
        slug: string;
    }
}

export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const service = services.find((s) => s.id === params.slug);
    if (!service) return { title: "Sayfa Bulunamadı" };

    return pageMetadata({
        title: service.seoTitle,
        description: service.seoDescription,
        path: `/calisma-alanlarimiz/${service.id}`,
    });
}

export default function ServiceDetailPage({ params }: Props) {
    const service = services.find((s) => s.id === params.slug);

    if (!service) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "serviceType": service.title,
        "description": service.seoDescription,
        "url": `${SITE_URL}/calisma-alanlarimiz/${service.id}`,
        // Firma bilgileri kök düzendeki LegalService şemasında; burada kimliğiyle anılır.
        "provider": { "@id": ORGANIZATION_ID },
        "areaServed": [
            { "@type": "AdministrativeArea", "name": "Kartal" },
            { "@type": "AdministrativeArea", "name": "Pendik" },
            { "@type": "AdministrativeArea", "name": "Maltepe" },
            { "@type": "City", "name": "İstanbul" }
        ]
    };

    const breadcrumbLd = breadcrumbJsonLd([
        { name: "Çalışma Alanlarımız", path: "/calisma-alanlarimiz" },
        { name: service.title, path: `/calisma-alanlarimiz/${service.id}` },
    ]);

    // İç bağlantılar: aynı alandaki yazılar ve sorular hizmet sayfasını besler.
    const relatedPosts = getAllPosts()
        .filter((post) => service.blogCategories.includes(post.category))
        .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
        .slice(0, 4);
    const relatedFaqs = faqs
        .filter((faq) => service.faqCategories.includes(faq.category) || service.faqIds?.includes(faq.id))
        .slice(0, 4);

    const Icon = service.icon;
    const otherServices = services.filter((s) => s.id !== service.id);
    const formHref = `/iletisim?konu=${encodeURIComponent(service.title)}#randevu`;

    return (
        <div className="flex min-h-screen flex-col bg-ivory-100 transition-colors duration-300 dark:bg-slate-950">
            <Header />
            <main className="flex-grow">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
                />

                {/* Başlık alanı */}
                <section className="relative isolate overflow-hidden bg-primary-950 pb-20 pt-36 text-white lg:pb-24 lg:pt-44">
                    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.08]" />
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgb(192_150_82/0.18),transparent_60%),radial-gradient(ellipse_50%_70%_at_0%_100%,rgb(79_111_158/0.35),transparent_60%)]"
                    />
                    <Icon
                        aria-hidden="true"
                        className="absolute -right-10 top-24 -z-10 h-80 w-80 text-white/[0.03]"
                        strokeWidth={0.75}
                    />
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <nav aria-label="Sayfa konumu" className="flex items-center gap-2 text-sm text-slate-400">
                            <Link href="/" className="transition-colors hover:text-white">Ana Sayfa</Link>
                            <span>/</span>
                            <Link href="/calisma-alanlarimiz" className="transition-colors hover:text-white">
                                Çalışma Alanları
                            </Link>
                        </nav>
                        <div className="mt-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold-500/30 bg-white/5">
                            <Icon className="h-8 w-8 text-gold-300" strokeWidth={1.5} />
                        </div>
                        <h1 className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-tight md:text-6xl">
                            {service.title}
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-slate-300">
                            {service.shortDescription}
                        </p>
                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={formHref}
                                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
                            >
                                Bu konuda randevu alın
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            <a
                                href={PHONE_HREF}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold transition-colors hover:border-gold-400"
                            >
                                <Phone className="h-4 w-4 text-gold-300" />
                                {siteContent.contact.phone}
                            </a>
                        </div>
                    </div>
                </section>

                {/* İçerik + yapışkan iletişim kartı */}
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
                    <div className="lg:col-span-8">
                        <p className="font-serif text-2xl leading-relaxed text-slate-800 first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.85] first-letter:text-gold-600 dark:text-slate-200">
                            {service.detailContent.intro}
                        </p>

                        <h2 className="mt-16 font-serif text-3xl text-slate-900 dark:text-slate-100">Hizmet Kapsamı</h2>
                        <ul className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
                            {service.detailContent.features.map((feature) => (
                                <li
                                    key={feature}
                                    className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-700 dark:text-gold-400">
                                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                    </span>
                                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-12 rounded-3xl border-l-4 border-gold-500 bg-white p-8 dark:bg-slate-900">
                            <h2 className="font-serif text-2xl text-slate-900 dark:text-slate-100">Süreç Yönetimi</h2>
                            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
                                {service.detailContent.process}
                            </p>
                        </div>

                        {service.detailContent.guide && (
                            <div className="mt-16 space-y-10">
                                {service.detailContent.guide.map((section) => (
                                    <section key={section.heading}>
                                        <h2 className="font-serif text-2xl text-slate-900 dark:text-slate-100 md:text-3xl">
                                            {section.heading}
                                        </h2>
                                        <p className="mt-4 text-[17px] leading-relaxed text-slate-700 dark:text-slate-300">
                                            {section.body}
                                        </p>
                                    </section>
                                ))}
                                {service.id === "gayrimenkul-hukuku" && (
                                    <Link
                                        href="/kentsel-donusum-rehberi"
                                        className="inline-flex items-center gap-2 border-b border-gold-500 pb-0.5 font-semibold text-primary-900 dark:text-slate-100"
                                    >
                                        Kentsel Dönüşüm Rehberi <ArrowRight className="h-4 w-4" />
                                    </Link>
                                )}
                            </div>
                        )}

                        {relatedFaqs.length > 0 && (
                            <div className="mt-16">
                                <h2 className="font-serif text-3xl text-slate-900 dark:text-slate-100">
                                    Sık sorulanlar
                                </h2>
                                <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                                    {relatedFaqs.map((faq) => (
                                        <details key={faq.id} className="group">
                                            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                                                <span className="font-serif text-lg text-slate-900 dark:text-slate-100">
                                                    {faq.question}
                                                </span>
                                                <Plus className="h-5 w-5 shrink-0 text-gold-600 transition-transform duration-300 group-open:rotate-45" />
                                            </summary>
                                            <div className="pb-6 leading-relaxed text-slate-600 dark:text-slate-400">
                                                {faq.answer}
                                                <Link
                                                    href={`/sss#${faq.id}`}
                                                    className="mt-3 block text-sm font-semibold text-primary-800 hover:underline dark:text-gold-400"
                                                >
                                                    Tüm SSS sayfasında görüntüle →
                                                </Link>
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        )}

                        {relatedPosts.length > 0 && (
                            <div className="mt-16">
                                <h2 className="font-serif text-3xl text-slate-900 dark:text-slate-100">İlgili yazılar</h2>
                                <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {relatedPosts.map((post) => (
                                        <li key={post.id}>
                                            <Link
                                                href={`/blog/${post.id}`}
                                                className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/60 hover:shadow-elegant dark:border-slate-800 dark:bg-slate-900"
                                            >
                                                <span className="font-serif text-lg leading-snug text-slate-900 group-hover:text-primary-800 dark:text-slate-100 dark:group-hover:text-gold-300">
                                                    {post.title}
                                                </span>
                                                <span className="mt-2 line-clamp-2 flex-grow text-sm text-slate-600 dark:text-slate-400">
                                                    {post.excerpt}
                                                </span>
                                                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-800 dark:text-gold-400">
                                                    Oku <ArrowUpRight className="h-4 w-4" />
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Yapışkan iletişim kartı */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-28 space-y-5">
                            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-elegant dark:border-slate-800 dark:bg-slate-900">
                                <div className="flex items-center gap-4 bg-primary-900 p-6 text-white">
                                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-gold-400/60">
                                        <Image
                                            src="/images/emre-durmus-160.webp"
                                            alt="Av. Emre Durmuş"
                                            fill
                                            sizes="64px"
                                            className="object-cover object-[60%_20%]"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-serif text-xl">Av. Emre Durmuş</p>
                                        <p className="text-sm text-slate-300">Avukat · Arabulucu</p>
                                    </div>
                                </div>
                                <div className="space-y-3 p-6">
                                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                        {service.title} alanındaki sorunuzu paylaşın; durumunuzu değerlendirip size yol gösterelim.
                                    </p>
                                    <Link
                                        href={formHref}
                                        className="flex items-center justify-center gap-2 rounded-full bg-primary-900 py-3.5 font-semibold text-white transition-colors hover:bg-primary-800 dark:bg-gold-500 dark:text-slate-950 dark:hover:bg-gold-400"
                                    >
                                        <CalendarCheck className="h-4 w-4" /> Randevu Talep Et
                                    </Link>
                                    <div className="grid grid-cols-2 gap-3">
                                        <a
                                            href={PHONE_HREF}
                                            className="flex items-center justify-center gap-2 rounded-full border border-slate-200 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-gold-500 dark:border-slate-700 dark:text-slate-200"
                                        >
                                            <Phone className="h-4 w-4 text-gold-600" /> Ara
                                        </a>
                                        <a
                                            href={whatsappHref(`Merhaba, ${service.title} konusunda hukuki destek almak istiyorum.`)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 rounded-full border border-slate-200 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-green-600 dark:border-slate-700 dark:text-slate-200"
                                        >
                                            <MessageCircle className="h-4 w-4 text-green-600" /> WhatsApp
                                        </a>
                                    </div>
                                    <p className="flex items-center justify-center gap-1.5 pt-1 text-xs text-slate-500">
                                        <Clock className="h-3.5 w-3.5" /> {OFFICE_HOURS}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                    Diğer çalışma alanları
                                </p>
                                <ul className="mt-4 space-y-1">
                                    {otherServices.map((s) => (
                                        <li key={s.id}>
                                            <Link
                                                href={`/calisma-alanlarimiz/${s.id}`}
                                                className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-[15px] text-slate-700 transition-colors hover:bg-ivory-100 hover:text-primary-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                                            >
                                                {s.title}
                                                <ArrowRight className="h-4 w-4 text-gold-600 opacity-0 transition-opacity group-hover:opacity-100" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link
                                href="/calisma-alanlarimiz"
                                className="inline-flex items-center gap-2 px-2 text-sm font-medium text-slate-500 hover:text-primary-900 dark:hover:text-white"
                            >
                                <ArrowLeft className="h-4 w-4" /> Tüm çalışma alanları
                            </Link>
                        </div>
                    </aside>
                </div>

                <ContactCTA
                    topic={service.title}
                    title={`${service.title} konusunda desteğe mi ihtiyacınız var?`}
                />
            </main>
            <Footer />
        </div>
    );
}
