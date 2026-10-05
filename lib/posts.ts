import fs from "fs";
import path from "path";
import { blogPosts, type BlogPost } from "@/data/blogPosts";

/**
 * Günlük makaleler `content/makaleler/*.json` dosyalarında, her biri ayrı
 * dosyada tutulur (bkz. docs/otomatik-makaleler.md). Elle yazılan yazılar
 * `data/blogPosts.ts` içinde kalır. Bu modül ikisini birleştirir; dosyalar
 * derleme sırasında okunduğu için yalnızca sunucu bileşenlerinden çağrılmalıdır.
 */

const DAILY_DIR = path.join(process.cwd(), "content", "makaleler");
const MONTHS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

/** "2026-10-05" → "5 Ekim 2026" */
export function formatTrDate(iso: string): string {
    const [y, m, d] = iso.split("-").map(Number);
    return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** HTML içerikten yaklaşık okuma süresi (dakikada ~200 kelime). */
function readTime(html: string): string {
    const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 200))} dk okuma`;
}

function readDailyPosts(): BlogPost[] {
    if (!fs.existsSync(DAILY_DIR)) return [];
    const posts: BlogPost[] = [];
    for (const file of fs.readdirSync(DAILY_DIR).filter((f) => f.endsWith(".json")).sort()) {
        try {
            const raw = JSON.parse(fs.readFileSync(path.join(DAILY_DIR, file), "utf8")) as Partial<BlogPost>;
            if (!raw.id || !raw.title || !raw.excerpt || !raw.dateISO || !raw.category || !raw.content) {
                console.warn(`[posts] ${file}: zorunlu alan eksik, atlandı`);
                continue;
            }
            posts.push({
                ...raw,
                date: raw.date ?? formatTrDate(raw.dateISO),
                readTime: raw.readTime ?? readTime(raw.content),
                daily: true,
            } as BlogPost);
        } catch (error) {
            console.warn(`[posts] ${file}: okunamadı, atlandı`, error);
        }
    }
    return posts;
}

let cache: BlogPost[] | null = null;

/** Tüm yazılar, en yeniden eskiye. Aynı kimlik iki yerde varsa elle yazılan kazanır. */
export function getAllPosts(): BlogPost[] {
    if (cache) return cache;
    const ids = new Set(blogPosts.map((p) => p.id));
    const daily = readDailyPosts().filter((p) => !ids.has(p.id));
    // Aynı günün yazıları dosya adı sırasıyla gelir; ters çevirip kararlı sıralayınca
    // o günün son eklenen yazısı üstte kalır.
    cache = [...blogPosts, ...daily.reverse()].sort((a, b) => b.dateISO.localeCompare(a.dateISO));
    return cache;
}

export function getPost(id: string): BlogPost | undefined {
    return getAllPosts().find((p) => p.id === id);
}

/** İstemci bileşenlerine gönderilecek, gövdesi çıkarılmış yazı özeti. */
export type PostSummary = Omit<BlogPost, "content">;
export function toSummary({ content: _content, ...rest }: BlogPost): PostSummary {
    return rest;
}
