import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
const prisma = new PrismaClient();
const voteSchema = z.object({
    userId: z.string().uuid(),
    restaurantId: z.string().uuid(),
    communityId: z.string(),
    note: z.number().min(1).max(5), // Ajout de la validation pour le champ 'note'
});
export async function GET() {
    try {
        const votes = await prisma.vote.findMany();
        return NextResponse.json(votes);
    }
    catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la récupération des votes.' }, { status: 500 });
    }
}
export async function POST(req) {
    try {
        const data = await req.json();
        const parsed = voteSchema.safeParse(data);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation échouée', details: parsed.error.errors }, { status: 400 });
        }
        const { userId, restaurantId, communityId, note } = parsed.data;
        const vote = await prisma.vote.create({
            data: {
                userId,
                restaurantId,
                communityId,
                note, // <-- ce champ est requis !
            },
        });
        return NextResponse.json(vote);
    }
    catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la création du vote.' }, { status: 500 });
    }
}
