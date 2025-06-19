import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const restaurantUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  city: z.string().min(2).optional(),
  address: z.string().optional(),
  addedById: z.string().uuid().optional(),
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const restaurant = await prisma.restaurant.findUnique({ where: { id: params.id } });
    if (!restaurant) return NextResponse.json({ error: 'Restaurant non trouvé.' }, { status: 404 });
    return NextResponse.json(restaurant);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération du restaurant.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const parsed = restaurantUpdateSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation échouée', details: parsed.error.errors }, { status: 400 });
    }
    const restaurant = await prisma.restaurant.update({ where: { id: params.id }, data: parsed.data });
    return NextResponse.json(restaurant);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du restaurant.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.restaurant.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'Restaurant supprimé.' });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la suppression du restaurant.' }, { status: 500 });
  }
}