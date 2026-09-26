import Link from "next/link";
import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { OFFICE_HOURS, PHONE_HREF, whatsappHref } from "@/lib/contact";

interface ContactCTAProps {
    title?: string;
    description?: string;
    /** Formda konu satırını önceden doldurmak için (ör. hizmet adı). */
    topic?: string;
}

/**
 * Sayfa sonlarında kullanılan randevu çağrısı: form, telefon ve WhatsApp
 * seçeneklerini tek, sakin bir blokta sunar.
 */
export default function ContactCTA({
    title = "Hukuki durumunuzu birlikte değerlendirelim",
    description = "Sorunuzu dinleyelim, hangi yolun sizin için doğru olduğunu açık ve anlaşılır bir dille anlatalım.",
    topic,
}: ContactCTAProps) {
    const formHref = topic ? `/iletisim?konu=${encodeURIComponent(topic)}#randevu` : "/iletisim#randevu";
    const waText = topic
        ? `Merhaba, ${topic} konusunda hukuki destek almak istiyorum.`
        : undefined;

    return (
        <section className="relative isolate overflow-hidden bg-primary-950 py-20 text-white lg:py-24">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.08]" />
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgb(192_150_82/0.18),transparent_60%),radial-gradient(ellipse_50%_70%_at_0%_100%,rgb(79_111_158/0.35),transparent_60%)]"
            />

            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
                <div className="lg:col-span-7">
                    <span className="eyebrow !text-gold-400">Randevu & İletişim</span>
                    <h2 className="mt-5 font-serif text-3xl font-medium leading-tight md:text-5xl">{title}</h2>
                    <p className="mt-5 max-w-xl text-lg font-light leading-relaxed text-slate-300">{description}</p>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href={formHref}
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-8 py-4 font-semibold text-slate-950 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
                        >
                            Randevu Talep Edin
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        <a
                            href={whatsappHref(waText)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-white/5"
                        >
                            <MessageCircle className="h-5 w-5 text-green-400" />
                            WhatsApp
                        </a>
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
                        <a href={PHONE_HREF} className="group flex items-center gap-4">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500 text-slate-950">
                                <Phone className="h-5 w-5" />
                            </span>
                            <span>
                                <span className="block text-xs uppercase tracking-[0.18em] text-slate-400">Telefon</span>
                                <span className="block font-serif text-2xl text-white transition-colors group-hover:text-gold-300">
                                    {siteContent.contact.phone}
                                </span>
                            </span>
                        </a>
                        <div className="my-6 h-px bg-white/10" />
                        <ul className="space-y-4 text-sm text-slate-300">
                            <li className="flex items-start gap-3">
                                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                                <span>{OFFICE_HOURS} · Randevu ile görüşme</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                                <span>{siteContent.contact.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
