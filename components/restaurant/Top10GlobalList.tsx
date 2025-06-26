"use client";

import React, { useState, useEffect } from "react";
import RestaurantListItem from "./RestaurantListItem";

const rankBadges = [
  <span key={1} className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-yellow-400 ring-2 ring-yellow-300 bg-transparent">
    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
      <path d="M7 17a3 3 0 006 0v-1H7v1zm9-9V5a2 2 0 00-2-2H6a2 2 0 00-2 2v3a5 5 0 004 4.9V15a1 1 0 102 0v-2.1A5 5 0 0016 8zM6 5h8v3a3 3 0 01-6 0V5z" />
    </svg>
  </span>,
  <span key={2} className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400 ring-2 ring-gray-300 bg-transparent">
    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
    </svg>
  </span>,
  <span key={3} className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-amber-700 ring-2 ring-amber-400 bg-transparent">
    <svg className="w-6 h-6 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
    </svg>
  </span>,
];

export default function Top10GlobalList() {
  const [ranking, setRanking] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/userranking")
      .then((res) => res.json())
      .then(setRanking);
  }, []);

  const visibleData = showAll ? ranking.slice(0, 10) : ranking.slice(0, 5);

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
            badge={idx < 3 ? rankBadges[idx] : undefined}
          />
        ))}
      </ul>
      {ranking.length > 5 && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 rounded-full bg-secondary text-white font-bold shadow hover:bg-blue-700 transition"
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? "Voir moins" : "Voir plus"}
          </button>
        </div>
      )}
      <div className="mt-4 text-center text-xs text-gray-500">
        Classement basé sur le nombre total de votes, toutes communautés confondues.
      </div>
    </section>
  );
}

