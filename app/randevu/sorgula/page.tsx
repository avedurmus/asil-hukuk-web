import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ManageBooking from "@/components/booking/ManageBooking";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
    ...pageMetadata({
        title: "Randevu Sorgula, Ertele veya İptal Et",
        description: "Asil Hukuk Bürosu randevunuzu referans kodunuzla görüntüleyin, yeni bir saate erteleyin veya iptal edin.",
        path: "/randevu/sorgula",
    }),
    robots: { index: false, follow: true },
};

export default function ManageBookingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-ivory-100 transition-colors duration-300 dark:bg-slate-950">
            <Header />
            <main className="flex-grow">
                <section className="relative isolate overflow-hidden bg-primary-950 pb-36 pt-36 text-white lg:pt-44">
                    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.08]" />
                    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-hero-glow" />
                    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
                        <span className="eyebrow justify-center !text-gold-400">Randevu Yönetimi</span>
                        <h1 className="mt-6 font-serif text-4xl font-medium md:text-5xl">Randevunuzu görüntüleyin</h1>
                        <p className="mx-auto mt-5 max-w-xl text-lg font-light text-slate-300">
                            Referans kodunuzla randevunuzu görebilir, yeni bir saate erteleyebilir veya iptal edebilirsiniz.
                        </p>
                    </div>
                </section>

                <div className="relative z-10 mx-auto -mt-24 max-w-xl px-4 pb-24 sm:px-6">
                    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-elegant dark:border-slate-800 dark:bg-slate-900 md:p-9">
                        <Suspense fallback={<div className="h-72" />}>
                            <ManageBooking />
                        </Suspense>
                    </div>
                    <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                        Henüz randevunuz yok mu?{" "}
                        <Link href="/randevu" className="inline-flex items-center gap-1 font-semibold text-primary-800 dark:text-gold-400">
                            Online randevu alın <ArrowRight className="h-4 w-4" />
                        </Link>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
