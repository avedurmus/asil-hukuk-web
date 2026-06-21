/**
 * MCP Client - HTTP/SSE Transport (Vercel compatible)
 *
 * Connects directly to yargi-mcp (yargimcp.surucu.dev) via Streamable HTTP
 * transport WITHOUT spawning any subprocess. This approach works in all
 * serverless environments (Vercel, Netlify, etc.).
 *
 * Protocol:
 *   1. POST /mcp  → initialize  (get mcp-session-id header)
 *   2. POST /mcp  → tools/call  (with session header)
 *   SSE responses are parsed to extract the JSON-RPC result.
 */

const MCP_BASE_URL = 'https://yargimcp.surucu.dev/mcp';

/** Parse a Server-Sent Events response body and return the first data payload */
function parseSseText(text: string): any {
  // SSE format: "event: message\r\ndata: {...}\r\n\r\n"
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      try {
        return JSON.parse(line.slice(6));
      } catch {
        // ignore non-JSON lines
      }
    }
  }
  return null;
}

/** Open a new MCP session and return the session ID */
async function openSession(): Promise<string> {
  const res = await fetch(MCP_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'asilhukuk-web', version: '1.0.0' },
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`MCP initialize failed: HTTP ${res.status}`);
  }

  const sessionId =
    res.headers.get('mcp-session-id') ||
    res.headers.get('x-session-id') ||
    '';

  // Consume the body to free the connection
  await res.text();

  if (!sessionId) {
    throw new Error('MCP server did not return a session ID');
  }

  return sessionId;
}

/**
 * Call an MCP tool over HTTP/SSE transport.
 * No subprocess is spawned — works in Vercel serverless functions.
 */
export async function callMcpTool(
  _serverUrl: string, // kept for API compatibility, ignored (we always use yargimcp.surucu.dev)
  toolName: string,
  args: Record<string, unknown>
): Promise<any> {
  const sessionId = await openSession();

  const res = await fetch(MCP_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream',
      'mcp-session-id': sessionId,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: { name: toolName, arguments: args },
    }),
  });

  if (!res.ok) {
    throw new Error(`MCP tools/call failed: HTTP ${res.status}`);
  }

  const text = await res.text();
  const msg = parseSseText(text);

  if (!msg) {
    throw new Error('MCP server returned an empty or unparseable response');
  }

  if (msg.error) {
    throw new Error(msg.error.message || 'MCP tool execution failed');
  }

  return msg.result;
}
