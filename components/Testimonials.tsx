import { siteContent } from "@/data/siteContent";
import Reveal from "@/components/Reveal";

export default function Testimonials() {
    return (
        <section className="relative bg-ivory-100 py-24 transition-colors duration-300 dark:bg-slate-950 lg:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Reveal className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="eyebrow justify-center">Müvekkil Görüşleri</span>
                    <h2 className="mt-5 font-serif text-4xl font-medium leading-tight text-slate-900 dark:text-slate-100 lg:text-5xl">
                        Güven, en değerli referansımız
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {siteContent.testimonials.map((testimonial, i) => (
                        <Reveal key={testimonial.id} delay={i * 120} className="h-full">
                            <figure className="relative flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-9 shadow-card dark:border-slate-800 dark:bg-slate-900">
                                <span
                                    aria-hidden="true"
                                    className="font-serif text-7xl leading-none text-gold-500/60"
                                >
                                    &ldquo;
                                </span>
                                <blockquote className="-mt-4 flex-grow font-serif text-lg italic leading-relaxed text-slate-700 dark:text-slate-300">
                                    {testimonial.content}
                                </blockquote>

                                <figcaption className="mt-8 flex items-center gap-3 border-t border-slate-100 pt-6 dark:border-slate-800">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-900 font-serif text-base text-gold-300">
                                        {testimonial.name.charAt(0)}
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
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
