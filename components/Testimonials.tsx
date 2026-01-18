import { siteContent } from "@/data/siteContent";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Müvekkil Yorumları</span>
                    <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Müvekkillerimiz Ne Diyor?</h2>
                    <p className="text-lg text-slate-600 font-light">
                        Hukuki süreçlerde güven ve memnuniyet en büyük önceliğimizdir.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {siteContent.testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative hover:-translate-y-1 transition-transform duration-300">
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-primary-100" />

                            <div className="flex space-x-1 mb-6 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            <p className="text-slate-600 mb-6 italic leading-relaxed">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div className="ml-3">
                                    <h4 className="text-sm font-bold text-slate-900">{testimonial.name}</h4>
                                    <span className="text-xs text-slate-500">{testimonial.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
