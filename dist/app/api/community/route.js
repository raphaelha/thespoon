import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
const prisma = new PrismaClient();
const communitySchema = z.object({
    name: z.string().min(2),
    code: z.string().min(2),
    description: z.string().optional(),
});
export async function GET() {
    try {
        const communities = await prisma.community.findMany();
        return NextResponse.json(communities);
    }
    catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la récupération des communautés.' }, { status: 500 });
    }
}
export async function POST(req) {
    try {
        const data = await req.json();
        const parsed = communitySchema.safeParse(data);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation échouée', details: parsed.error.errors }, { status: 400 });
        }
        const community = await prisma.community.create({ data: parsed.data });
        return NextResponse.json(community);
    }
    catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la création de la communauté.' }, { status: 500 });
    }
}
