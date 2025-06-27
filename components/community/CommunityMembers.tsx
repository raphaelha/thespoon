"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { UsersIcon } from "@heroicons/react/24/outline";
import type { User, UserCommunity } from "@prisma/client";

function getInitials(firstName?: string | null, lastName?: string | null, pseudo?: string | null, email?: string | null) {
  if (firstName || lastName) {
    return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
  }
  if (pseudo) return pseudo.slice(0, 2).toUpperCase();
  if (email) return email.slice(0, 2).toUpperCase();
  return "?";
}

type MemberWithUser = UserCommunity & {
  user: Pick<User, "id" | "firstName" | "lastName" | "pseudo" | "email" | "image">;
};

type CommunityMembersProps = {
  communityId: string;
  memberScores: Record<string, number>;
};

export default function CommunityMembers({ communityId, memberScores }: CommunityMembersProps) {
  const [members, setMembers] = useState<MemberWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/community/${communityId}/members`)
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .finally(() => setLoading(false));
  }, [communityId]);

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2 px-2 ">
        <UsersIcon className="h-6 w-6" />
        Membres
      </h2>
      <div className="flex overflow-x-auto gap-3 pt-1 pb-2">
        {members.map(({ user }) => (
          <div
            key={user.id}
            className="flex flex-col items-center min-w-[96px] hover:scale-105 transition-transform duration-150 overflow-visible"
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center overflow-visile">
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl opacity-80 -z-10 overflow-visible" />
              {user.image ? (
                <Image
                  src={user.image}
                  alt={
                    user.firstName || user.lastName || user.pseudo || user.email || "Avatar"
                  }
                  width={80}
                  height={80}
                  className="rounded-full object-cover border border-secondary w-16 h-16 md:w-20 md:h-20 "
                />
              ) : (
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-2xl select-none shadow-md">
                  {getInitials(user.firstName, user.lastName, user.pseudo, user.email)}
                </div>
              )}
            </div>
            <span className="text-xs mt-2 font-semibold text-text text-center max-w-[90px] truncate">
              {user.firstName || user.lastName
                ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
                : user.pseudo || user.email || "Anonyme"}
            </span>
            <span className="text-xs text-text/60 text-center max-w-[90px] truncate">
              {memberScores[user.id]
                ? `Score : ${memberScores[user.id].toFixed(1)}`
                : "Pas encore de vote"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}