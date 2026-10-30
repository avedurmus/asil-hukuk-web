import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import BlogListClient from "./BlogListClient";
import { getAllPosts, toSummary } from "@/lib/posts";
import { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Hukuk Blogu: Güncel Yargıtay Kararları ve Rehberler",
    description:
        "Yargıtay ve Anayasa Mahkemesi kararları üzerine içtihat notları; boşanma, iş, ceza, kira ve ticaret hukuku alanında güncel rehber yazılar.",
    path: "/blog",
    socialTitle: "Hukuk Blogu | Asil Hukuk",
});

export default function BlogIndexPage() {
    const sortedPosts = getAllPosts();
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
        <div className="min-h-screen bg-ivory-100 dark:bg-slate-950 flex flex-col transition-colors duration-300">
            <Header />
            <main className="flex-grow">
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

                <PageHero
                    eyebrow="Yayınlar"
                    title="Hukuk Blogu"
                    description={
                        <>
                            {ictihatCount} içtihat notu ve {sortedPosts.length - ictihatCount} rehber yazı.
                            Kararlar künyeleriyle birlikte verilir, ilkeler kaynağından aktarılır.
                        </>
                    }
                />

                <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <BlogListClient posts={sortedPosts.map(toSummary)} />
                </div>
            </main>
            <Footer />
        </div>
    );
}
