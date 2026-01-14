import { GoogleGenAI } from "@google/genai";
import { EventGroup } from '../types';

// Use process.env.API_KEY as strictly required
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: apiKey });

export const generateWorkoutPlan = async (
  group: EventGroup,
  phase: string,
  focus: string
): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key missing. Please check your .env file or Vercel settings.";
  }

  try {
    const prompt = `
      You are an elite Olympic Track & Field coach. Create a detailed, high-performance daily workout for the ${group} group.
      
      Context:
      - Training Phase: ${phase} (e.g., Pre-season, Competition, Peaking)
      - Specific Focus: ${focus} (e.g., Max Velocity, Endurance, Technique)
      
      Format the output using simple Markdown. Include:
      1. Warm-up (Drills/Dynamic)
      2. Main Set (Reps, Sets, Rest intervals)
      3. Cool down
      4. Key coaching cues (Motivational and Technical)
      
      Keep the tone intense, professional, and encouraging.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a professional track coach known for producing champions.",
        temperature: 0.7,
      }
    });

    return response.text || "Could not generate workout. Please try again.";
  } catch (error) {
    console.error("Error generating workout:", error);
    return "Error connecting to AI Coach assistant. Please check API Key.";
  }
};

export const analyzePerformance = async (
  athleteName: string,
  eventName: string,
  stats: { date: string; displayValue: string }[]
): Promise<string> => {
   if (!apiKey) return "API Key missing.";

   try {
    const dataStr = stats.map(s => `${s.date}: ${s.displayValue}`).join('\n');
    const prompt = `
      Analyze the recent performance progression for athlete ${athleteName} in the ${eventName}.
      
      Data:
      ${dataStr}
      
      Provide a concise 2-sentence summary of their trend and one specific recommendation for improvement based on general track principles for this event type.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Analysis unavailable.";
   } catch (error) {
     console.error("Error analyzing stats:", error);
     return "AI Analysis temporarily unavailable.";
   }
};