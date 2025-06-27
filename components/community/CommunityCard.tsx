"use client";
import Link from "next/link";
import { UsersIcon, FireIcon } from "@heroicons/react/24/outline";

type Community = {
  id: string;
  name: string;
  description?: string | null;
  members: { id: string }[];
  votes: { id: string }[];
};

function getAvatarUrl(name: string) {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    name
  )}&backgroundType=gradientLinear&fontSize=36`;
}

export default function CommunityCard({ community }: { community: Community }) {
  const members = community.members ?? [];
  const votes = community.votes ?? [];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all p-5 flex flex-col gap-3 group relative overflow-hidden">
      {/* Anneau coloré animé */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary/10 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition" />
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-1">
        <div className="relative">
          <img
            src={getAvatarUrl(community.name)}
            alt={community.name}
            className="w-12 h-12 rounded-full border-2 border-secondary/60 shadow"
          />
          <span className="absolute -bottom-1 -right-1 bg-primary text-black rounded-full px-2 py-0.5 text-xs font-bold shadow ring-2 ring-white">
            {members.length}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="block font-bold text-lg text-gray-900 truncate">
            {community.name}
          </span>
          <span className="block text-xs text-gray-500">
            {votes.length} vote{votes.length > 1 ? "s" : ""} • {members.length} membre{members.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="text-sm text-gray-700 mb-1 line-clamp-2 italic">
        {community.description || "Aucune description."}
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 text-xs mt-1">
        <span className="flex items-center gap-1 bg-primary/10 text-secondary px-2 py-0.5 rounded-full font-semibold">
          <UsersIcon className="h-4 w-4" />
          {members.length} membre{members.length > 1 ? "s" : ""}
        </span>
        <span className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-semibold">
          <FireIcon className="h-4 w-4" />
          {votes.length} vote{votes.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Action */}
      <div className="flex justify-end mt-2">
        <Link
          href={`/community/${community.id}`}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-secondary font-semibold text-xs hover:bg-blue-700 transition shadow group-hover:scale-105"
        >
          <span>Voir</span>
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}