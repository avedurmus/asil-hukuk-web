import { getAllPosts } from "@/lib/posts";
import type { SocialPosts } from "@/data/blogPosts";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

/**
 * Make (make.com) gibi otomasyon servislerinin izlediği, platforma özel paylaşım
 * akışları. Her öğenin açıklaması (description) o platformda olduğu gibi
 * paylaşılacak hazır metindir. Yalnızca "social" alanı olan yazılar yer alır.
 * Bkz. docs/sosyal-medya.md.
 */
const FEED_SIZE = 20;
const PLATFORM_NAMES: Record<keyof SocialPosts, string> = { linkedin: "LinkedIn", x: "X", facebook: "Facebook" };

function escapeXml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

/** Günlük makaleler İstanbul sabahı yayımlanır; aynı günün iki yazısı dosya sırasıyla birer dakika arayla. */
function rfc822(iso: string, offsetMinutes: number): string {
    return new Date(new Date(`${iso}T08:00:00+03:00`).getTime() + offsetMinutes * 60_000).toUTCString();
}

export function socialFeed(platform: keyof SocialPosts): Response {
    const posts = getAllPosts()
        .filter((post) => post.social?.[platform])
        .slice(0, FEED_SIZE);

    const items = posts
        .map((post, i) => {
            const url = `${SITE_URL}/blog/${post.id}`;
            return [
                "    <item>",
                `      <title>${escapeXml(post.title)}</title>`,
                `      <link>${url}</link>`,
                `      <guid isPermaLink="false">${url}#${platform}</guid>`,
                // Aynı günün yazıları farklı zaman damgası alsın; listede en üstteki en yeni.
                `      <pubDate>${rfc822(post.dateISO, posts.length - i)}</pubDate>`,
                `      <category>${escapeXml(post.category)}</category>`,
                `      <description>${escapeXml(post.social![platform])}</description>`,
                "    </item>",
            ].join("\n");
        })
        .join("\n");

    const self = `${SITE_URL}/sosyal/${platform}.xml`;
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} – ${PLATFORM_NAMES[platform]} paylaşımları</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
    <description>${PLATFORM_NAMES[platform]} için hazırlanmış günlük makale paylaşım metinleri.</description>
    <language>tr</language>
${items}
  </channel>
</rss>
`;
    return new Response(xml, {
        headers: { "Content-Type": "application/rss+xml; charset=utf-8", "X-Robots-Tag": "noindex" },
    });
}
