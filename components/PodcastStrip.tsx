import Link from "next/link";
import Image from "next/image";
import { Headphones, Mic, ExternalLink, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { formatDuration, podcastConfig, podcastLinks, type PodcastEpisode } from "@/lib/podcast";
import { formatTrDate } from "@/lib/posts";

// Görseldeki dekoratif ses dalgası çubuklarının yükseklikleri (%)
const waveBars = [28, 52, 76, 44, 92, 60, 36, 70, 100, 54, 30, 66, 84, 40, 58, 24];

/**
 * Ana sayfada, son eklenen yazılar şeridinin altında en son podcast bölümünü
 * öne çıkaran resimli kutu: solda Av. Emre Durmuş'un portresiyle program
 * kapağı, sağda bölüm bilgisi ve oynatıcı. Bölüm yoksa ya da sitede gösterim
 * kapalıysa hiçbir şey göstermez.
 */
export default function PodcastStrip({ episode }: { episode?: PodcastEpisode }) {
    if (!episode || !podcastConfig.showOnSite) return null;
    const duration = formatDuration(episode.durationSec);
    // Açıklamanın ilk paragrafı bölümün kısa özetidir (bkz. docs/podcast.md).
    const summary = episode.description.split("\n\n")[0];
    const single = episode.articles.length === 1;

    return (
        <section aria-labelledby="podcast-son-bolum" className="bg-ivory-100 pb-14 pt-2 dark:bg-slate-950 lg:pb-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-gold-500/30 bg-white shadow-elegant dark:border-gold-500/20 dark:bg-slate-900 lg:grid-cols-12">
                    {/* --- Program kapağı --- */}
                    <div className="relative isolate aspect-[16/10] overflow-hidden bg-primary-950 sm:aspect-[16/8] lg:col-span-5 lg:aspect-auto lg:min-h-[340px]">
                        <Image
                            src="/images/emre-durmus-800.webp"
                            alt=""
                            fill
                            sizes="(max-width: 1024px) 100vw, 520px"
                            className="-z-10 object-cover object-[60%_18%] opacity-90"
                        />
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 -z-10 bg-gradient-to-t from-primary-950 via-primary-950/55 to-primary-950/5 lg:bg-gradient-to-r lg:from-primary-950/95 lg:via-primary-950/50 lg:to-transparent"
                        />
                        {/* İnce altın iç çerçeve */}
                        <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-xl ring-1 ring-gold-400/35 sm:inset-4" />

                        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary-950">
                                <Mic className="h-3.5 w-3.5" />
                                Podcast
                            </span>

                            <div>
                                <div aria-hidden="true" className="mb-4 flex h-8 items-end gap-[3px]">
                                    {waveBars.map((h, i) => (
                                        <span key={i} className="w-[3px] rounded-full bg-gold-400/80" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                                <p className="font-serif text-3xl font-medium leading-tight text-white sm:text-4xl">
                                    {podcastConfig.podcastName}
                                </p>
                                <p className="mt-1.5 text-sm text-gold-200/90">
                                    {podcastConfig.host} ile hukuk, sade bir dille
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- Bölüm bilgisi ve oynatıcı --- */}
                    <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-7 lg:p-10">
                        <h2 id="podcast-son-bolum" className="eyebrow">
                            Son bölümü dinleyin
                        </h2>

                        <p className="mt-4 font-serif text-2xl leading-snug text-slate-900 dark:text-slate-100 sm:text-[1.7rem]">
                            {episode.title}
                        </p>

                        <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500 dark:text-slate-400">
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

                        {summary && (
                            <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
                                {summary}
                            </p>
                        )}

                        <div className="mt-6 rounded-xl border border-slate-200/80 bg-ivory-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                            <div className="mb-2 flex items-center gap-2 px-1 text-xs font-semibold text-primary-900 dark:text-slate-200">
                                <Headphones className="h-4 w-4 text-gold-600 dark:text-gold-400" />
                                Hemen dinleyin
                            </div>
                            <audio
                                controls
                                preload="none"
                                src={episode.audio}
                                aria-label={`${podcastConfig.podcastName}: ${episode.title}`}
                                className="h-10 w-full"
                            >
                                Tarayıcınız ses oynatmayı desteklemiyor.
                            </audio>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <Link
                                href={single ? `/blog/${episode.articles[0]}` : "/blog"}
                                className="group inline-flex items-center gap-2 rounded-full bg-primary-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-800 dark:bg-gold-500 dark:text-slate-950 dark:hover:bg-gold-400"
                            >
                                {single ? "Yazıyı okuyun" : "Yazıları okuyun"}
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            {podcastLinks().map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-primary-900 transition-colors duration-300 hover:border-gold-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                >
                                    {link.label}
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                            ))}
                        </div>

                        <p className="mt-5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                            {podcastConfig.aiDisclosure}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
