
import { Scale, Shield, Users, FileText, Gavel, Building, Heart, Globe } from "lucide-react";

export const siteContent = {
    hero: {
        title: "Adalet, Güven ve Modern Çözümler",
        subtitle: "Boşanma, kira, işten çıkarılma, ceza davası ya da miras… Ne yapmanız gerektiğini anlaşılır bir dille anlatıyor, süreci sizinle birlikte yürütüyoruz. 2004'ten beri Kartal'dayız.",
        cta: "İletişime Geç",
        secondaryCta: "Çalışma Alanlarımız"
    },
    about: {
        title: "Hakkımızda",
        description: "Asil Hukuk Bürosu, 2004 yılında Av. Emre Durmuş tarafından Kartal'da kuruldu. Dosyanızla doğrudan avukatınız ilgilenir; her aşamada ne olduğunu açıkça anlatır, bilgilerinizi gizli tutarız.",
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
            description: "Boşanma, velayet, nafaka, mal paylaşımı ve düğün takıları. Haklarınızı anlatır, davanızı baştan sona takip ederiz.",
            icon: Users
        },
        {
            id: "ceza-hukuku",
            title: "Ceza Hukuku",
            description: "İfadeye mi çağrıldınız, hakkınızda dava mı açıldı ya da bir suçun mağduru musunuz? Karakoldan duruşmaya kadar yanınızdayız.",
            icon: Shield
        },
        {
            id: "ticaret-ve-sirketler-hukuku",
            title: "Ticaret ve Şirketler Hukuku",
            description: "Şirket kurarken, sözleşme imzalarken ya da alacağınızı tahsil edemediğinizde işletmenizi hukuki risklere karşı koruruz.",
            icon: Building
        },
        {
            id: "gayrimenkul-hukuku",
            title: "Gayrimenkul Hukuku",
            description: "Kiracı çıkarma, kira artışı, tapu ve ortak mülk sorunları. Ev sahibi ya da kiracı olarak haklarınızı koruruz.",
            icon: Globe
        },
        {
            id: "is-ve-sosyal-guvenlik-hukuku",
            title: "İş ve Sosyal Güvenlik Hukuku",
            description: "İşten mi çıkarıldınız, maaşınız, fazla mesainiz veya tazminatınız mı ödenmedi? İşe iade ve alacak davalarında yanınızdayız.",
            icon: FileText
        },
        {
            id: "arabuluculuk",
            title: "Arabuluculuk",
            description: "Mahkemeye gitmeden, daha kısa sürede ve daha az masrafla anlaşmanın yolu. İş, kira ve ticari anlaşmazlıklarda kayıtlı arabulucu olarak görev yapıyoruz.",
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
