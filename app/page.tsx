import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { siteContent } from "@/data/siteContent";
import { ArrowRight, Star } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />

            <main className="flex-grow">
                <Hero />

                {/* --- UZMANLIK ALANLARI --- */}
                <section id="uzmanliklar" className="py-24 bg-white relative">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Faaliyet Alanlarımız</span>
                            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Çalışma Alanlarımız</h2>
                            <p className="text-lg text-slate-600 font-light">
                                Hukukun çeşitli alanlarındaki deneyimimizle, size en doğru hukuki desteği sunuyoruz.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {siteContent.services.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    id={service.id}
                                    title={service.title}
                                    description={service.description}
                                    icon={service.icon}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- WHY US (NEDEN BİZ) --- */}
                <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary-900 rounded-full blur-3xl opacity-20"></div>
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-indigo-900 rounded-full blur-3xl opacity-20"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-serif font-bold mb-6 leading-tight">
                                    Deneyim ve Güvenin <br />
                                    <span className="text-primary-500">Buluşma Noktası</span>
                                </h2>
                                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                    Müvekkillerimize sadece hukuki danışmanlık değil, aynı zamanda stratejik çözüm ortaklığı sunuyoruz.
                                    Yirmi yılı aşkın tecrübemizle, karmaşık davaları sonuç odaklı bir yaklaşımla çözümlüyoruz.
                                </p>

                                <div className="grid grid-cols-3 gap-8 mb-8 border-t border-slate-800 pt-8">
                                    {siteContent.about.stats.map((stat, i) => (
                                        <div key={i}>
                                            <div className="text-3xl font-bold text-primary-500 mb-1">{stat.value}</div>
                                            <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/hakkimizda" className="inline-flex items-center text-white border-b border-primary-500 pb-1 hover:text-primary-500 transition-colors">
                                    Daha Fazla Bilgi <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                            <div className="relative">
                                {/* Abstract Image Representation could be here, or use a placeholder div for now */}
                                <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 flex flex-col justify-center relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Star className="w-64 h-64" />
                                    </div>
                                    <blockquote className="text-xl font-serif italic text-slate-300 mb-6 relative z-10">
                                        "Adalet mülkün temelidir. Biz bu temeli sağlam tutmak için çalışıyoruz."
                                    </blockquote>
                                    <cite className="text-primary-500 font-bold not-italic">- {siteContent.brand.name}</cite>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
