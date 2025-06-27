import { prisma } from "@/lib/prisma";
import type { Restaurant } from "@/types/prisma";

/**
 * Classe et retourne un tableau de restaurants selon le score de Wilson.
 * @param restaurantsVotes Tableau d'objets { restaurant, totalScore, totalVotes }
 * @returns Tableau trié et enrichi avec averageVote, wilsonScore, rank
 */
export function rankRestaurantsByWilson(restaurantsVotes: {
  restaurant: any;
  totalScore: number;
  totalVotes: number;
}[]) {
  const z = 1.96; // 95% intervalle de confiance
  return restaurantsVotes
    .map((entry) => {
      const n = entry.totalVotes;
      const avg = n > 0 ? entry.totalScore / n : 0;
      const p = avg / 5;
      const wilson =
        n === 0
          ? 0
          : (
              p +
              (z * z) / (2 * n) -
              z *
                Math.sqrt(
                  (p * (1 - p) + (z * z) / (4 * n)) / n
                )
            ) /
            (1 + (z * z) / n);
      return {
        ...entry.restaurant,
        totalScore: entry.totalScore,
        totalVotes: entry.totalVotes,
        averageVote: avg,
        wilsonScore: wilson * 5, // pour rester sur une échelle de 5
      };
    })
    .sort((a, b) => b.wilsonScore - a.wilsonScore)
    .map((entry, idx) => ({
      ...entry,
      rank: idx + 1,
    }));
}

