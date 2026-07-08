import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteContent } from "@/data/siteContent";
import { Scale, Award, Heart, ShieldCheck } from "lucide-react";
import Image from "next/image";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hakkımızda - Av. Emre Durmuş",
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

const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Av. Emre Durmuş',
    'jobTitle': 'Avukat ve Arabulucu',
    'image': 'https://asilhukuk.net/images/emre-durmus.jpg',
    'url': 'https://asilhukuk.net/hakkimizda',
    'worksFor': {
        '@type': 'LegalService',
        'name': 'Asil Hukuk Bürosu',
        'url': 'https://asilhukuk.net'
    },
    'memberOf': {
        '@type': 'Organization',
        'name': 'İstanbul Barosu'
    },
    'knowsAbout': [
        'Boşanma ve Aile Hukuku',
        'Ceza Hukuku',
        'Gayrimenkul Hukuku',
        'İş ve Sosyal Güvenlik Hukuku',
        'Ticaret ve Şirketler Hukuku',
        'Arabuluculuk'
    ],
    'sameAs': [
        'https://www.linkedin.com/in/avukat-emre-durmu%C5%9F-a5981523/'
    ]
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
            <Header />

            <main className="flex-grow pt-32">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
                />
                {/* Banner */}
                <div className="bg-slate-900 dark:bg-slate-900/60 text-white py-20 relative overflow-hidden transition-colors duration-300">
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
                            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-6">
                                {siteContent.brand.name} Hakkında
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">
                                {siteContent.about.description}
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                Müvekkillerimizle kurduğumuz ilişki, sadece bir vekalet ilişkisi değil, karşılıklı güvene dayalı bir çözüm ortaklığıdır.
                                Hukuki süreçlerin her aşamasında şeffaf bilgilendirme yaparak, müvekkillerimizin haklarını en etkin şekilde savunuyoruz.
                            </p>
                            <div className="grid grid-cols-2 gap-6 mt-8">
                                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
                                    <Award className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-2" />
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100">Uzman Kadro</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Alanında deneyimli avukatlar</p>
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
                                    <ShieldCheck className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-2" />
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100">Güvenilirlik</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Şeffaf ve dürüst hizmet</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative">
                            {/* Placeholder for an office image or lawyer portrait */}
                            <div className="aspect-[4/5] bg-slate-200 dark:bg-slate-800 rounded-2xl relative overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/about-office.png"
                                    alt="Asil Hukuk Bürosu"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Floating Stat Card */}
                            <div className="absolute -bottom-8 -left-8 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 hidden md:block transition-colors duration-300">
                                <div className="flex items-center space-x-4">
                                    <Heart className="w-10 h-10 text-red-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">500+</div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">Memnun Müvekkil</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kurucumuz Section */}
                <div className="bg-slate-100 dark:bg-slate-900/40 border-t border-b border-slate-200/50 dark:border-slate-800/80 py-20 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                            {/* Portrait Image */}
                            <div className="lg:col-span-1 relative max-w-sm mx-auto lg:mx-0 w-full">
                                <div className="aspect-[4/5] bg-slate-200 dark:bg-slate-800 rounded-2xl relative overflow-hidden shadow-xl border border-slate-200 dark:border-slate-850">
                                    <Image
                                        src="/images/emre-durmus.jpg"
                                        alt="Av. Emre Durmuş"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                            
                            {/* Bio Content */}
                            <div className="lg:col-span-2">
                                <span className="text-primary-600 dark:text-primary-400 font-semibold tracking-wider uppercase text-sm mb-2 block">
                                    Kurucumuz
                                </span>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-6">
                                    Av. Emre Durmuş
                                </h2>
                                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed text-lg">
                                    Asil Hukuk Bürosu'nun kurucusu olan Av. Emre Durmuş, 20 yılı aşkın mesleki birikimiyle müvekkillerine ceza hukuku, aile hukuku, gayrimenkul hukuku ve iş hukuku başta olmak üzere hukukun birçok dalında profesyonel danışmanlık ve avukatlık hizmeti vermektedir.
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                    İstanbul Barosu bünyesinde çalışmalarını sürdüren Av. Emre Durmuş, hukukun üstünlüğü ve adaletin tecellisi ilkelerinden taviz vermeksizin, müvekkillerinin haklarını korumak amacıyla dürüst, şeffaf ve sonuç odaklı çözümler üretmektedir. Aynı zamanda Adalet Bakanlığı bünyesinde kayıtlı uzman arabulucu olarak uyuşmazlıkların barışçıl yollarla çözüme kavuşturulmasında aktif rol oynamaktadır.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">
                                    <div className="flex items-center space-x-3">
                                        <Award className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                                        <span>İstanbul Barosu Üyesi</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Scale className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                                        <span>Uzman Arabulucu</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Award className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                                        <span>21 Yılı Aşkın Mesleki Tecrübe</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <ShieldCheck className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                                        <span>Şeffaf ve Güvenilir Temsil</span>
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
