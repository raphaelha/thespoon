"use client";

import React, { useEffect, useState } from "react";
import type { Restaurant } from "@/types/prisma";
import { getTotalVotes, getAverageVote } from "@/utils/restaurantUtils";

type Props = {
  resto: Restaurant;
  idx: number;
  badge?: React.ReactNode;
  highlight?: boolean;
  onClick?: () => void;
};

export default function RestaurantListItem({
  resto,
  idx,
  badge,
  highlight = false,
  onClick,
}: Props) {
  const [totalVotes, setTotalVotes] = useState<number | null>(null);
  const [averageVote, setAverageVote] = useState<number | null>(null);

  useEffect(() => {
    async function fetchVotes() {
      const total = await getTotalVotes(resto);
      const avg = await getAverageVote(resto);
      setTotalVotes(total);
      setAverageVote(avg);
    }
    fetchVotes();
  }, [resto]);

  return (
    <li
      className={`
        flex items-center justify-between px-4 py-3 rounded-xl
        ${highlight ? "bg-blue-50/70" : "bg-white border border-gray-100 shadow"}
        transition-all cursor-pointer
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 min-w-0">
        {badge ? (
          badge
        ) : (
          <span className="inline-block w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-700 font-bold text-lg shadow">
            {idx}
          </span>
        )}
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-base sm:text-lg truncate">{resto.name}</span>
          <span className="text-xs text-gray-500 truncate">{resto.city || resto.address}</span>
        </div>
      </div>
      <span className="font-bold text-lg sm:text-xl flex items-center gap-1 text-primary">
        {totalVotes !== null && totalVotes > 0 ? (
          <>
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 11.5A7.5 7.5 0 0110.5 4a7.5 7.5 0 017.5 7.5c0 4.142-3.358 7.5-7.5 7.5S3 15.642 3 11.5z" />
            </svg>
            {totalVotes}
          </>
        ) : averageVote !== null && averageVote > 0 ? (
          <span className="text-xl font-extrabold text-blue-700">{averageVote.toFixed(1)}/5</span>
        ) : (
          "-"
        )}
      </span>
    </li>
  );
}