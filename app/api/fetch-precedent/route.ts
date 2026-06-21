import { NextRequest, NextResponse } from "next/server";
import { callMcpTool } from "../mcpClient";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Karar ID girilmelidir." }, { status: 400 });
    }

    console.log(`[Fetch Precedent] Querying MCP for document ID: ${id}`);
    const mcpResult = await callMcpTool(
      "https://yargi.betaspacestudio.com/mcp",
      "ictihat_getir",
      {
        documentId: id
      }
    );

    // Extract text from MCP response. It's usually in content[0].text
    const rawText = mcpResult.content?.[0]?.text || "";

    if (!rawText) {
      return NextResponse.json({ error: "Karar metni boş veya bulunamadı." }, { status: 404 });
    }

    // Try parsing if double-encoded JSON
    let markdownContent = rawText;
    try {
      const parsed = JSON.parse(rawText);
      if (parsed && typeof parsed === 'object') {
        if (parsed.markdown_content) {
          markdownContent = parsed.markdown_content;
        } else if (parsed.text) {
          markdownContent = parsed.text;
        }
      }
    } catch (e) {
      // It is plain text, keep as-is
    }

    return NextResponse.json({ markdown_content: markdownContent });
  } catch (err: any) {
    console.error("Fetch Precedent error:", err);
    return NextResponse.json({ error: `Emsal karar metni alınırken hata oluştu: ${err.message}` }, { status: 500 });
  }
}
