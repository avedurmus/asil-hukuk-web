import { Scale, Shield, Users, FileText, Gavel, Building, Heart, Globe, Briefcase } from "lucide-react";

export interface Service {
    id: string;
    title: string;
    shortDescription: string;
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
        icon: Users,
        detailContent: {
            intro: "Aile hukuku, bireylerin en hassas süreçlerini kapsayan ve uzmanlık gerektiren bir alandır. Asil Hukuk olarak, boşanma ve aile hukuku kapsamındaki tüm uyuşmazlıklarda müvekkillerimizin haklarını korurken, sürecin psikolojik ve sosyal etkilerini de gözeterek en sağlıklı çözüme ulaşmayı hedefliyoruz.",
            features: [
                "Anlaşmalı ve Çekişmeli Boşanma Davaları",
                "Velayet ve Nafaka Talepleri",
                "Mal Rejimi Tasfiyesi ve Mal Paylaşımı",
                "Nişanın Bozulmasından Kaynaklı Tazminat Davaları",
                "Soybağının Kurulmesi ve Reddi",
                "Aile İçi Şiddet ve Koruma Tedbirleri"
            ],
            process: "Sürece müvekkilimizle yapılan detaylı bir ön görüşme ile başlıyoruz. Durumun hukuki analizini yaparak, anlaşmalı boşanma şansını değerlendiriyor, mümkün değilse çekişmeli süreç için en güçlü stratejiyi belirliyoruz. Özellikle çocukların üstün yararı ve müvekkilimizin mali hakları önceliğimizdir."
        }
    },
    {
        id: "ceza-hukuku",
        title: "Ceza Hukuku",
        shortDescription: "Soruşturma ve kovuşturma evrelerinde müdafi ve vekil olarak hukuki temsil.",
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
