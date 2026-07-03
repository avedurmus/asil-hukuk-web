"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteContent } from "@/data/siteContent";
import { Menu, X, Phone, Sun, Moon } from "lucide-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            setTheme("light");
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <nav className="fixed w-full bg-white/75 dark:bg-slate-950/75 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 z-50 transition-all duration-300 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src="/logo.png"
                                alt={`${siteContent.brand.name} Logo`}
                                width={44}
                                height={44}
                                className="rounded-xl shadow-sm shrink-0"
                                priority
                            />
                            <span className="flex flex-col">
                                <span className="text-2xl font-serif font-bold text-primary-900 dark:text-slate-100 tracking-tight leading-none">
                                    {siteContent.brand.name}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
                                    {siteContent.brand.slogan}
                                </span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/hakkimizda" className="text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-white font-medium transition-colors">
                            Hakkımızda
                        </Link>
                        <Link href="/calisma-alanlarimiz" className="text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-white font-medium transition-colors">
                            Çalışma Alanlarımız
                        </Link>
                        <div className="relative group py-2">
                            <button className="flex items-center text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-white font-medium transition-colors gap-1 outline-none">
                                <span>Dijital Hukuk & Yayınlar</span>
                                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="p-2 space-y-1">
                                    <Link href="/kentsel-donusum-rehberi" className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg hover:text-primary-900 dark:hover:text-white font-medium transition-colors">
                                        Kentsel Dönüşüm
                                    </Link>
                                    <Link href="/ai-hukuk" className="block px-4 py-2.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg font-bold transition-colors">
                                        AI Hukuk
                                    </Link>
                                    <Link href="/asistan" className="block px-4 py-2.5 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-lg font-bold transition-colors">
                                        YargıAsistan
                                    </Link>
                                    <Link href="/blog" className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg hover:text-primary-900 dark:hover:text-white font-medium transition-colors">
                                        Blog
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Link href="/sss" className="text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-white font-medium transition-colors">
                            S.S.S.
                        </Link>
                        <Link href="/iletisim" className="text-slate-600 dark:text-slate-300 hover:text-primary-900 dark:hover:text-white font-medium transition-colors">
                            İletişim
                        </Link>
                        <Link
                            href="/iletisim"
                            onClick={() => {
                                if (typeof window !== "undefined" && (window as any).gtag) {
                                    (window as any).gtag("event", "click_appointment_button", {
                                        event_category: "Contact",
                                        event_label: "Header Desktop - Randevu Al"
                                    });
                                }
                            }}
                            className="flex items-center px-5 py-2.5 bg-primary-900 text-white rounded-md hover:bg-primary-700 transition-all font-medium shadow-md hover:shadow-lg"
                        >
                            <Phone className="w-4 h-4 mr-2" />
                            <span>Randevu Al</span>
                        </Link>

                        <button
                            onClick={toggleTheme}
                            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-md transition-all border border-slate-200 dark:border-slate-700 flex items-center justify-center"
                            aria-label="Tema Değiştir"
                        >
                            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-600 hover:text-primary-900 focus:outline-none"
                        >
                            {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 absolute w-full">
                    <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
                        <Link
                            href="/hakkimizda"
                            className="block px-3 py-3 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-primary-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Hakkımızda
                        </Link>
                        <Link
                            href="/calisma-alanlarimiz"
                            className="block px-3 py-3 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-primary-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Çalışma Alanlarımız
                        </Link>
                        
                        <div className="border-l-2 border-slate-100 dark:border-slate-800 pl-3 py-1 my-2 space-y-1">
                            <span className="block px-3 py-1 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                Dijital Hukuk & Yayınlar
                            </span>
                            <Link
                                href="/kentsel-donusum-rehberi"
                                className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-primary-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Kentsel Dönüşüm
                            </Link>
                            <Link
                                href="/ai-hukuk"
                                className="block px-3 py-2 text-base font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-900 rounded-md"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                AI Hukuk
                            </Link>
                            <Link
                                href="/asistan"
                                className="block px-3 py-2 text-base font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-900 rounded-md"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                YargıAsistan
                            </Link>
                            <Link
                                href="/blog"
                                className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-primary-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Blog
                            </Link>
                        </div>
                        <Link
                            href="/sss"
                            className="block px-3 py-3 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-primary-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            S.S.S.
                        </Link>
                        <Link
                            href="/iletisim"
                            className="block px-3 py-3 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-primary-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            İletişim
                        </Link>

                        <div className="flex justify-between items-center py-2 border-t border-b border-slate-100 dark:border-slate-800 my-4 px-3">
                            <span className="text-slate-600 dark:text-slate-300 font-medium">Tema Modu</span>
                            <button
                                onClick={toggleTheme}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-md border border-slate-200 dark:border-slate-700 font-medium"
                            >
                                {theme === "light" ? (
                                    <>
                                        <Moon className="w-4 h-4" />
                                        <span>Karanlık Mod</span>
                                    </>
                                ) : (
                                    <>
                                        <Sun className="w-4 h-4" />
                                        <span>Aydınlık Mod</span>
                                    </>
                                )}
                            </button>
                        </div>
                        <Link
                            href="/iletisim"
                            className="block w-full text-center mt-4 px-5 py-3 bg-primary-900 text-white rounded-md font-medium"
                            onClick={() => {
                                setIsMenuOpen(false);
                                if (typeof window !== "undefined" && (window as any).gtag) {
                                    (window as any).gtag("event", "click_appointment_button", {
                                        event_category: "Contact",
                                        event_label: "Header Mobile - Randevu Al"
                                    });
                                }
                            }}
                        >
                            Randevu Al
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
