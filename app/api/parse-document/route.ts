import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import { getDocumentProxy, extractText } from "unpdf";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        if (!file) {
            return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.toLowerCase();

        let text = "";
        const metadata: Record<string, string> = {};

        if (filename.endsWith(".udf")) {
            // UDF Parsing using JSZip (completely local & offline)
            const zip = await JSZip.loadAsync(buffer);
            const contentXmlFile = zip.file("content.xml");
            if (!contentXmlFile) {
                return NextResponse.json({ error: "UDF dosyası geçersiz (content.xml bulunamadı)" }, { status: 400 });
            }
            const xmlText = await contentXmlFile.async("text");
            
            // Extract content inside CDATA of <content>
            const contentMatch = xmlText.match(/<content><!\[CDATA\[([\s\S]*?)\]\]><\/content>/) || xmlText.match(/<content>([\s\S]*?)<\/content>/);
            if (!contentMatch) {
                return NextResponse.json({ error: "UDF dosya içeriği okunamadı" }, { status: 400 });
            }
            let contentText = contentMatch[1];
            
            // Extract data tag key-values
            const dataMatch = xmlText.match(/<data>([\s\S]*?)<\/data>/);
            if (dataMatch) {
                const dataText = dataMatch[1];
                const tagRegex = /<([^>]+)>([\s\S]*?)<\/\1>/g;
                let match;
                const dataMap: Record<string, string> = {};
                while ((match = tagRegex.exec(dataText)) !== null) {
                    dataMap[match[1]] = match[2].trim();
                }
                
                // Replace keys in content
                for (const [key, value] of Object.entries(dataMap)) {
                    contentText = contentText.split(key).join(value);
                }

                // Populate metadata map for front-end auto-fill
                const il = dataMap["il_Ilce"] || "";
                const mahkeme = dataMap["ilgiliIcraMudurlugu"] || dataMap["mahkeme"] || "";
                metadata["court"] = [il, mahkeme].filter(Boolean).join(" ");
                
                metadata["caseNumber"] = dataMap["dosyaNo"] || dataMap["esasNo"] || "";
                
                metadata["client"] = dataMap["borcluBilgisi"] || dataMap["davaci"] || dataMap["davali"] || "";
                if (metadata["client"] && metadata["client"].includes(";")) {
                    metadata["client"] = metadata["client"].split(";")[0].trim();
                }
                if (metadata["client"] && metadata["client"].includes(",")) {
                    metadata["client"] = metadata["client"].split(",")[0].trim();
                }

                metadata["subject"] = dataMap["talepAciklama"] || dataMap["konu"] || "";
                if (metadata["subject"] && metadata["subject"].length > 100) {
                    metadata["subject"] = metadata["subject"].substring(0, 100) + "...";
                }
            }
            text = contentText.trim();
        } else if (filename.endsWith(".pdf")) {
            // PDF Parsing using unpdf (pure JS, cross-platform, zero-config)
            const pdf = await getDocumentProxy(new Uint8Array(buffer));
            const result = await extractText(pdf);
            text = result.text.join("\n\n").trim();
        } else {
            return NextResponse.json({ error: "Desteklenmeyen dosya türü. Sadece .udf ve .pdf desteklenmektedir." }, { status: 400 });
        }

        return NextResponse.json({ text, metadata });
    } catch (err: any) {
        console.error("Belge ayrıştırma hatası:", err);
        return NextResponse.json({ error: `Dosya okunurken hata oluştu: ${err.message}` }, { status: 500 });
    }
}
