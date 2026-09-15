import { LucideIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    id: string;
}

export default function ServiceCard({ title, description, icon: Icon, id }: ServiceCardProps) {
    return (
        <Link
            href={`/calisma-alanlarimiz/${id}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 dark:hover:border-gold-700/60 hover:shadow-card-hover"
        >
            {/* Üstte hover ile beliren altın şerit */}
            <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 transition-transform duration-500 group-hover:scale-x-100"
            />

            {/* İkon kutusu */}
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-800 to-primary-950 shadow-md ring-1 ring-primary-900/20 transition-transform duration-300 group-hover:scale-105 dark:from-primary-800 dark:to-slate-900 dark:ring-primary-700/30">
                <Icon className="h-7 w-7 text-gold-400" strokeWidth={1.75} />
            </div>

            <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-100 transition-colors group-hover:text-primary-800 dark:group-hover:text-white">
                {title}
            </h3>

            <p className="mb-6 flex-grow leading-relaxed text-slate-600 dark:text-slate-400">
                {description}
            </p>

            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 dark:text-primary-400 transition-colors group-hover:text-gold-600 dark:group-hover:text-gold-500">
                Detaylı Bilgi
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
        </Link>
    );
}
