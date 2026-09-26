import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Sayfa Bulunamadı",
    robots: { index: false, follow: true },
};

const suggestions = [
    { href: "/calisma-alanlarimiz", label: "Çalışma Alanlarımız" },
    { href: "/blog", label: "Hukuk Blogu" },
    { href: "/sss", label: "Sıkça Sorulan Sorular" },
    { href: "/iletisim", label: "İletişim ve Randevu" },
];

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col bg-ivory-100 dark:bg-slate-950 transition-colors duration-300">
            <Header />
            <main className="flex-grow pt-32 pb-24 px-4">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold-600 dark:text-gold-400">404</p>
                    <h1 className="mb-6 font-serif text-4xl font-bold text-slate-900 dark:text-slate-100 md:text-5xl">
                        Aradığınız sayfa bulunamadı
                    </h1>
                    <p className="mb-10 text-lg text-slate-600 dark:text-slate-400">
                        Sayfa taşınmış ya da kaldırılmış olabilir. Aşağıdaki bağlantılardan devam edebilirsiniz.
                    </p>
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {suggestions.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="block rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 font-medium text-slate-800 dark:text-slate-200 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link href="/" className="mt-10 inline-block font-semibold text-primary-700 dark:text-primary-400 hover:underline">
                        Ana sayfaya dön
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
