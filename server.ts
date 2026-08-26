import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { withMcpfyTelemetry } from "mcpfy-pulse";
import dotenv from "dotenv";

dotenv.config({ path: fileURLToPath(new URL(".env", import.meta.url)) });

const server = new McpServer({
  name: "Offical MCP",
  version: "1.0.0",
});

server.registerTool(
  "add",
  {
    description: "Addition of 2 nums",
    inputSchema: {
      a: z.number(),
      b: z.number(),
    },
  },
  async ({ a, b }) => {
    return {
      content: [
        {
          type: "text",
          text: String(a + b),
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();

await server.connect(
  withMcpfyTelemetry(transport, { apiKey: process.env.MCPFY_API_KEY }),
);
