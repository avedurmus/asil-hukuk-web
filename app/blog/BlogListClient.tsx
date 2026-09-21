"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Scale, Linkedin, Search, X } from "lucide-react";
import type { BlogPost } from "@/data/blogPosts";

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

/** Kapak görseli olmayan yazılar için tipografik kapak. */
function FallbackCover({ post }: { post: BlogPost }) {
    return (
        <div className="w-full h-full bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 flex flex-col justify-center px-6">
            <span className="text-gold-400 text-[0.65rem] font-semibold tracking-[0.2em] uppercase mb-2">
                {post.category}
            </span>
            <span className="text-white font-serif text-xl leading-snug line-clamp-3">
                {post.title}
            </span>
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
                    ? "bg-primary-600 border-primary-600 text-white shadow-sm"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-400 dark:hover:border-primary-600"
            }`}
        >
            {label} <span className="opacity-70">({count})</span>
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
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-3.5 pl-12 pr-12 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
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
                    <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                        Bu filtreye uygun yazı bulunamadı
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Aramanızı sadeleştirebilir veya filtreyi &ldquo;Tümü&rdquo; olarak değiştirebilirsiniz.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visible.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.id}`}
                            className="group bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-card-hover transition-all border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col"
                        >
                            <div className="h-48 overflow-hidden relative bg-slate-200 dark:bg-slate-800">
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
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-primary-900/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                                        {post.category}
                                    </span>
                                    {post.kind === "ictihat" && (
                                        <span className="bg-gold-500/95 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm inline-flex items-center gap-1">
                                            <Scale className="w-3 h-3" /> İçtihat
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-3 space-x-4">
                                    <span className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        <time dateTime={post.dateISO}>{post.date}</time>
                                    </span>
                                    <span className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {post.readTime}
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h2>

                                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 text-sm flex-grow">
                                    {post.excerpt}
                                </p>

                                {post.decisions && post.decisions.length > 0 && (
                                    <p className="text-xs text-slate-500 dark:text-slate-500 mb-3">
                                        {post.decisions.length} karar incelendi
                                    </p>
                                )}

                                {post.source?.platform === "linkedin" && (
                                    <p className="text-xs text-slate-500 dark:text-slate-500 mb-3 inline-flex items-center gap-1">
                                        <Linkedin className="w-3 h-3" /> LinkedIn paylaşımından
                                    </p>
                                )}

                                <span className="flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                                    Devamını Oku
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
