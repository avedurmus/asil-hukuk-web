import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import MobileBottomNav from "@/components/MobileBottomNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    metadataBase: new URL('https://asilhukuk.net'),
    title: {
        default: "Asil Hukuk | Av. Emre Durmuş - Kartal Hukuk ve Danışmanlık Bürosu",
        template: "%s | Asil Hukuk - İstanbul Kartal"
    },
    description: "İstanbul Kartal'da faaliyet gösteren Asil Hukuk, boşanma, ceza, gayrimenkul ve iş hukuku alanlarında hukuki danışmanlık ve avukatlık hizmeti sunmaktadır. Av. Emre Durmuş - 20+ Yıl Tecrübe.",
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
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Asil Hukuk | Av. Emre Durmuş - Kartal Hukuk Bürosu',
        description: 'Güvenilir, şeffaf ve modern hukuki çözümler. Boşanma, Ceza ve Gayrimenkul hukuku uzmanı.',
        url: 'https://asilhukuk.net',
        siteName: 'Asil Hukuk & Danışmanlık',
        locale: 'tr_TR',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Asil Hukuk Bürosu',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Asil Hukuk | Av. Emre Durmuş',
        description: 'İstanbul Kartal Hukuk Bürosu. Boşanma ve Ceza davalarında uzman.',
        creator: '@asilhukuk', // Placeholder, can be removed or updated
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
        'geo.position': '40.89;29.19', // Approximate coords for Kartal/Istanbul
        'ICBM': '40.89, 29.19'
    },
    verification: {
        google: 'ikCUHrQbKy3f8efZEj7Bp1Az5uQ7F3svuLfCtYPZt3I',
    }
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    'name': 'Asil Hukuk Bürosu',
    'image': 'https://asilhukuk.net/logo.png',
    'logo': 'https://asilhukuk.net/logo.png',
    'description': 'İstanbul Kartal bölgesinde boşanma, ceza ve gayrimenkul hukuku alanlarında uzman avukatlık hizmeti.',
    '@id': 'https://asilhukuk.net',
    'url': 'https://asilhukuk.net',
    'telephone': '0530 432 20 25',
    'email': 'emre@asilhukuk.net',
    'priceRange': '$$',
    'foundingDate': '2004',
    'founder': {
        '@type': 'Person',
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
        'latitude': 40.923363,
        'longitude': 29.218684
    },
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
                            } catch (_) {}
                        `
                    }}
                />
            </head>
            <body className={`${inter.variable} ${playfair.variable} font-sans antialiased pb-16 md:pb-0`}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {children}
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
