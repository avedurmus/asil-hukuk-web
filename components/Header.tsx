"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteContent } from "@/data/siteContent";
import { PHONE_HREF, OFFICE_HOURS, trackEvent, whatsappHref } from "@/lib/contact";
import { Menu, X, Phone, Sun, Moon, ChevronDown, CalendarCheck, MessageCircle, ArrowRight } from "lucide-react";

const mainLinks = [
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/calisma-alanlarimiz", label: "Çalışma Alanları" },
];

const digitalLinks = [
    { href: "/blog", label: "Hukuk Blogu", note: "Güncel yazılar ve içtihat notları" },
    { href: "/kentsel-donusum-rehberi", label: "Kentsel Dönüşüm Rehberi", note: "Adım adım süreç ve haklarınız" },
    { href: "/ai-hukuk", label: "AI Hukuk", note: "Yapay zekâ ve hukuk" },
];

const endLinks = [
    { href: "/sss", label: "S.S.S." },
    { href: "/iletisim", label: "İletişim" },
];

export default function Header() {
    const pathname = usePathname() ?? "/";
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        } else {
            setTheme("light");
            document.documentElement.classList.remove("dark");
        }
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Mobil menü açıkken arka plan kaydırılmasın
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const toggleTheme = () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        document.documentElement.classList.toggle("dark", next === "dark");
        try {
            localStorage.setItem("theme", next);
        } catch (_) {}
    };

    const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
    const digitalActive = digitalLinks.some((l) => isActive(l.href));

    const linkClass = (active: boolean) =>
        `relative py-2 text-[15px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold-500 after:transition-transform after:duration-300 ${
            active
                ? "text-primary-900 dark:text-white after:scale-x-100"
                : "text-slate-600 hover:text-primary-900 dark:text-slate-300 dark:hover:text-white after:scale-x-0 hover:after:scale-x-100"
        }`;

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                scrolled || isMenuOpen
                    ? "border-b border-slate-200/70 bg-ivory-50/90 shadow-[0_8px_30px_-12px_rgb(15_26_44/0.18)] backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/90"
                    : "border-b border-slate-200/40 bg-ivory-50/95 backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-950/90"
            }`}
        >
            <nav aria-label="Ana menü" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${siteContent.brand.name} ana sayfa`}>
                        <Image
                            src="/logo-128.webp"
                            alt=""
                            width={44}
                            height={44}
                            className="shrink-0 rounded-xl shadow-sm"
                            priority
                        />
                        <span className="flex flex-col">
                            <span className="font-serif text-[1.6rem] font-semibold leading-none tracking-tight text-primary-900 dark:text-slate-100">
                                {siteContent.brand.name}
                            </span>
                            <span className="mt-1.5 text-[10px] uppercase tracking-[0.28em] text-gold-700 dark:text-gold-400">
                                {siteContent.brand.slogan}
                            </span>
                        </span>
                    </Link>

                    {/* Masaüstü menü */}
                    <div className="hidden items-center gap-7 lg:flex">
                        {mainLinks.map((l) => (
                            <Link key={l.href} href={l.href} className={linkClass(isActive(l.href))}>
                                {l.label}
                            </Link>
                        ))}

                        <div className="group relative">
                            <button
                                type="button"
                                aria-haspopup="true"
                                className={`${linkClass(digitalActive)} inline-flex items-center gap-1 outline-none`}
                            >
                                Yayınlar & Araçlar
                                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                            </button>
                            <div className="invisible absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-elegant dark:border-slate-800 dark:bg-slate-900">
                                    {digitalLinks.map((l) => (
                                        <Link
                                            key={l.href}
                                            href={l.href}
                                            className="group/item flex items-start justify-between gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-ivory-100 dark:hover:bg-slate-800"
                                        >
                                            <span>
                                                <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                                                    {l.label}
                                                </span>
                                                <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
                                                    {l.note}
                                                </span>
                                            </span>
                                            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gold-600 opacity-0 transition-all duration-300 group-hover/item:translate-x-0.5 group-hover/item:opacity-100" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {endLinks.map((l) => (
                            <Link key={l.href} href={l.href} className={linkClass(isActive(l.href))}>
                                {l.label}
                            </Link>
                        ))}
                    </div>

                    {/* Sağ taraf: telefon + randevu + tema */}
                    <div className="hidden items-center gap-4 lg:flex">
                        <a
                            href={PHONE_HREF}
                            onClick={() => trackEvent("click_phone", "Header Desktop - Phone")}
                            className="group hidden items-center gap-2.5 xl:flex"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/40 text-gold-700 transition-colors group-hover:bg-gold-500 group-hover:text-white dark:text-gold-400">
                                <Phone className="h-4 w-4" />
                            </span>
                            <span className="leading-tight">
                                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                    Hemen Arayın
                                </span>
                                <span className="block text-sm font-semibold text-primary-900 dark:text-white">
                                    {siteContent.contact.phone}
                                </span>
                            </span>
                        </a>

                        <Link
                            href="/iletisim#randevu"
                            onClick={() => trackEvent("click_appointment_button", "Header Desktop - Randevu Al")}
                            className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-800 hover:shadow-gold-glow dark:bg-gold-500 dark:text-slate-950 dark:hover:bg-gold-400"
                        >
                            <CalendarCheck className="h-4 w-4" />
                            Randevu Al
                        </Link>

                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-gold-400 hover:text-primary-900 dark:border-slate-700 dark:text-slate-300 dark:hover:text-white"
                            aria-label={theme === "light" ? "Karanlık moda geç" : "Aydınlık moda geç"}
                        >
                            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                        </button>
                    </div>

                    {/* Mobil: hızlı arama + menü düğmesi */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <a
                            href={PHONE_HREF}
                            onClick={() => trackEvent("click_phone", "Header Mobile - Phone Icon")}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-900 text-white dark:bg-gold-500 dark:text-slate-950"
                            aria-label="Hemen ara"
                        >
                            <Phone className="h-5 w-5" />
                        </a>
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobil-menu"
                            aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobil menü */}
            {isMenuOpen && (
                <div
                    id="mobil-menu"
                    className="h-[calc(100dvh-5rem)] overflow-y-auto border-t border-slate-200 bg-ivory-50 dark:border-slate-800 dark:bg-slate-950 lg:hidden"
                >
                    <div className="space-y-1 px-4 pb-28 pt-4">
                        {[...mainLinks, ...endLinks].map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-serif text-xl ${
                                    isActive(l.href)
                                        ? "bg-white text-primary-900 shadow-sm dark:bg-slate-900 dark:text-white"
                                        : "text-slate-800 dark:text-slate-200"
                                }`}
                            >
                                {l.label}
                                <ArrowRight className="h-4 w-4 text-gold-600" />
                            </Link>
                        ))}

                        <p className="px-4 pb-1 pt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Yayınlar & Araçlar
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {digitalLinks.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-6 space-y-3 rounded-2xl bg-primary-900 p-5 text-white dark:bg-slate-900">
                            <p className="font-serif text-lg">Hukuki durumunuzu konuşalım</p>
                            <p className="text-sm text-primary-100/80 dark:text-slate-400">{OFFICE_HOURS}</p>
                            <div className="grid grid-cols-2 gap-2 pt-1">
                                <a
                                    href={PHONE_HREF}
                                    onClick={() => trackEvent("click_phone", "Mobile Menu - Call")}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-gold-500 py-3 text-sm font-bold text-slate-950"
                                >
                                    <Phone className="h-4 w-4" /> Ara
                                </a>
                                <a
                                    href={whatsappHref()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackEvent("click_whatsapp", "Mobile Menu - WhatsApp")}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-sm font-bold text-white ring-1 ring-white/20"
                                >
                                    <MessageCircle className="h-4 w-4" /> WhatsApp
                                </a>
                            </div>
                            <Link
                                href="/iletisim#randevu"
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    trackEvent("click_appointment_button", "Header Mobile - Randevu Al");
                                }}
                                className="flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-primary-900"
                            >
                                <CalendarCheck className="h-4 w-4" /> Randevu Talep Et
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="mt-4 flex w-full items-center justify-between rounded-xl px-4 py-3 text-slate-600 dark:text-slate-300"
                        >
                            <span className="font-medium">Tema</span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm dark:border-slate-700">
                                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                                {theme === "light" ? "Karanlık" : "Aydınlık"}
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
