import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogListClient from "./BlogListClient";
import { blogPosts } from "@/data/blogPosts";
import { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Hukuk Blogu - İçtihat Notları ve Güncel Makaleler",
    description:
        "Yargıtay ve Anayasa Mahkemesi kararları üzerine içtihat notları; boşanma, iş, ceza, kira ve ticaret hukuku alanında güncel rehber yazılar.",
    path: "/blog",
    socialTitle: "Hukuk Blogu | Asil Hukuk",
});

export default function BlogIndexPage() {
    const sortedPosts = [...blogPosts].sort((a, b) => b.dateISO.localeCompare(a.dateISO));
    const ictihatCount = sortedPosts.filter((post) => post.kind === "ictihat").length;

    const itemListLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Asil Hukuk — Hukuk Blogu",
        itemListElement: sortedPosts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `https://asilhukuk.net/blog/${post.id}`,
            name: post.title,
        })),
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
            <Header />
            <main className="flex-grow pt-20">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(breadcrumbJsonLd([{ name: "Hukuk Blogu", path: "/blog" }])),
                    }}
                />

                <div className="bg-slate-900 dark:bg-slate-900/60 text-white py-20 px-4 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Hukuk Blogu</h1>
                        <p className="text-xl text-slate-300 dark:text-slate-400 max-w-3xl mx-auto">
                            {ictihatCount} içtihat notu ve {sortedPosts.length - ictihatCount} rehber yazı.
                            Kararlar künyeleriyle birlikte verilir, ilkeler kaynağından aktarılır.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <BlogListClient posts={sortedPosts} />
                </div>
            </main>
            <Footer />
        </div>
    );
}
