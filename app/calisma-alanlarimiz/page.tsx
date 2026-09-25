import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import { services } from "@/data/services";
import { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Çalışma Alanlarımız - Kartal Avukat",
    description: "Kartal'da boşanma ve aile, ceza, gayrimenkul ve kira, iş ve sosyal güvenlik, ticaret ve şirketler hukuku ile arabuluculuk alanlarında avukatlık hizmetleri.",
    path: "/calisma-alanlarimiz",
});

export default function ServicesPage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <Header />
            <main className="flex-grow pt-20">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(
                            breadcrumbJsonLd([{ name: "Çalışma Alanlarımız", path: "/calisma-alanlarimiz" }])
                        ),
                    }}
                />
                {/* Sayfa başlığı */}
                <div className="relative overflow-hidden bg-slate-950 px-4 py-24 text-white">
                    <div className="absolute inset-0 bg-noise opacity-[0.12]" />
                    <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-800 opacity-25 blur-3xl animate-blob" />
                    <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gold-700 opacity-[0.14] blur-3xl animate-blob animation-delay-4000" />

                    <div className="relative z-10 mx-auto max-w-7xl text-center">
                        <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.18em] text-gold-500">
                            Faaliyet Alanlarımız
                        </span>
                        <h1 className="mb-5 font-serif text-4xl font-bold md:text-5xl">Çalışma Alanlarımız</h1>
                        <div aria-hidden="true" className="mx-auto mb-6 h-px w-20 rule-gold" />
                        <p className="mx-auto max-w-2xl text-xl text-slate-300">
                            Hukukun farklı disiplinlerindeki deneyimimizle, müvekkillerimize kapsamlı ve sonuç odaklı
                            çözümler sunuyoruz.
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, i) => (
                            <Reveal key={service.id} delay={(i % 3) * 120}>
                                <ServiceCard
                                    id={service.id}
                                    title={service.title}
                                    description={service.shortDescription}
                                    icon={service.icon}
                                />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
