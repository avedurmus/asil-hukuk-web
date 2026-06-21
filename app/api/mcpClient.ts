import { spawn } from 'child_process';

export function callMcpTool(serverUrl: string, toolName: string, args: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const cp = spawn('npx', ['-y', 'mcp-remote@latest', serverUrl]);
    let buffer = '';
    let resolved = false;

    // Timeout safety
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        cp.kill('SIGKILL');
        reject(new Error('MCP Request Timeout (15s)'));
      }
    }, 15000);

    cp.stdout.on('data', (data) => {
      buffer += data.toString();
      processMessages();
    });

    cp.stderr.on('data', (data) => {
      // Optional logging for debugging (stderr is piped to node dev process log)
      console.log(`[MCP STDERR] ${data.toString().trim()}`);
    });

    cp.on('close', (code) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timeout);
        reject(new Error(`MCP process exited with code ${code}`));
      }
    });

    cp.on('error', (err) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timeout);
        reject(err);
      }
    });

    function send(msg: any) {
      if (cp.killed || !cp.stdin || cp.stdin.destroyed) return;
      cp.stdin.write(JSON.stringify(msg) + '\n');
    }

    function processMessages() {
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const msg = JSON.parse(line);
          
          if (msg.id === 1) {
            // Step 1: Send notifications/initialized notification
            send({
              jsonrpc: "2.0",
              method: "notifications/initialized"
            });
            // Step 2: Trigger the target tool call
            send({
              jsonrpc: "2.0",
              id: 2,
              method: "tools/call",
              params: {
                name: toolName,
                arguments: args
              }
            });
          } else if (msg.id === 2) {
            // Step 3: Tool response received, resolve the promise and clean up child process
            resolved = true;
            clearTimeout(timeout);
            cp.kill('SIGTERM');
            if (msg.error) {
              reject(new Error(msg.error.message || 'MCP tool execution failed'));
            } else {
              resolve(msg.result);
            }
          }
        } catch (err) {
          // Ignore lines that are not valid JSON-RPC (e.g. logs or incomplete chunks)
        }
      }
    }

    // Step 0: Trigger initialize request
    send({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: {
          name: "asilhukuk-client",
          version: "1.0.0"
        }
      }
    });
  });
}
