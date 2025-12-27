import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hukuk Blogu | Asil Hukuk - Güncel Hukuki Makaleler",
    description: "Boşanma, ceza, iş ve gayrimenkul hukuku alanında güncel makaleler, yargıtay kararları ve hukuki rehberler.",
};

export default function BlogIndexPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-grow pt-20">
                <div className="bg-slate-900 text-white py-20 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Hukuk Blogu</h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Hukuki konularda güncel bilgiler, rehberler ve yargı dünyasından gelişmeler.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.id}`}
                                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-slate-100 overflow-hidden flex flex-col"
                            >
                                <div className="h-48 overflow-hidden relative bg-slate-200">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-primary-900/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center text-slate-500 text-sm mb-3 space-x-4">
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-slate-600 mb-4 line-clamp-3 text-sm flex-grow">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center text-primary-600 font-medium text-sm mt-auto pt-4 border-t border-slate-100">
                                        Devamını Oku <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
