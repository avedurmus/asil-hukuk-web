import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import { Calendar, Clock, ArrowLeft, Tag, Share2, Linkedin, Facebook, Twitter } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";

interface Props {
    params: {
        slug: string;
    }
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = blogPosts.find((p) => p.id === params.slug);
    if (!post) return { title: "Yazı Bulunamadı" };

    return {
        title: post.title,
        description: post.excerpt,
        alternates: {
            canonical: `/blog/${params.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://asilhukuk.net/blog/${params.slug}`,
            type: "article",
            publishedTime: post.dateISO,
            authors: ["Av. Emre Durmuş"],
            section: post.category,
            images: [
                {
                    url: post.imageUrl,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
        },
    };
}

export default function BlogPostPage({ params }: Props) {
    const post = blogPosts.find((p) => p.id === params.slug);

    if (!post) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": `https://asilhukuk.net${post.imageUrl}`,
        "datePublished": post.dateISO,
        "dateModified": post.dateISO,
        "inLanguage": "tr-TR",
        "author": {
            "@type": "Person",
            "name": "Av. Emre Durmuş",
            "url": "https://asilhukuk.net/hakkimizda"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Asil Hukuk Bürosu",
            "logo": {
                "@type": "ImageObject",
                "url": "https://asilhukuk.net/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://asilhukuk.net/blog/${post.id}`
        }
    };

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://asilhukuk.net" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://asilhukuk.net/blog" },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://asilhukuk.net/blog/${post.id}` }
        ]
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
            <Header />
            <main className="flex-grow pt-20">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
                />
                <article>
                    {/* Article Header */}
                    <div className="bg-slate-900 dark:bg-slate-900/60 text-white py-16 px-4 transition-colors duration-300">
                        <div className="max-w-3xl mx-auto">
                            <Link href="/blog" className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition-colors font-medium text-sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Bloga Dön
                            </Link>
                            <div className="flex items-center gap-2 mb-6">
                                <span className="px-3 py-1 bg-primary-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {post.category}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex items-center text-slate-300 text-sm space-x-6">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <time dateTime={post.dateISO}>{post.date}</time>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {post.readTime}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="max-w-3xl mx-auto px-4 py-12 -mt-10 relative z-10">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 transition-colors duration-300">
                            {/* Featured Image */}
                            <div className="mb-10 rounded-xl overflow-hidden shadow-sm">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            <div
                                className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-primary-600 dark:prose-a:text-primary-400 hover:prose-a:text-primary-700"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* --- AUTHOR BIO & SHARE --- */}
                            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-slate-100 dark:border-slate-800">
                                {/* Author Bio */}
                                <div className="md:col-span-2 flex items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 rounded-full overflow-hidden relative border border-slate-200 dark:border-slate-800">
                                            <Image
                                                src="/images/emre-durmus.jpg"
                                                alt="Av. Emre Durmuş"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Av. Emre Durmuş</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                                            Asil Hukuk Bürosu kurucusu. 20 yılı aşkın tecrübesiyle Aile, Ceza ve Gayrimenkul hukuku alanlarında müvekkillerine hizmet vermektedir.
                                        </p>
                                        <Link href="/hakkimizda" className="text-primary-600 dark:text-primary-400 font-medium text-sm hover:underline">
                                            Detaylı Profil →
                                        </Link>
                                    </div>
                                </div>

                                {/* Share & Contact */}
                                <div className="md:col-span-1 bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-4 flex items-center uppercase tracking-wider">
                                        <Share2 className="w-4 h-4 mr-2" /> Paylaş
                                    </h4>
                                    <div className="flex gap-3 mb-6">
                                        <a
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=https://asilhukuk.net/blog/${post.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                                            aria-label="LinkedIn'de Paylaş"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={`https://twitter.com/intent/tweet?url=https://asilhukuk.net/blog/${post.id}&text=${encodeURIComponent(post.title)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                                            aria-label="X'te Paylaş"
                                        >
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=https://asilhukuk.net/blog/${post.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                                            aria-label="Facebook'ta Paylaş"
                                        >
                                            <Facebook className="w-5 h-5" />
                                        </a>
                                    </div>
                                    <div>
                                        <Link
                                            href="/iletisim"
                                            className="block w-full py-2.5 bg-primary-600 text-white text-center rounded-lg font-medium hover:bg-primary-700 transition-colors text-sm"
                                        >
                                            Hukuki Destek Al
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
