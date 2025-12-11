import type { Express } from "express";
import { createServer, type Server } from "http";
import { chatRequestSchema } from "@shared/schema";
import { chat } from "./gemini";

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/chat", async (req, res) => {
    try {
      const parsed = chatRequestSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: parsed.error.errors 
        });
      }

      const { message, history = [] } = parsed.data;
      
      const responseText = await chat(message, history);
      
      const assistantMessage = {
        id: generateId(),
        role: "assistant" as const,
        content: responseText,
        timestamp: Date.now(),
      };

      return res.json({ message: assistantMessage });
    } catch (error) {
      console.error("Chat error:", error);
      return res.status(500).json({ 
        error: "Failed to generate response",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  return httpServer;
}
