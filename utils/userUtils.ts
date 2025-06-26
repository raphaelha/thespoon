// lib/auth.ts
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

/**
 * Récupère les communautés, restaurants et votes associés à l'utilisateur courant
 * puis calcule le classement global des restaurants.
 * @returns Un tableau trié des restaurants avec leur total de votes et leur rang
 */
export async function getUserGlobalRestaurantRankingForCurrentUser() {
  const { userId } = await auth();
  console.log("[RANKING] userId:", userId);
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

  console.log(
    "[RANKING] userWithCommunities:",
    JSON.stringify(userWithCommunities, null, 2)
  );

  if (!userWithCommunities) return [];

  const communities = userWithCommunities.memberships.map((m) => m.community);
  console.log("[RANKING] communities.length:", communities.length);

  const restaurantMap = new Map<
    string,
    { restaurant: any; totalVotes: number }
  >();

  for (const community of communities) {
    console.log(
      `[RANKING] community ${community.id} votes:`,
      community.votes.length
    );
    for (const vote of community.votes) {
      const resto = vote.restaurant;
      if (!resto) continue;
      if (!restaurantMap.has(resto.id)) {
        restaurantMap.set(resto.id, { restaurant: resto, totalVotes: 0 });
      }
      restaurantMap.get(resto.id)!.totalVotes += 1;
    }
  }

  console.log("[RANKING] restaurantMap:", Array.from(restaurantMap.entries()));

  const ranked = Array.from(restaurantMap.values())
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .map((entry, idx) => ({
      ...entry.restaurant,
      totalVotes: entry.totalVotes,
      rank: idx + 1,
    }));

  console.log("[RANKING] ranked:", ranked);

  return ranked;
}



