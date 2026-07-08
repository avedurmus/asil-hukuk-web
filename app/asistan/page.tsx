import { Metadata } from "next";
import AsistanClient from "./AsistanClient";

export const metadata: Metadata = {
    title: "YargıAsistan - Yapay Zeka Destekli Hukuk Asistanı",
    description: "Yargıtay ve BAM emsal kararlarını arayabileceğiniz, dava dosyaları oluşturup AI ile analiz edebileceğiniz ve dilekçeler hazırlayabileceğiniz hukuk platformu.",
    alternates: {
        canonical: "/asistan",
    },
};

export default function AsistanPage() {
    return <AsistanClient />;
}
