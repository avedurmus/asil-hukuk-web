import { Metadata } from "next";
import AIHukukClient from "./AIHukukClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Start-up'lar için Yapay Zeka Destekli Hukuk",
    description: "Hızlı büyüyen teknoloji şirketleri için yapay zeka hızıyla hazırlanan, Av. Emre Durmuş güvencesiyle denetlenen önleyici hukuk çözümleri ve sözleşme yönetimi.",
    path: "/ai-hukuk",
    images: [{ url: "/ai_justice_scales.png", width: 1024, height: 1024, alt: "Yapay zeka destekli hukuk" }],
});

export default function AIHukukPage() {
    return <AIHukukClient />;
}
