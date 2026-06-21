import React from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Building, CheckCircle2, FileText, Gavel, FileCheck, Landmark, Users } from 'lucide-react';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Yeni Kentsel Dönüşüm Süreci Rehberi (2025) | Asil Hukuk",
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="text-center mb-16 pt-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-400 text-sm font-semibold tracking-wide mb-6 border border-blue-200 dark:border-blue-900 shadow-sm">
              GÜNCEL MEVZUAT REHBERİ
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
              Yeni Kentsel Dönüşüm Süreci Rehberi
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
              6306 Sayılı Kanun ve Uygulama Yönetmeliğindeki son değişikliklerle kentsel dönüşüm süreçleri hızlandırıldı. Artık 2/3 çoğunluk yerine <strong>Salt Çoğunluk (%50+1)</strong> ile karar alınabiliyor ve tebligat süreçleri dijitalleştirildi. Bu rehber ile toplantı çağrısından pay satışına kadar tüm süreci adım adım keşfedin.
            </p>
          </div>

          {/* Steps Section */}
          <div className="space-y-12 mb-16">
            
            {/* Step 1 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="bg-slate-800 dark:bg-slate-950 px-6 py-4 flex items-center gap-4">
                <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  1
                </div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-300" />
                  Toplantıya Çağrı
                </h2>
              </div>
              <div className="p-6 md:p-8 space-y-4">
                <p className="text-slate-700 dark:text-slate-350 leading-relaxed text-lg">
                  <strong className="text-slate-900 dark:text-slate-100">Kim Çağırabilir?</strong> Kentsel dönüşüm sürecinin başlaması için binanın riskli yapı tespitinin kesinleşmiş olması gerekir. Kesinleşme sonrasında, kat maliklerinden biri veya birkaçı diğer tüm malikleri toplantıya çağırabilir. Tek bir malik bile süreci başlatabilir.
                </p>
                <p className="text-slate-700 dark:text-slate-350 leading-relaxed text-lg">
                  <strong className="text-slate-900 dark:text-slate-100">Çağrı İçeriği:</strong> Toplantının yeri, tarihi, saati ve gündemi (müteahhit seçimi, arsa payı dağılımı, sözleşme şartları vb.) açıkça belirtilmelidir.
                </p>
                <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded-r-lg mt-4">
                  <p className="text-amber-800 dark:text-amber-400 text-sm md:text-base">
                    <strong>Pratik Bilgi:</strong> Maliklerin anlaşamaması durumunda Kentsel Dönüşüm Başkanlığı veya yetkilendirdiği kurumlar da resen malikleri toplantıya çağırabilir.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="bg-slate-800 dark:bg-slate-950 px-6 py-4 flex items-center gap-4">
                <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  2
                </div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FileCheck className="w-6 h-6 text-blue-300" />
                  Yeni Tebligat Usulü
                </h2>
              </div>
              <div className="p-6 md:p-8 space-y-4">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-4">
                  Yeni yönetmelik ile sürecin aylarca tıkanmasına neden olan tebligat sorununa çözüm getirilmiştir. Tebligat şu <strong>3 adımın aynı anda yapılmasıyla</strong> tamamlanmış sayılır:
                </p>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300 text-lg">E-Devlet Kapısı üzerinden bildirim yapılması.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300 text-lg">İlgili belgenin riskli binanın kapısına asılması.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300 text-lg">İlgili mahalle muhtarlığında 15 gün süreyle ilan edilmesi.</span>
                  </li>
                </ul>
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 p-4 rounded-lg mt-6">
                  <p className="text-blue-800 dark:text-blue-400 text-sm md:text-base font-medium flex items-center gap-2">
                    <span className="text-xl">ℹ️</span> <strong>Önemli:</strong> Muhtarlıktaki 15 günlük askı süresinin son günü, tebligatın yapıldığı gün sayılır.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="bg-slate-800 dark:bg-slate-950 px-6 py-4 flex items-center gap-4">
                <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  3
                </div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Gavel className="w-6 h-6 text-blue-300" />
                  Toplantı ve Karar
                </h2>
              </div>
              <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 p-5 rounded-xl h-full">
                    <h3 className="font-bold text-green-800 dark:text-green-400 text-lg mb-2">Yeni Karar Oranı</h3>
                    <p className="text-green-900 dark:text-green-100 text-3xl font-extrabold mb-2">%50+1 <span className="text-base font-normal text-green-700 dark:text-green-400">(Salt Çoğunluk)</span></p>
                    <p className="text-green-800 dark:text-green-400 text-sm">Karar alabilmek için artık "Arsa Payının 2/3'ü" yerine "Arsa Payı Salt Çoğunluğu" yeterlidir.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg border-b dark:border-slate-850 pb-2">Gündem ve Sonuç</h3>
                  <ul className="space-y-2 text-slate-700 dark:text-slate-350">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Müteahhit seçimi</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Yeni bina projesi</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Daire dağılımı</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> İnşaat yapım sözleşmesi şartları</li>
                  </ul>
                  <p className="text-slate-700 dark:text-slate-400 mt-4 text-sm font-medium border-t dark:border-slate-800 pt-2">
                    Karara varıldığında <strong>Bina Ortak Karar Protokolü</strong> imzalanır. %50+1 sağlandıysa, muhalif kalanların oyları kararı engelleyemez.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="bg-slate-800 dark:bg-slate-950 px-6 py-4 flex items-center gap-4">
                <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  4
                </div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Landmark className="w-6 h-6 text-blue-300" />
                  Pay Satışı (Açık Artırma)
                </h2>
              </div>
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-850 flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold border border-slate-300 dark:border-slate-800">1</div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-1">İhtarname ve 15 Günlük Süre</h3>
                    <p className="text-slate-700 dark:text-slate-300">Karara katılmayan maliklere noter veya yeni tebligat usulüyle 15 gün süre verilir.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-850 flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold border border-slate-300 dark:border-slate-800">2</div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-1">Açık Artırma ile Satış</h3>
                    <p className="text-slate-700 dark:text-slate-300">Süre sonunda imzalamayanların payları rayiç bedel üzerinden <strong>açık artırma</strong> ile satışa çıkarılır.</p>
                  </div>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-950/20 p-5 rounded-xl border border-indigo-100 dark:border-indigo-900/30 mt-4">
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2 flex items-center gap-2">
                    <Building className="w-5 h-5" /> Satış Önceliği
                  </h4>
                  <p className="text-indigo-800 dark:text-indigo-300">
                    Payları öncelikle <strong>anlaşmaya varan diğer paydaşlar (komşular)</strong> alabilir. Komşular almazsa Bakanlık, TOKİ veya müteahhit Hazine adına satın alabilir.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* CTA Section */}
          <div className="bg-blue-900 dark:bg-slate-900/60 rounded-3xl p-8 md:p-12 text-center shadow-xl text-white transition-colors duration-300">
            <h2 className="text-3xl font-bold mb-4">Sürecinizi Birlikte Yönetelim</h2>
            <p className="text-blue-100 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Kentsel dönüşüm süreci karmaşık ve hukuki olarak hassastır. Hak kaybına uğramamak ve süreci hızlı, güvenli bir şekilde tamamlamak için hukuki danışmanlık alın.
            </p>
            <Link href="/iletisim" className="inline-flex items-center gap-2 bg-white dark:bg-slate-100 text-blue-900 dark:text-slate-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 dark:hover:bg-slate-200 transition-colors shadow-lg hover:shadow-xl">
              Avukatımızla Görüşün <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
