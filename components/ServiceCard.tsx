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
        <div className="group p-8 bg-white border border-slate-100 rounded-2xl hover:shadow-xl hover:border-primary-100 transition-all duration-300">
            <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-50 transition-colors">
                <Icon className="h-7 w-7 text-slate-700 group-hover:text-primary-600 transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-900 transition-colors">
                {title}
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
                {description}
            </p>
            <Link
                href={`/iletisim?konu=${encodeURIComponent(title)}`}
                className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 hover:gap-2 transition-all"
            >
                Danışmanlık Al <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
        </div>
    );
}
