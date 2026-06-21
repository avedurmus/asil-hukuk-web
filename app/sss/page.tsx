import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { faqs } from "@/data/faq";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sıkça Sorulan Sorular | Asil Hukuk Bürosu",
    description: "Boşanma, ceza, iş ve gayrimenkul hukuku hakkında en çok sorulan sorular ve avukatımızın detaylı cevapları.",
    alternates: {
        canonical: "/sss",
    },
};

export default function FAQPage() {
    // Generate structred data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
            <Header />
            <main className="flex-grow pt-20">
                {/* Hero Section */}
                <div className="bg-slate-900 dark:bg-slate-900/60 text-white py-20 px-4 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Sıkça Sorulan Sorular</h1>
                        <p className="text-xl text-slate-300 dark:text-slate-400 max-w-2xl mx-auto">
                            Hukuki süreçlerle ilgili aklınıza takılan soruların cevapları.
                        </p>
                    </div>
                </div>

                {/* FAQ Content */}
                <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                    />

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
                                <details className="group">
                                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-slate-900 dark:text-slate-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40 px-2 py-1 rounded uppercase tracking-wider">
                                                {faq.category}
                                            </span>
                                            <span className="text-lg font-semibold">{faq.question}</span>
                                        </div>
                                        <span className="transition group-open:rotate-180 ml-4">
                                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                        </span>
                                    </summary>
                                    <div className="text-slate-600 dark:text-slate-400 px-6 pb-6 pt-0 leading-relaxed border-t border-slate-50 dark:border-slate-800/50 mt-2">
                                        <div className="pt-4">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center bg-blue-50 dark:bg-blue-950/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-900/30 transition-colors duration-300">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Aradığınız cevabı bulamadınız mı?</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Size özel hukuki durumunuz için doğrudan iletişime geçebilirsiniz.
                        </p>
                        <a
                            href="/iletisim"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl"
                        >
                            Avukata Sor
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
