import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
const prisma = new PrismaClient();
const communityUpdateSchema = z.object({
    name: z.string().min(2).optional(),
    code: z.string().min(2).optional(),
    description: z.string().optional(),
});
export async function GET(req, { params }) {
    try {
        const community = await prisma.community.findUnique({ where: { id: params.id } });
        if (!community)
            return NextResponse.json({ error: 'Communauté non trouvée.' }, { status: 404 });
        return NextResponse.json(community);
    }
    catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la récupération de la communauté.' }, { status: 500 });
    }
}
export async function PUT(req, { params }) {
    try {
        const data = await req.json();
        const parsed = communityUpdateSchema.safeParse(data);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation échouée', details: parsed.error.errors }, { status: 400 });
        }
        const community = await prisma.community.update({ where: { id: params.id }, data: parsed.data });
        return NextResponse.json(community);
    }
    catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la mise à jour de la communauté.' }, { status: 500 });
    }
}
export async function DELETE(req, { params }) {
    try {
        await prisma.community.delete({ where: { id: params.id } });
        return NextResponse.json({ message: 'Communauté supprimée.' });
    }
    catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la suppression de la communauté.' }, { status: 500 });
    }
}
