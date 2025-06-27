"use client";

import React from "react";
import type { Restaurant } from "@/types/prisma";

type Props = {
  resto: Restaurant;
  idx: number;
  highlight?: boolean;
  onClick?: () => void;
  totalVotes: number;
  totalScore: number;
  averageVote?: number;
  wilsonScore: number;
};

function getRankBadge(idx: number) {
  if (idx === 0)
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-yellow-400 text-yellow-600 font-bold text-lg shadow bg-white">
        1
      </span>
    );
  if (idx === 1)
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-400 text-gray-600 font-bold text-lg shadow bg-white">
        2
      </span>
    );
  if (idx === 2)
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-amber-700 text-amber-700 font-bold text-lg shadow bg-white">
        3
      </span>
    );
  // Pour les rangs > 3, badge simple sans couleur particulière
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-white font-bold text-lg shadow">
      {idx + 1}
    </span>
  );
}

export default function RestaurantListItem(props: Props) {
  const {
    resto,
    idx,
    highlight = false,
    onClick,
    totalVotes,
    totalScore,
    averageVote
  } = props;

  // Si averageVote n'est pas passé, on le calcule
  const avg = averageVote ?? (totalVotes > 0 ? totalScore / totalVotes : null);

  return (
    <div
      className={`
        flex items-center justify-between px-4 py-3 rounded-xl
        ${highlight ? "bg-blue-50/70" : "bg-white border border-gray-100 shadow"}
        transition-all cursor-pointer
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 min-w-0">
        {getRankBadge(idx)}
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-base sm:text-lg truncate">{resto.name}</span>
          <span className="text-xs text-gray-500 truncate">{resto.city || resto.address}</span>
        </div>
      </div>
      <div className="flex flex-col items-end min-w-[70px]">
        <span className="font-bold text-xl sm:text-2xl text-primary">
          {avg !== null ? `${avg.toFixed(1)}/5` : "N/A"}
        </span>
        <span className="text-xs text-gray-500">
          {totalVotes} vote{totalVotes > 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}