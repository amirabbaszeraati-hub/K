import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisData } from "./types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

export const analyzeScribble = async (base64Image: string): Promise<AnalysisData> => {
  // استفاده از مدل پایدارتر برای موبایل
  const model = "gemini-1.5-flash";
  
  const prompt = `
    Analyze this scribble/doodle image from a psychological perspective. 
    The user created this by "letting their mind go free" (doodling).
    Evaluate line pressure, density, direction, shapes (curved vs angular), and use of space.
    Provide a professional, scientific psychological analysis.
    
    IMPORTANT: All text fields (trait names, descriptions, emotionalState, detailedAnalysis, recommendations) MUST BE IN PERSIAN (FARSI).
    
    Include:
    1. Personality traits (with scores 1-10).
    2. Current emotional state.
    3. Stress and Creativity levels (1-100).
    4. A detailed narrative analysis in Persian.
    5. Actionable recommendations based on art therapy principles in Persian.
    Return the response in JSON format.
  `;

  // پاکسازی دیتای عکس برای جلوگیری از خطای حافظه در موبایل
  const imageData = base64Image.includes(",") ? base64Image.split(",")[1] : base64Image;

  const response = await ai.models.generateContent({
    model: model,
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageData,
            },
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          personalityTraits: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                trait: { type: Type.STRING },
                score: { type: Type.NUMBER },
                description: { type: Type.STRING },
              },
              required: ["trait", "score", "description"],
            },
          },
          emotionalState: { type: Type.STRING },
          stressLevel: { type: Type.NUMBER },
          creativityLevel: { type: Type.NUMBER },
          detailedAnalysis: { type: Type.STRING },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["personalityTraits", "emotionalState", "stressLevel", "creativityLevel", "detailedAnalysis", "recommendations"],
      },
    },
  });

  const result = JSON.parse(response.text);
  return {
    ...result,
    timestamp: Date.now(),
    imageUrl: base64Image
  };
};
