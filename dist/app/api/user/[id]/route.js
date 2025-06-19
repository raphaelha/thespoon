import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
const prisma = new PrismaClient();
const userUpdateSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    pseudo: z.string().min(2).optional(),
});
export async function GET(req, { params }) {
    try {
        const user = await prisma.user.findUnique({ where: { id: params.id } });
        if (!user)
            return NextResponse.json({ error: 'Utilisateur non trouvé.' }, { status: 404 });
        return NextResponse.json(user);
    }
    catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la récupération de l’utilisateur.' }, { status: 500 });
    }
}
export async function PUT(req, { params }) {
    try {
        const data = await req.json();
        const parsed = userUpdateSchema.safeParse(data);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation échouée', details: parsed.error.errors }, { status: 400 });
        }
        const user = await prisma.user.update({ where: { id: params.id }, data: parsed.data });
        return NextResponse.json(user);
    }
    catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la mise à jour de l’utilisateur.' }, { status: 500 });
    }
}
export async function DELETE(req, { params }) {
    try {
        await prisma.user.delete({ where: { id: params.id } });
        return NextResponse.json({ message: 'Utilisateur supprimé.' });
    }
    catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la suppression de l’utilisateur.' }, { status: 500 });
    }
}
