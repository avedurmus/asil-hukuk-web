import { LucideIcon, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    id: string;
    /** Kartın sıra numarası (1'den başlar); verilirse köşede gösterilir. */
    index?: number;
}

export default function ServiceCard({ title, description, icon: Icon, id, index }: ServiceCardProps) {
    return (
        <Link
            href={`/calisma-alanlarimiz/${id}`}
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-primary-900 hover:bg-primary-900 hover:shadow-elegant dark:border-slate-800 dark:bg-slate-900 dark:hover:border-gold-500/50 dark:hover:bg-slate-900"
        >
            <div className="mb-10 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-500/30 bg-ivory-100 transition-colors duration-500 group-hover:border-gold-400/40 group-hover:bg-white/10 dark:bg-slate-950">
                    <Icon className="h-6 w-6 text-primary-800 transition-colors duration-500 group-hover:text-gold-300 dark:text-gold-400" strokeWidth={1.5} />
                </div>
                {index !== undefined && (
                    <span className="font-serif text-sm italic text-slate-400 transition-colors duration-500 group-hover:text-gold-300">
                        {String(index).padStart(2, "0")}
                    </span>
                )}
            </div>

            <h3 className="mb-3 font-serif text-2xl font-medium text-slate-900 transition-colors duration-500 group-hover:text-white dark:text-slate-100">
                {title}
            </h3>

            <p className="mb-8 flex-grow leading-relaxed text-slate-600 transition-colors duration-500 group-hover:text-slate-300 dark:text-slate-400">
                {description}
            </p>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-800 transition-colors duration-500 group-hover:text-gold-300 dark:text-gold-400">
                Detaylı Bilgi
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                </span>
            </span>
        </Link>
    );
}
