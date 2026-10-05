import Header from "@/components/Header";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import { siteContent } from "@/data/siteContent";
import { Mail, MapPin, Phone, Clock, MessageCircle, ArrowUpRight, FileText, ShieldCheck, CalendarCheck } from "lucide-react";
import { OFFICE_HOURS, PHONE_HREF, whatsappHref } from "@/lib/contact";

import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import OpenChatButton from "@/components/OpenChatButton";
import { OFFICE_MAP_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "İletişim ve Randevu - Kartal Hukuk Bürosu",
    description: "Kartal'da avukat randevusu için Asil Hukuk: Yalı Mah. Topselvi Cad. No:100 Mai Residence, Kartal/İstanbul. Telefon 0530 432 20 25, hafta içi 09:00-18:00.",
    path: "/iletisim",
});

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'İletişim',
    'description': 'Asil Hukuk Bürosu iletişim bilgileri.',
    'url': 'https://asilhukuk.net/iletisim',
    'mainEntity': {
        '@type': 'LegalService',
        'name': 'Asil Hukuk Bürosu',
        'telephone': '0530 432 20 25',
        'email': 'emre@asilhukuk.net'
    }
}

const channels = [
    {
        icon: Phone,
        label: "Telefon",
        value: siteContent.contact.phone,
        note: OFFICE_HOURS,
        href: PHONE_HREF,
    },
    {
        icon: MessageCircle,
        label: "WhatsApp",
        value: "Mesaj gönderin",
        note: "Kısa sorularınız için en hızlı yol",
        href: whatsappHref(),
        external: true,
    },
    {
        icon: Mail,
        label: "E-posta",
        value: siteContent.contact.email,
        note: "24 saat içinde dönüş",
        href: `mailto:${siteContent.contact.email}`,
    },
];

const preparation = [
    "Varsa dava veya tebligat evrakı, sözleşme ve tapu gibi belgeler",
    "Olayların kısa bir tarih sıralaması",
    "Karşı tarafın ve tanıkların bilinen iletişim bilgileri",
];

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col bg-ivory-100 transition-colors duration-300 dark:bg-slate-950">
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <main className="flex-grow">
                {/* Başlık */}
                <section className="relative isolate overflow-hidden bg-primary-950 pb-40 pt-36 text-white lg:pt-44">
                    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.08]" />
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgb(192_150_82/0.18),transparent_60%),radial-gradient(ellipse_50%_70%_at_0%_100%,rgb(79_111_158/0.35),transparent_60%)]"
                    />
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <span className="eyebrow justify-center !text-gold-400">İletişim & Randevu</span>
                        <h1 className="mt-6 font-serif text-4xl font-medium md:text-6xl">
                            Size nasıl <em className="italic text-gold-300">yardımcı</em> olabiliriz?
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-slate-300">
                            Formu doldurun, arayın ya da WhatsApp&apos;tan yazın. Talebinizi dinleyip size en kısa
                            sürede dönüş yapalım.
                        </p>
                        <OpenChatButton
                            label="Iletisim Hero - Asistanla Randevu"
                            message="Randevu almak istiyorum"
                            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-gold-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
                        >
                            <CalendarCheck className="h-4 w-4" />
                            Asil Asistan ile hemen randevu alın
                        </OpenChatButton>
                    </div>
                </section>

                <div className="relative z-10 mx-auto -mt-28 max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        {/* Form */}
                        <div
                            id="randevu"
                            className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-elegant dark:border-slate-800 dark:bg-slate-900 md:p-10 lg:col-span-7"
                        >
                            <h2 className="font-serif text-3xl text-slate-900 dark:text-slate-100">Randevu Talep Formu</h2>
                            <p className="mb-8 mt-2 text-slate-600 dark:text-slate-400">
                                Birkaç bilgi yeterli; ayrıntıları görüşmede konuşuruz.
                            </p>
                            <Suspense fallback={<div className="h-96" />}>
                                <ContactForm />
                            </Suspense>
                        </div>

                        {/* İletişim kanalları */}
                        <aside className="space-y-4 lg:col-span-5">
                            {channels.map((c) => (
                                <a
                                    key={c.label}
                                    href={c.href}
                                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    className="group flex items-center gap-5 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/60 hover:shadow-elegant dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-900 text-gold-300 dark:bg-slate-950">
                                        <c.icon className="h-6 w-6" />
                                    </span>
                                    <span className="min-w-0 flex-grow">
                                        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                            {c.label}
                                        </span>
                                        <span className="mt-0.5 block truncate font-serif text-xl text-slate-900 dark:text-slate-100">
                                            {c.value}
                                        </span>
                                        <span className="block text-sm text-slate-500 dark:text-slate-400">{c.note}</span>
                                    </span>
                                    <ArrowUpRight className="h-5 w-5 shrink-0 text-gold-600 transition-transform duration-300 group-hover:rotate-45" />
                                </a>
                            ))}

                            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
                                <div className="flex items-start gap-4">
                                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-600" />
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-slate-100">Büromuz</p>
                                        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                            {siteContent.contact.address}
                                        </p>
                                        <a
                                            href={OFFICE_MAP_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-800 hover:text-gold-700 dark:text-gold-400"
                                        >
                                            Yol tarifi al <ArrowUpRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                                <div className="my-5 h-px bg-slate-100 dark:bg-slate-800" />
                                <div className="flex items-start gap-4">
                                    <Clock className="mt-1 h-5 w-5 shrink-0 text-gold-600" />
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-slate-100">Çalışma Saatleri</p>
                                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                            {OFFICE_HOURS} · Görüşmeler randevu ile yapılır.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* Görüşmeye hazırlık + harita */}
                    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
                        <div className="rounded-3xl bg-primary-900 p-8 text-white lg:col-span-5">
                            <FileText className="h-7 w-7 text-gold-300" strokeWidth={1.5} />
                            <h2 className="mt-5 font-serif text-2xl">Görüşmeye gelirken</h2>
                            <p className="mt-2 text-sm text-slate-300">
                                Aşağıdakileri yanınızda getirmeniz, ilk görüşmeyi çok daha verimli kılar:
                            </p>
                            <ul className="mt-6 space-y-3">
                                {preparation.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-slate-200">
                                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative min-h-[380px] overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-200 shadow-card dark:border-slate-800 dark:bg-slate-850 lg:col-span-7">
                            <MapEmbed />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
