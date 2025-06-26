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

