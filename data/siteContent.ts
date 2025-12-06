
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
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3014.6534576395567!2d29.216394915174567!3d40.900355479261756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac48dec79614d%3A0x3c934d7002e8fd2b!2sAsil%20Hukuk%20B%C3%BCrosu!5e0!3m2!1str!2str!4v1765044431872!5m2!1str!2str"
    },
    brand: {
        name: "Asil Hukuk",
        slogan: "Hukuk & Danışmanlık"
    }
};
