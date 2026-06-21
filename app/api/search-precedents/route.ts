import { NextRequest, NextResponse } from "next/server";
import { callMcpTool } from "../mcpClient";

export async function POST(req: NextRequest) {
  try {
    const { query, court } = await req.json();
    if (!query || !query.trim()) {
      return NextResponse.json({ error: "Arama kelimesi girilmelidir." }, { status: 400 });
    }

    // 1. Prepare search phrase according to Bedesten Solr criteria
    // Solr require + for terms. We will ensure terms are prefixed with + if they are not already.
    const cleanQuery = query.trim();
    let phrase = cleanQuery;
    if (!phrase.startsWith('+') && !phrase.includes('+')) {
      // Split by spaces and add + prefix to each word
      phrase = cleanQuery
        .split(/\s+/)
        .map((word: string) => {
          if (word.startsWith('+') || word.startsWith('-') || word.startsWith('"')) {
            return word;
          }
          return `+${word}`;
        })
        .join(' ');
    }

    // 2. Determine court types based on filter
    let court_types = ["YARGITAYKARARI", "DANISTAYKARAR", "YERELHUKUK", "ISTINAFHUKUK", "KYB"];
    if (court === "yargitay") {
      court_types = ["YARGITAYKARARI"];
    } else if (court === "bam") {
      court_types = ["ISTINAFHUKUK"];
    } else if (court === "yerel") {
      court_types = ["YERELHUKUK"];
    }

    // 3. Call yargi-mcp-pro ictihat_ara tool
    console.log(`[Search Precedents] Querying MCP with phrase: "${phrase}", courts: ${JSON.stringify(court_types)}`);
    const mcpResult = await callMcpTool(
      "https://yargi.betaspacestudio.com/mcp",
      "ictihat_ara",
      {
        phrase: phrase,
        court_types: court_types,
        page_size: 15,
        include_snippets: true
      }
    );

    // 4. Parse the output text into Decision objects
    const textOutput = mcpResult.content?.[0]?.text || "";
    const lines = textOutput.split("\n");
    const decisions = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("- ")) continue;

      try {
        // Line format: - id · itemType · daire · E. K. · tarih · durum [— snippet]
        // Split by " — " (em-dash or en-dash spacing)
        const parts = trimmed.substring(2).split(/\s+[—–-]\s+/);
        const metaStr = parts[0];
        const snippet = parts[1] || "";

        const metaParts = metaStr.split(/\s+·\s+/);
        if (metaParts.length < 4) continue;

        const id = metaParts[0]?.trim();
        const itemType = metaParts[1]?.trim();
        const rawDaire = metaParts[2]?.trim();
        const ekRaw = metaParts[3]?.trim();
        const dateRaw = metaParts[4]?.trim() || "";
        const rawDurum = metaParts[5]?.trim() || "";

        // Format court name
        let courtName = rawDaire;
        if (itemType === "DANISTAYKARAR") {
          courtName = `Danıştay ${rawDaire}`;
        } else if (itemType === "YARGITAYKARARI") {
          courtName = `Yargıtay ${rawDaire}`;
        } else if (itemType === "ISTINAFHUKUK") {
          courtName = `BAM ${rawDaire}`;
        } else if (itemType === "YERELHUKUK") {
          courtName = `Yerel Mahkeme ${rawDaire}`;
        }

        // Extract Esas/Karar Nos
        const esasMatch = ekRaw.match(/E\.(\d+\/\d+)/i) || ekRaw.match(/Esas\s*No?\s*:?\s*(\d+\/\d+)/i);
        const kararMatch = ekRaw.match(/K\.(\d+\/\d+)/i) || ekRaw.match(/Karar\s*No?\s*:?\s*(\d+\/\d+)/i);
        
        const esasNo = esasMatch ? esasMatch[1] : (ekRaw.split(' ')[0] || "");
        const kararNo = kararMatch ? kararMatch[1] : (ekRaw.split(' ')[1] || "");

        // Map status to KESİNLEŞTİ / KESİNLEŞMEDİ
        const durum = rawDurum.toUpperCase().includes("KESİNLEŞMEDİ") || rawDurum.toUpperCase().includes("İSTİNAF")
          ? "KESİNLEŞMEDİ"
          : "KESİNLEŞTİ";

        // Human readable subject/topic
        const konu = `${courtName} E. ${esasNo} K. ${kararNo}`;

        decisions.push({
          id,
          daire: courtName,
          esasNo,
          kararNo,
          kararTarihi: dateRaw,
          arananKelime: cleanQuery,
          durum,
          konu,
          özet: snippet || `${courtName} tarafından verilen ${esasNo} Esas, ${kararNo} Karar sayılı ilam.`,
          markdown_content: "" // Will be loaded dynamically when clicked
        });
      } catch (err) {
        console.error("Failed to parse decision line:", trimmed, err);
      }
    }

    return NextResponse.json({ decisions });
  } catch (err: any) {
    console.error("Search Precedents error:", err);
    return NextResponse.json({ error: `Emsal karar arama sırasında hata oluştu: ${err.message}` }, { status: 500 });
  }
}
