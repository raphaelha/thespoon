"use client";

import React, { useState, useEffect } from "react";
import RestaurantListItem from "./RestaurantListItem";

export default function UserTop10GlobalList() {
  const [ranking, setRanking] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    fetch("/api/userranking")
      .then((res) => res.json())
      .then(setRanking);
  }, []);

  const visibleData = ranking.slice(0, visibleCount);

  return (
    <section className="w-full bg-transparent py-6 px-2 sm:px-6">
      <h2 className="text-xl sm:text-2xl font-extrabold text-primary text-center mb-2 tracking-tight">
        Top food de mes communautés
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-primary to-blue-400 mx-auto mb-6" />
      <ul className="flex flex-col gap-3">
        {visibleData.map((resto, idx) => (
          <RestaurantListItem
            key={resto.id}
            resto={resto}
            idx={idx}
            totalVotes={resto.totalVotes}
            totalScore={resto.totalScore}
            averageVote={resto.averageVote}
            wilsonScore={resto.wilsonScore}
          />
        ))}
      </ul>
      {visibleCount < ranking.length && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 rounded-xl bg-primary text-secondary font-semibold shadow hover:bg-blue-700 transition"
            onClick={() => setVisibleCount((c) => Math.min(c + 5, ranking.length))}
          >
            Voir plus
          </button>
        </div>
      )}
      <div className="mt-4 text-center text-xs text-gray-500">
        Classement basé sur les votes de toutes vos communautés.
      </div>
    </section>
  );
}

