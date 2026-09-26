import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteContent } from "@/data/siteContent";
import { Scale, Award, ShieldCheck, Lock, Eye, HeartHandshake, ArrowRight } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ContactCTA from "@/components/ContactCTA";
import Image from "next/image";

import { Metadata } from "next";
import { breadcrumbJsonLd, ORGANIZATION_ID, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Hakkımızda - Av. Emre Durmuş, Kartal Avukat",
    description: "2004'ten bu yana İstanbul Kartal'da avukatlık ve arabuluculuk yapan Av. Emre Durmuş ve Asil Hukuk Bürosu hakkında: tecrübe, değerler ve çalışma anlayışı.",
    path: "/hakkimizda",
    images: [{ url: "/images/emre-durmus.jpg", width: 1024, height: 937, alt: "Av. Emre Durmuş" }],
});

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'Hakkımızda',
    'description': 'Asil Hukuk Bürosu tarihçesi, vizyonu ve uzman kadrosu hakkında bilgiler.',
    'url': 'https://asilhukuk.net/hakkimizda',
    'about': { '@id': ORGANIZATION_ID },
    'publisher': { '@id': ORGANIZATION_ID }
}

const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://asilhukuk.net/hakkimizda#emre-durmus',
    'name': 'Av. Emre Durmuş',
    'jobTitle': 'Avukat ve Arabulucu',
    'image': 'https://asilhukuk.net/images/emre-durmus.jpg',
    'url': 'https://asilhukuk.net/hakkimizda',
    'worksFor': { '@id': ORGANIZATION_ID },
    'memberOf': {
        '@type': 'Organization',
        'name': 'İstanbul Barosu'
    },
    'knowsAbout': [
        'Boşanma ve Aile Hukuku',
        'Ceza Hukuku',
        'Gayrimenkul Hukuku',
        'İş ve Sosyal Güvenlik Hukuku',
        'Ticaret ve Şirketler Hukuku',
        'Arabuluculuk'
    ],
    'sameAs': [
        'https://www.linkedin.com/in/avukat-emre-durmu%C5%9F-a5981523/'
    ]
}

const credentials = [
    { icon: Award, label: "İstanbul Barosu Üyesi" },
    { icon: Scale, label: "Adalet Bakanlığı Kayıtlı Arabulucu" },
    { icon: ShieldCheck, label: "2004'ten bu yana avukatlık" },
    { icon: HeartHandshake, label: "Şeffaf ve güvenilir temsil" },
];

const values = [
    {
        icon: Eye,
        title: "Şeffaflık",
        description: "Sürecin her aşamasını, olası sonuçlarıyla birlikte açık ve anlaşılır biçimde paylaşırız.",
    },
    {
        icon: Lock,
        title: "Gizlilik",
        description: "Bize emanet ettiğiniz her bilgi, avukat–müvekkil gizliliği ilkesiyle korunur.",
    },
    {
        icon: Scale,
        title: "Meslek Etiği",
        description: "Hukukun üstünlüğü ve meslek kurallarına bağlılık, çalışmamızın temelidir.",
    },
    {
        icon: HeartHandshake,
        title: "Çözüm Ortaklığı",
        description: "Vekâlet ilişkisini, karşılıklı güvene dayalı uzun soluklu bir iş birliği olarak görürüz.",
    },
];

export default function AboutPage() {
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
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(breadcrumbJsonLd([{ name: "Hakkımızda", path: "/hakkimizda" }])),
                    }}
                />

                {/* Başlık + kurucu */}
                <section className="relative isolate overflow-hidden bg-primary-950 pb-24 pt-36 text-white lg:pb-32 lg:pt-44">
                    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.08]" />
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgb(192_150_82/0.18),transparent_60%),radial-gradient(ellipse_50%_70%_at_0%_100%,rgb(79_111_158/0.35),transparent_60%)]"
                    />

                    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
                        <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
                            <div
                                aria-hidden="true"
                                className="absolute -left-4 -top-4 bottom-8 right-8 rounded-t-[12rem] rounded-b-3xl border border-gold-500/40"
                            />
                            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[12rem] rounded-b-3xl shadow-elegant">
                                <Image
                                    src="/images/emre-durmus.jpg"
                                    alt="Av. Emre Durmuş"
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 90vw, 40vw"
                                    className="object-cover object-[60%_20%]"
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <span className="eyebrow !text-gold-400">Hakkımızda · Kurucumuz</span>
                            <h1 className="mt-6 font-serif text-5xl font-medium md:text-6xl">Av. Emre Durmuş</h1>
                            <p className="mt-3 font-serif text-xl italic text-gold-300">
                                2004&apos;ten bugüne, hukukun üstünlüğüne olan inancımızla yanınızdayız.
                            </p>
                            <p className="mt-8 text-lg font-light leading-relaxed text-slate-300">
                                Asil Hukuk Bürosu&apos;nun kurucusu olan Av. Emre Durmuş, 20 yılı aşkın mesleki
                                birikimiyle müvekkillerine ceza hukuku, aile hukuku, gayrimenkul hukuku ve iş hukuku
                                başta olmak üzere hukukun birçok dalında danışmanlık ve avukatlık hizmeti vermektedir.
                            </p>
                            <p className="mt-5 leading-relaxed text-slate-400">
                                İstanbul Barosu bünyesinde çalışmalarını sürdüren Av. Emre Durmuş, hukukun üstünlüğü ve
                                adaletin tecellisi ilkelerinden taviz vermeksizin, müvekkillerinin haklarını korumak
                                amacıyla dürüst, şeffaf ve sonuç odaklı çözümler üretmektedir. Aynı zamanda Adalet
                                Bakanlığı bünyesinde kayıtlı arabulucu olarak uyuşmazlıkların barışçıl yollarla
                                çözüme kavuşturulmasında aktif rol oynamaktadır.
                            </p>

                            <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {credentials.map(({ icon: Icon, label }) => (
                                    <li
                                        key={label}
                                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200"
                                    >
                                        <Icon className="h-5 w-5 shrink-0 text-gold-400" strokeWidth={1.5} />
                                        {label}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/iletisim#randevu"
                                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
                                >
                                    Randevu Talep Edin
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                                <a
                                    href="https://www.linkedin.com/in/avukat-emre-durmu%C5%9F-a5981523/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 font-semibold transition-colors hover:border-gold-400"
                                >
                                    LinkedIn Profili
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Büro */}
                <section className="bg-white py-24 dark:bg-slate-900 lg:py-32">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                        <Reveal>
                            <span className="eyebrow">{siteContent.brand.name} Hakkında</span>
                            <h2 className="mt-5 font-serif text-4xl font-medium leading-tight text-slate-900 dark:text-slate-100 lg:text-5xl">
                                Kartal&apos;da köklü, <em className="italic text-gold-700 dark:text-gold-400">güncel</em> bir hukuk bürosu
                            </h2>
                            <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                                {siteContent.about.description}
                            </p>
                            <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-400">
                                Müvekkillerimizle kurduğumuz ilişki, sadece bir vekâlet ilişkisi değil, karşılıklı
                                güvene dayalı bir çözüm ortaklığıdır. Hukuki süreçlerin her aşamasında şeffaf
                                bilgilendirme yaparak, müvekkillerimizin haklarını en etkin şekilde savunuyoruz.
                            </p>
                            <dl className="mt-10 grid grid-cols-3 divide-x divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                                {siteContent.about.stats.map((stat) => (
                                    <div key={stat.label} className="flex flex-col px-3 py-6 first:pl-0">
                                        <dd className="order-1 font-serif text-3xl font-medium text-primary-900 dark:text-white">
                                            {stat.value}
                                        </dd>
                                        <dt className="order-2 mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                                            {stat.label}
                                        </dt>
                                    </div>
                                ))}
                            </dl>
                        </Reveal>
                        <Reveal delay={150} className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant sm:aspect-[5/4] lg:aspect-[4/5]">
                            <Image
                                src="/images/about-office.png"
                                alt="Asil Hukuk Bürosu"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </Reveal>
                    </div>
                </section>

                {/* Değerler */}
                <section className="bg-ivory-100 py-24 dark:bg-slate-950 lg:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
                            <span className="eyebrow justify-center">Değerlerimiz</span>
                            <h2 className="mt-5 font-serif text-4xl font-medium text-slate-900 dark:text-slate-100 lg:text-5xl">
                                Çalışma anlayışımız
                            </h2>
                        </Reveal>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {values.map((v, i) => (
                                <Reveal key={v.title} delay={i * 100} className="h-full">
                                    <div className="h-full rounded-3xl border border-slate-200/80 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
                                        <v.icon className="h-7 w-7 text-gold-600 dark:text-gold-400" strokeWidth={1.5} />
                                        <h3 className="mt-6 font-serif text-xl text-slate-900 dark:text-slate-100">{v.title}</h3>
                                        <p className="mt-2 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
                                            {v.description}
                                        </p>
                                    </div>
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
