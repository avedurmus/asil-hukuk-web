/**
 * Site daha önce Wix üzerindeydi; arama motorlarında hâlâ o döneme ait
 * adresler kayıtlı. Bu adresler 404 vermek yerine kalıcı olarak yeni
 * karşılıklarına yönlendirilir; böylece eski sayfaların biriktirdiği
 * arama değeri kaybolmaz ve ziyaretçi boş sayfaya düşmez.
 */
const legacyWixRedirects = [
    { source: "/book-online", destination: "/iletisim" },
    { source: "/book-online/:path*", destination: "/iletisim" },
    { source: "/service-page/:path*", destination: "/iletisim" },
    { source: "/pricing-plans/:path*", destination: "/iletisim" },
    { source: "/plans-pricing", destination: "/iletisim" },
    { source: "/contact", destination: "/iletisim" },
    { source: "/iletisim-1", destination: "/iletisim" },
    { source: "/general-1", destination: "/calisma-alanlarimiz/arabuluculuk" },
    { source: "/services-2", destination: "/calisma-alanlarimiz" },
    { source: "/services", destination: "/calisma-alanlarimiz" },
    { source: "/team-3", destination: "/hakkimizda" },
    { source: "/about", destination: "/hakkimizda" },
    { source: "/about-1", destination: "/hakkimizda" },
    { source: "/post/:path*", destination: "/blog" },
    { source: "/blog-1", destination: "/blog" },
    { source: "/faq", destination: "/sss" },
    // Kaldırılan YargıAsistan uygulaması
    { source: "/asistan", destination: "/ai-hukuk" },
    { source: "/asistan/:path*", destination: "/ai-hukuk" },
];

/**
 * Tüm sayfalara eklenen güvenlik başlıkları:
 * - sayfa başka sitelerde çerçeve içinde açılamaz (tıklama tuzağı / clickjacking),
 * - tarayıcı dosya türünü tahmin etmez,
 * - başka sitelere giden bağlantılarda yalnızca alan adı paylaşılır
 *   (ör. yönetim paneli bağlantısındaki anahtar dışarı sızmaz),
 * - kamera, mikrofon ve konum gibi tarayıcı izinleri kapalıdır.
 */
const securityHeaders = [
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    poweredByHeader: false,
    async headers() {
        return [{ source: "/:path*", headers: securityHeaders }];
    },
    async redirects() {
        return [
            ...legacyWixRedirects.map((r) => ({ ...r, permanent: true })),
            // Vercel'in varsayılan alan adı asıl sitenin kopyası gibi
            // taranmasın; tüm trafik asıl alan adına toplanır.
            {
                source: "/:path*",
                has: [{ type: "host", value: "asil-hukuk-web.vercel.app" }],
                destination: "https://asilhukuk.net/:path*",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
