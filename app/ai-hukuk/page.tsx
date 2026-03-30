"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, ShieldCheck, Zap, Globe, MessageSquare, Briefcase, FileText } from 'lucide-react';

const content = {
  tr: {
    badge: "GELECEĞİN HUKUK BÜROSU",
    title: "Hızlı Büyüyen Şirketler İçin Yapay Zeka Destekli Hukuk Çözümleri",
    subtitle: "Yapay zeka hızıyla çalışır, Av. Emre Durmuş güvencesiyle karara varırız. Start-up ve scale-up'lar için teknoloji odaklı, şeffaf ve çevik hukuk hizmeti.",
    ctaPrimary: "Randevu Al (1 Saat İçinde Dönüş)",
    ctaSecondary: "Nasıl Çalışıyoruz?",
    whyTitle: "Neden Bizi Seçmelisiniz?",
    whyDesc: "Geleneksel hukuk büroları hantal ve öngörülemez maliyetlere sahiptir. Biz, yapay zekayı iş süreçlerimizin merkezine koyarak size zaman kazandırıyoruz.",
    features: [
      {
        icon: <Clock className="w-6 h-6 text-blue-400" />,
        title: "1 Saat İçinde Yanıt",
        desc: "İş dünyası hızlı hareket eder. Sizin hukuk ekibiniz de öyle olmalı. Her talebe 1 saat içinde dönüş yapıyoruz."
      },
      {
        icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
        title: "Öngörülebilir Fiyatlandırma",
        desc: "Abonelik ve sabit ücretli çalışma modelleriyle, hukuki maliyetlerinizi açık uçlu bir masraf değil, planlanabilir büyüme gideri haline getirin."
      },
      {
        icon: <MessageSquare className="w-6 h-6 text-blue-400" />,
        title: "Sürekli İletişim",
        desc: "Şirketinizin iletişim araçlarına entegre oluyoruz. Bilet sistemi veya portal yok, sadece doğrudan ve şeffaf diyalog."
      },
      {
        icon: <Zap className="w-6 h-6 text-blue-400" />,
        title: "YZ Destekli, Avukat Onaylı",
        desc: "Araştırma ve taslaklarda yapay zeka hızını, son karar ve stratejide Av. Emre Durmuş'un tecrübesini alırsınız."
      }
    ],
    expertiseTitle: "Uzmanlık Alanlarımız",
    expertise: [
      { icon: <FileText className="w-5 h-5" />, title: "Ticari Sözleşmeler", desc: "Gizlilik Sözleşmeleri (NDA), Tedarikçi Sözleşmeleri, Bayilik Anlaşmaları." },
      { icon: <Briefcase className="w-5 h-5" />, title: "Şirketler Hukuku", desc: "Şirket kuruluşları, genel kurul işlemleri, hisse devirleri ve ortaklık zafiyetleri." },
      { icon: <Globe className="w-5 h-5" />, title: "KVKK & Uyumluluk", desc: "Kişisel Verilerin Korunması ve Yapay Zeka uyumluluk süreçleri yönetimi." },
      { icon: <ShieldCheck className="w-5 h-5" />, title: "İş Hukuku", desc: "İşçi-işveren uyuşmazlıkları, sözleşmeler ve fesih süreçlerinin güvenli yönetimi." }
    ],
    faqTitle: "Sıkça Sorulan Sorular",
    faq: [
      { q: "Neden yapay zeka destekli çalışıyorsunuz?", a: "Rutini ve içtihat taramalarını hızlandırmak, böylece size daha kısa sürede, daha uygun maliyetle ama en az bir o kadar da kusursuz hizmet sunabilmek için YZ sistemlerini araç olarak kullanıyoruz." },
      { q: "Hangi dillerde sözleşme hazırlıyorsunuz?", a: "Sözleşmelerinizi başta Türkçe ve İngilizce olmak üzere uluslararası standartlarda hazırlıyor, inceliyor ve revize ediyoruz." },
      { q: "Gizlilik ve verilerimizin güvenliği nasıl sağlanıyor?", a: "Yapay zeka araçlarımızı kapalı devre şirket ağlarında ve anonimleştirilmiş verilerle kullanıyoruz. Müşteri gizliliği bizim için en üst düzey kırmızı çizgidir." }
    ],
    bottomTitle: "İşletmenizi güvenceye alın",
    bottomSubtitle: "Modern, hızlı ve güvenilir hukuk danışmanlığı ile tanışın.",
    langBtn: "English"
  },
  en: {
    badge: "THE LAW FIRM OF THE FUTURE",
    title: "AI-Powered Legal Solutions for Fast-Moving Companies",
    subtitle: "We operate with the speed of AI and conclude with the certainty of Att. Emre Durmuş. Technology-focused, transparent, and agile legal services for start-ups and scale-ups.",
    ctaPrimary: "Book a Call (1 Hour Response)",
    ctaSecondary: "How we work",
    whyTitle: "Why Choose Us?",
    whyDesc: "Traditional law firms are slow and have unpredictable costs. By putting AI at the core of our operations, we save you time and money.",
    features: [
      {
        icon: <Clock className="w-6 h-6 text-blue-400" />,
        title: "1 Hour Response Time",
        desc: "Business moves fast. Your legal team should too. We respond to every request within exactly one hour."
      },
      {
        icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
        title: "Predictable Pricing",
        desc: "Turn your legal costs into predictable growth expenses through our subscription and fixed-fee billing models."
      },
      {
        icon: <MessageSquare className="w-6 h-6 text-blue-400" />,
        title: "Seamless Communication",
        desc: "We integrate directly with your company's communication tools. No ticket systems or portals, just direct dialogue."
      },
      {
        icon: <Zap className="w-6 h-6 text-blue-400" />,
        title: "AI-Powered, Lawyer Validated",
        desc: "You get the speed of AI in research, and the vast experience of Att. Emre Durmuş in strategy and final execution."
      }
    ],
    expertiseTitle: "Our Expertise",
    expertise: [
      { icon: <FileText className="w-5 h-5" />, title: "Commercial Contracts", desc: "Non-Disclosure Agreements (NDA), Supplier Agreements, Franchise Agreements." },
      { icon: <Briefcase className="w-5 h-5" />, title: "Corporate Law", desc: "Company formations, general assembly procedures, share transfers, and partnership agreements." },
      { icon: <Globe className="w-5 h-5" />, title: "Data Privacy & Compliance", desc: "GDPR, KVKK compliance, and managing AI regulatory processes within your organization." },
      { icon: <ShieldCheck className="w-5 h-5" />, title: "Employment Law", desc: "Safe management of employee-employer disputes, employment contracts, and termination processes." }
    ],
    faqTitle: "Frequently Asked Questions",
    faq: [
      { q: "Why use AI for legal services?", a: "We use AI to accelerate routine work and case law screening. This allows us to provide faster, more cost-effective, and flawless service." },
      { q: "What languages do you draft contracts in?", a: "We draft, review, and revise your contracts at international standards, primarily in Turkish and English." },
      { q: "How do you ensure data security and privacy?", a: "We use AI tools within closed-loop corporate networks and with completely anonymized data. Client confidentiality is our red line." }
    ],
    bottomTitle: "Secure your business operations",
    bottomSubtitle: "Meet modern, fast, and reliable legal consulting.",
    langBtn: "Türkçe"
  }
};

export default function AIHukukPage() {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');
  const t = content[lang];

  const toggleLanguage = () => {
    setLang(prev => prev === 'tr' ? 'en' : 'tr');
  };

  return (
    <div className="bg-[#0f1115] text-white min-h-screen font-sans selection:bg-blue-500/30">
      
      {/* Navbar overlay for language toggle */}
      <div className="fixed top-24 right-4 md:right-8 z-50">
        <button 
          onClick={toggleLanguage}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-xl flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          {t.langBtn}
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold tracking-wider mb-6">
            {t.badge}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
            {lang === 'tr' ? (
              <>Hızlı Büyüyen Şirketler İçin <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Yapay Zeka Destekli</span> Hukuk</>
            ) : (
              <><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI-Powered</span> Legal Solutions <br/>for Fast-Moving Companies</>
            )}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/iletisim" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center justify-center shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)]">
              {t.ctaPrimary}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a href="#nasil-calisiyoruz" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-medium transition-all text-center">
              {t.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-20 max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] to-transparent z-10 h-full" />
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image 
              src="/ai_justice_scales.png" 
              alt="AI Justice Scales" 
              width={1200} 
              height={600} 
              className="w-full object-cover max-h-[500px]"
              priority
            />
          </div>
        </div>
      </section>

      {/* Why Us / Features Section */}
      <section id="nasil-calisiyoruz" className="py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.whyTitle}</h2>
            <p className="text-slate-400 text-lg">{t.whyDesc}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {t.features.map((feature, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid Image Break */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden relative h-[400px] border border-white/10">
            <Image 
              src="/ai_legal_network.png"
              alt="Legal Tech Network"
              fill
              className="object-cover opacity-60 hover:opacity-80 transition-opacity duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <h2 className="text-3xl md:text-5xl font-bold text-center px-4 leading-tight shadow-black drop-shadow-2xl">
                {lang === 'tr' ? 'Hukuku Teknolojinin Hızıyla Buluşturuyoruz' : 'Uniting Law with the Speed of Technology'}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 border-t border-white/5 bg-gradient-to-b from-transparent to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">{t.expertiseTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 block">
            {t.expertise.map((item, idx) => (
              <div key={idx} className="bg-[#15181e] p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all group">
                <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-white/90">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.faqTitle}</h2>
          <div className="space-y-6">
            {t.faq.map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-3">{item.q}</h3>
                <p className="text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.bottomTitle}</h2>
          <p className="text-xl text-slate-300 mb-10">{t.bottomSubtitle}</p>
          <Link href="/iletisim" className="inline-flex px-10 py-5 bg-white text-[#0f1115] hover:bg-slate-200 rounded-lg font-bold text-lg transition-all items-center shadow-xl">
            {t.ctaPrimary}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
