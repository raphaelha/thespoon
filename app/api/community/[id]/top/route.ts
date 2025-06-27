import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rankRestaurantsByWilson } from "@/utils/restaurantsUtils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const communityId = params.id;

  const votes = await prisma.vote.findMany({
    where: { communityId },
    include: { restaurant: true },
  });

  const restaurantMap = new Map<
    string,
    { restaurant: any; totalScore: number; totalVotes: number }
  >();

  for (const vote of votes) {
    const resto = vote.restaurant;
    if (!resto) continue;
    if (!restaurantMap.has(resto.id)) {
      restaurantMap.set(resto.id, { restaurant: resto, totalScore: 0, totalVotes: 0 });
    }
    restaurantMap.get(resto.id)!.totalScore += vote.note ?? 0;
    restaurantMap.get(resto.id)!.totalVotes += 1;
  }

  const ranked = rankRestaurantsByWilson(Array.from(restaurantMap.values()));

  return NextResponse.json(ranked);
}