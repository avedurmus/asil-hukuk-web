interface PageHeroProps {
    eyebrow: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
}

/**
 * İç sayfaların koyu, ortalanmış başlık bölümü (Blog, S.S.S. vb.).
 * Çalışma Alanları ve İletişim sayfalarındaki başlıkla aynı görünümü taşır.
 */
export default function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
    return (
        <section className="relative isolate overflow-hidden bg-primary-950 pb-20 pt-36 text-white lg:pb-24 lg:pt-44">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.08]" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-hero-glow" />
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <span className="eyebrow justify-center !text-gold-400">{eyebrow}</span>
                <h1 className="mt-6 font-serif text-4xl font-medium md:text-6xl">{title}</h1>
                {description && (
                    <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-slate-300">
                        {description}
                    </p>
                )}
                {children}
            </div>
        </section>
    );
}
