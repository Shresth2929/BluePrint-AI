import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { analyzeFloorPlan, generateRenderPrompt, generatePollinationsPrompt } from "@/lib/gemini";
import { uploadImage } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import type { RenderStyle } from "@/types";

const DEMO_RENDERS = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=90",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=90",
  "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=90",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=90",
];

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { imageBase64, mimeType, style, prompt } = body as {
      imageBase64: string;
      mimeType: string;
      style: RenderStyle;
      prompt?: string;
    };

    if (!imageBase64 || !style) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if Gemini API key is configured
    const hasGeminiKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key";
    const hasCloudinaryKey = !!process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== "your_cloud_name";
    const hasDatabase = !!process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("user:password");

    let outputImageUrl: string;
    let finalPrompt: string | undefined;
    let isDemo = false;

    if (hasGeminiKey && imageBase64) {
      try {
        // Step 1: Analyze floor plan
        const analysis = await analyzeFloorPlan(imageBase64, mimeType);

        // Step 2: Generate base render prompt
        const renderPrompt = await generateRenderPrompt(analysis, style, prompt);

        // Step 3: Enhance prompt for Pollinations
        const pollinationsPrompt = await generatePollinationsPrompt(renderPrompt);
        finalPrompt = pollinationsPrompt;
        
        // Step 4: Generate architectural render URL via Pollinations
        const seed = Math.floor(Math.random() * 10000000);
        const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(pollinationsPrompt)}?width=1024&height=768&nologo=true&seed=${seed}`;

        isDemo = false;

        // Step 5: Upload to Cloudinary if configured
        if (hasCloudinaryKey) {
          try {
            const response = await fetch(pollinationsUrl);
            if (response.ok) {
              const arrayBuffer = await response.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);
              const uploaded = await uploadImage(buffer, "renders", { tags: [style, "ai-render"] });
              outputImageUrl = uploaded.url;
            } else {
              outputImageUrl = pollinationsUrl;
            }
          } catch (err) {
            console.error("Cloudinary upload failed, falling back to pollinations URL");
            outputImageUrl = pollinationsUrl;
          }
        } else {
          outputImageUrl = pollinationsUrl;
        }
      } catch (geminiError) {
        console.error("AI generation error:", geminiError);
        isDemo = true;
        outputImageUrl = DEMO_RENDERS[Math.floor(Math.random() * DEMO_RENDERS.length)];
      }
    } else {
      // Demo mode — no API keys configured
      isDemo = true;
      outputImageUrl = DEMO_RENDERS[Math.floor(Math.random() * DEMO_RENDERS.length)];
    }

    // Save to database if configured
    if (hasDatabase) {
      try {
        // Find or create user
        let dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });

        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              clerkId: userId,
              email: `user_${userId}@blueprint.ai`,
              credits: 5,
            },
          });
        }

        // Check credits
        if (dbUser.credits <= 0) {
          return NextResponse.json({ error: "No credits remaining. Please upgrade your plan." }, { status: 402 });
        }

        // Upload input to Cloudinary if available
        let inputUrl = "demo-input";
        if (hasCloudinaryKey && imageBase64) {
          const buffer = Buffer.from(imageBase64, "base64");
          const uploaded = await uploadImage(buffer, "inputs");
          inputUrl = uploaded.url;
        }

        // Create project and render
        const project = await prisma.project.create({
          data: {
            userId: dbUser.id,
            name: `${style.replace(/_/g, " ")} Render`,
            inputImageUrl: inputUrl,
            style,
            prompt,
          },
        });

        const render = await prisma.render.create({
          data: {
            projectId: project.id,
            userId: dbUser.id,
            outputImageUrl,
            inputImageUrl: inputUrl,
            status: "COMPLETED",
            style,
            prompt,
            metadata: { isDemo, generatedAt: new Date().toISOString() },
          },
        });

        // Deduct credit
        await prisma.user.update({
          where: { id: dbUser.id },
          data: { credits: { decrement: 1 } },
        });

        return NextResponse.json({
          success: true,
          outputImageUrl,
          renderId: render.id,
          projectId: project.id,
          isDemo,
          creditsRemaining: dbUser.credits - 1,
          renderPrompt: finalPrompt,
        });
      } catch (dbError) {
        console.error("Database error:", dbError);
        // Return success without DB save
      }
    }

    return NextResponse.json({
      success: true,
      outputImageUrl,
      isDemo,
      demoUrl: isDemo ? outputImageUrl : undefined,
      renderPrompt: finalPrompt,
    });
  } catch (error) {
    console.error("Generation API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
