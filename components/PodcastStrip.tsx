import Link from "next/link";
import { Mic, ExternalLink, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { formatDuration, podcastConfig, podcastLinks, type PodcastEpisode } from "@/lib/podcast";
import { formatTrDate, getPost } from "@/lib/posts";

// Program rozetindeki dekoratif ses dalgası çubuklarının yükseklikleri (%)
const waveBars = [40, 75, 55, 100, 65, 85, 45];

/**
 * Ana sayfada (son eklenen yazılar şeridinin altında) ve blog sayfasının başında
 * en son podcast bölümünü öne çıkaran sade, kompakt kutu: solda küçük program
 * rozeti, ortada bölüm bilgisi ve anlatılan yazılar, sağda oynatıcı. Bölüm yoksa
 * ya da sitede gösterim kapalıysa hiçbir şey göstermez.
 */
export default function PodcastStrip({
    episode,
    spacing = "pb-14 pt-2 lg:pb-16",
}: {
    episode?: PodcastEpisode;
    /** Kutunun üst/alt boşluğu; sayfaya göre ayarlanır. */
    spacing?: string;
}) {
    if (!episode || !podcastConfig.showOnSite) return null;
    const duration = formatDuration(episode.durationSec);
    // Bölümde anlatılan yazılar, başlıklarıyla ayrı bağlantı olarak gösterilir.
    const posts = episode.articles
        .map((id) => getPost(id))
        .filter((post): post is NonNullable<typeof post> => Boolean(post));

    return (
        <section aria-labelledby="podcast-son-bolum" className={`bg-ivory-100 dark:bg-slate-950 ${spacing}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-gold-500/30 bg-white p-5 shadow-elegant dark:border-gold-500/20 dark:bg-slate-900 sm:p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
                        {/* --- Program rozeti ve bölüm bilgisi --- */}
                        <div className="flex min-w-0 flex-1 items-start gap-4 sm:gap-5">
                            <div
                                aria-hidden="true"
                                className="relative flex h-16 w-16 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl bg-primary-950 ring-1 ring-gold-400/40 sm:h-20 sm:w-20"
                            >
                                <Mic className="h-5 w-5 text-gold-400 sm:h-6 sm:w-6" />
                                <div className="flex h-3 items-end gap-[2px] sm:h-4">
                                    {waveBars.map((h, i) => (
                                        <span key={i} className="w-[2px] rounded-full bg-gold-400/80" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                            </div>

                            <div className="min-w-0">
                                <h2 id="podcast-son-bolum" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-700 dark:text-gold-400">
                                    Podcast · {podcastConfig.podcastName}
                                </h2>
                                <p className="mt-1 font-serif text-lg leading-snug text-slate-900 dark:text-slate-100 sm:text-xl">
                                    {episode.title}
                                </p>
                                <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                                    <span className="inline-flex items-center gap-1.5">
                                        <CalendarDays className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
                                        {formatTrDate(episode.dateISO)}
                                    </span>
                                    {duration && (
                                        <span className="inline-flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
                                            {duration}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* --- Oynatıcı ve program bağlantıları --- */}
                        <div className="w-full shrink-0 lg:w-[360px]">
                            <audio
                                controls
                                preload="none"
                                src={episode.audio}
                                aria-label={`${podcastConfig.podcastName}: ${episode.title}`}
                                className="h-10 w-full"
                            >
                                Tarayıcınız ses oynatmayı desteklemiyor.
                            </audio>
                            {podcastLinks().length > 0 && (
                                <div className="mt-2 flex flex-wrap justify-end gap-x-4 gap-y-1">
                                    {podcastLinks().map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary-800 hover:underline dark:text-gold-400"
                                        >
                                            {link.label}
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- Bölümde anlatılan yazılar ve açıklama --- */}
                    {posts.length > 0 && (
                        <div className="mt-5 border-t border-slate-200/80 pt-4 dark:border-slate-800">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                                {posts.length === 1 ? "Bu bölümde anlatılan yazı" : "Bu bölümde anlatılan yazılar"}
                            </p>
                            <ul className="mt-2 flex flex-wrap gap-2">
                                {posts.map((post) => (
                                    <li key={post.id} className="min-w-0 max-w-full">
                                        <Link
                                            href={`/blog/${post.id}`}
                                            className="group inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200 bg-ivory-50 px-3.5 py-1.5 text-sm text-slate-800 transition-colors duration-300 hover:border-gold-500 hover:text-primary-800 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:text-gold-300"
                                        >
                                            <span className="truncate">{post.title}</span>
                                            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary-800 transition-transform duration-300 group-hover:translate-x-0.5 dark:text-gold-400" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                        {podcastConfig.aiDisclosure}
                    </p>
                </div>
            </div>
        </section>
    );
}
