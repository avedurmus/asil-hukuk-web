import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FAQClient from "./FAQClient";
import { faqCategories, faqs } from "@/data/faq";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = pageMetadata({
    title: "Sıkça Sorulan Hukuki Sorular",
    description:
        "Boşanma, iş, ceza, kira, kentsel dönüşüm, miras ve icra hukuku hakkında en çok sorulan sorular ve avukatımızın güncel mevzuata dayalı cevapları.",
    path: "/sss",
});

export default function FAQPage() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: "tr-TR",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                // Şema alanı düz metin bekler; paragraf ayraçlarını boşluğa indirger.
                text: faq.answer.replace(/\n+/g, " "),
            },
        })),
    };

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://asilhukuk.net" },
            { "@type": "ListItem", position: 2, name: "Sıkça Sorulan Sorular", item: "https://asilhukuk.net/sss" },
        ],
    };

    return (
        <div className="min-h-screen bg-ivory-100 dark:bg-slate-950 flex flex-col transition-colors duration-300">
            <Header />
            <main className="flex-grow">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
                />

                <PageHero
                    eyebrow="Merak Edilenler"
                    title="Sıkça Sorulan Sorular"
                    description={
                        <>
                            {faqs.length} soruda, {faqCategories.length} hukuk alanı. Cevaplar güncel mevzuat ve
                            Yargıtay uygulaması esas alınarak hazırlanmıştır.
                        </>
                    }
                />

                <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <FAQClient />

                    <div className="mt-16 rounded-3xl border border-gold-500/30 bg-white p-8 text-center transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 sm:p-10">
                        <span className="eyebrow justify-center">Size özel cevap</span>
                        <h2 className="mt-4 font-serif text-2xl font-medium text-slate-900 dark:text-slate-100 md:text-3xl">
                            Aradığınız cevabı bulamadınız mı?
                        </h2>
                        <p className="mx-auto mb-7 mt-3 max-w-xl leading-relaxed text-slate-600 dark:text-slate-400">
                            Buradaki cevaplar genel bilgilendirme amaçlıdır ve somut olayın özelliklerine göre
                            sonuç değişebilir. Durumunuz için doğrudan iletişime geçebilirsiniz.
                        </p>
                        <div className="flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                href="/iletisim#randevu"
                                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary-900 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-primary-800 dark:bg-gold-500 dark:text-slate-950 dark:hover:bg-gold-400"
                            >
                                Avukata Sorun
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/blog"
                                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition-colors duration-300 hover:border-gold-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            >
                                Hukuk Blogunu İnceleyin
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
