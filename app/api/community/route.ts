import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const communitySchema = z.object({
  name: z.string().min(2),
  code: z.string().min(2),
  description: z.string().optional(),
  isPublic: z.boolean().optional(), // optionnel car défaut dans Prisma
});

export async function GET() {
  try {
    const communities = await prisma.community.findMany({
      where: { isPublic: true },
      select: {
        id: true,
        name: true,
        code: true,
        description: true,
        isPublic: true,
        createdAt: true,
        // Ajoute le nombre de membres si tu veux :
        members: {
          select: { id: true }
        }
      }
    });

    // Ajoute le nombre de membres à la réponse
    const formatted = communities.map(c => ({
      ...c,
      members: c.members?.length ?? 0,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des communautés.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsed = communitySchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation échouée', details: parsed.error.errors }, { status: 400 });
    }
    const community = await prisma.community.create({
      data: {
        name: parsed.data.name,
        code: parsed.data.code,
        description: parsed.data.description,
        isPublic: parsed.data.isPublic ?? true, // true par défaut
      },
    });
    return NextResponse.json(community);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de la communauté.' }, { status: 500 });
  }
}