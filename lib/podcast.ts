import fs from "fs";
import path from "path";
import config from "@/data/podcast.json";

/**
 * Günlük podcast bölümleri `content/podcast/<YYYY-MM-DD>.json` dosyalarındadır
 * (bkz. docs/podcast.md). Her bölüm o günün makalelerini anlatır; sesi
 * `public/podcast/<YYYY-MM-DD>.mp3` dosyasıdır. Yalnızca sunucu bileşenlerinden çağrılmalıdır.
 */
export interface PodcastEpisode {
    dateISO: string;
    title: string;
    description: string;
    articles: string[];
    script: string;
    audio?: string;
    durationSec?: number;
}

export const podcastConfig = config;

const DIR = path.join(process.cwd(), "content", "podcast");
let cache: PodcastEpisode[] | null = null;

/** Sesi üretilmiş bölümler, en yeniden eskiye. */
export function getEpisodes(): PodcastEpisode[] {
    if (cache) return cache;
    if (!fs.existsSync(DIR)) return (cache = []);
    cache = fs
        .readdirSync(DIR)
        .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
        .flatMap((f) => {
            try {
                const ep = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) as PodcastEpisode;
                if (!ep.audio || !fs.existsSync(path.join(process.cwd(), "public", ep.audio))) return [];
                return [ep];
            } catch (error) {
                console.warn(`[podcast] ${f}: okunamadı, atlandı`, error);
                return [];
            }
        })
        .sort((a, b) => b.dateISO.localeCompare(a.dateISO));
    return cache;
}

/** Bir makalenin anlatıldığı bölüm (sitede gösterim kapalıysa yok). */
export function getEpisodeForPost(postId: string): PodcastEpisode | undefined {
    if (!podcastConfig.showOnSite) return undefined;
    return getEpisodes().find((ep) => ep.articles.includes(postId));
}

/**
 * Programın dış bağlantıları: RSS.com'daki program sayfası (eski bölümler dahil
 * tüm bölümler ve dinleme platformları) ve tanımlıysa Spotify program sayfası.
 */
export function podcastLinks(): { label: string; href: string }[] {
    return [
        podcastConfig.showUrl && { label: "Tüm bölümler", href: podcastConfig.showUrl },
        podcastConfig.spotifyShowUrl && { label: "Spotify'da dinleyin", href: podcastConfig.spotifyShowUrl },
    ].filter((link): link is { label: string; href: string } => Boolean(link));
}

/** 412 → "6 dk 52 sn" */
export function formatDuration(sec?: number): string | undefined {
    if (!sec) return undefined;
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    if (!m) return `${s} sn`;
    return s ? `${m} dk ${s} sn` : `${m} dk`;
}
