import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import MobileBottomNav from "@/components/MobileBottomNav";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { DEFAULT_OG_IMAGE, OFFICE_GEO, OFFICE_MAP_URL, ORGANIZATION_ID, SITE_NAME, SITE_URL } from "@/lib/seo";
import { services } from "@/data/services";

// Türkçe karakterler (ğ, ş, ı, İ) "latin-ext" alt kümesindedir; yalnızca "latin"
// yüklendiğinde bu harfler yedek fonttan çizilir ve sayfa düzeni kayar.
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin", "latin-ext"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Asil Hukuk | Av. Emre Durmuş - Kartal Hukuk ve Danışmanlık Bürosu",
        template: "%s | Asil Hukuk"
    },
    description: "Kartal avukat ve hukuk bürosu: Av. Emre Durmuş ile 2004'ten bu yana boşanma, ceza, kira-tahliye, iş ve ticaret hukukunda danışmanlık ve dava takibi.",
    keywords: [
        'Kartal Hukuk Bürosu', 'İstanbul Anadolu Yakası Avukat', 'Kartal Boşanma Avukatı',
        'Kartal Ceza Avukatı', 'Kartal Gayrimenkul Avukatı', 'Soğanlık Avukat', 'Yakacık Avukat',
        'Cevizli Avukat', 'Emre Durmuş', 'Asil Hukuk', 'İstanbul İş Avukatı',
        'Kartal kira avukatı', 'tahliye davası avukatı', 'Pendik avukat', 'Maltepe avukat',
        'Kartal arabulucu avukat', 'İstanbul tahliye avukatı'
    ],
    authors: [{ name: 'Av. Emre Durmuş', url: 'https://asilhukuk.net/hakkimizda' }],
    creator: 'Av. Emre Durmuş',
    publisher: 'Asil Hukuk Bürosu',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: 'Asil Hukuk | Av. Emre Durmuş - Kartal Hukuk Bürosu',
        description: 'Güvenilir, şeffaf ve modern hukuki çözümler. Boşanma, Ceza ve Gayrimenkul hukuku uzmanı.',
        url: SITE_URL,
        siteName: SITE_NAME,
        locale: 'tr_TR',
        type: 'website',
        images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Asil Hukuk | Av. Emre Durmuş',
        description: 'İstanbul Kartal Hukuk Bürosu. Boşanma ve Ceza davalarında uzman.',
        site: '@AsilHukuk',
        creator: '@AsilHukuk',
        images: [DEFAULT_OG_IMAGE.url],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    other: {
        'geo.region': 'TR-34',
        'geo.placename': 'Kartal',
        'geo.position': `${OFFICE_GEO.latitude};${OFFICE_GEO.longitude}`,
        'ICBM': `${OFFICE_GEO.latitude}, ${OFFICE_GEO.longitude}`
    },
    verification: {
        google: 'ikCUHrQbKy3f8efZEj7Bp1Az5uQ7F3svuLfCtYPZt3I',
    }
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': ORGANIZATION_ID,
    'name': SITE_NAME,
    'alternateName': 'Asil Hukuk ve Danışmanlık Bürosu',
    'image': 'https://asilhukuk.net/logo.png',
    'logo': 'https://asilhukuk.net/logo.png',
    'description': 'İstanbul Kartal bölgesinde boşanma, ceza ve gayrimenkul hukuku alanlarında uzman avukatlık hizmeti.',
    'url': SITE_URL,
    'telephone': '+90 530 432 20 25',
    'email': 'emre@asilhukuk.net',
    'priceRange': '$$',
    'knowsLanguage': ['tr'],
    'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Çalışma Alanlarımız',
        'itemListElement': services.map((service) => ({
            '@type': 'Offer',
            'itemOffered': {
                '@type': 'Service',
                'name': service.title,
                'description': service.shortDescription,
                'url': `${SITE_URL}/calisma-alanlarimiz/${service.id}`,
            },
        })),
    },
    'foundingDate': '2004',
    'founder': {
        '@type': 'Person',
        '@id': `${SITE_URL}/hakkimizda#emre-durmus`,
        'name': 'Av. Emre Durmuş',
        'jobTitle': 'Avukat ve Arabulucu',
        'url': 'https://asilhukuk.net/hakkimizda'
    },
    'areaServed': [
        { '@type': 'City', 'name': 'İstanbul' },
        { '@type': 'AdministrativeArea', 'name': 'Kartal' },
        { '@type': 'AdministrativeArea', 'name': 'Pendik' },
        { '@type': 'AdministrativeArea', 'name': 'Maltepe' }
    ],
    'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Yalı Mah. Topselvi Cad. No:100 Mai Residence K:14 D:124',
        'addressLocality': 'Kartal',
        'addressRegion': 'İstanbul',
        'postalCode': '34873',
        'addressCountry': 'TR'
    },
    'geo': {
        '@type': 'GeoCoordinates',
        ...OFFICE_GEO
    },
    'hasMap': OFFICE_MAP_URL,
    'openingHoursSpecification': [
        {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday'
            ],
            'opens': '09:00',
            'closes': '18:00'
        }
    ],
    'sameAs': [
        'https://www.facebook.com/asilhukuk',
        'https://www.instagram.com/asilhukuk',
        'https://www.linkedin.com/in/avukat-emre-durmu%C5%9F-a5981523/',
        'https://x.com/AsilHukuk'
    ]
}

const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    'url': SITE_URL,
    'name': SITE_NAME,
    'inLanguage': 'tr-TR',
    'publisher': { '@id': ORGANIZATION_ID },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr" className="scroll-smooth">
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            try {
                                if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                                    document.documentElement.classList.add('dark');
                                } else {
                                    document.documentElement.classList.remove('dark');
                                }
                                // Scroll animasyonları yalnızca JS ve IntersectionObserver
                                // varken devreye girer; aksi halde içerik baştan görünür kalır.
                                if ('IntersectionObserver' in window) {
                                    document.documentElement.classList.add('reveal-ready');
                                }
                            } catch (_) {}
                        `
                    }}
                />
            </head>
            <body className={`${inter.variable} ${playfair.variable} font-sans antialiased pb-20 md:pb-0`}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
                />
                {children}
                <FloatingWhatsApp />
                <MobileBottomNav />
                {/* Google tag (gtag.js) */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-J7F4RKQLG1"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-J7F4RKQLG1');
                    `}
                </Script>
            </body>
        </html>
    );
}
