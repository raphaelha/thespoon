"use client";

import { useEffect, useState } from "react";
import RestaurantListItem from "../restaurant/RestaurantListItem";
import type { Restaurant } from "@prisma/client";

type RankedResto = Restaurant & {
  totalVotes: number;
  totalScore: number;
  averageVote: number;
  wilsonScore: number;
};

type CommunityTopProps = {
  communityId: string;
};

export default function CommunityTop({ communityId }: CommunityTopProps) {
  const [top, setTop] = useState<RankedResto[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/community/${communityId}/top`)
      .then((res) => res.json())
      .then((data) => setTop(data))
      .finally(() => setLoading(false));
  }, [communityId]);

  const visibleData = top.slice(0, visibleCount);

  return (
    <section className="w-full bg-transparent py-6 px-2 sm:px-6">
      <h2 className="text-xl sm:text-2xl font-extrabold text-primary text-center mb-2 tracking-tight">
        Top food de la communauté
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-primary to-blue-400 mx-auto mb-6" />
      <ul className="flex flex-col gap-3">
        {loading && (
          <li className="text-text/60 text-center">Chargement…</li>
        )}
        {!loading && top.length === 0 && (
          <li className="text-text/60 text-center">Aucun vote pour l’instant.</li>
        )}
        {visibleData.map((resto, idx) => (
          <li key={resto.id} className="relative">
            <RestaurantListItem
              resto={resto}
              idx={idx}
              totalVotes={resto.totalVotes}
              totalScore={resto.totalScore}
              averageVote={resto.averageVote}
              wilsonScore={resto.wilsonScore}
              onClick={undefined}
            />
          </li>
        ))}
      </ul>
      {!loading && visibleCount < top.length && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 rounded-xl bg-primary text-secondary font-semibold shadow hover:bg-blue-700 transition"
            onClick={() => setVisibleCount((c) => Math.min(c + 5, top.length))}
          >
            Voir plus
          </button>
        </div>
      )}
    </section>
  );
}