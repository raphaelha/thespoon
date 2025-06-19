import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
const prisma = new PrismaClient();
const restaurantSchema = z.object({
    name: z.string().min(2),
    city: z.string().min(2),
    address: z.string().optional(),
    addedById: z.string().uuid().optional(),
});
export async function GET() {
    try {
        const restaurants = await prisma.restaurant.findMany();
        return NextResponse.json(restaurants);
    }
    catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la récupération des restaurants.' }, { status: 500 });
    }
}
export async function POST(req) {
    try {
        const data = await req.json();
        const parsed = restaurantSchema.safeParse(data);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation échouée', details: parsed.error.errors }, { status: 400 });
        }
        const restaurant = await prisma.restaurant.create({ data: parsed.data });
        return NextResponse.json(restaurant);
    }
    catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la création du restaurant.' }, { status: 500 });
    }
}
