
import { Scale, Shield, Users, FileText, Gavel, Building, Heart, Globe } from "lucide-react";

export const siteContent = {
    hero: {
        title: "Adalet, Güven ve Modern Çözümler",
        subtitle: "Asil Hukuk ve Danışmanlık Bürosu olarak, karmaşık hukuki süreçlerinizi şeffaf, hızlı ve sonuç odaklı yönetiyoruz.",
        cta: "Hukuki Destek Al",
        secondaryCta: "Hizmetlerimiz"
    },
    about: {
        title: "Hakkımızda",
        description: "2004 yılında Av. Emre Durmuş tarafından kurulan büromuz, 21 yılı aşkın deneyimiyle yurt içi ve yurt dışı müvekkillerine, tüzel ve gerçek kişilere kapsamlı hukuk ve danışmanlık hizmeti sunmaktadır. İlke edindiğimiz şeffaflık ve güven ile hukukun üstünlüğünü savunuyoruz.",
        stats: [
            { value: "20+", label: "Yıllık Deneyim" },
            { value: "500+", label: "Mutlu Müvekkil" },
            { value: "98%", label: "Başarı Oranı" }
        ]
    },
    services: [
        {
            id: "bosanma",
            title: "Boşanma ve Aile Hukuku",
            description: "Boşanma, velayet, nafaka ve mal paylaşımı davalarında hassas ve sonuç odaklı yaklaşım.",
            icon: Users
        },
        {
            id: "ceza",
            title: "Ceza Hukuku",
            description: "Soruşturma ve kovuşturma aşamalarında şüpheli, sanık veya mağdur vekilliği.",
            icon: Shield
        },
        {
            id: "ticaret",
            title: "Ticaret ve Şirketler Hukuku",
            description: "Şirket kuruluşu, birleşme, devralma ve ticari sözleşmelerin düzenlenmesi.",
            icon: Building
        },
        {
            id: "gayrimenkul",
            title: "Gayrimenkul Hukuku",
            description: "Tapu iptal, tescil, kira tespit ve tahliye davaları süreçlerinin yönetimi.",
            icon: Globe
        },
        {
            id: "is-hukuku",
            title: "İş ve Sosyal Güvenlik Hukuku",
            description: "İşe iade, kıdem ve ihbar tazminatı, iş kazası davalarında uzman destek.",
            icon: FileText
        },
        {
            id: "arabuluculuk",
            title: "Arabuluculuk",
            description: "Hukuki uyuşmazlıkların dava yoluna gitmeden, hızlı ve ekonomik çözümü.",
            icon: Scale
        }
    ],
    contact: {
        address: "Yalı Mah. Topselvi Cad. No:100 Mai Residence K:14 D:124 Kartal, İstanbul",
        phone: "0530 432 20 25",
        email: "emre@asilhukuk.net",
        mapUrl: "https://www.google.com/maps/embed?pb=..." // Placeholder for now
    },
    brand: {
        name: "Asil Hukuk",
        slogan: "Hukuk & Danışmanlık"
    }
};
