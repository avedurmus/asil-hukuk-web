"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, X, ArrowRight } from "lucide-react";
import { faqCategories, faqs, type FAQCategoryId } from "@/data/faq";
import { blogPosts } from "@/data/blogPosts";

/** Türkçe karakterleri ve noktalama işaretlerini arama için sadeleştirir. */
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

const postTitles = new Map(blogPosts.map((post) => [post.id, post.title]));

export default function FAQClient() {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<FAQCategoryId | "all">("all");

    const searchIndex = useMemo(
        () =>
            faqs.map((faq) => ({
                id: faq.id,
                haystack: normalize(
                    [faq.question, faq.answer, faq.category, ...(faq.keywords ?? [])].join(" ")
                ),
            })),
        []
    );

    const visible = useMemo(() => {
        const terms = normalize(query).split(" ").filter(Boolean);
        const matchingIds = new Set(
            searchIndex
                .filter((entry) => terms.every((term) => entry.haystack.includes(term)))
                .map((entry) => entry.id)
        );

        return faqs.filter(
            (faq) =>
                matchingIds.has(faq.id) &&
                (activeCategory === "all" || faq.category === activeCategory)
        );
    }, [query, activeCategory, searchIndex]);

    // Arama sonuçlarını kategori başlıkları altında toplar; boş kategoriler düşer.
    const grouped = useMemo(
        () =>
            faqCategories
                .map((category) => ({
                    category,
                    items: visible.filter((faq) => faq.category === category.id),
                }))
                .filter((group) => group.items.length > 0),
        [visible]
    );

    const countFor = (categoryId: FAQCategoryId) =>
        faqs.filter((faq) => faq.category === categoryId).length;

    return (
        <div>
            {/* Arama kutusu */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Soru veya anahtar kelime arayın (ör. kıdem tazminatı, tahliye, velayet)"
                    aria-label="Sıkça sorulan sorular içinde ara"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 pl-12 pr-12 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
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

            {/* Kategori filtreleri */}
            <div className="flex flex-wrap gap-2 mb-10">
                <button
                    type="button"
                    onClick={() => setActiveCategory("all")}
                    aria-pressed={activeCategory === "all"}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                        activeCategory === "all"
                            ? "bg-primary-600 border-primary-600 text-white shadow-sm"
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-400 dark:hover:border-primary-600"
                    }`}
                >
                    Tümü <span className="opacity-70">({faqs.length})</span>
                </button>
                {faqCategories.map((category) => (
                    <button
                        key={category.id}
                        type="button"
                        onClick={() => setActiveCategory(category.id)}
                        aria-pressed={activeCategory === category.id}
                        title={category.description}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                            activeCategory === category.id
                                ? "bg-primary-600 border-primary-600 text-white shadow-sm"
                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-400 dark:hover:border-primary-600"
                        }`}
                    >
                        {category.label} <span className="opacity-70">({countFor(category.id)})</span>
                    </button>
                ))}
            </div>

            {/* Sonuç sayacı */}
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6" aria-live="polite">
                {visible.length} soru listeleniyor
                {query.trim().length > 0 && <> — &ldquo;{query.trim()}&rdquo; için</>}
            </p>

            {grouped.length === 0 ? (
                <div className="text-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-12">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                        Aramanıza uygun bir soru bulunamadı
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Farklı bir kelime deneyebilir veya durumunuzu doğrudan bize iletebilirsiniz.
                    </p>
                    <Link
                        href="/iletisim"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-md text-white bg-primary-600 hover:bg-primary-700 font-medium transition-colors"
                    >
                        Avukata Sor
                    </Link>
                </div>
            ) : (
                <div className="space-y-12">
                    {grouped.map(({ category, items }) => (
                        <section key={category.id} aria-labelledby={`kategori-${normalize(category.id).replace(/\s/g, "-")}`}>
                            <div className="mb-4">
                                <h2
                                    id={`kategori-${normalize(category.id).replace(/\s/g, "-")}`}
                                    className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100"
                                >
                                    {category.label}
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    {category.description}
                                </p>
                            </div>

                            <div className="space-y-4">
                                {items.map((faq) => {
                                    const relatedTitle = faq.relatedPostId
                                        ? postTitles.get(faq.relatedPostId)
                                        : undefined;

                                    return (
                                        <div
                                            key={faq.id}
                                            id={faq.id}
                                            className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden scroll-mt-28 transition-colors"
                                        >
                                            <details className="group" open={query.trim().length > 0}>
                                                <summary className="flex justify-between items-start gap-4 cursor-pointer list-none p-6 text-slate-900 dark:text-slate-100 hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
                                                    <span className="text-lg font-semibold leading-snug">
                                                        {faq.question}
                                                    </span>
                                                    <ChevronDown className="w-5 h-5 shrink-0 mt-1 transition-transform group-open:rotate-180 text-slate-400" />
                                                </summary>
                                                <div className="px-6 pb-6 border-t border-slate-100 dark:border-slate-800/60">
                                                    <div className="pt-4 space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                                                        {faq.answer.split("\n\n").map((paragraph, index) => (
                                                            <p key={index}>{paragraph}</p>
                                                        ))}
                                                    </div>

                                                    {relatedTitle && faq.relatedPostId && (
                                                        <Link
                                                            href={`/blog/${faq.relatedPostId}`}
                                                            className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                                                        >
                                                            Ayrıntılı yazı: {relatedTitle}
                                                            <ArrowRight className="w-4 h-4" />
                                                        </Link>
                                                    )}
                                                </div>
                                            </details>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
}
