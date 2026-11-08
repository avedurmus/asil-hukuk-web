import Link from "next/link";
import { Headphones, ExternalLink } from "lucide-react";
import { formatDuration, podcastConfig, type PodcastEpisode } from "@/lib/podcast";
import { formatTrDate } from "@/lib/posts";

/**
 * Ana sayfada, son eklenen yazılar şeridinin altında en son podcast bölümünü
 * çalan ince bant. Bölüm yoksa ya da sitede gösterim kapalıysa hiçbir şey göstermez.
 */
export default function PodcastStrip({ episode }: { episode?: PodcastEpisode }) {
    if (!episode || !podcastConfig.showOnSite) return null;
    const duration = formatDuration(episode.durationSec);

    return (
        <section aria-labelledby="podcast-son-bolum" className="bg-ivory-100 pb-10 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 rounded-xl border border-gold-500/30 bg-white p-4 dark:border-gold-500/20 dark:bg-slate-900 lg:flex-row lg:items-center lg:gap-6">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-900 text-gold-300 dark:bg-gold-500 dark:text-slate-950">
                            <Headphones className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                            <h2 id="podcast-son-bolum" className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-700 dark:text-gold-400">
                                Podcast · {podcastConfig.podcastName}
                            </h2>
                            <p className="mt-1 font-serif text-[17px] leading-snug text-slate-900 dark:text-slate-100">
                                {episode.title}
                            </p>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                {formatTrDate(episode.dateISO)}
                                {duration && <> · {duration}</>}
                                {" · "}
                                <Link
                                    href={episode.articles.length === 1 ? `/blog/${episode.articles[0]}` : "/blog"}
                                    className="font-semibold text-primary-800 hover:underline dark:text-gold-400"
                                >
                                    {episode.articles.length === 1 ? "Yazıyı okuyun" : "Yazıları okuyun"}
                                </Link>
                                {podcastConfig.spotifyShowUrl && (
                                    <>
                                        {" · "}
                                        <a
                                            href={podcastConfig.spotifyShowUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 font-semibold text-primary-800 hover:underline dark:text-gold-400"
                                        >
                                            Spotify&apos;da dinleyin
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                    <audio
                        controls
                        preload="none"
                        src={episode.audio}
                        aria-label={`${podcastConfig.podcastName}: ${episode.title}`}
                        className="h-10 w-full lg:w-[360px] lg:shrink-0"
                    >
                        Tarayıcınız ses oynatmayı desteklemiyor.
                    </audio>
                </div>
            </div>
        </section>
    );
}
