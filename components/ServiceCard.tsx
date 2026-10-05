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
            className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 transition-colors duration-300 hover:border-gold-500/70 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-gold-500/50"
        >
            <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ivory-100 dark:bg-slate-950">
                    <Icon className="h-5 w-5 text-primary-800 dark:text-gold-400" strokeWidth={1.5} />
                </span>
                <h3 className="font-serif text-xl font-medium leading-snug text-slate-900 dark:text-slate-100">{title}</h3>
            </div>

            <p className="mt-4 flex-grow leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>

            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-800 dark:text-gold-400">
                Bilgi alın
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
        </Link>
    );
}
