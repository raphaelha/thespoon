import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  pseudo: z.string().min(2),
});

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des utilisateurs.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsed = userSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation échouée', details: parsed.error.errors }, { status: 400 });
    }
    const user = await prisma.user.create({ data: parsed.data });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de l’utilisateur.' }, { status: 500 });
  }
}