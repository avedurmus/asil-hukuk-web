import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import ContactCTA from "@/components/ContactCTA";
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
        <div className="flex min-h-screen flex-col bg-ivory-100 transition-colors duration-300 dark:bg-slate-950">
            <Header />
            <main className="flex-grow">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(
                            breadcrumbJsonLd([{ name: "Çalışma Alanlarımız", path: "/calisma-alanlarimiz" }])
                        ),
                    }}
                />
                {/* Sayfa başlığı */}
                <section className="relative isolate overflow-hidden bg-primary-950 pb-24 pt-36 text-white lg:pt-44">
                    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.08]" />
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgb(192_150_82/0.18),transparent_60%),radial-gradient(ellipse_50%_70%_at_0%_100%,rgb(79_111_158/0.35),transparent_60%)]"
                    />
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <span className="eyebrow justify-center !text-gold-400">Faaliyet Alanlarımız</span>
                        <h1 className="mt-6 font-serif text-4xl font-medium md:text-6xl">Çalışma Alanlarımız</h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-slate-300">
                            Hukukun farklı disiplinlerindeki deneyimimizle, müvekkillerimize kapsamlı ve sonuç odaklı
                            çözümler sunuyoruz.
                        </p>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, i) => (
                            <Reveal key={service.id} delay={(i % 3) * 110} className="h-full">
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

                <ContactCTA />
            </main>
            <Footer />
        </div>
    );
}
