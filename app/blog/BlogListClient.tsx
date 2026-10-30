"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Calendar,
    Clock,
    ArrowRight,
    Scale,
    Linkedin,
    Search,
    X,
    Users,
    Shield,
    Building,
    Globe,
    FileText,
    Landmark,
    ScrollText,
    BookOpen,
    type LucideIcon,
} from "lucide-react";
import type { PostSummary as BlogPost } from "@/lib/posts";

type Filter = "all" | "ictihat" | "makale" | string;

function normalize(value: string): string {
    return value
        .toLocaleLowerCase("tr-TR")
        .replaceAll("ı", "i")
        .replaceAll("ğ", "g")
        .replaceAll("ü", "u")
        .replaceAll("ş", "s")
        .replaceAll("ö", "o")
        .replaceAll("ç", "c")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

// Kapaklarda kategoriyi simgeleyen ikonlar; çalışma alanı kartlarıyla aynı set.
const categoryIcons: Record<string, LucideIcon> = {
    "Aile Hukuku": Users,
    "Ceza Hukuku": Shield,
    "Ticaret Hukuku": Building,
    "Gayrimenkul Hukuku": Globe,
    "Miras Hukuku": ScrollText,
    "İş Hukuku": FileText,
    Arabuluculuk: Scale,
    "Anayasa Hukuku": Landmark,
};

/**
 * Kapak görseli olmayan yazılar için sade kapak. Başlık ve kategori kartın
 * kendisinde yazdığı için burada tekrar edilmez; yalnızca konu ikonu görünür.
 */
function FallbackCover({ post }: { post: BlogPost }) {
    const Icon = categoryIcons[post.category] ?? BookOpen;
    return (
        <div className="relative isolate h-full w-full overflow-hidden bg-primary-950">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.08]" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-hero-glow" />
            <Icon
                aria-hidden="true"
                strokeWidth={1}
                className="absolute -bottom-6 -right-4 h-36 w-36 text-gold-400/20 transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-105"
            />
            <div aria-hidden="true" className="absolute inset-x-6 bottom-0 h-px rule-gold opacity-40" />
        </div>
    );
}

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
    const [filter, setFilter] = useState<Filter>("all");
    const [query, setQuery] = useState("");

    const categories = useMemo(() => {
        const seen = new Map<string, number>();
        posts.forEach((post) => seen.set(post.category, (seen.get(post.category) ?? 0) + 1));
        return Array.from(seen.entries()).sort((a, b) => b[1] - a[1]);
    }, [posts]);

    const ictihatCount = posts.filter((post) => post.kind === "ictihat").length;

    const visible = useMemo(() => {
        const terms = normalize(query).split(" ").filter(Boolean);

        return posts.filter((post) => {
            const matchesFilter =
                filter === "all"
                    ? true
                    : filter === "ictihat"
                      ? post.kind === "ictihat"
                      : filter === "makale"
                        ? post.kind !== "ictihat"
                        : post.category === filter;

            if (!matchesFilter) return false;
            if (terms.length === 0) return true;

            const haystack = normalize(
                [
                    post.title,
                    post.excerpt,
                    post.category,
                    ...(post.tags ?? []),
                    ...(post.decisions ?? []).map((d) =>
                        [d.court, d.esas, d.karar, d.basvuruNo, d.principle].filter(Boolean).join(" ")
                    ),
                ].join(" ")
            );

            return terms.every((term) => haystack.includes(term));
        });
    }, [posts, filter, query]);

    const chip = (value: Filter, label: string, count: number) => (
        <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                filter === value
                    ? "bg-primary-900 border-primary-900 text-white shadow-sm dark:bg-gold-500 dark:border-gold-500 dark:text-slate-950"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-gold-500 dark:hover:border-gold-500"
            }`}
        >
            {label} <span className="opacity-80">({count})</span>
        </button>
    );

    return (
        <div>
            <div className="relative mb-6 max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Yazı, konu veya karar künyesi arayın (ör. tahliye taahhüdü, TMK 229)"
                    aria-label="Blog yazıları içinde ara"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-3.5 pl-12 pr-12 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500/60 focus:border-transparent transition-colors"
                />
                {query.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setQuery("")}
                        aria-label="Aramayı temizle"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {chip("all", "Tümü", posts.length)}
                {ictihatCount > 0 && chip("ictihat", "İçtihat Notları", ictihatCount)}
                {chip("makale", "Rehber Yazılar", posts.length - ictihatCount)}
            </div>

            <div className="flex flex-wrap gap-2 mb-10">
                {categories.map(([category, count]) => chip(category, category, count))}
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8" aria-live="polite">
                {visible.length} yazı listeleniyor
            </p>

            {visible.length === 0 ? (
                <div className="text-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-12">
                    <h2 className="font-serif text-xl font-medium text-slate-900 dark:text-slate-100 mb-2">
                        Bu filtreye uygun yazı bulunamadı
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Aramanızı sadeleştirebilir veya filtreyi &ldquo;Tümü&rdquo; olarak değiştirebilirsiniz.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {visible.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.id}`}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/60 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900 dark:hover:border-gold-500/40"
                        >
                            <div className="relative h-32 overflow-hidden bg-slate-200 dark:bg-slate-800 sm:h-40">
                                {post.imageUrl ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                        src={post.imageUrl}
                                        alt=""
                                        aria-hidden="true"
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <FallbackCover post={post} />
                                )}
                                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                                    <span className="rounded-full bg-primary-950/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white ring-1 ring-white/10 backdrop-blur-sm">
                                        {post.category}
                                    </span>
                                    {post.kind === "ictihat" && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-950">
                                            <Scale className="h-3 w-3" /> İçtihat
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-grow flex-col p-6">
                                <div className="mb-3 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <time dateTime={post.dateISO}>{post.date}</time>
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5" />
                                        {post.readTime}
                                    </span>
                                </div>

                                <h2 className="mb-3 line-clamp-3 font-serif text-xl leading-snug text-slate-900 transition-colors group-hover:text-primary-800 dark:text-slate-100 dark:group-hover:text-gold-300">
                                    {post.title}
                                </h2>

                                <p className="mb-4 line-clamp-3 flex-grow text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    {post.excerpt}
                                </p>

                                {post.decisions && post.decisions.length > 0 && (
                                    <p className="mb-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
                                        <Scale className="h-3 w-3 text-gold-600 dark:text-gold-400" />
                                        {post.decisions.length} karar incelendi
                                    </p>
                                )}

                                {post.source?.platform === "linkedin" && (
                                    <p className="text-xs text-slate-500 dark:text-slate-500 mb-3 inline-flex items-center gap-1">
                                        <Linkedin className="w-3 h-3" /> LinkedIn paylaşımından
                                    </p>
                                )}

                                <span className="mt-auto flex items-center border-t border-slate-200/80 pt-4 text-sm font-semibold text-primary-800 dark:border-slate-800 dark:text-gold-400">
                                    Devamını okuyun
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
