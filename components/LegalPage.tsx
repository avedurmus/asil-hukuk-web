import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LEGAL_UPDATED_AT } from "@/lib/legal";

interface LegalPageProps {
    eyebrow: string;
    title: string;
    intro: string;
    children: React.ReactNode;
}

/** Aydınlatma metni ve çerez politikası gibi yasal metinler için sade sayfa düzeni. */
export default function LegalPage({ eyebrow, title, intro, children }: LegalPageProps) {
    return (
        <div className="flex min-h-screen flex-col bg-ivory-100 transition-colors duration-300 dark:bg-slate-950">
            <Header />

            <main className="flex-grow">
                <section className="relative isolate overflow-hidden bg-primary-950 pb-16 pt-32 text-white lg:pb-20 lg:pt-40">
                    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.08]" />
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <span className="eyebrow !text-gold-400">{eyebrow}</span>
                        <h1 className="mt-5 font-serif text-4xl font-medium md:text-5xl">{title}</h1>
                        <p className="mt-6 text-lg leading-relaxed text-slate-300">{intro}</p>
                        <p className="mt-6 text-sm text-slate-400">Son güncelleme: {LEGAL_UPDATED_AT}</p>
                    </div>
                </section>

                <article className="article-body mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">{children}</article>
            </main>

            <Footer />
        </div>
    );
}
