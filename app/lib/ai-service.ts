// lib/ai-service.ts
import { functions } from "./appwrite";

interface AIResponse {
  message: string;
  suggestions?: string[];
  fixes?: {
    line: number;
    suggestion: string;
  }[];
}

export async function getAIResponse(
  message: string,
  code?: string
): Promise<AIResponse> {
  try {
    const execution = await functions.createExecution(
      "analyze_code", // Your Appwrite function ID
      JSON.stringify({
        message,
        code,
      })
    );

    if (execution.status === "completed") {
      return JSON.parse(execution.responseBody);
    }

    throw new Error("AI function execution failed");
  } catch (error) {
    console.error("Error getting AI response:", error);
    throw error;
  }
}
