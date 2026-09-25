import type { Metadata } from "next";

export const SITE_URL = "https://asilhukuk.net";
export const SITE_NAME = "Asil Hukuk Bürosu";
/** Yapılandırılmış verilerde firmaya atıf için kullanılan kalıcı kimlik. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/**
 * Varsayılan paylaşım görseli: sosyal ağların beklediği 1200x630 (1.91:1)
 * oranında. Boyutlar dosyanın gerçek ölçüleriyle aynı tutulmalıdır.
 */
export const DEFAULT_OG_IMAGE = {
    url: "/og-image-1200x630.jpg",
    width: 1200,
    height: 630,
    alt: "Asil Hukuk Bürosu - Av. Emre Durmuş, Kartal / İstanbul",
};

type OgImage = { url: string; width?: number; height?: number; alt?: string };

interface PageSeo {
    /** Şablona eklenecek sayfa başlığı ("%s | Asil Hukuk"). */
    title: string;
    description: string;
    /** Kök dizine göre yol, örn. "/iletisim". */
    path: string;
    /** Paylaşım kartında gösterilecek başlık; verilmezse title kullanılır. */
    socialTitle?: string;
    images?: OgImage[];
    openGraph?: Partial<NonNullable<Metadata["openGraph"]>>;
    keywords?: string[];
}

/**
 * Sayfa metadata'sını üretir. Next.js, alt sayfada tanımlanan openGraph ve
 * twitter nesnelerini kök düzendekiyle birleştirmez, tamamen değiştirir;
 * bu yüzden site adı, dil ve görsel gibi ortak alanlar her sayfada
 * yeniden verilmelidir. Aksi halde sayfa ana sayfanın paylaşım bilgilerini
 * devralır ya da görselsiz paylaşılır.
 */
export function pageMetadata({
    title,
    description,
    path,
    socialTitle,
    images,
    openGraph,
    keywords,
}: PageSeo): Metadata {
    const ogTitle = socialTitle ?? `${title} | Asil Hukuk`;
    const ogImages = images ?? [DEFAULT_OG_IMAGE];

    return {
        title,
        description,
        ...(keywords ? { keywords } : {}),
        alternates: { canonical: path },
        openGraph: {
            title: ogTitle,
            description,
            url: `${SITE_URL}${path}`,
            siteName: SITE_NAME,
            locale: "tr_TR",
            type: "website",
            images: ogImages,
            ...openGraph,
        } as Metadata["openGraph"],
        twitter: {
            card: "summary_large_image",
            site: "@AsilHukuk",
            title: ogTitle,
            description,
            images: ogImages.map((image) => image.url),
        },
    };
}

/** Ana Sayfa'dan başlayan BreadcrumbList şeması üretir. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ name: "Ana Sayfa", path: "" }, ...items].map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.path}`,
        })),
    };
}
