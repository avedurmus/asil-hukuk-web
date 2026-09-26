import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQClient from "./FAQClient";
import { faqCategories, faqs } from "@/data/faq";
import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

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
            <main className="flex-grow pt-20">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
                />

                {/* Hero */}
                <div className="bg-primary-950 dark:bg-slate-900/60 text-white py-20 px-4 transition-colors duration-300">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                            Sıkça Sorulan Sorular
                        </h1>
                        <p className="text-xl text-slate-300 dark:text-slate-400 max-w-2xl mx-auto">
                            {faqs.length} soruda, {faqCategories.length} hukuk alanı. Cevaplar güncel mevzuat
                            ve Yargıtay uygulaması esas alınarak hazırlanmıştır.
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <FAQClient />

                    <div className="mt-16 text-center bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gold-500/30 dark:border-slate-800 transition-colors duration-300">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            Aradığınız cevabı bulamadınız mı?
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
                            Buradaki cevaplar genel bilgilendirme amaçlıdır ve somut olayın özelliklerine göre
                            sonuç değişebilir. Durumunuz için doğrudan iletişime geçebilirsiniz.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link
                                href="/iletisim"
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl"
                            >
                                Avukata Sor
                            </Link>
                            <Link
                                href="/blog"
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-primary-500 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                            >
                                Hukuk Blogunu İncele
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
