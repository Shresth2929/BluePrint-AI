import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import type { RenderStyle } from "@/types";
import { getRenderStyleConfig, sleep } from "@/lib/utils";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

export async function analyzeFloorPlan(imageBase64: string, mimeType: string = "image/jpeg"): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    safetySettings,
  });

  const prompt = `You are an expert architectural analyst. Analyze this floor plan or architectural sketch and extract:
1. Room layout and arrangement (living room, bedrooms, kitchen, bathrooms, etc.)
2. Approximate dimensions and proportions
3. Key architectural features (windows, doors, stairs, open spaces)
4. Flow and connectivity between spaces
5. Natural light potential
6. Notable spatial characteristics

Provide a detailed, structured analysis in 3-4 sentences that will help generate a photorealistic 3D architectural render. Focus on spatial relationships, key features, and design opportunities.`;

  const result = await retryWithBackoff(async () => {
    const response = await model.generateContent([
      { text: prompt },
      { inlineData: { mimeType, data: imageBase64 } },
    ]);
    return response.response.text();
  });

  return result;
}

export async function generateRenderPrompt(
  analysis: string,
  style: RenderStyle,
  userPrompt?: string
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    safetySettings,
  });

  const styleConfig = getRenderStyleConfig(style);

  const prompt = `You are a world-class architectural visualization expert. Create a detailed, vivid prompt for generating a photorealistic 3D architectural render.

FLOOR PLAN ANALYSIS:
${analysis}

DESIRED STYLE: ${styleConfig.label}
Style Description: ${styleConfig.description}
Style Tags: ${styleConfig.tags.join(", ")}

USER CUSTOMIZATION: ${userPrompt || "None specified"}

Create a single, rich, detailed prompt (2-3 sentences) for an AI image generator to create a stunning photorealistic architectural render. Include:
- Specific materials, textures, and finishes aligned with the ${styleConfig.label} style
- Lighting conditions (time of day, natural/artificial light)
- Camera angle and perspective (interior/exterior, eye level, etc.)
- Atmospheric elements and mood
- Key design features to highlight

The prompt should result in a magazine-quality architectural visualization. Output ONLY the prompt text, nothing else.`;

  const result = await retryWithBackoff(async () => {
    const response = await model.generateContent(prompt);
    return response.response.text();
  });

  return result.trim();
}

export async function generatePollinationsPrompt(
  renderPrompt: string
): Promise<string> {
  // Ensure the prompt is properly formatted and URI encoded for Pollinations
  const enhancedPrompt = `${renderPrompt}, 8k resolution, highly detailed, photorealistic, cinematic lighting, architectural photography`;
  return enhancedPrompt;
}

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      const errorMessage = (error as Error).message ?? "";

      // Don't retry on auth errors or invalid input
      if (errorMessage.includes("API_KEY_INVALID") || errorMessage.includes("INVALID_ARGUMENT")) {
        throw error;
      }

      // Retry on rate limits and transient errors
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        console.warn(`Gemini API attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
        await sleep(delay);
      }
    }
  }

  throw lastError ?? new Error("Max retries exceeded");
}
