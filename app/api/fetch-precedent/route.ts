import { NextRequest, NextResponse } from "next/server";
import { callMcpTool } from "../mcpClient";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Karar ID girilmelidir." },
        { status: 400 }
      );
    }

    console.log(`[fetch-precedent] Fetching document ID: ${id}`);

    // Use get_bedesten_document_markdown from yargi-mcp (HTTP/SSE, no OAuth)
    const mcpResult = await callMcpTool(
      "https://yargimcp.surucu.dev/mcp",
      "get_bedesten_document_markdown",
      { documentId: String(id) }
    );

    const rawText: string = mcpResult?.content?.[0]?.text ?? "";

    if (!rawText) {
      return NextResponse.json(
        { error: "Karar metni boş veya bulunamadı." },
        { status: 404 }
      );
    }

    // Response may be JSON with markdown_content field, or plain markdown
    let markdownContent = rawText;
    try {
      const parsed = JSON.parse(rawText);
      if (parsed && typeof parsed === "object") {
        markdownContent =
          parsed.markdown_content ?? parsed.text ?? rawText;
      }
    } catch {
      // Plain text — use as-is
    }

    return NextResponse.json({ markdown_content: markdownContent });
  } catch (err: any) {
    console.error("[fetch-precedent] error:", err);
    return NextResponse.json(
      {
        error: `Emsal karar metni alınırken hata oluştu: ${err.message}`,
      },
      { status: 500 }
    );
  }
}
