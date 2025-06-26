import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Webhook } from "svix";

const prisma = new PrismaClient();

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    // Vérification de la signature Clerk
    const svix_id = req.headers.get("svix-id");
    const svix_timestamp = req.headers.get("svix-timestamp");
    const svix_signature = req.headers.get("svix-signature");
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 });
    }
    const payload = await req.text();
    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    let event: any;
    try {
      event = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    if (event.type === "user.created") {
      const user = event.data;
      await prisma.user.upsert({
        where: { clerkId: user.id },
        update: {
          email: user.email_addresses?.[0]?.email_address ?? null,
          firstName: user.first_name ?? null,
          lastName: user.last_name ?? null,
          image: user.image_url ?? null,
        },
        create: {
          clerkId: user.id,
          email: user.email_addresses?.[0]?.email_address ?? null,
          firstName: user.first_name ?? null,
          lastName: user.last_name ?? null,
          image: user.image_url ?? null,
        },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erreur webhook Clerk :", error);
    return NextResponse.json({ error: "Erreur serveur Clerk webhook" }, { status: 500 });
  }
}