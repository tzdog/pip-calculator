
import { GoogleGenAI, Type } from "@google/genai";
import { MarketInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMarketInsights = async (pair: string, pipValue: number, currency: string): Promise<MarketInsight> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the current forex market context for ${pair}. The current calculated pip value for a standard lot is ${pipValue} ${currency}. Provide a concise trading analysis.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          analysis: { type: Type.STRING, description: "A brief market analysis of the pair." },
          volatility: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
          trend: { type: Type.STRING, enum: ["Bullish", "Bearish", "Neutral"] },
          recommendation: { type: Type.STRING, description: "A quick trading tip for this pair." }
        },
        required: ["analysis", "volatility", "trend", "recommendation"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return {
      analysis: "Unable to load real-time analysis. The forex markets are currently showing standard liquidity patterns for this major pair.",
      volatility: "Medium",
      trend: "Neutral",
      recommendation: "Always use stop-loss orders and follow your risk management strategy."
    };
  }
};
