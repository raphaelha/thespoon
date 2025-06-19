import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || undefined;

  const restaurants = await prisma.restaurant.findMany({
    where: city ? { city } : {},
    include: {
      votes: true,
    },
  });

  const data = restaurants.map((r) => {
    const votesCount = r.votes.length;
    const average =
      votesCount > 0
        ? r.votes.reduce((acc, v) => acc + (v.note ?? 0), 0) / votesCount
        : 0;
    return {
      id: r.id,
      name: r.name,
      city: r.city,
      address: r.address,
      votes: votesCount,
      average: Number(average.toFixed(2)),
    };
  });

  console.log(restaurants[0]);

  return NextResponse.json(data);
}