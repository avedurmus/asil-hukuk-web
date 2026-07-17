"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building,
  CheckCircle2,
  FileText,
  Gavel,
  FileCheck,
  Landmark,
  Users,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  Phone,
  Scale,
  ChevronRight,
  RefreshCw,
  Home
} from "lucide-react";

// Steps Data
const STEPS = [
  {
    id: 1,
    title: "Toplantıya Çağrı",
    icon: Users,
    subtitle: "Sürecin Başlatılması",
    bgGradient: "from-blue-500/10 to-indigo-500/10",
    borderGlow: "border-blue-500/30",
    content: {
      description: "Kentsel dönüşüm sürecinin resmiyet kazanması için öncelikle binanın riskli yapı tespit raporunun kesinleşmesi gerekir. Bu aşamadan sonra kat maliklerinden herhangi biri malikleri toplantıya davet edebilir.",
      details: [
        {
          label: "Tek Malik Yetkisi",
          desc: "Süreci başlatmak veya malikleri toplantıya çağırmak için tek bir malikin iradesi ve çağrısı yeterlidir. Çoğunluk aranmaz."
        },
        {
          label: "Çağrı Usulü & Gündem",
          desc: "Çağrı mektubunda toplantı tarihi, saati, yeri ve en önemlisi görüşülecek gündem (müteahhit seçimi, paylaşım modeli, sözleşme taslağı vb.) eksiksiz yer almalıdır."
        },
        {
          label: "Resen Çağrı",
          desc: "Maliklerin kendi arasında anlaşamaması halinde Kentsel Dönüşüm Başkanlığı veya yetkilendirdiği idareler de malikleri doğrudan toplantıya çağırabilir."
        }
      ],
      legalWarning: "Toplantı çağrısında yapılacak tek bir usul hatası (örn: bir malike çağrının ulaşmaması, gündemin açık yazılmaması), aylar sonra alınacak tüm kararların mahkemelerce IPTAL EDİLMESİNE yol açar. Hak kaybı yaşamamak için çağrı evraklarını avukat kontrolünde hazırlamalısınız."
    }
  },
  {
    id: 2,
    title: "Yeni Tebligat Usulü",
    icon: FileCheck,
    subtitle: "Zaman Aşımını Önleyen Hızlı Tebliğ",
    bgGradient: "from-amber-500/10 to-orange-500/10",
    borderGlow: "border-amber-500/30",
    content: {
      description: "Eski yasada aylarca süren ve süreci tıkayan klasik tebligat engeli kaldırılmıştır. Artık tebligat, aşağıdaki 3 kanaldan eş zamanlı yapıldığında hukuken tamamlanmış kabul edilir.",
      details: [
        {
          label: "1. E-Devlet Bildirimi",
          desc: "İlgili karar veya rapor maliklerin e-Devlet kapısına dijital olarak gönderilir."
        },
        {
          label: "2. Binaya Asma",
          desc: "Belge, riskli olduğu tespit edilen yapının girişine fiziki olarak asılır."
        },
        {
          label: "3. Muhtarlık İlanı",
          desc: "İlgili mahalle muhtarlığında belge 15 gün süreyle askıya çıkarılır ve ilan edilir."
        }
      ],
      legalWarning: "15 günlük askı süresinin son günü tebligat yapılmış sayılır ve yasal süreler işlemeye başlar. Bu süre kaçırılırsa kararlara itiraz hakkınızı kaybedersiniz. Süre takibi için profesyonel hukuki destek elzemdir."
    }
  },
  {
    id: 3,
    title: "Toplantı ve Karar",
    icon: Gavel,
    subtitle: "Salt Çoğunluk Dönemi (%50+1)",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    borderGlow: "border-emerald-500/30",
    content: {
      description: "Yeni düzenleme ile karar alma süreci büyük ölçüde kolaylaştırılmıştır. Eski kanunda aranan 2/3 çoğunluk zorunluluğu yerini salt çoğunluğa bırakmıştır.",
      details: [
        {
          label: "%50 + 1 (Salt Çoğunluk)",
          desc: "Arsa payı oranına bakılmaksızın, maliklerin salt çoğunluğu ile kentsel dönüşüm, müteahhit seçimi ve sözleşme şartları karara bağlanabilir."
        },
        {
          label: "Bina Ortak Karar Protokolü",
          desc: "Toplantıda alınan kararlar imza altına alınarak bir protokole bağlanır. Karara katılmayan muhalif maliklerin payları bu aşamadan sonra satış sürecine girer."
        },
        {
          label: "Müteahhit ve Paylaşım",
          desc: "İnşaat yapım sözleşmesi, paylaşım modeli (kat karşılığı veya hasılat paylaşımı) ve teknik şartname bu toplantıda oylanır."
        }
      ],
      legalWarning: "Müteahhitle imzalanacak Kat Karşılığı İnşaat Sözleşmesi (KKİS), kentsel dönüşümün anayasasıdır. Teminat mektubu, gecikme cezaları ve teknik şartname gibi kritik maddeler avukatınız tarafından hazırlanmalıdır; aksi takdirde inşaatın yarım kalması durumunda mülkünüzü tamamen kaybedebilirsiniz."
    }
  },
  {
    id: 4,
    title: "Pay Satışı (Açık Artırma)",
    icon: Landmark,
    subtitle: "Anlaşmayan Maliklerin Durumu",
    bgGradient: "from-rose-500/10 to-pink-500/10",
    borderGlow: "border-rose-500/30",
    content: {
      description: "Salt çoğunlukla alınan karara katılmayan veya sözleşmeyi imzalamayan maliklerin arsa payları yasal süreçle açık artırmaya çıkarılır.",
      details: [
        {
          label: "15 Günlük İhtar",
          desc: "Karara katılmayan maliklere noter aracılığıyla veya yeni tebligat usulüyle kararı kabul etmeleri için 15 gün süre tanınır."
        },
        {
          label: "Öncelikli Alım Hakkı",
          desc: "Açık artırmada satışa çıkarılan payları öncelikle kararı kabul eden diğer kat malikleri (komşular) satın alabilir."
        },
        {
          label: "Hazine ve TOKİ Devreye Girişi",
          desc: "Malikler payları satın almazsa, Bakanlık, TOKİ veya Hazine bu payları rayiç bedel üzerinden satın alarak dönüşüm sürecine dahil edebilir."
        }
      ],
      legalWarning: "Açık artırma ve pay satışı süreci en fazla davanın açıldığı ve usulsüzlük iddialarının yapıldığı aşamadır. Satış kararının iptali davaları, kıymet takdirine itirazlar ve yürütmeyi durdurma talepleri gibi teknik süreçlerin yönetimi uzman bir gayrimenkul hukuku avukatı olmadan yapılamaz."
    }
  }
];

// Wizard Questions
const WIZARD_QUESTIONS = [
  {
    id: "riskReport",
    question: "Binanız için yetkili kuruluşlarca düzenlenmiş ve kesinleşmiş 'Riskli Yapı Raporu' var mı?",
    options: [
      { text: "Evet, rapor alındı ve kesinleşti.", value: "yes", score: 1 },
      { text: "Hayır, henüz rapor alınmadı veya başvuru aşamasında.", value: "no", score: 0 },
      { text: "Bilmiyorum / Emin değilim.", value: "unsure", score: 0 }
    ]
  },
  {
    id: "majority",
    question: "Kat malikleri arasında kentsel dönüşüm ve müteahhit konusunda %50+1 (salt çoğunluk) sağlandı mı?",
    options: [
      { text: "Evet, maliklerin yarıdan fazlası hemfikir.", value: "yes", score: 1 },
      { text: "Hayır, henüz ortak bir karara varamadık veya çoğunluk yok.", value: "no", score: 0 },
      { text: "Anlaşmazlıklar var, çoğunluk sağlanamıyor.", value: "dispute", score: 0 }
    ]
  },
  {
    id: "contract",
    question: "Müteahhit firmayla resmi 'Kat Karşılığı İnşaat Sözleşmesi' imzalandı mı veya hukuken incelendi mi?",
    options: [
      { text: "Evet, sözleşme imzalandı.", value: "signed", score: 2 },
      { text: "Görüşmeler sürüyor, taslak inceleniyor.", value: "negotiation", score: 1 },
      { text: "Hayır, henüz bir müteahhit seçilmedi.", value: "no", score: 0 }
    ]
  }
];

export default function KentselDonusumClient() {
  const [activeStep, setActiveStep] = useState(1);
  const [wizardAnswers, setWizardAnswers] = useState<Record<string, string>>({});
  const [wizardStep, setWizardStep] = useState(0);
  const [showWizardResult, setShowWizardResult] = useState(false);

  // Active step info
  const stepInfo = STEPS.find((s) => s.id === activeStep) || STEPS[0];

  // Wizard handlers
  const handleWizardAnswer = (questionId: string, optionValue: string) => {
    setWizardAnswers((prev) => ({ ...prev, [questionId]: optionValue }));
    if (wizardStep < WIZARD_QUESTIONS.length - 1) {
      setWizardStep((prev) => prev + 1);
    } else {
      setShowWizardResult(true);
    }
  };

  const resetWizard = () => {
    setWizardAnswers({});
    setWizardStep(0);
    setShowWizardResult(false);
  };

  // Determine custom legal status advice based on answers
  const getWizardAdvice = () => {
    const isRisk = wizardAnswers.riskReport === "yes";
    const isMajority = wizardAnswers.majority === "yes";
    const isContract = wizardAnswers.contract === "signed";
    const isNegotiation = wizardAnswers.contract === "negotiation";

    if (!isRisk) {
      return {
        title: "Risk Tespiti ve Başlangıç Aşaması",
        badge: "1. Aşama: Hazırlık",
        color: "from-blue-600 to-indigo-605",
        advice: "Binanızda kentsel dönüşüm sürecinin resmi olarak başlayabilmesi için öncelikle Çevre, Şehircilik ve İklim Değişikliği Bakanlığı lisanslı kuruluşlardan 'Riskli Yapı Raporu' alınmalıdır. Tek bir malik bile bu başvuruyu yapabilir.",
        criticalRisk: "Rapor alınmadan atılan adımlar, yapılan toplantılar ve imzalanan sözleşmeler hukuken geçersizdir. Müteahhitlerin hazırladığı sözleşmelere imza atmadan önce mutlaka rapor sürecini kesinleştirin.",
        actionText: "İlk Başvuru ve Raporlama Danışmanlığı Alın",
        nextStepLink: "#step-1"
      };
    }

    if (isRisk && !isMajority) {
      return {
        title: "Salt Çoğunluk ve Toplantı Yönetimi Aşaması",
        badge: "2. Aşama: Karar Alma",
        color: "from-amber-600 to-orange-605",
        advice: "Raporunuz kesinleşmiş ancak henüz %50+1 salt çoğunluk kararı alınmamış. Kat maliklerini usulüne uygun şekilde toplantıya davet etmeniz ve karar protokolünü yasal mevzuata tam uyumlu hazırlamanız gerekmektedir.",
        criticalRisk: "Toplantı çağrısının yasal yollardan (yeni tebligat usulü) yapılmaması durumunda, muhalif malikler alınan kararı mahkeme kararıyla iptal ettirebilir ve inşaatın başlamasını yıllarca erteleyebilir.",
        actionText: "Karar Protokolü ve Tebligat Desteği Alın",
        nextStepLink: "#step-2"
      };
    }

    if (isRisk && isMajority && isNegotiation) {
      return {
        title: "Sözleşme Görüşmeleri ve Teknik Detaylar",
        badge: "3. Aşama: Sözleşme İncelemesi",
        color: "from-emerald-600 to-teal-605",
        advice: "Çoğunluğu sağlamış ve müteahhitle görüşme aşamasındasınız. Bu aşama, kentsel dönüşümün en riskli noktasıdır. Kat Karşılığı İnşaat Sözleşmesi (KKİS), paylaşım tablosu ve teknik şartname maddeleri belirlenmektedir.",
        criticalRisk: "Müteahhit firmaların standart sözleşmeleri genellikle kendi lehlerine ağır hükümler içerir. İpotek tesisleri, teminat mektupları, inşaatın gecikmesi halinde fesih ve ceza koşulları gibi hukuki zırhlar sözleşmeye eklenmezse büyük mağduriyetler yaşanabilir.",
        actionText: "Müteahhit Sözleşmesi Analizi Talep Edin",
        nextStepLink: "#step-3"
      };
    }

    if (isRisk && isMajority && isContract) {
      return {
        title: "İnşaat ve Pay Satışı / Uygulama Aşaması",
        badge: "4. Aşama: Uygulama & Satış",
        color: "from-rose-600 to-pink-605",
        advice: "Sözleşmeler imzalanmış ve süreç başlamış. Ancak karara katılmayan, sözleşmeyi imzalamayan veya ulaşılamayan malikler var ise onların paylarının açık artırma ile satışı (pay satışı) sürecine geçilmelidir.",
        criticalRisk: "Karara katılmayan maliklerin haklarının gasp edildiği iddiasıyla açacağı davalar veya açık artırma usulündeki hatalar, idari işlemin iptaliyle ve satışın yürütmesinin durdurulmasıyla sonuçlanabilir. Sürecin her adımında idari takibin yapılması şarttır.",
        actionText: "Pay Satışı ve Hukuki Takip Talebi",
        nextStepLink: "#step-4"
      };
    }

    // Default fall back
    return {
      title: "Kentsel Dönüşüm Hukuki Süreç Yönetimi",
      badge: "Genel Değerlendirme",
      color: "from-primary-700 to-primary-900",
      advice: "Kentsel dönüşüm süreçlerinde atılacak adımlar her aşamada sıkı yasal şekil şartlarına bağlıdır. Küçük bir usul hatası büyük gecikmelere sebep olabilir.",
      criticalRisk: "Kat malikleri, müteahhitler ve kamu kurumları arasındaki dengenin korunması ancak uzman bir gayrimenkul hukuku kadrosuyla mümkündür.",
      actionText: "Avukatımıza Detayları Danışın",
      nextStepLink: "/iletisim"
    };
  };

  const adviceResult = getWizardAdvice();

  return (
    <div className="space-y-16">
      {/* 1. INTERACTIVE STEPS WIDGET */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/60 dark:border-slate-800/80 overflow-hidden transition-all duration-300">
        <div className="bg-gradient-to-r from-primary-900 to-slate-900 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-48 h-48 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold tracking-wider uppercase mb-3 border border-gold-500/30">
                <Sparkles className="w-3.5 h-3.5" /> Adım Adım İnteraktif Takip
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif">Kentsel Dönüşüm Hukuki Yol Haritası</h2>
              <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl">
                Sürecin hangi aşamada olduğunu seçin, yapılması gerekenleri ve bu aşamadaki kritik hukuki riskleri anında inceleyin.
              </p>
            </div>
            {/* Step badges indicator */}
            <div className="flex gap-1.5 bg-slate-800/60 p-1.5 rounded-2xl border border-slate-700/50 backdrop-blur-sm self-start md:self-center">
              {STEPS.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    activeStep === step.id
                      ? "bg-gold-500 text-slate-950 shadow-lg shadow-gold-500/20 scale-105"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  {step.id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stepper Buttons Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center gap-3 p-5 text-left border-b-2 md:border-b-4 transition-all duration-300 relative ${
                  isActive
                    ? "border-gold-500 bg-white dark:bg-slate-900/40 text-primary-900 dark:text-white"
                    : "border-transparent text-slate-555 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/30"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    isActive
                      ? "bg-primary-900 dark:bg-gold-500 text-white dark:text-slate-950 shadow-md"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs text-slate-400 dark:text-slate-450 uppercase font-semibold tracking-wider">
                    {step.id}. ADIM
                  </div>
                  <div className="text-sm font-bold truncate max-w-[120px] lg:max-w-none">
                    {step.title}
                  </div>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-gold-500/5 pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Content Area */}
        <div className="p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
              id={`step-${activeStep}`}
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-grow space-y-6 lg:w-3/5">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-extrabold text-gold-500 dark:text-gold-500">
                      0{stepInfo.id}
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-serif">
                        {stepInfo.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        {stepInfo.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                    {stepInfo.content.description}
                  </p>

                  <div className="grid sm:grid-cols-3 gap-4 mt-6">
                    {stepInfo.content.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200/50 dark:border-slate-800/40"
                      >
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1.5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                          {detail.label}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-405 text-xs leading-relaxed">
                          {detail.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VISUAL INFOGRAPHIC / SHAPES SIDE */}
                <div className="w-full lg:w-2/5 bg-slate-50 dark:bg-slate-950/40 rounded-2xl p-6 border border-slate-200/40 dark:border-slate-800/50 flex flex-col justify-center items-center relative overflow-hidden min-h-[260px]">
                  {/* Decorative mesh background */}
                  <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Render Custom Infographics depending on the Step */}
                  {activeStep === 1 && (
                    <div className="relative flex flex-col items-center justify-center py-4 z-10 w-full">
                      <div className="relative">
                        {/* Pulse effect */}
                        <motion.div
                          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"
                        />
                        <div className="w-20 h-20 bg-blue-500/10 border border-blue-500/40 rounded-3xl flex items-center justify-center text-blue-500 mb-4 relative z-10 mx-auto">
                          <Users className="w-10 h-10" />
                        </div>
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100 text-center px-4">
                        Tek Malik ile Başvuru & Çağrı
                      </span>
                      <div className="flex gap-2 items-center justify-center mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <span>Riskli Yapı Tespiti</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gold-500" />
                        <span className="text-blue-500">Resmi Çağrı Daveti</span>
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="flex flex-col items-center justify-center w-full z-10 py-2">
                      <div className="text-xs font-bold text-amber-600 dark:text-gold-300 uppercase tracking-widest mb-4">
                        3'lü Tebliğ Eşzamanlılığı
                      </div>
                      <div className="grid grid-cols-3 gap-3 w-full max-w-[280px] relative">
                        {/* Connecting line */}
                        <div className="absolute top-8 left-6 right-6 h-0.5 bg-slate-300 dark:bg-slate-800 -z-10" />

                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner">
                            <Scale className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 mt-1.5 text-center">E-Devlet</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner">
                            <Home className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 mt-1.5 text-center">Kapıya Asma</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner">
                            <Landmark className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 mt-1.5 text-center">Muhtar İlanı</span>
                        </div>
                      </div>
                      <div className="mt-4 px-3 py-1 bg-amber-500/15 text-amber-800 dark:text-amber-305 rounded-lg text-[11px] font-bold text-center">
                        Tüm kanallar eşleştiğinde 15 günlük süre başlar.
                      </div>
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div className="flex flex-col items-center justify-center w-full z-10 py-2">
                      <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">
                        Karar Alma Eşiği Değişimi
                      </div>
                      <div className="flex items-center justify-between w-full max-w-[260px] gap-4">
                        <div className="flex-1 p-3 bg-red-500/5 rounded-xl border border-red-500/10 text-center">
                          <div className="text-xs text-red-500 font-bold line-through">ESKİ YASA</div>
                          <div className="text-xl font-extrabold text-red-650 mt-1">2/3</div>
                          <div className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold">%66.6 Çoğunluk</div>
                        </div>
                        <div className="flex-none text-slate-400 font-bold text-xl">→</div>
                        <div className="flex-1 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center relative overflow-hidden">
                          <motion.div
                            animate={{ opacity: [0.1, 0.3, 0.1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute inset-0 bg-emerald-500/20"
                          />
                          <div className="text-xs text-emerald-500 font-bold">YENİ YASA</div>
                          <div className="text-xl font-extrabold text-emerald-505 mt-1">%50+1</div>
                          <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">Salt Çoğunluk</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeStep === 4 && (
                    <div className="relative flex flex-col items-center justify-center py-4 z-10 w-full">
                      <div className="relative">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                          className="absolute inset-0 border-2 border-dashed border-rose-500/30 rounded-full"
                        />
                        <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/40 rounded-full flex items-center justify-center text-rose-500 mb-3 relative z-10 mx-auto">
                          <Scale className="w-8 h-8" />
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 text-center px-4">
                        Açık Artırma ile Pay Satışı
                      </span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center mt-2 px-6">
                        Anlaşmayan ortakların hisseleri, rayiç bedelle öncelikle diğer kat maliklerine ihale edilir.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Step Custom Hukuki Danismanlik Warning Card */}
              <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 dark:border-gold-500/20 bg-gradient-to-r from-gold-50/40 to-white dark:from-slate-850/40 dark:to-slate-900/50 p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gold-500" />
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-500 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="flex-grow space-y-2">
                  <h4 className="font-serif font-bold text-lg text-primary-900 dark:text-gold-300">
                    Asil Hukuk Kritik Uyarı: {stepInfo.title} Aşamasında Avukatın Rolü
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-350 leading-relaxed font-medium">
                    {stepInfo.content.legalWarning}
                  </p>
                </div>
                <div className="flex-shrink-0 w-full md:w-auto">
                  <Link
                    href="/iletisim"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary-900 hover:bg-primary-950 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    Avukata Danışın <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 2. INTERACTIVE WIZARD SECTION */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 md:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Glow lights */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-xs font-semibold tracking-wider uppercase border border-primary-500/30">
              <Scale className="w-3.5 h-3.5 text-gold-500" /> ÜCRETSİZ DURUM HESAPLAMA SİHİRBAZI
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">Kentsel Dönüşüm Hukuki Durum Analizi</h2>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
              Binanızın mevcut şartlarını girerek kentsel dönüşümün hangi aşamasında olduğunuzu belirleyin ve karşı karşıya kalabileceğiniz kritik hukuki riskleri öğrenin.
            </p>
          </div>

          <div className="bg-slate-850/60 border border-slate-800 rounded-2xl p-6 md:p-8 min-h-[250px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {!showWizardResult ? (
                <motion.div
                  key={wizardStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Step indicators */}
                  <div className="flex justify-between items-center text-xs text-slate-400 font-semibold mb-2">
                    <span>Soru {wizardStep + 1} / {WIZARD_QUESTIONS.length}</span>
                    <div className="flex gap-1">
                      {WIZARD_QUESTIONS.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-6 h-1.5 rounded-full transition-colors duration-300 ${
                            idx <= wizardStep ? "bg-gold-500" : "bg-slate-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-slate-100">
                    {WIZARD_QUESTIONS[wizardStep].question}
                  </h3>

                  <div className="space-y-3">
                    {WIZARD_QUESTIONS[wizardStep].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          handleWizardAnswer(WIZARD_QUESTIONS[wizardStep].id, option.value)
                        }
                        className="w-full text-left p-4 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/80 hover:border-gold-500/40 text-slate-300 hover:text-white font-medium text-sm md:text-base flex justify-between items-center transition-all group"
                      >
                        <span>{option.text}</span>
                        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-gold-500 transition-transform group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${adviceResult.color} text-white`}
                    >
                      {adviceResult.badge}
                    </span>
                    <h3 className="text-xl font-bold font-serif text-gold-300">
                      Mevcut Durumunuz: {adviceResult.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                        Adım Özeti & Yol Gösterici
                      </div>
                      <p className="text-sm text-slate-350 leading-relaxed">
                        {adviceResult.advice}
                      </p>
                    </div>

                    <div className="bg-rose-950/20 rounded-xl p-5 border border-rose-500/20 space-y-2">
                      <div className="text-xs font-bold text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-gold-500" /> EN KRİTİK HUKUKİ RİSK
                      </div>
                      <p className="text-sm text-rose-300 leading-relaxed font-medium">
                        {adviceResult.criticalRisk}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                      href="/iletisim"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-slate-950 font-bold text-base shadow-lg transition-all"
                    >
                      <Phone className="w-5 h-5" /> {adviceResult.actionText}
                    </Link>
                    <button
                      onClick={resetWizard}
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-base border border-slate-700 transition-all"
                    >
                      <RefreshCw className="w-4 h-4" /> Testi Yeniden Çöz
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
