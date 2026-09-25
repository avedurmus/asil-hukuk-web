import { Metadata } from "next";
import AsistanClient from "./AsistanClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "YargıAsistan - Yapay Zeka Hukuk Asistanı",
    description: "Yargıtay ve BAM emsal kararlarını arayabileceğiniz, dava dosyaları oluşturup AI ile analiz edebileceğiniz ve dilekçeler hazırlayabileceğiniz hukuk platformu.",
    path: "/asistan",
});

export default function AsistanPage() {
    return <AsistanClient />;
}
