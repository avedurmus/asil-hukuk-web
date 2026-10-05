import { getAllPosts } from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

/** Blog yazılarının RSS akışı; derlemede statik olarak üretilir. */
export const dynamic = "force-static";

const FEED_SIZE = 50;

function escapeXml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

/** "2026-10-05" → RFC 822 tarih; yazılar İstanbul sabahında yayımlanır. */
function rfc822(iso: string): string {
    return new Date(`${iso}T08:00:00+03:00`).toUTCString();
}

export function GET() {
    const posts = getAllPosts().slice(0, FEED_SIZE);
    const items = posts
        .map((post) => {
            const url = `${SITE_URL}/blog/${post.id}`;
            return [
                "    <item>",
                `      <title>${escapeXml(post.title)}</title>`,
                `      <link>${url}</link>`,
                `      <guid isPermaLink="true">${url}</guid>`,
                `      <pubDate>${rfc822(post.dateISO)}</pubDate>`,
                `      <category>${escapeXml(post.category)}</category>`,
                `      <dc:creator>Av. Emre Durmuş</dc:creator>`,
                `      <description>${escapeXml(post.excerpt)}</description>`,
                "    </item>",
            ].join("\n");
        })
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_NAME)} – Hukuk Yazıları</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Aile, iş, ceza, gayrimenkul ve ticaret hukukunda güncel içtihat ve mevzuata dayanan yazılar.</description>
    <language>tr</language>
    ${posts[0] ? `<lastBuildDate>${rfc822(posts[0].dateISO)}</lastBuildDate>` : ""}
${items}
  </channel>
</rss>
`;

    return new Response(xml, {
        headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
}
