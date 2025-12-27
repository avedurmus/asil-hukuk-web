import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services } from "@/data/services";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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

    return {
        title: `${service.title} | Asil Hukuk - İstanbul Kartal`,
        description: service.shortDescription,
    };
}

export default function ServiceDetailPage({ params }: Props) {
    const service = services.find((s) => s.id === params.slug);

    if (!service) {
        notFound();
    }

    const Icon = service.icon;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-grow pt-20">
                {/* Hero Section */}
                <div className="bg-slate-900 text-white py-16 px-4 relative overflow-hidden">
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
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
                        <div className="prose prose-slate max-w-none">
                            <p className="text-lg text-slate-700 leading-relaxed mb-8">
                                {service.detailContent.intro}
                            </p>

                            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6">Hizmet Kapsamı</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                {service.detailContent.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-slate-700">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                <h3 className="text-xl font-serif font-bold text-slate-900 mb-4">Süreç Yönetimi</h3>
                                <p className="text-slate-600">
                                    {service.detailContent.process}
                                </p>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="mt-12 pt-8 border-t border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Hukuki Desteğe mi İhtiyacınız Var?</h3>
                            <p className="text-slate-600 mb-6">
                                {service.title} konusundaki sorularınız ve hukuki süreçleriniz için bizimle iletişime geçebilirsiniz.
                            </p>
                            <Link
                                href="/iletisim"
                                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
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
