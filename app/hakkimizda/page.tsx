import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteContent } from "@/data/siteContent";
import { Scale, Award, Heart, ShieldCheck } from "lucide-react";
import Image from "next/image";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hakkımızda | Asil Hukuk - Av. Emre Durmuş",
    description: "20 yılı aşkın tecrübesiyle İstanbul Kartal'da hizmet veren Asil Hukuk Bürosu ve kurucusu Av. Emre Durmuş hakkında detaylı bilgi.",
    alternates: {
        canonical: '/hakkimizda',
    },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'Hakkımızda',
    'description': 'Asil Hukuk Bürosu tarihçesi, vizyonu ve uzman kadrosu hakkında bilgiler.',
    'url': 'https://asilhukuk.net/hakkimizda',
    'publisher': {
        '@type': 'LegalService',
        'name': 'Asil Hukuk Bürosu',
        'image': 'https://asilhukuk.net/logo.png'
    }
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />

            <main className="flex-grow pt-32">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {/* Banner */}
                <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Hakkımızda</h1>
                        <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
                            2004'ten bugüne, hukukun üstünlüğüne olan inancımızla yanınızdayız.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">
                                {siteContent.brand.name} Hakkında
                            </h2>
                            <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                                {siteContent.about.description}
                            </p>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Müvekkillerimizle kurduğumuz ilişki, sadece bir vekalet ilişkisi değil, karşılıklı güvene dayalı bir çözüm ortaklığıdır.
                                Hukuki süreçlerin her aşamasında şeffaf bilgilendirme yaparak, müvekkillerimizin haklarını en etkin şekilde savunuyoruz.
                            </p>
                            <div className="grid grid-cols-2 gap-6 mt-8">
                                <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <Award className="w-8 h-8 text-primary-600 mb-2" />
                                    <h4 className="font-bold text-slate-900">Uzman Kadro</h4>
                                    <p className="text-sm text-slate-500">Alanında deneyimli avukatlar</p>
                                </div>
                                <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <ShieldCheck className="w-8 h-8 text-primary-600 mb-2" />
                                    <h4 className="font-bold text-slate-900">Güvenilirlik</h4>
                                    <p className="text-sm text-slate-500">Şeffaf ve dürüst hizmet</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative">
                            {/* Placeholder for an office image or lawyer portrait */}
                            <div className="aspect-[4/5] bg-slate-200 rounded-2xl relative overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/about-office.png"
                                    alt="Asil Hukuk Bürosu"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Floating Stat Card */}
                            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-slate-100 hidden md:block">
                                <div className="flex items-center space-x-4">
                                    <Heart className="w-10 h-10 text-red-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900">500+</div>
                                        <div className="text-sm text-slate-500">Memnun Müvekkil</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
