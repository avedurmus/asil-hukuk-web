import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts, type BlogPost } from "@/data/blogPosts";
import { faqs } from "@/data/faq";
import {
    Calendar,
    Clock,
    ArrowLeft,
    ArrowRight,
    Share2,
    Linkedin,
    Facebook,
    Twitter,
    Scale,
    BookOpen,
    ExternalLink,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { breadcrumbJsonLd, DEFAULT_OG_IMAGE, ORGANIZATION_ID, pageMetadata, SITE_URL } from "@/lib/seo";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.id,
    }));
}

/** Paylaşım ve şema alanlarında kullanılacak mutlak görsel adresi. */
function coverImage(post: BlogPost): string {
    return `https://asilhukuk.net${post.imageUrl ?? "/images/justice-symbol.png"}`;
}

/**
 * Paylaşım kartı görseli. Facebook, LinkedIn ve X önizlemelerinde SVG
 * gösterilmediği için SVG kapaklı yazılarda varsayılan görsel kullanılır.
 */
function socialImage(post: BlogPost) {
    if (!post.imageUrl || post.imageUrl.endsWith(".svg")) return DEFAULT_OG_IMAGE;
    return { url: post.imageUrl, alt: post.title };
}

/** Kararın "E. 2013/11078, K. 2014/3241" biçimindeki künyesi. */
function decisionLabel(decision: NonNullable<BlogPost["decisions"]>[number]): string {
    if (decision.basvuruNo) return `B. No: ${decision.basvuruNo}`;
    return [decision.esas && `E. ${decision.esas}`, decision.karar && `K. ${decision.karar}`]
        .filter(Boolean)
        .join(", ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = blogPosts.find((p) => p.id === params.slug);
    if (!post) return { title: "Yazı Bulunamadı" };

    return pageMetadata({
        title: post.title,
        description: post.excerpt,
        path: `/blog/${post.id}`,
        socialTitle: post.title,
        keywords: post.tags,
        images: [socialImage(post)],
        openGraph: {
            type: "article",
            publishedTime: post.dateISO,
            authors: [`${SITE_URL}/hakkimizda`],
            section: post.category,
            tags: post.tags,
        },
    });
}

export default function BlogPostPage({ params }: Props) {
    const post = blogPosts.find((p) => p.id === params.slug);

    if (!post) {
        notFound();
    }

    // Aynı kategorideki diğer yazılar; yetmezse en yeni yazılarla tamamlanır.
    const related = [
        ...blogPosts.filter((p) => p.id !== post.id && p.category === post.category),
        ...blogPosts.filter((p) => p.id !== post.id && p.category !== post.category),
    ]
        .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
        .slice(0, 3);

    const relatedFaqs = faqs.filter((faq) => faq.relatedPostId === post.id).slice(0, 4);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": post.kind === "ictihat" ? "ScholarlyArticle" : "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: Array.from(new Set([coverImage(post), `${SITE_URL}${socialImage(post).url}`])),
        datePublished: post.dateISO,
        dateModified: post.dateISO,
        inLanguage: "tr-TR",
        keywords: post.tags?.join(", "),
        author: {
            "@type": "Person",
            "@id": `${SITE_URL}/hakkimizda#emre-durmus`,
            name: "Av. Emre Durmuş",
            url: "https://asilhukuk.net/hakkimizda",
        },
        publisher: {
            "@type": "Organization",
            "@id": ORGANIZATION_ID,
            name: "Asil Hukuk Bürosu",
            logo: {
                "@type": "ImageObject",
                url: "https://asilhukuk.net/logo.png",
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://asilhukuk.net/blog/${post.id}`,
        },
        ...(post.decisions && post.decisions.length > 0
            ? {
                  citation: post.decisions.map((decision) =>
                      [decision.court, decisionLabel(decision), decision.date]
                          .filter(Boolean)
                          .join(", ")
                  ),
              }
            : {}),
    };

    const breadcrumbLd = breadcrumbJsonLd([
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.id}` },
    ]);

    const shareUrl = `https://asilhukuk.net/blog/${post.id}`;

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
                    {/* Başlık alanı */}
                    <div className="bg-slate-900 dark:bg-slate-900/60 text-white py-16 px-4 transition-colors duration-300">
                        <div className="max-w-3xl mx-auto">
                            <Link
                                href="/blog"
                                className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition-colors font-medium text-sm"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Bloga Dön
                            </Link>

                            <div className="flex flex-wrap items-center gap-2 mb-6">
                                <span className="px-3 py-1 bg-primary-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {post.category}
                                </span>
                                {post.kind === "ictihat" && (
                                    <span className="px-3 py-1 bg-gold-500 text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
                                        <Scale className="w-3 h-3" /> İçtihat Notu
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center text-slate-300 text-sm gap-x-6 gap-y-2">
                                <span className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <time dateTime={post.dateISO}>{post.date}</time>
                                </span>
                                <span className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {post.readTime}
                                </span>
                                <span>Av. Emre Durmuş</span>
                            </div>
                        </div>
                    </div>

                    {/* Gövde */}
                    <div className="max-w-3xl mx-auto px-4 py-12 -mt-10 relative z-10">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 md:p-12 transition-colors duration-300">
                            {post.imageUrl && (
                                <div className="mb-10 rounded-xl overflow-hidden shadow-sm bg-slate-100 dark:bg-slate-800">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={post.imageUrl}
                                        alt=""
                                        aria-hidden="true"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            )}

                            {post.source?.platform === "linkedin" && (
                                <p className="mb-8 text-sm text-slate-500 dark:text-slate-400 inline-flex items-center gap-2">
                                    <Linkedin className="w-4 h-4" />
                                    Bu yazı LinkedIn paylaşımından derlenmiştir
                                    {post.source.url && (
                                        <a
                                            href={post.source.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1"
                                        >
                                            özgün paylaşım
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </p>
                            )}

                            {/* İncelenen kararlar */}
                            {post.decisions && post.decisions.length > 0 && (
                                <section
                                    aria-labelledby="incelenen-kararlar"
                                    className="mb-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-6"
                                >
                                    <h2
                                        id="incelenen-kararlar"
                                        className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2"
                                    >
                                        <Scale className="w-4 h-4" /> İncelenen Kararlar
                                    </h2>
                                    <ul className="space-y-4">
                                        {post.decisions.map((decision, index) => (
                                            <li
                                                key={index}
                                                className="border-l-2 border-gold-500 pl-4 text-sm"
                                            >
                                                <p className="font-semibold text-slate-900 dark:text-slate-100">
                                                    {decision.court}
                                                </p>
                                                <p className="text-slate-600 dark:text-slate-400">
                                                    {[decisionLabel(decision), decision.date]
                                                        .filter(Boolean)
                                                        .join(" · ")}
                                                </p>
                                                {decision.principle && (
                                                    <p className="text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                                                        {decision.principle}
                                                    </p>
                                                )}
                                                {decision.url && (
                                                    <a
                                                        href={decision.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 mt-2 text-primary-600 dark:text-primary-400 hover:underline font-medium"
                                                    >
                                                        Karar metni
                                                        <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            <div
                                className="article-body"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Kaynaklar */}
                            {post.sources && post.sources.length > 0 && (
                                <section
                                    aria-labelledby="kaynaklar"
                                    className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800"
                                >
                                    <h2
                                        id="kaynaklar"
                                        className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2"
                                    >
                                        <BookOpen className="w-4 h-4" /> Mevzuat ve Kaynaklar
                                    </h2>
                                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 list-disc pl-5">
                                        {post.sources.map((source, index) => (
                                            <li key={index}>
                                                {source.url ? (
                                                    <a
                                                        href={source.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary-600 dark:text-primary-400 hover:underline"
                                                    >
                                                        {source.label}
                                                    </a>
                                                ) : (
                                                    source.label
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Etiketler */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="mt-8 flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* İlgili SSS */}
                            {relatedFaqs.length > 0 && (
                                <section
                                    aria-labelledby="ilgili-sorular"
                                    className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800"
                                >
                                    <h2
                                        id="ilgili-sorular"
                                        className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4"
                                    >
                                        Bu Konudaki Sık Sorulan Sorular
                                    </h2>
                                    <ul className="space-y-2">
                                        {relatedFaqs.map((faq) => (
                                            <li key={faq.id}>
                                                <Link
                                                    href={`/sss#${faq.id}`}
                                                    className="text-primary-700 dark:text-primary-400 hover:underline text-sm inline-flex items-center gap-1.5"
                                                >
                                                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                                                    {faq.question}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Yazar ve paylaşım */}
                            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-slate-100 dark:border-slate-800">
                                <div className="md:col-span-2 flex items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 rounded-full overflow-hidden relative border border-slate-200 dark:border-slate-800">
                                            <Image
                                                src="/images/emre-durmus.jpg"
                                                alt="Av. Emre Durmuş"
                                                fill
                                                sizes="64px"
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                                            Av. Emre Durmuş
                                        </h2>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                                            Asil Hukuk Bürosu kurucusu. 20 yılı aşkın tecrübesiyle Aile, Ceza
                                            ve Gayrimenkul hukuku alanlarında müvekkillerine hizmet
                                            vermektedir.
                                        </p>
                                        <Link
                                            href="/hakkimizda"
                                            className="text-primary-600 dark:text-primary-400 font-medium text-sm hover:underline"
                                        >
                                            Detaylı Profil →
                                        </Link>
                                    </div>
                                </div>

                                <div className="md:col-span-1 bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                                    <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-4 flex items-center uppercase tracking-wider">
                                        <Share2 className="w-4 h-4 mr-2" /> Paylaş
                                    </h2>
                                    <div className="flex gap-3 mb-6">
                                        <a
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                                            aria-label="LinkedIn'de Paylaş"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                                            aria-label="X'te Paylaş"
                                        >
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                                            aria-label="Facebook'ta Paylaş"
                                        >
                                            <Facebook className="w-5 h-5" />
                                        </a>
                                    </div>
                                    <Link
                                        href="/iletisim"
                                        className="block w-full py-2.5 bg-primary-600 text-white text-center rounded-lg font-medium hover:bg-primary-700 transition-colors text-sm"
                                    >
                                        Hukuki Destek Al
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* İlgili yazılar */}
                        {related.length > 0 && (
                            <section aria-labelledby="ilgili-yazilar" className="mt-16">
                                <h2
                                    id="ilgili-yazilar"
                                    className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-6"
                                >
                                    İlgili Yazılar
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {related.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/blog/${item.id}`}
                                            className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-5 hover:shadow-card-hover transition-all"
                                        >
                                            <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                                                {item.category}
                                            </span>
                                            <h3 className="mt-2 font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                                {item.title}
                                            </h3>
                                            <span className="mt-3 block text-xs text-slate-500 dark:text-slate-400">
                                                {item.readTime}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
