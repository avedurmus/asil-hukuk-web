import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, Clock, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import OpenChatButton from "@/components/OpenChatButton";
import BookingWizard from "@/components/booking/BookingWizard";
import { appointmentSettings } from "@/data/appointmentSettings";
import { siteContent } from "@/data/siteContent";
import { OFFICE_HOURS, PHONE_HREF, whatsappHref } from "@/lib/contact";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Online Avukat Randevusu - Kartal Hukuk Bürosu",
    description:
        "Av. Emre Durmuş ile ön görüşme randevunuzu takvimden gün ve saat seçerek online oluşturun: büroda yüz yüze, görüntülü veya telefonla. Kartal / İstanbul.",
    path: "/randevu",
});

const jsonLd = breadcrumbJsonLd([{ name: "Online Randevu", path: "/randevu" }]);

const facts = [
    { icon: Clock, text: `${appointmentSettings.durationMinutes} dakikalık ön görüşme` },
    { icon: MapPin, text: "Büroda, online veya telefonla" },
    { icon: ShieldCheck, text: "Bilgileriniz gizli tutulur" },
];

export default function BookingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-ivory-100 transition-colors duration-300 dark:bg-slate-950">
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <main className="flex-grow">
                <section className="relative isolate overflow-hidden bg-primary-950 pb-40 pt-36 text-white lg:pt-44">
                    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.08]" />
                    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-hero-glow" />
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <span className="eyebrow justify-center !text-gold-400">Online Randevu</span>
                        <h1 className="mt-6 font-serif text-4xl font-medium md:text-6xl">
                            Randevunuzu <em className="italic text-gold-300">şimdi</em> oluşturun
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-slate-300">
                            Takvimden size uygun günü ve saati seçin, birkaç bilgiyle Av. Emre Durmuş ile ön görüşmenizi planlayın.
                        </p>
                        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-300">
                            {facts.map((fact) => (
                                <li key={fact.text} className="flex items-center gap-2">
                                    <fact.icon className="h-4 w-4 text-gold-400" /> {fact.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <div className="relative z-10 mx-auto -mt-28 max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-elegant dark:border-slate-800 dark:bg-slate-900 md:p-10 lg:col-span-8">
                            <Suspense fallback={<div className="h-[32rem]" />}>
                                <BookingWizard />
                            </Suspense>
                        </div>

                        <aside className="space-y-4 lg:col-span-4">
                            <div className="rounded-3xl bg-primary-900 p-7 text-white">
                                <Sparkles className="h-6 w-6 text-gold-300" strokeWidth={1.5} />
                                <h2 className="mt-4 font-serif text-2xl">Sohbet ederek randevu alın</h2>
                                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                    Asil Asistan sorununuzu dinler, sizi doğru alana yönlendirir ve randevunuzu sizin yerinize oluşturur.
                                </p>
                                <OpenChatButton
                                    label="Randevu Sayfasi - Asistanla Randevu"
                                    message="Randevu almak istiyorum"
                                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-gold-400"
                                >
                                    <MessageCircle className="h-4 w-4" /> Asil Asistan ile devam et
                                </OpenChatButton>
                            </div>

                            <Link
                                href="/randevu/sorgula"
                                className="group flex items-center gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/60 hover:shadow-elegant dark:border-slate-800 dark:bg-slate-900"
                            >
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ivory-100 text-gold-700 dark:bg-slate-950 dark:text-gold-400">
                                    <CalendarClock className="h-5 w-5" />
                                </span>
                                <span>
                                    <span className="block font-semibold text-slate-900 dark:text-slate-100">Randevunuz var mı?</span>
                                    <span className="block text-sm text-slate-500 dark:text-slate-400">Görüntüleyin, erteleyin veya iptal edin</span>
                                </span>
                            </Link>

                            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
                                <p className="font-semibold text-slate-900 dark:text-slate-100">Acil bir durum mu var?</p>
                                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    Gözaltı, ifade veya yakın tarihli duruşma gibi durumlarda randevu beklemeyin, doğrudan arayın.
                                </p>
                                <a href={PHONE_HREF} className="mt-4 flex items-center gap-3 font-serif text-xl text-primary-900 dark:text-white">
                                    <Phone className="h-5 w-5 text-gold-600" /> {siteContent.contact.phone}
                                </a>
                                <a
                                    href={whatsappHref()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300"
                                >
                                    <MessageCircle className="h-5 w-5 text-[#167c43]" /> WhatsApp&apos;tan yazın
                                </a>
                                <p className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">{OFFICE_HOURS}</p>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
