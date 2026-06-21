import { NextRequest, NextResponse } from "next/server";
import { callMcpTool } from "../mcpClient";

// Court type mapping
const COURT_TYPE_MAP: Record<string, string[]> = {
  all:     ["YARGITAYKARARI", "DANISTAYKARAR", "YERELHUKUK", "ISTINAFHUKUK", "KYB"],
  yargitay: ["YARGITAYKARARI"],
  danistay: ["DANISTAYKARAR"],
  bam:     ["ISTINAFHUKUK"],
  yerel:   ["YERELHUKUK"],
};

/** Format court display name from itemType and birimAdi */
function formatCourtName(itemType: string, birimAdi: string): string {
  const unit = birimAdi || "";
  switch (itemType) {
    case "YARGITAYKARARI":  return `Yargıtay ${unit}`.trim();
    case "DANISTAYKARAR":   return `Danıştay ${unit}`.trim();
    case "ISTINAFHUKUK":    return `BAM ${unit}`.trim();
    case "YERELHUKUK":      return `Yerel Mahkeme ${unit}`.trim();
    case "KYB":             return `KYB ${unit}`.trim();
    default:                return unit || itemType;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { query, court } = await req.json();

    if (!query || !query.trim()) {
      return NextResponse.json(
        { error: "Arama kelimesi girilmelidir." },
        { status: 400 }
      );
    }

    const cleanQuery = query.trim();
    const court_types = COURT_TYPE_MAP[court] ?? COURT_TYPE_MAP.all;

    // Build Solr phrase: prefix each word with + for AND logic
    const phrase = cleanQuery
      .split(/\s+/)
      .map((w: string) =>
        /^[+\-"(]/.test(w) ? w : `+${w}`
      )
      .join(" ");

    console.log(
      `[search-precedents] phrase="${phrase}", courts=${JSON.stringify(court_types)}`
    );

    // Call search_bedesten_unified via yargi-mcp (HTTP/SSE, no OAuth)
    const mcpResult = await callMcpTool(
      "https://yargimcp.surucu.dev/mcp", // resolved inside mcpClient
      "search_bedesten_unified",
      {
        phrase,
        court_types,
        pageNumber: 1,
      }
    );

    // The tool returns a JSON string in content[0].text
    const rawText: string = mcpResult?.content?.[0]?.text ?? "{}";
    let parsed: any;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      parsed = {};
    }

    const rawDecisions: any[] = parsed.decisions ?? [];

    const decisions = rawDecisions.map((d: any) => {
      const itemType: string = d.itemType?.name ?? "";
      const birimAdi: string = d.birimAdi ?? "";
      const courtName = formatCourtName(itemType, birimAdi);

      const esasNo  = d.esasNo  ?? `${d.esasNoYil ?? ""}/${d.esasNoSira ?? ""}`;
      const kararNo = d.kararNo ?? `${d.kararNoYil ?? ""}/${d.kararNoSira ?? ""}`;
      const tarih   = d.kararTarihiStr ?? (d.kararTarihi ? d.kararTarihi.slice(0, 10) : "");
      const durum   = (d.kesinlesmeDurumu ?? "").toUpperCase().includes("KESİNLEŞMEDİ")
        ? "KESİNLEŞMEDİ"
        : "KESİNLEŞTİ";

      return {
        id:           String(d.documentId ?? d.id ?? Date.now()),
        daire:        courtName,
        esasNo,
        kararNo,
        kararTarihi:  tarih,
        arananKelime: cleanQuery,
        durum,
        konu:         `${courtName} E. ${esasNo} K. ${kararNo}`,
        özet:         d.özet ?? d.snippet ?? `${courtName} tarafından verilen ${esasNo} Esas, ${kararNo} Karar sayılı ilam.`,
        markdown_content: "", // loaded lazily when user clicks "Görüntüle"
      };
    });

    return NextResponse.json({ decisions });
  } catch (err: any) {
    console.error("[search-precedents] error:", err);
    return NextResponse.json(
      { error: `Emsal karar arama sırasında hata oluştu: ${err.message}` },
      { status: 500 }
    );
  }
}
