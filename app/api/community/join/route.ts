import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { communityId } = body;

    if (!communityId) {
      return NextResponse.json({ error: "Missing communityId" }, { status: 400 });
    }

    // Vérifie si la communauté existe
    const community = await prisma.community.findUnique({ where: { id: communityId } });
    if (!community) {
      return NextResponse.json({ error: "Community not found" }, { status: 404 });
    }

    // Vérifie si l'utilisateur existe
    console.log("userId reçu par Clerk :", userId);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    console.log("Résultat de prisma.user.findUnique :", user);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Vérifie si déjà membre
    const existing = await prisma.userCommunity.findFirst({
      where: { communityId, userId },
    });
    if (existing) {
      return NextResponse.json({ message: "Déjà membre" }, { status: 200 });
    }

    // Ajoute l'utilisateur à la communauté
    await prisma.userCommunity.create({
      data: { communityId, userId },
    });

    return NextResponse.json({ message: "Ajouté à la communauté" }, { status: 200 });
  } catch (error) {
    console.error("Erreur API /community/join :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}