import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";
import type { BlogPost } from "@/data/blogPosts";

/**
 * Ana sayfada, hero'nun hemen altında günün makalelerini tanıtan ince şerit.
 * Yalnızca başlık, alan ve okuma süresi gösterilir; ayrıntı yazı sayfasındadır.
 */
export default function DailyArticles({ posts }: { posts: BlogPost[] }) {
    if (posts.length === 0) return null;

    return (
        <section aria-labelledby="gunun-makaleleri" className="border-y border-slate-200/70 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-8">
                <div className="flex shrink-0 items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-900 text-gold-300 dark:bg-slate-800">
                        <Newspaper className="h-4 w-4" />
                    </span>
                    <div className="leading-tight">
                        <h2 id="gunun-makaleleri" className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700 dark:text-gold-400">
                            Günün makaleleri
                        </h2>
                        <time dateTime={posts[0].dateISO} className="text-xs text-slate-500">
                            {posts[0].date}
                        </time>
                    </div>
                </div>

                <ul className="grid flex-grow grid-cols-1 gap-3 md:grid-cols-2">
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Link
                                href={`/blog/${post.id}`}
                                className="group flex h-full items-center gap-3 rounded-2xl border border-slate-200/80 bg-ivory-50 px-4 py-3 transition-all duration-300 hover:border-gold-500/60 hover:shadow-card dark:border-slate-800 dark:bg-slate-950"
                            >
                                <span className="min-w-0 flex-grow">
                                    <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                                        {post.category} · {post.readTime}
                                    </span>
                                    <span className="mt-0.5 line-clamp-2 font-serif text-base leading-snug text-slate-900 transition-colors group-hover:text-primary-800 dark:text-slate-100 dark:group-hover:text-gold-300">
                                        {post.title}
                                    </span>
                                </span>
                                <ArrowUpRight className="h-4 w-4 shrink-0 text-gold-600 transition-transform duration-300 group-hover:rotate-45" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
