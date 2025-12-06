"use client";

import { useState } from "react";
import Link from "next/link";
import { siteContent } from "@/data/siteContent";
import { Menu, X, Phone } from "lucide-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed w-full bg-white/90 backdrop-blur-md border-b border-slate-200 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex flex-col">
                            <span className="text-2xl font-serif font-bold text-primary-900 tracking-tight leading-none">
                                {siteContent.brand.name}
                            </span>
                            <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                                {siteContent.brand.slogan}
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/hakkimizda" className="text-slate-600 hover:text-primary-900 font-medium transition-colors">
                            Hakkımızda
                        </Link>
                        <Link href="/#uzmanliklar" className="text-slate-600 hover:text-primary-900 font-medium transition-colors">
                            Uzmanlık Alanları
                        </Link>
                        <Link href="/iletisim" className="text-slate-600 hover:text-primary-900 font-medium transition-colors">
                            İletişim
                        </Link>
                        <Link
                            href="/iletisim"
                            className="flex items-center px-5 py-2.5 bg-primary-900 text-white rounded-md hover:bg-primary-700 transition-all font-medium shadow-md hover:shadow-lg"
                        >
                            <Phone className="w-4 h-4 mr-2" />
                            <span>Randevu Al</span>
                        </Link>
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
                <div className="md:hidden bg-white border-t border-slate-100 absolute w-full">
                    <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
                        <Link
                            href="/hakkimizda"
                            className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-primary-900 hover:bg-slate-50 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Hakkımızda
                        </Link>
                        <Link
                            href="/#uzmanliklar"
                            className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-primary-900 hover:bg-slate-50 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Uzmanlık Alanları
                        </Link>
                        <Link
                            href="/iletisim"
                            className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-primary-900 hover:bg-slate-50 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            İletişim
                        </Link>
                        <Link
                            href="/iletisim"
                            className="block w-full text-center mt-4 px-5 py-3 bg-primary-900 text-white rounded-md font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Randevu Al
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
