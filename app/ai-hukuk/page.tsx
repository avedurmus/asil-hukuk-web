import { Metadata } from "next";
import AIHukukClient from "./AIHukukClient";

export const metadata: Metadata = {
    title: "Start-up ve Scale-up'lar için Yapay Zeka Destekli Hukuk | Asil Hukuk",
    description: "Hızlı büyüyen teknoloji şirketleri için yapay zeka hızıyla hazırlanan, Av. Emre Durmuş güvencesiyle denetlenen önleyici hukuk çözümleri ve sözleşme yönetimi.",
    alternates: {
        canonical: "/ai-hukuk",
    },
};

export default function AIHukukPage() {
    return <AIHukukClient />;
}
