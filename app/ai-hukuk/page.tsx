import { Metadata } from "next";
import AIHukukClient from "./AIHukukClient";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Şirketler için Hukuki Destek ve Yapay Zekâ",
    description: "Büyüyen şirketlere ve girişimlere sözleşme, şirketler hukuku, KVKK ve iş hukuku konularında danışmanlık; yapay zekâ araçlarının avukat denetiminde nasıl kullanıldığı.",
    path: "/ai-hukuk",
    images: [{ url: "/ai_justice_scales.png", width: 1024, height: 1024, alt: "Şirketler için hukuki destek ve yapay zekâ" }],
});

const breadcrumbLd = breadcrumbJsonLd([{ name: "Şirketler için Hukuki Destek", path: "/ai-hukuk" }]);

export default function AIHukukPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <AIHukukClient />
        </>
    );
}
