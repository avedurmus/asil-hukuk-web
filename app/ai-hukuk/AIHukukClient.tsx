"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import { PRIVACY_NOTICE_PATH } from "@/lib/legal";
import { Briefcase, FileText, Globe, Lock, Scale, SearchCheck, ShieldCheck, UserCheck, Users } from "lucide-react";

// Avukatlık meslek kuralları gereği bu sayfada uzmanlık iddiası, sonuç veya
// yanıt süresi taahhüdü ve başka bürolarla kıyaslama yer almaz.
const content = {
    tr: {
        eyebrow: "Şirketler için hukuki destek",
        title: "Şirketinizin sözleşme ve uyum işlerinde, teknolojiyi bilen bir avukat",
        subtitle:
            "Av. Emre Durmuş; büyüyen şirketlere ve girişimlere sözleşme, şirketler hukuku, KVKK ve iş hukuku konularında danışmanlık veriyor. İçtihat taraması ve taslak hazırlığı gibi rutin işlerde yapay zekâ araçlarından yararlanıyor; her belgeyi ve tavsiyeyi bizzat inceleyip sorumluluğunu kendisi üstleniyor.",
        cta: "Ön görüşme talep edin",
        langBtn: "English",
        howTitle: "Nasıl çalışıyoruz?",
        how: [
            {
                icon: SearchCheck,
                title: "Yapay zekâ bir araçtır",
                desc: "Mevzuat ve içtihat taraması, ilk taslakların hazırlanması ve belge karşılaştırması gibi işlerde yapay zekâ araçlarını yardımcı olarak kullanırız.",
            },
            {
                icon: UserCheck,
                title: "Karar ve sorumluluk avukatındır",
                desc: "Yapay zekânın ürettiği hiçbir metin incelenmeden size iletilmez. Hukuki değerlendirme, strateji ve son metin Av. Emre Durmuş'a aittir.",
            },
            {
                icon: Scale,
                title: "Ücret baştan bellidir",
                desc: "Ücret, işin kapsamına göre sabit ya da dönemsel danışmanlık modeliyle önceden yazılı olarak belirlenir ve Avukatlık Asgari Ücret Tarifesi'nin altında olamaz.",
            },
            {
                icon: Users,
                title: "Doğrudan iletişim",
                desc: "Dosyanızla doğrudan avukatınız ilgilenir; ekibinizin kullandığı iletişim kanalları üzerinden çalışabiliriz.",
            },
        ],
        areasTitle: "Faaliyet alanları",
        areasNote: "Bu alanlar bir uzmanlık iddiası değil, büronun şirketlere hizmet verdiği konuları gösterir.",
        areas: [
            { icon: FileText, title: "Ticari sözleşmeler", desc: "Gizlilik (NDA), tedarik, hizmet, bayilik ve lisans sözleşmelerinin hazırlanması ve incelenmesi." },
            { icon: Briefcase, title: "Şirketler hukuku", desc: "Şirket kuruluşu, esas sözleşme değişiklikleri, genel kurul işlemleri ve pay devirleri." },
            { icon: ShieldCheck, title: "KVKK uyumu", desc: "Aydınlatma metinleri, veri işleme envanteri, yurt dışı aktarım ve yapay zekâ kullanımına ilişkin uyum süreçleri." },
            { icon: Users, title: "İş hukuku", desc: "İş sözleşmeleri, işyeri yönetmelikleri, fesih süreçleri ve işçi-işveren uyuşmazlıkları." },
        ],
        faqTitle: "Sık sorulan sorular",
        faq: [
            {
                q: "Yapay zekâyı hangi işlerde kullanıyorsunuz?",
                a: "Araştırma, ilk taslak ve belge karşılaştırması gibi zaman alan rutin işlerde. Yapay zekâ çıktıları her zaman avukat tarafından kontrol edilir ve tek başına hukuki tavsiye olarak kullanılmaz.",
            },
            {
                q: "Hangi dillerde çalışıyorsunuz?",
                a: "Sözleşmeleri Türkçe ve İngilizce olarak hazırlıyor ve inceliyoruz.",
            },
            {
                q: "Şirket bilgilerimiz yapay zekâ araçlarıyla paylaşılıyor mu?",
                a: "Avukatın sır saklama yükümlülüğü gereği, şirketinize ve çalışanlarınıza ait bilgileri yapay zekâ araçlarına yalnızca iş için gerekli olduğu ölçüde ve mümkün olduğunda kimlik bilgilerini çıkararak aktarırız. Hangi araçların kullanılacağını iş başlangıcında sizinle paylaşır, talep etmeniz hâlinde yapay zekâ kullanmadan çalışırız.",
            },
        ],
        privacyNote: "Bu sitedeki iletişim kanallarında kişisel verilerinizin nasıl işlendiğini",
        privacyLink: "KVKK Aydınlatma Metni",
        privacyNoteEnd: "'nde bulabilirsiniz.",
        ctaTitle: "Şirketinizin ihtiyacını konuşalım",
        ctaDesc: "Kısaca ihtiyacınızı anlatın; kapsamı ve çalışma modelini ön görüşmede birlikte belirleyelim.",
    },
    en: {
        eyebrow: "Legal support for companies",
        title: "A tech-literate lawyer for your contracts and compliance work",
        subtitle:
            "Att. Emre Durmuş advises growing companies and start-ups on contracts, corporate law, Turkish data protection (KVKK) and employment law. AI tools assist with routine tasks such as case-law research and first drafts; every document and piece of advice is personally reviewed by him, and he remains fully responsible for it.",
        cta: "Request an initial meeting",
        langBtn: "Türkçe",
        howTitle: "How we work",
        how: [
            {
                icon: SearchCheck,
                title: "AI is a tool",
                desc: "We use AI tools as assistants for legislation and case-law research, first drafts and document comparison.",
            },
            {
                icon: UserCheck,
                title: "The lawyer decides",
                desc: "No AI-generated text reaches you without review. Legal analysis, strategy and the final text are Att. Emre Durmuş's own work.",
            },
            {
                icon: Scale,
                title: "Fees agreed in advance",
                desc: "Fees are agreed in writing in advance, as a fixed fee or a periodic retainer depending on scope, and cannot be lower than the Turkish Bar's minimum fee tariff.",
            },
            {
                icon: Users,
                title: "Direct communication",
                desc: "Your lawyer handles your matter personally, and we can work through the communication channels your team already uses.",
            },
        ],
        areasTitle: "Practice areas",
        areasNote: "These are the areas in which the firm serves companies; they are not a claim of specialisation.",
        areas: [
            { icon: FileText, title: "Commercial contracts", desc: "Drafting and reviewing NDAs, supply, service, distribution and licence agreements." },
            { icon: Briefcase, title: "Corporate law", desc: "Company formation, amendments to articles of association, general meetings and share transfers." },
            { icon: ShieldCheck, title: "KVKK compliance", desc: "Privacy notices, data inventories, cross-border transfers and compliance for the use of AI." },
            { icon: Users, title: "Employment law", desc: "Employment contracts, workplace policies, terminations and employer-employee disputes." },
        ],
        faqTitle: "Frequently asked questions",
        faq: [
            {
                q: "What do you use AI for?",
                a: "For time-consuming routine work such as research, first drafts and document comparison. AI output is always checked by the lawyer and is never used as legal advice on its own.",
            },
            {
                q: "Which languages do you work in?",
                a: "We draft and review contracts in Turkish and English.",
            },
            {
                q: "Is our company information shared with AI tools?",
                a: "In line with a lawyer's duty of confidentiality, we share information about your company and employees with AI tools only to the extent needed for the work and, where possible, with identifying details removed. We tell you which tools will be used at the start of the engagement, and we work without AI if you ask us to.",
            },
        ],
        privacyNote: "For how personal data is processed through the contact channels on this site, see the",
        privacyLink: "KVKK Privacy Notice",
        privacyNoteEnd: " (in Turkish).",
        ctaTitle: "Let's talk about your company's needs",
        ctaDesc: "Briefly describe what you need; we will agree on the scope and working model in an initial meeting.",
    },
};

export default function AIHukukClient() {
    const [lang, setLang] = useState<"tr" | "en">("tr");
    const t = content[lang];

    return (
        <div className="flex min-h-screen flex-col bg-ivory-100 transition-colors duration-300 dark:bg-slate-950">
            <Header />

            <main className="flex-grow" lang={lang}>
                <section className="relative isolate overflow-hidden bg-primary-950 pb-20 pt-32 text-white lg:pb-24 lg:pt-40">
                    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.08]" />
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgb(192_150_82/0.18),transparent_60%),radial-gradient(ellipse_50%_70%_at_0%_100%,rgb(79_111_158/0.35),transparent_60%)]"
                    />
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <span className="eyebrow !text-gold-400">{t.eyebrow}</span>
                            <button
                                type="button"
                                onClick={() => setLang((prev) => (prev === "tr" ? "en" : "tr"))}
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-gold-400 hover:bg-white/5"
                            >
                                <Globe className="h-4 w-4" />
                                {t.langBtn}
                            </button>
                        </div>
                        <h1 className="mt-6 font-serif text-4xl font-medium leading-tight md:text-5xl">{t.title}</h1>
                        <p className="mt-6 text-lg leading-relaxed text-slate-300">{t.subtitle}</p>
                        <Link
                            href="/iletisim?konu=Ticaret%20ve%20%C5%9Eirketler%20Hukuku#randevu"
                            className="mt-9 inline-flex items-center justify-center rounded-full bg-gold-500 px-8 py-4 font-semibold text-slate-950 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
                        >
                            {t.cta}
                        </Link>
                    </div>
                </section>

                <section className="py-20 lg:py-24">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-center font-serif text-3xl text-slate-900 dark:text-slate-100 md:text-4xl">{t.howTitle}</h2>
                        <div className="mt-12 grid gap-6 md:grid-cols-2">
                            {t.how.map(({ icon: Icon, title, desc }) => (
                                <div
                                    key={title}
                                    className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-card dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-700 dark:text-gold-400">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-5 font-serif text-xl text-slate-900 dark:text-slate-100">{title}</h3>
                                    <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="border-t border-slate-200/70 bg-white py-20 dark:border-slate-800 dark:bg-slate-900 lg:py-24">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-center font-serif text-3xl text-slate-900 dark:text-slate-100 md:text-4xl">{t.areasTitle}</h2>
                        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-500 dark:text-slate-400">{t.areasNote}</p>
                        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {t.areas.map(({ icon: Icon, title, desc }) => (
                                <div
                                    key={title}
                                    className="rounded-2xl border border-slate-200/80 bg-ivory-50 p-6 dark:border-slate-800 dark:bg-slate-950"
                                >
                                    <Icon className="h-5 w-5 text-gold-700 dark:text-gold-400" />
                                    <h3 className="mt-4 font-serif text-lg text-slate-900 dark:text-slate-100">{title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 lg:py-24">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6">
                        <h2 className="text-center font-serif text-3xl text-slate-900 dark:text-slate-100 md:text-4xl">{t.faqTitle}</h2>
                        <div className="mt-12 space-y-4">
                            {t.faq.map((item) => (
                                <div
                                    key={item.q}
                                    className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <h3 className="font-serif text-lg text-slate-900 dark:text-slate-100">{item.q}</h3>
                                    <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">{item.a}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 flex items-start justify-center gap-2 text-center text-sm text-slate-500 dark:text-slate-400">
                            <Lock className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>
                                {t.privacyNote}{" "}
                                <Link href={PRIVACY_NOTICE_PATH} className="font-medium text-primary-800 underline underline-offset-2 dark:text-gold-400">
                                    {t.privacyLink}
                                </Link>
                                {t.privacyNoteEnd}
                            </span>
                        </p>
                    </div>
                </section>

                <ContactCTA title={t.ctaTitle} description={t.ctaDesc} topic="Ticaret ve Şirketler Hukuku" />
            </main>

            <Footer />
        </div>
    );
}
