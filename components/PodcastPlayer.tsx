import { Headphones, ExternalLink } from "lucide-react";
import { formatDuration, podcastConfig, type PodcastEpisode } from "@/lib/podcast";

/** Makale sayfasında, yazının anlatıldığı günlük podcast bölümünü çalar. */
export default function PodcastPlayer({ episode }: { episode: PodcastEpisode }) {
    const duration = formatDuration(episode.durationSec);
    return (
        <section
            aria-labelledby="podcast-bolumu"
            className="mb-10 rounded-2xl border border-gold-500/30 bg-ivory-50 dark:bg-slate-950/50 p-5 sm:p-6"
        >
            <h2
                id="podcast-bolumu"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700 dark:text-gold-400 mb-2 flex items-center gap-2"
            >
                <Headphones className="w-4 h-4" /> Bu yazıyı dinleyin
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                <span className="font-semibold">{podcastConfig.podcastName}</span> · {episode.title}
                {duration && <span className="text-slate-500 dark:text-slate-400"> · {duration}</span>}
            </p>
            <audio controls preload="none" src={episode.audio} className="w-full">
                Tarayıcınız ses oynatmayı desteklemiyor.
            </audio>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                {podcastConfig.aiDisclosure}
                {podcastConfig.spotifyShowUrl && (
                    <>
                        {" "}
                        <a
                            href={podcastConfig.spotifyShowUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-primary-800 dark:text-gold-400 hover:underline font-medium"
                        >
                            Spotify&apos;da dinleyin
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </>
                )}
            </p>
        </section>
    );
}
