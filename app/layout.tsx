import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    metadataBase: new URL('https://asilhukuk.net'),
    title: {
        default: "Asil Hukuk | Av. Emre Durmuş - İstanbul Kartal Boşanma ve Ceza Avukatı",
        template: "%s | Asil Hukuk - İstanbul Kartal"
    },
    description: "İstanbul Kartal'da deneyimli avukatlık hizmeti. Boşanma, Ağır Ceza, Gayrimenkul ve İş Hukuku davalarında 20 yıllık tecrübe. Av. Emre Durmuş liderliğinde sonuç odaklı hukuk bürosu.",
    keywords: [
        'Avukat', 'Hukuk Bürosu', 'İstanbul Avukat', 'Kartal Avukat', 'Boşanma Avukatı',
        'Ceza Avukatı', 'Ağır Ceza Avukatı', 'Gayrimenkul Avukatı', 'İş Mahkemesi Avukatı',
        'Kartal Hukuk Bürosu', 'İstanbul Anadolu Yakası Avukat', 'Emre Durmuş', 'Asil Hukuk'
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
        languages: {
            'tr-TR': '/tr',
        },
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
                url: '/og-image.jpg', // We should ensure this exists or use a generic one if possible later
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
        google: 'google-site-verification-code', // Reminder to user
    }
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    'name': 'Asil Hukuk Bürosu',
    'image': 'https://asilhukuk.net/logo.png',
    'description': 'İstanbul Kartal bölgesinde boşanma, ceza ve gayrimenkul hukuku alanlarında uzman avukatlık hizmeti.',
    '@id': 'https://asilhukuk.net',
    'url': 'https://asilhukuk.net',
    'telephone': '0530 432 20 25',
    'priceRange': '$$',
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
        'https://www.linkedin.com/company/asilhukuk'
    ]
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr" className="scroll-smooth">
            <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {children}
            </body>
        </html>
    );
}
