import React from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KentselDonusumClient from '@/components/KentselDonusumClient';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Yeni Kentsel Dönüşüm Süreci Rehberi (2026)",
    description: "6306 Sayılı Kanun kapsamındaki salt çoğunluk (%50+1) ile kentsel dönüşüm kararı, yeni tebligat usulleri ve pay satışı süreçlerine dair pratik hukuki rehber.",
    alternates: {
        canonical: "/kentsel-donusum-rehberi",
    },
};

export default function KentselDonusumRehberi() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col transition-colors duration-300">
      <Header />
      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section with Richer Design */}
          <div className="text-center mb-16 pt-8 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-400 text-sm font-semibold tracking-wide mb-6 border border-blue-200/50 dark:border-blue-900/40 shadow-sm">
              <Sparkles className="w-4 h-4 text-gold-500 animate-pulse" /> GÜNCEL MEVZUAT REHBERİ (2026)
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight font-serif">
              Yeni Kentsel Dönüşüm Süreci Rehberi
            </h1>
            <p className="text-lg md:text-xl text-slate-650 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
              6306 Sayılı Kanun ve Uygulama Yönetmeliğindeki son değişikliklerle kentsel dönüşüm süreçleri hızlandırıldı. Artık 2/3 çoğunluk yerine <strong className="text-primary-900 dark:text-gold-500">%50+1 (Salt Çoğunluk)</strong> ile karar alınabiliyor ve tebligat süreçleri kolaylaştırıldı.
            </p>
          </div>

          {/* Interactive client component containing stepper and calculator */}
          <KentselDonusumClient />

          {/* Enhanced CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-primary-900 to-slate-900 dark:from-slate-900/80 dark:to-slate-950/80 rounded-3xl p-8 md:p-12 text-center shadow-xl text-white relative overflow-hidden border border-slate-800">
            <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-5" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-bold font-serif">Sürecinizi Birlikte Güvenle Yönetelim</h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Kentsel dönüşüm süreci her aşamada hak düşürücü süreler ve ağır şekil şartları içerir. Hak kaybına uğramamak, müteahhit karşısında mülkünüzü korumak ve süreci hızlandırmak için gayrimenkul hukuku uzmanı avukatlarımızdan profesyonel destek alın.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link href="/iletisim" className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-slate-950 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all">
                  Randevu Oluşturun <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+902120000000" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg border border-slate-700 transition-all">
                  Bizi Arayın
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
