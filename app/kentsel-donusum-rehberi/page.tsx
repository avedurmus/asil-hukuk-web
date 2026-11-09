import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import KentselDonusumClient from "@/components/KentselDonusumClient";
import { DONUSUM_ADIMLARI, ICTIHATLAR, REHBER_SSS } from "@/data/kentselDonusum";
import { breadcrumbJsonLd, pageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Kentsel Dönüşüm Rehberi: %50+1, Pay Satışı ve İçtihat",
    description:
        "6306 sayılı Kanunda hisse ağırlıklı salt çoğunluk, tebligat usulleri, kira yardımı ve pay satışı. Süre hesaplayıcı, arsa payı hesaplayıcı, sözleşme kontrol listesi ve güncel Yargıtay-Danıştay kararları.",
    path: "/kentsel-donusum-rehberi",
    keywords: [
        "kentsel dönüşüm",
        "6306 sayılı kanun",
        "salt çoğunluk",
        "arsa payı satışı",
        "riskli yapı tespiti",
        "kat karşılığı inşaat sözleşmesi",
        "kira yardımı",
        "kentsel dönüşüm avukatı",
    ],
    openGraph: { type: "article" },
});

const PAGE_URL = `${SITE_URL}/kentsel-donusum-rehberi`;

/** Rehberi altı aşamalı bir süreç olarak işaretler. */
const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Kentsel Dönüşüm Süreci: Aşama Aşama Yol Haritası",
    description:
        "6306 sayılı Kanun kapsamında riskli yapı tespitinden teslime kadar kentsel dönüşüm sürecinin hukuki aşamaları, süreleri ve kritik adımları.",
    inLanguage: "tr-TR",
    url: PAGE_URL,
    step: DONUSUM_ADIMLARI.map((adim, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: `${adim.title} (${adim.dayanak})`,
        text: adim.ozet,
        url: `${PAGE_URL}#adim-${adim.slug}`,
    })),
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "tr-TR",
    mainEntity: REHBER_SSS.map((item) => ({
        "@type": "Question",
        name: item.soru,
        acceptedAnswer: { "@type": "Answer", text: item.cevap.join(" ") },
    })),
};

/** Rehberde değerlendirilen kararların listesi. */
const ictihatJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Kentsel dönüşümde uygulamayı belirleyen yargı kararları",
    inLanguage: "tr-TR",
    itemListElement: ICTIHATLAR.map((karar, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${karar.mahkeme} ${karar.daire}, E. ${karar.esas}, K. ${karar.karar}, ${karar.tarih} — ${karar.konu}`,
        ...(karar.url ? { url: karar.url } : {}),
    })),
};

export default function KentselDonusumRehberi() {
    return (
        <div className="flex min-h-screen flex-col bg-ivory-100 transition-colors duration-300 dark:bg-slate-950">
            <Header />
            <main className="flex-grow">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(
                            breadcrumbJsonLd([
                                { name: "Kentsel Dönüşüm Rehberi", path: "/kentsel-donusum-rehberi" },
                            ])
                        ),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(ictihatJsonLd) }}
                />

                <PageHero
                    eyebrow="Güncel Mevzuat Rehberi"
                    title={
                        <>
                            Kentsel Dönüşüm <span className="text-gold-400">Rehberi</span>
                        </>
                    }
                    description={
                        <>
                            7471 sayılı Kanunla karar yeter sayısı 2/3 çoğunluktan salt çoğunluğa indirildi. Ancak
                            ölçüt kişi sayısı değil, <strong className="font-semibold text-gold-300">arsa payı</strong>{" "}
                            ağırlığıdır. Sürecin altı aşamasını, hak düşürücü süreleri ve güncel yargı kararlarını
                            bir arada bulacağınız interaktif rehber.
                        </>
                    }
                >
                    <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
                        {[
                            { value: "%50+1", label: "Hisse ağırlıklı salt çoğunluk" },
                            { value: "15 gün", label: "Tespite itiraz süresi" },
                            { value: "18 ay", label: "Riskli yapıda kira yardımı" },
                            { value: `${ICTIHATLAR.length}`, label: "İncelenen yargı kararı" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <dt className="font-serif text-3xl font-medium text-gold-400 md:text-4xl">
                                    {stat.value}
                                </dt>
                                <dd className="mt-2 text-xs font-light leading-relaxed text-slate-300 sm:text-sm">
                                    {stat.label}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </PageHero>

                <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <KentselDonusumClient />
                </div>

                <ContactCTA
                    title="Kentsel dönüşüm sürecinizi birlikte güvenle yönetelim"
                    description="Toplantı çağrısı ve karar tutanağından müteahhit sözleşmesine, pay satışına itirazdan fesih davasına kadar sürecin her aşamasında yanınızdayız. Dosyanızı inceleyip hangi adımın öncelikli olduğunu açıkça anlatalım."
                    topic="Kentsel Dönüşüm"
                />
            </main>
            <Footer />
        </div>
    );
}
