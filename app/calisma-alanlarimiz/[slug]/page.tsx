import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blogPosts";
import { faqs } from "@/data/faq";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { breadcrumbJsonLd, ORGANIZATION_ID, pageMetadata, SITE_URL } from "@/lib/seo";

interface Props {
    params: {
        slug: string;
    }
}

export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const service = services.find((s) => s.id === params.slug);
    if (!service) return { title: "Sayfa Bulunamadı" };

    return pageMetadata({
        title: service.seoTitle,
        description: service.seoDescription,
        path: `/calisma-alanlarimiz/${service.id}`,
    });
}

export default function ServiceDetailPage({ params }: Props) {
    const service = services.find((s) => s.id === params.slug);

    if (!service) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "serviceType": service.title,
        "description": service.seoDescription,
        "url": `${SITE_URL}/calisma-alanlarimiz/${service.id}`,
        // Firma bilgileri kök düzendeki LegalService şemasında; burada kimliğiyle anılır.
        "provider": { "@id": ORGANIZATION_ID },
        "areaServed": [
            { "@type": "AdministrativeArea", "name": "Kartal" },
            { "@type": "AdministrativeArea", "name": "Pendik" },
            { "@type": "AdministrativeArea", "name": "Maltepe" },
            { "@type": "City", "name": "İstanbul" }
        ]
    };

    const breadcrumbLd = breadcrumbJsonLd([
        { name: "Çalışma Alanlarımız", path: "/calisma-alanlarimiz" },
        { name: service.title, path: `/calisma-alanlarimiz/${service.id}` },
    ]);

    // İç bağlantılar: aynı alandaki yazılar ve sorular hizmet sayfasını besler.
    const relatedPosts = blogPosts
        .filter((post) => service.blogCategories.includes(post.category))
        .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
        .slice(0, 4);
    const relatedFaqs = faqs
        .filter((faq) => service.faqCategories.includes(faq.category) || service.faqIds?.includes(faq.id))
        .slice(0, 4);

    const Icon = service.icon;

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
                {/* Hero Section */}
                <div className="bg-slate-900 dark:bg-slate-900/60 text-white py-16 px-4 relative overflow-hidden transition-colors duration-300">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="max-w-4xl mx-auto relative z-10">
                        <Link href="/calisma-alanlarimiz" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors font-medium">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Tüm Çalışma Alanları
                        </Link>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-primary-500/10 rounded-lg border border-primary-500/20">
                                <Icon className="w-8 h-8 text-primary-400" />
                            </div>
                            <h1 className="text-3xl md:text-5xl font-serif font-bold">{service.title}</h1>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 md:p-12 transition-colors duration-300">
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
                                {service.detailContent.intro}
                            </p>

                            <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-6">Hizmet Kapsamı</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                {service.detailContent.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-6 border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                                <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-4">Süreç Yönetimi</h2>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {service.detailContent.process}
                                </p>
                            </div>
                        </div>

                        {relatedFaqs.length > 0 && (
                            <div className="mt-12">
                                <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-4">
                                    {service.title} Hakkında Sık Sorulanlar
                                </h2>
                                <ul className="space-y-3">
                                    {relatedFaqs.map((faq) => (
                                        <li key={faq.id}>
                                            <Link
                                                href={`/sss#${faq.id}`}
                                                className="group flex items-start gap-2 text-slate-700 dark:text-slate-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                                            >
                                                <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                                                <span className="group-hover:underline">{faq.question}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {relatedPosts.length > 0 && (
                            <div className="mt-12">
                                <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-4">
                                    İlgili Yazılar
                                </h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {relatedPosts.map((post) => (
                                        <li key={post.id}>
                                            <Link
                                                href={`/blog/${post.id}`}
                                                className="block h-full rounded-xl border border-slate-100 dark:border-slate-800 p-4 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                                            >
                                                <span className="block font-semibold text-slate-900 dark:text-slate-100 mb-1">{post.title}</span>
                                                <span className="block text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{post.excerpt}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA Section */}
                        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Hukuki Desteğe mi İhtiyacınız Var?</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                {service.title} konusundaki sorularınız ve hukuki süreçleriniz için bizimle iletişime geçebilirsiniz.
                            </p>
                            <Link
                                href="/iletisim"
                                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors"
                            >
                                Avukatla Görüş
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
