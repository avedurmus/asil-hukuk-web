import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostSummary } from "@/lib/posts";

/**
 * Ana sayfada, Hero'nun hemen altında blogun son eklenen yazılarını gösteren şerit.
 * En son yayım gününün yazıları "Yeni" olarak işaretlenir; tarih derleme
 * zamanına değil yazıların kendi tarihine bakılarak belirlenir.
 */
export default function LatestPostsStrip({ posts }: { posts: PostSummary[] }) {
    if (posts.length === 0) return null;
    const newestDate = posts[0].dateISO;

    return (
        <section aria-labelledby="son-eklenenler" className="border-t border-slate-200/70 bg-ivory-100 py-10 dark:border-slate-800 dark:bg-slate-950">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <h2 id="son-eklenenler" className="eyebrow">
                        Hukuk Blogu&apos;nda son eklenenler
                    </h2>
                    <Link
                        href="/blog"
                        className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary-900 hover:text-gold-700 dark:text-slate-100 dark:hover:text-gold-400"
                    >
                        Tüm yazılar
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>

                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {posts.map((post, i) => (
                        // Mobilde yalnızca en yeni iki yazı; diğerleri "Tüm yazılar" bağlantısında.
                        <li key={post.id} className={i >= 2 ? "hidden sm:block" : undefined}>
                            <Link
                                href={`/blog/${post.id}`}
                                className="group flex h-full flex-col rounded-xl border border-slate-200/80 bg-white p-4 transition-colors duration-300 hover:border-gold-500/60 dark:border-slate-800 dark:bg-slate-900"
                            >
                                <span className="flex items-center gap-2 text-xs">
                                    {post.dateISO === newestDate && (
                                        <span className="rounded-full bg-gold-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white dark:text-slate-950">
                                            Yeni
                                        </span>
                                    )}
                                    <span className="font-semibold uppercase tracking-[0.12em] text-gold-700 dark:text-gold-400">
                                        {post.kind === "ictihat" ? "İçtihat Notu" : post.category}
                                    </span>
                                </span>
                                <span className="mt-2 flex-grow font-serif text-[17px] leading-snug text-slate-900 transition-colors group-hover:text-primary-800 dark:text-slate-100 dark:group-hover:text-gold-300">
                                    {post.title}
                                </span>
                                <span className="mt-3 text-xs text-slate-500">{post.date}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
