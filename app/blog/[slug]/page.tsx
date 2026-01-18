import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import { Calendar, Clock, ArrowLeft, Tag, Share2, Linkedin, Facebook, Twitter } from "lucide-react";
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

                            {/* --- AUTHOR BIO & SHARE --- */}
                            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-slate-100">
                                {/* Author Bio */}
                                <div className="md:col-span-2 flex items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-2xl">
                                            ED
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">Av. Emre Durmuş</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                            Asil Hukuk Bürosu kurucusu. 20 yılı aşkın tecrübesiyle Aile, Ceza ve Gayrimenkul hukuku alanlarında müvekkillerine hizmet vermektedir.
                                        </p>
                                        <Link href="/hakkimizda" className="text-primary-600 font-medium text-sm hover:underline">
                                            Detaylı Profil →
                                        </Link>
                                    </div>
                                </div>

                                {/* Share & Contact */}
                                <div className="md:col-span-1 bg-slate-50 p-6 rounded-xl border border-slate-100">
                                    <h4 className="font-bold text-sm text-slate-900 mb-4 flex items-center uppercase tracking-wider">
                                        <Share2 className="w-4 h-4 mr-2" /> Paylaş
                                    </h4>
                                    <div className="flex gap-3 mb-6">
                                        <button className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:border-primary-500 hover:text-primary-600 transition-colors">
                                            <Linkedin className="w-5 h-5" />
                                        </button>
                                        <button className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:border-primary-500 hover:text-primary-600 transition-colors">
                                            <Twitter className="w-5 h-5" />
                                        </button>
                                        <button className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:border-primary-500 hover:text-primary-600 transition-colors">
                                            <Facebook className="w-5 h-5" />
                                        </button>
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
