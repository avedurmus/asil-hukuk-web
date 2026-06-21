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
        <div className="group p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:shadow-xl hover:border-primary-100 dark:hover:border-primary-900/50 transition-all duration-300">
            <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-50 dark:group-hover:bg-primary-950/40 transition-colors">
                <Icon className="h-7 w-7 text-slate-700 dark:text-slate-350 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-primary-900 dark:group-hover:text-white transition-colors">
                {title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {description}
            </p>
            <Link
                href={`/calisma-alanlarimiz/${id}`}
                className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 hover:gap-2 transition-all"
            >
                Detaylı Bilgi <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
        </div>
    );
}
