
import { GoogleGenAI } from "@google/genai";
import { PromptConfig } from "./types";

export class GeminiService {
  private static instance: GeminiService;

  private constructor() {}

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public async generatePrompt(idea: string, config: PromptConfig): Promise<string> {
    // Instantiate fresh to ensure the latest process.env.API_KEY is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

    const systemInstruction = `
      You are JellyScript AI, a world-class Prompt Engineer. 
      Your mission is to transform raw, vague user ideas into high-performance, structured AI prompts.
      
      CURRENT CONFIGURATION:
      - Framework: ${config.framework}
      - Tone: ${config.tone}
      - Persona: ${config.persona}
      - Negative Constraints: ${config.negativeConstraints || "None"}
      - Target Model: ${config.targetModel}
      - Include Step-by-Step Logic: ${config.includeSteps ? "Yes" : "No"}

      GUIDELINES:
      1. For RTF: Ensure a clear Role, a detailed Task, and a specific Format.
      2. For Chain-of-Thought: Include reasoning requirements and "think step-by-step".
      3. For Midjourney: Use technical descriptors, aspect ratios, and styles.
      4. For Reverse Prompting: Analyze the intent to create a meta-prompt.
      5. Output ONLY the refined prompt. No conversation. No markdown code blocks (unless the prompt itself needs them).
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: idea }] }],
        config: {
          systemInstruction,
          temperature: 0.8,
          topP: 0.95,
        },
      });

      if (!response.text) {
        throw new Error("Empty response from AI engine.");
      }

      return response.text;
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      throw new Error(error.message || "Synthesis failed. Please verify connection.");
    }
  }
}
