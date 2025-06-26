import { prisma } from "@/lib/prisma";
import type { Restaurant } from "@/types/prisma";

// Récupère les votes d'un restaurant depuis la base de données
export async function getVotesFromRestaurant(resto: Restaurant): Promise<number[]> {
  const votes = await prisma.vote.findMany({
    where: { restaurantId: resto.id },
    select: { note: true },
  });
  return votes.map(v => v.note);
}

// Calcule le nombre total de votes pour un restaurant (requête en base)
export async function getTotalVotes(resto: Restaurant): Promise<number> {
  const votes = await getVotesFromRestaurant(resto);
  return votes.length;
}

// Calcule la moyenne des votes pour un restaurant (requête en base)
export async function getAverageVote(resto: Restaurant): Promise<number> {
  const votes = await getVotesFromRestaurant(resto);
  if (!votes.length) return 0;
  return votes.reduce((sum, note) => sum + note, 0) / votes.length;
}