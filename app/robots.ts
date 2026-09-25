import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            // API uçları içerik değil; taranması tarama bütçesini boşa harcar.
            disallow: '/api/',
        },
        sitemap: 'https://asilhukuk.net/sitemap.xml',
        host: 'https://asilhukuk.net',
    }
}
