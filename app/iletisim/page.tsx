import Header from "@/components/Header";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import { siteContent } from "@/data/siteContent";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import Image from "next/image";

import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
    title: "İletişim | Asil Hukuk - Av. Emre Durmuş",
    description: "Hukuki danışmanlık ve randevu talepleriniz için Asil Hukuk iletişim bilgileri. Telefon, E-posta ve Adres detayları.",
    alternates: {
        canonical: '/iletisim',
    },
};

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

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-20 relative">
                {/* Background for Header */}
                <div className="absolute top-0 left-0 w-full h-[500px] z-0">
                    <Image
                        src="/images/kartal-view.png"
                        alt="Kartal İstanbul"
                        fill
                        className="object-cover opacity-10"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/90 to-slate-50"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">İletişim</h1>
                        <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto">
                            Hukuki sorularınız için bize ulaşın. Size en kısa sürede dönüş yapacağız.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {/* Contact Info Cards */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-6">
                                <Phone className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Telefon</h3>
                            <p className="text-slate-600">{siteContent.contact.phone}</p>
                            <p className="text-slate-400 text-sm mt-2">Hafta içi: 09:00 - 18:00</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-6">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">E-Posta</h3>
                            <p className="text-slate-600">{siteContent.contact.email}</p>
                            <p className="text-slate-400 text-sm mt-2">24 saat içinde dönüş</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-6">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Adres</h3>
                            <p className="text-slate-600">{siteContent.contact.address}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                        />
                        {/* Contact Form */}
                        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-slate-100">
                            <Suspense fallback={<div>Loading...</div>}>
                                <ContactForm />
                            </Suspense>
                        </div>

                        {/* Map */}
                        <div className="bg-slate-200 rounded-2xl overflow-hidden min-h-[400px] shadow-inner relative">
                            <iframe
                                src={siteContent.contact.mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="Ofis Konumu"
                                className="absolute inset-0"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
