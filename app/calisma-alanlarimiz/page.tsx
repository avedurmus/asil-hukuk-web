import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Çalışma Alanlarımız",
    description: "Boşanma, Ceza, Gayrimenkul, İş ve Ticaret Hukuku alanlarında uzmanlaşmış Asil Hukuk Bürosu'nun faaliyet alanları.",
    alternates: {
        canonical: "/calisma-alanlarimiz",
    },
};

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
            <Header />
            <main className="flex-grow pt-20">
                <div className="bg-slate-900 dark:bg-slate-900/60 text-white py-20 px-4 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Çalışma Alanlarımız</h1>
                        <p className="text-xl text-slate-300 dark:text-slate-400 max-w-2xl mx-auto">
                            Hukukun farklı disiplinlerindeki deneyimimizle, müvekkillerimize kapsamlı ve sonuç odaklı çözümler sunuyoruz.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <Link
                                    key={service.id}
                                    href={`/calisma-alanlarimiz/${service.id}`}
                                    className="group bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-800 flex flex-col"
                                >
                                    <div className="w-12 h-12 bg-primary-50 dark:bg-primary-950/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                                        <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                                        {service.shortDescription}
                                    </p>
                                    <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm">
                                        Detaylı Bilgi <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
