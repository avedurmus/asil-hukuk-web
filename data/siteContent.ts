
import { Scale, Shield, Users, FileText, Gavel, Building, Heart, Globe } from "lucide-react";

export const siteContent = {
    hero: {
        title: "Adalet, Güven ve Modern Çözümler",
        subtitle: "Asil Hukuk ve Danışmanlık Bürosu olarak, hukuki süreçlerinizi şeffaf, hızlı ve güvenilir bir şekilde yönetiyoruz.",
        cta: "İletişime Geç",
        secondaryCta: "Çalışma Alanlarımız"
    },
    about: {
        title: "Hakkımızda",
        description: "2004 yılında Av. Emre Durmuş tarafından kurulan büromuz, 21 yılı aşkın mesleki tecrübesiyle hukukun üstünlüğü ilkesi çerçevesinde faaliyet göstermektedir. Şeffaflık, gizlilik ve meslek etiğine bağlılık temel değerlerimizdir.",
        stats: [
            { value: "2004", label: "Yılından Beri" },
            { value: "20+", label: "Yıllık Tecrübe" },
            { value: "İstanbul", label: "Kartal Merkezli" }
        ]
    },
    services: [
        {
            id: "bosanma-ve-aile-hukuku",
            title: "Boşanma ve Aile Hukuku",
            description: "Anlaşmalı ve çekişmeli boşanma, velayet, nafaka ve mal paylaşımı davalarında hukuki destek.",
            icon: Users
        },
        {
            id: "ceza-hukuku",
            title: "Ceza Hukuku",
            description: "Soruşturma ve kovuşturma evrelerinde müdafi ve vekil olarak hukuki temsil.",
            icon: Shield
        },
        {
            id: "ticaret-ve-sirketler-hukuku",
            title: "Ticaret ve Şirketler Hukuku",
            description: "Şirket kuruluşu, esas sözleşme değişiklikleri ve ticari uyuşmazlıklarda danışmanlık.",
            icon: Building
        },
        {
            id: "gayrimenkul-hukuku",
            title: "Gayrimenkul Hukuku",
            description: "Tapu iptal tescil, kira tespiti ve tahliye davaları süreçlerinde hukuki yardım.",
            icon: Globe
        },
        {
            id: "is-ve-sosyal-guvenlik-hukuku",
            title: "İş ve Sosyal Güvenlik Hukuku",
            description: "İşe iade, işçilik alacakları ve hizmet tespiti davalarında hukuki süreç takibi.",
            icon: FileText
        },
        {
            id: "arabuluculuk",
            title: "Arabuluculuk",
            description: "Hukuki uyuşmazlıkların dava dışı yollarla çözümü için arabuluculuk hizmeti.",
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
