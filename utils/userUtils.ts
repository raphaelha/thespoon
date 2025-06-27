// lib/auth.ts
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { rankRestaurantsByWilson } from "@/utils/restaurantsUtils";

/**
 * Récupère les communautés, restaurants et votes associés à l'utilisateur courant
 * puis calcule le classement global des restaurants.
 * @returns Un tableau trié des restaurants avec leur total de votes et leur rang
 */
export async function getUserGlobalRestaurantRankingForCurrentUser() {
  const { userId } = await auth();
  if (!userId) return [];

  const userWithCommunities = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      memberships: {
        include: {
          community: {
            include: {
              votes: {
                include: { restaurant: true },
              },
            },
          },
        },
      },
    },
  });

  if (!userWithCommunities) return [];

  const communities = userWithCommunities.memberships.map((m) => m.community);

  // On cumule la somme des notes et le nombre de votes pour chaque restaurant
  const restaurantMap = new Map<
    string,
    { restaurant: any; totalScore: number; totalVotes: number }
  >();

  for (const community of communities) {
    for (const vote of community.votes) {
      const resto = vote.restaurant;
      if (!resto) continue;
      if (!restaurantMap.has(resto.id)) {
        restaurantMap.set(resto.id, { restaurant: resto, totalScore: 0, totalVotes: 0 });
      }
      restaurantMap.get(resto.id)!.totalScore += vote.note ?? 0;
      restaurantMap.get(resto.id)!.totalVotes += 1;
    }
  }

  // Utilisation de la fonction factorisée
  const ranked = rankRestaurantsByWilson(Array.from(restaurantMap.values()));

  return ranked;
}



