import { siteContent } from "@/data/siteContent";
import { Star, Quote } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function Testimonials() {
    return (
        <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 py-24 lg:py-28 transition-colors duration-300">
            {/* Arka plan dekorasyonu */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-100/60 dark:bg-primary-900/15 blur-3xl animate-blob" />
                <div className="absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-gold-100/60 dark:bg-gold-700/10 blur-3xl animate-blob animation-delay-4000" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Reveal className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.18em] text-gold-600 dark:text-gold-500">
                        Müvekkil Yorumları
                    </span>
                    <h2 className="mb-4 font-serif text-4xl font-bold text-slate-900 dark:text-slate-100">
                        Müvekkillerimiz Ne Diyor?
                    </h2>
                    <div aria-hidden="true" className="mx-auto mb-5 h-px w-20 rule-gold opacity-70" />
                    <p className="text-lg font-light text-slate-600 dark:text-slate-400">
                        Hukuki süreçlerde güven ve memnuniyet en büyük önceliğimizdir.
                    </p>
                </Reveal>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {siteContent.testimonials.map((testimonial, i) => (
                        <Reveal key={testimonial.id} delay={i * 120}>
                            <figure className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 dark:hover:border-gold-700/60 hover:shadow-card-hover">
                                <Quote
                                    aria-hidden="true"
                                    className="absolute -right-2 -top-2 h-24 w-24 text-gold-100 dark:text-gold-700/15"
                                    strokeWidth={1}
                                />

                                <div className="relative mb-5 flex gap-1 text-gold-500">
                                    {[...Array(5)].map((_, idx) => (
                                        <Star key={idx} className="h-4 w-4 fill-current" />
                                    ))}
                                </div>

                                <blockquote className="relative mb-8 flex-grow text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                                    &ldquo;{testimonial.content}&rdquo;
                                </blockquote>

                                <figcaption className="relative flex items-center gap-3 border-t border-slate-100 dark:border-slate-800 pt-5">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-800 to-primary-950 text-sm font-bold text-gold-400 ring-1 ring-primary-900/20">
                                        {testimonial.name.charAt(0)}
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-sm font-bold text-slate-900 dark:text-slate-100">
                                            {testimonial.name}
                                        </span>
                                        <span className="block text-xs text-slate-500 dark:text-slate-400">
                                            {testimonial.role}
                                        </span>
                                    </span>
                                </figcaption>
                            </figure>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
