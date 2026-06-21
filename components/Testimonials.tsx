import { siteContent } from "@/data/siteContent";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary-100 dark:bg-primary-950/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 dark:bg-purple-950/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="text-primary-600 dark:text-primary-400 font-semibold tracking-wider uppercase text-sm mb-2 block">Müvekkil Yorumları</span>
                    <h2 className="text-4xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-4">Müvekkillerimiz Ne Diyor?</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-light">
                        Hukuki süreçlerde güven ve memnuniyet en büyük önceliğimizdir.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {siteContent.testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 relative hover:-translate-y-1 transition-all duration-300">
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-primary-100 dark:text-slate-800" />

                            <div className="flex space-x-1 mb-6 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            <p className="text-slate-600 dark:text-slate-400 mb-6 italic leading-relaxed">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-sm">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div className="ml-3">
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{testimonial.name}</h4>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
