import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const voteUpdateSchema = z.object({
  userId: z.string().uuid().optional(),
  restaurantId: z.string().uuid().optional(),
  communityId: z.string().optional(),
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const vote = await prisma.vote.findUnique({ where: { id: params.id } });
    if (!vote) return NextResponse.json({ error: 'Vote non trouvé.' }, { status: 404 });
    return NextResponse.json(vote);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération du vote.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const parsed = voteUpdateSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation échouée', details: parsed.error.errors }, { status: 400 });
    }
    const vote = await prisma.vote.update({ where: { id: params.id }, data: parsed.data });
    return NextResponse.json(vote);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du vote.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.vote.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'Vote supprimé.' });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la suppression du vote.' }, { status: 500 });
  }
}