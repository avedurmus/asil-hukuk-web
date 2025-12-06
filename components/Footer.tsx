import Link from "next/link";
import { siteContent } from "@/data/siteContent";
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand & Info */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
                                {siteContent.brand.name}
                            </h3>
                            <p className="text-xs uppercase tracking-widest text-slate-500 mt-1">{siteContent.brand.slogan}</p>
                        </div>
                        <p className="text-slate-400 font-light leading-relaxed max-w-sm">
                            Hukuki süreçlerinizde güvenilir, şeffaf ve profesyonel çözüm ortağınız.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Hızlı Bağlantılar</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="hover:text-primary-500 transition-colors">Ana Sayfa</Link></li>
                            <li><Link href="/hakkimizda" className="hover:text-primary-500 transition-colors">Hakkımızda</Link></li>
                            <li><Link href="/#uzmanliklar" className="hover:text-primary-500 transition-colors">Uzmanlık Alanlarımız</Link></li>
                            <li><Link href="/iletisim" className="hover:text-primary-500 transition-colors">İletişim</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">İletişim</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 text-primary-500 mr-3 mt-1 flex-shrink-0" />
                                <span>{siteContent.contact.address}</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                                <a href={`tel:${siteContent.contact.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                                    {siteContent.contact.phone}
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                                <a href={`mailto:${siteContent.contact.email}`} className="hover:text-white transition-colors">
                                    {siteContent.contact.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-900 mt-12 pt-8 text-center text-sm text-slate-600 flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; {currentYear} {siteContent.brand.name}. Tüm hakları saklıdır.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {/* Social placeholders */}
                        <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                        <Linkedin className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                        <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
