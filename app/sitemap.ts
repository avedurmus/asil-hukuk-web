import { MetadataRoute } from 'next'
import { services } from '@/data/services'
import { getAllPosts } from '@/lib/posts'
import { SITE_URL } from '@/lib/seo'

/**
 * lastModified yalnızca içeriğin gerçekten değiştiği tarihi bildirir. Her
 * derlemede "bugün" yazmak, Google'ın bu alanı tümüyle yok saymasına yol açar;
 * bu yüzden yazı listesi gösteren sayfalarda en yeni yazının tarihi kullanılır,
 * diğer sabit sayfalarda alan boş bırakılır.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts()
    const postDate = (iso: string) => new Date(`${iso}T08:00:00+03:00`)
    const latest = posts[0] ? postDate(posts[0].updatedISO ?? posts[0].dateISO) : undefined

    const staticPages: MetadataRoute.Sitemap = [
        { url: SITE_URL, lastModified: latest, changeFrequency: 'daily', priority: 1.0 },
        { url: `${SITE_URL}/blog`, lastModified: latest, changeFrequency: 'daily', priority: 0.9 },
        { url: `${SITE_URL}/calisma-alanlarimiz`, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${SITE_URL}/hakkimizda`, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${SITE_URL}/iletisim`, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${SITE_URL}/sss`, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE_URL}/kentsel-donusum-rehberi`, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE_URL}/ai-hukuk`, changeFrequency: 'monthly', priority: 0.5 },
    ]

    // Hizmet sayfaları kendi alanlarındaki son yazıları listeler.
    const servicePages: MetadataRoute.Sitemap = services.map((service) => {
        const newest = posts.find((post) => service.blogCategories.includes(post.category))
        return {
            url: `${SITE_URL}/calisma-alanlarimiz/${service.id}`,
            lastModified: newest ? postDate(newest.updatedISO ?? newest.dateISO) : undefined,
            changeFrequency: 'weekly',
            priority: 0.9,
        }
    })

    const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${SITE_URL}/blog/${post.id}`,
        lastModified: postDate(post.updatedISO ?? post.dateISO),
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    return [...staticPages, ...servicePages, ...blogPages]
}
