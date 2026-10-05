import Link from "next/link";
import Image from "next/image";
import { siteContent } from "@/data/siteContent";
import { OFFICE_HOURS, PHONE_HREF } from "@/lib/contact";
import { OFFICE_MAP_URL } from "@/lib/seo";
import { MapPin, Phone, Mail, Clock, Instagram, Linkedin, Facebook, Twitter, ArrowUpRight } from "lucide-react";

const socials = [
    { href: "https://www.instagram.com/asilhukuk", label: "Instagram", icon: Instagram },
    { href: "https://www.linkedin.com/in/avukat-emre-durmu%C5%9F-a5981523/", label: "LinkedIn", icon: Linkedin },
    { href: "https://x.com/AsilHukuk", label: "X (Twitter)", icon: Twitter },
    { href: "https://www.facebook.com/asilhukuk", label: "Facebook", icon: Facebook },
];

const corporateLinks = [
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/blog", label: "Hukuk Blogu" },
    { href: "/sss", label: "Sıkça Sorulan Sorular" },
    { href: "/kentsel-donusum-rehberi", label: "Kentsel Dönüşüm Rehberi" },
    { href: "/iletisim", label: "İletişim & Randevu" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-white/5 bg-[#0b1320] text-slate-400">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px rule-gold opacity-40" />
            <div className="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
                    {/* Marka */}
                    <div className="space-y-6 lg:col-span-4">
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src="/logo-128.webp"
                                alt={`${siteContent.brand.name} Logo`}
                                width={48}
                                height={48}
                                className="shrink-0 rounded-xl"
                            />
                            <span>
                                <span className="block font-serif text-2xl font-medium tracking-tight text-white">
                                    {siteContent.brand.name}
                                </span>
                                <span className="mt-1 block text-[10px] uppercase tracking-[0.28em] text-gold-400">
                                    {siteContent.brand.slogan}
                                </span>
                            </span>
                        </Link>
                        <p className="max-w-sm font-light leading-relaxed">
                            2004&apos;ten bu yana Kartal&apos;da; hukuki süreçlerinizde güvenilir, şeffaf ve özenli
                            çözüm ortağınız.
                        </p>
                        <div className="flex gap-2.5">
                            {socials.map(({ href, label, icon: Icon }) => (
                                <a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-gold-500 hover:text-gold-400"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Çalışma alanları */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white">Çalışma Alanları</h3>
                        <ul className="space-y-3 text-[15px]">
                            {siteContent.services.map((s) => (
                                <li key={s.id}>
                                    <Link href={`/calisma-alanlarimiz/${s.id}`} className="transition-colors hover:text-gold-300">
                                        {s.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kurumsal */}
                    <div className="lg:col-span-2">
                        <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white">Büro</h3>
                        <ul className="space-y-3 text-[15px]">
                            {corporateLinks.map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href} className="transition-colors hover:text-gold-300">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* İletişim */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white">İletişim</h3>
                        <ul className="space-y-4 text-[15px]">
                            <li className="flex items-start gap-3">
                                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                                <a href={PHONE_HREF} className="font-semibold text-white transition-colors hover:text-gold-300">
                                    {siteContent.contact.phone}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                                <a href={`mailto:${siteContent.contact.email}`} className="transition-colors hover:text-white">
                                    {siteContent.contact.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                                <span>{OFFICE_HOURS}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                                <span>
                                    {siteContent.contact.address}
                                    <a
                                        href={OFFICE_MAP_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 flex w-fit items-center gap-1 text-sm font-semibold text-gold-400 hover:text-gold-300"
                                    >
                                        Yol tarifi al <ArrowUpRight className="h-3.5 w-3.5" />
                                    </a>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-14 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                    <p className="text-xs leading-relaxed text-slate-400">
                        <span className="font-semibold text-slate-400">Yasal Uyarı:</span> Bu internet sitesinde yer alan
                        bilgiler yalnızca genel bilgilendirme amaçlıdır ve hukuki tavsiye niteliği taşımaz. Somut
                        durumunuza ilişkin hukuki değerlendirme için bir avukata danışmanız önerilir.
                    </p>
                </div>

                <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-center text-sm text-slate-400 md:flex-row">
                    <p>
                        &copy; {currentYear} {siteContent.brand.name}. Tüm hakları saklıdır.
                    </p>
                    <p className="font-serif italic text-slate-400">Av. Emre Durmuş · İstanbul Barosu</p>
                </div>
            </div>
        </footer>
    );
}
