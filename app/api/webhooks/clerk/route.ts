import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const svixId = headersList.get("svix-id");
    const svixTimestamp = headersList.get("svix-timestamp");
    const svixSignature = headersList.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
    }

    // Parse event without verification for now (add svix package for production)
    let event: { type: string; data: Record<string, unknown> };
    try {
      event = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { type, data } = event;

    if (type === "user.created") {
      const {
        id: clerkId,
        email_addresses,
        first_name,
        last_name,
        image_url,
      } = data as {
        id: string;
        email_addresses: Array<{ email_address: string }>;
        first_name: string | null;
        last_name: string | null;
        image_url: string | null;
      };

      const email = email_addresses?.[0]?.email_address;
      if (!email) {
        return NextResponse.json({ error: "No email address" }, { status: 400 });
      }

      await prisma.user.upsert({
        where: { clerkId },
        update: {
          email,
          name: [first_name, last_name].filter(Boolean).join(" ") || null,
          imageUrl: image_url,
        },
        create: {
          clerkId,
          email,
          name: [first_name, last_name].filter(Boolean).join(" ") || null,
          imageUrl: image_url,
          credits: 5,
        },
      });
    }

    if (type === "user.updated") {
      const {
        id: clerkId,
        email_addresses,
        first_name,
        last_name,
        image_url,
      } = data as {
        id: string;
        email_addresses: Array<{ email_address: string }>;
        first_name: string | null;
        last_name: string | null;
        image_url: string | null;
      };

      const email = email_addresses?.[0]?.email_address;
      if (!email) return NextResponse.json({ success: true });

      await prisma.user.update({
        where: { clerkId },
        data: {
          email,
          name: [first_name, last_name].filter(Boolean).join(" ") || null,
          imageUrl: image_url,
        },
      }).catch(() => {}); // Ignore if user not found
    }

    if (type === "user.deleted") {
      const { id: clerkId } = data as { id: string };
      await prisma.user.delete({ where: { clerkId } }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
