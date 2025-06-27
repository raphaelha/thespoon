import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id: restaurantId } = context.params;

  // Récupère tous les votes pour ce restaurant
  const votes = await prisma.vote.findMany({
    where: { restaurantId },
    select: { note: true },
  });

  const totalVotes = votes.length;
  const averageVote =
    totalVotes > 0
      ? votes.reduce((sum, v) => sum + v.note, 0) / totalVotes
      : null;

  return NextResponse.json({ totalVotes, averageVote });
}