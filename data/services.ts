import { Scale, Shield, Users, FileText, Gavel, Building, Heart, Globe, Briefcase } from "lucide-react";
import type { FAQCategoryId } from "./faq";

export interface Service {
    id: string;
    title: string;
    shortDescription: string;
    /** Arama sonuçlarında görünen başlık; yerel arama ifadesini (Kartal) içerir. */
    seoTitle: string;
    /** Arama sonuçlarında görünen açıklama (≈150-160 karakter). */
    seoDescription: string;
    /** Hizmet sayfasında listelenecek ilgili blog kategorileri. */
    blogCategories: string[];
    /** Hizmet sayfasında listelenecek ilgili SSS kategorileri. */
    faqCategories: FAQCategoryId[];
    /** Kategoriden bağımsız olarak eklenecek SSS kimlikleri. */
    faqIds?: string[];
    icon: any;
    detailContent: {
        intro: string;
        features: string[];
        process: string;
    };
}

export const services: Service[] = [
    {
        id: "bosanma-ve-aile-hukuku",
        title: "Boşanma ve Aile Hukuku",
        shortDescription: "Anlaşmalı ve çekişmeli boşanma, velayet, nafaka ve mal paylaşımı davalarında hukuki destek.",
        seoTitle: "Kartal Boşanma Avukatı - Aile Hukuku",
        seoDescription: "Kartal ve Anadolu Yakası'nda anlaşmalı ve çekişmeli boşanma, velayet, nafaka ve mal paylaşımı davalarında Av. Emre Durmuş ile hukuki destek ve dava takibi.",
        blogCategories: ["Aile Hukuku"],
        faqCategories: ["Aile Hukuku"],
        icon: Users,
        detailContent: {
            intro: "Aile hukuku, bireylerin en hassas süreçlerini kapsayan ve uzmanlık gerektiren bir alandır. Asil Hukuk olarak, boşanma ve aile hukuku kapsamındaki tüm uyuşmazlıklarda müvekkillerimizin haklarını korurken, sürecin psikolojik ve sosyal etkilerini de gözeterek en sağlıklı çözüme ulaşmayı hedefliyoruz.",
            features: [
                "Anlaşmalı ve Çekişmeli Boşanma Davaları",
                "Velayet ve Nafaka Talepleri",
                "Mal Rejimi Tasfiyesi ve Mal Paylaşımı",
                "Nişanın Bozulmasından Kaynaklı Tazminat Davaları",
                "Soybağının Kurulması ve Reddi",
                "Aile İçi Şiddet ve Koruma Tedbirleri"
            ],
            process: "Sürece müvekkilimizle yapılan detaylı bir ön görüşme ile başlıyoruz. Durumun hukuki analizini yaparak, anlaşmalı boşanma şansını değerlendiriyor, mümkün değilse çekişmeli süreç için en güçlü stratejiyi belirliyoruz. Özellikle çocukların üstün yararı ve müvekkilimizin mali hakları önceliğimizdir."
        }
    },
    {
        id: "ceza-hukuku",
        title: "Ceza Hukuku",
        shortDescription: "Soruşturma ve kovuşturma evrelerinde müdafi ve vekil olarak hukuki temsil.",
        seoTitle: "Kartal Ceza Avukatı - Ceza Hukuku",
        seoDescription: "Kartal ceza avukatı: soruşturma ve kovuşturma evrelerinde ifade, tutuklamaya itiraz ve savunma; ağır ceza ve asliye ceza davalarında müdafilik hizmeti.",
        blogCategories: ["Ceza Hukuku"],
        faqCategories: ["Ceza Hukuku"],
        icon: Shield,
        detailContent: {
            intro: "Ceza soruşturması ve kovuşturması, kişilerin özgürlüğünü ve itibarını doğrudan etkileyen ciddi süreçlerdir. Adil yargılanma hakkının tesisi ve maddi gerçeğin ortaya çıkarılması için titiz bir savunma şarttır.",
            features: [
                "Ağır Ceza Mahkemesi Görev Alanına Giren Suçlar",
                "Asliye Ceza Davaları",
                "Soruşturma Aşamasında İfade ve Sorgu Takibi",
                "Tutuklamaya İtiraz ve Tahliye Talepleri",
                "Bilişim Suçları",
                "Mali ve Ekonomik Suçlar"
            ],
            process: "Müvekkilimizle ilk andan itibaren – karakol veya savcılık ifadesi dahil – yanında yer alıyoruz. Dosyanın her aşamasını titizlikle inceliyor, lehe olan delillerin toplanmasını sağlıyor ve etkin bir savunma stratejisi ile süreci yürütüyoruz."
        }
    },
    {
        id: "ticaret-ve-sirketler-hukuku",
        title: "Ticaret ve Şirketler Hukuku",
        shortDescription: "Şirket kuruluşu, esas sözleşme değişiklikleri ve ticari uyuşmazlıklarda danışmanlık.",
        seoTitle: "Kartal Ticaret ve Şirketler Hukuku Avukatı",
        seoDescription: "Kartal'da şirket kuruluşu, genel kurul ve esas sözleşme işlemleri, ticari sözleşmeler, haksız rekabet, konkordato ve iflas süreçlerinde avukatlık hizmeti.",
        blogCategories: ["Ticaret Hukuku"],
        faqCategories: ["İcra ve Ticaret Hukuku"],
        icon: Building,
        detailContent: {
            intro: "Ticari hayatın dinamik yapısı, hızlı ve doğru hukuki kararlar almayı gerektirir. Şirketlerin kuruluşundan tasfiyesine kadar olan tüm süreçlerde, ayrıca ticari sözleşmelerin hazırlanmasında önleyici hukuk hizmeti sunuyoruz.",
            features: [
                "Şirket Kuruluşu ve Ana Sözleşme Hazırlanması",
                "Genel Kurul Toplantıları ve Yönetim Kurulu Kararları",
                "Birleşme, Devralma ve Tür Değişikliği",
                "Haksız Rekabet Davaları",
                "Ticari Sözleşmelerin Düzenlenmesi ve İncelenmesi",
                "Konkordato ve İflas Süreçleri"
            ],
            process: "Müvekkil şirketlerimizin ticari hedeflerini anlayarak, onlara en uygun hukuki zemini hazırlıyoruz. Olası riskleri önceden tespit ediyor, sözleşmeleri bu riskleri minimize edecek şekilde düzenliyoruz."
        }
    },
    {
        id: "gayrimenkul-hukuku",
        title: "Gayrimenkul Hukuku",
        shortDescription: "Tapu iptal tescil, kira tespiti ve tahliye davaları süreçlerinde hukuki yardım.",
        seoTitle: "Kartal Gayrimenkul ve Kira Avukatı",
        seoDescription: "Kartal gayrimenkul avukatı: tapu iptal ve tescil, kira tespiti ve kiracı tahliye, ortaklığın giderilmesi ve kat karşılığı inşaat uyuşmazlıklarında dava takibi.",
        blogCategories: ["Gayrimenkul Hukuku"],
        faqCategories: ["Gayrimenkul ve Kira Hukuku", "Kentsel Dönüşüm"],
        icon: Globe,
        detailContent: {
            intro: "Gayrimenkul yatırımları ve mülkiyet hakları, büyük ekonomik değer taşıyan konulardır. Tapu süreçlerinden kira uyuşmazlıklarına kadar geniş bir yelpazede hukuki güvenlik sağlıyoruz.",
            features: [
                "Tapu İptal ve Tescil Davaları",
                "Kira Tespit ve Tahliye Davaları",
                "İzaleyi Şuyu (Ortaklığın Giderilmesi) Davaları",
                "Kamulaştırma ve Kamulaştırmasız El Atma",
                "Kat Karşılığı İnşaat Sözleşmeleri",
                "Yabancıların Mülk Edinimi"
            ],
            process: "Uyuşmazlığın kaynağını tespit ederek, gerek dava yoluyla gerekse sulh görüşmeleriyle müvekkilimizin mülkiyet haklarını en hızlı şekilde güvence altına almayı hedefliyoruz."
        }
    },
    {
        id: "is-ve-sosyal-guvenlik-hukuku",
        title: "İş ve Sosyal Güvenlik Hukuku",
        shortDescription: "İşe iade, işçilik alacakları ve hizmet tespiti davalarında hukuki süreç takibi.",
        seoTitle: "Kartal İş Avukatı - İşe İade ve Tazminat",
        seoDescription: "Kartal iş avukatı: işe iade, kıdem ve ihbar tazminatı, fazla mesai alacağı, iş kazası ve hizmet tespiti davalarında işçi ve işverenlere hukuki destek.",
        blogCategories: ["İş Hukuku"],
        faqCategories: ["İş Hukuku"],
        icon: FileText,
        detailContent: {
            intro: "İş hayatında işçi ve işveren arasındaki ilişkilerin yasal zeminde yürütülmesi, her iki taraf için de önemlidir. İş hukukundan kaynaklanan uyuşmazlıklarda güncel Yargıtay kararları ışığında hizmet veriyoruz.",
            features: [
                "İşe İade Davaları",
                "Kıdem, İhbar Tazminatı ve Fazla Mesai Alacakları",
                "İş Kazası ve Meslek Hastalığı Tazminatları",
                "Hizmet Tespiti Davaları",
                "Mobbing (Psikolojik Taciz) Davaları",
                "İş Sözleşmelerinin Hazırlanması ve Feshi"
            ],
            process: "İşçi müvekkillerimiz için hak ettikleri alacakların tam ve zamanında ödenmesini sağlarken, işveren müvekkillerimiz için mevzuata uygun işyeri uygulamaları oluşturarak dava risklerini minimize ediyoruz."
        }
    },
    {
        id: "arabuluculuk",
        title: "Arabuluculuk",
        shortDescription: "Hukuki uyuşmazlıkların dava dışı yollarla çözümü için arabuluculuk hizmeti.",
        seoTitle: "Kartal Arabulucu - Arabuluculuk Hizmeti",
        seoDescription: "Kartal'da arabulucu Av. Emre Durmuş ile iş, ticaret, kira ve tüketici uyuşmazlıklarında zorunlu ve ihtiyari arabuluculuk; dava açmadan hızlı ve ekonomik çözüm.",
        blogCategories: [],
        faqCategories: [],
        faqIds: ["is-davasinda-arabuluculuk", "ticari-davalarda-arabuluculuk"],
        icon: Scale,
        detailContent: {
            intro: "Yargı süreçlerinin uzunluğu ve masrafı karşısında, arabuluculuk modern, hızlı ve ekonomik bir alternatif çözüm yoludur. Tarafların kendi çözümlerini üretebildiği bu süreçte etkin rol alıyoruz.",
            features: [
                "İş Hukuku Arabuluculuğu",
                "Ticaret Hukuku Arabuluculuğu",
                "Tüketici Hukuku Arabuluculuğu",
                "Kira Hukuku Arabuluculuğu",
                "İhtiyari Arabuluculuk Hizmetleri"
            ],
            process: "Tarafları bir araya getirerek, iletişimi kolaylaştırıyor ve her iki tarafın da menfaatine uygun, sürdürülebilir bir anlaşma zemini oluşturulmasına katkı sağlıyoruz."
        }
    }
];
