import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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
        title: `${post.title} | Asil Hukuk Blog`,
        description: post.excerpt,
    };
}

export default function BlogPostPage({ params }: Props) {
    const post = blogPosts.find((p) => p.id === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-grow pt-20">
                <article>
                    {/* Article Header */}
                    <div className="bg-slate-900 text-white py-16 px-4">
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
                                    {post.date}
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
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12">
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
                                className="prose prose-slate prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-primary-600 hover:prose-a:text-primary-700"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
