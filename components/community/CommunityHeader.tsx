"use client";

import { UsersIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "../auth/AuthModal";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

type CommunityHeaderProps = {
  communityId: string; // <-- ajoute cette ligne
  name: string;
  description?: string;
  membersCount: number;
  isMember?: boolean;
  isPublic?: boolean;
  onJoin?: () => void;
  onLeave?: () => void;
  onShare?: () => void;
  onAddRestaurant?: () => void;
  // ... autres props si besoin
};

export default function CommunityHeader({
  communityId,
  name,
  description,
  membersCount,
  onJoin,
  onLeave,
  onShare,
  isMember,
  onAddRestaurant,
  isPublic = true,
}: CommunityHeaderProps) {
  const { isSignedIn } = useUser();
  const [authOpen, setAuthOpen] = useState(false);
  const router = useRouter();

  const handleJoin = async () => {
    if (!isSignedIn) {
      setAuthOpen(true);
      return;
    }
    await fetch("/api/community/join", {
      method: "POST",
      body: JSON.stringify({ communityId }), // <-- ici
      headers: { "Content-Type": "application/json" },
    });
    router.refresh(); // Pour rafraîchir la page après l'action
  };

  const handleLeave = () => {
    onLeave?.();
  };

  const handleAddRestaurant = () => {
    if (!isSignedIn) {
      setAuthOpen(true);
      return;
    }
    onAddRestaurant?.();
  };

  return (
    <>
      <section className="flex flex-col sm:flex-row items-center gap-6 mb-2">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary text-3xl font-bold shadow">
          {name ? getInitials(name) : <UsersIcon className="h-10 w-10" />}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-primary mb-1">{name}</h1>
          <div className="text-text/70 mb-2">{description}</div>
          <div className="flex items-center gap-3 text-sm text-text/70">
            <UsersIcon className="h-5 w-5" />
            {membersCount} membres
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {isSignedIn && isMember ? (
            <>
              <button
                className="px-5 py-2 rounded-2xl bg-red-100 text-red-700 font-bold shadow hover:bg-red-200 transition"
                onClick={handleLeave}
              >
                Quitter la communauté
              </button>
              <button
                className="px-5 py-2 rounded-2xl bg-green-600 text-red font-bold shadow hover:bg-green-700 transition"
                onClick={handleAddRestaurant}
              >
                Noter un nouveau restaurant
              </button>
            </>
          ) : (
            <button
              className="px-5 py-2 rounded-2xl bg-primary text-red font-bold shadow hover:bg-blue-700 transition"
              onClick={handleJoin}
              disabled={!isPublic}
            >
              Rejoindre
            </button>
          )}
          <button
            className="px-5 py-2 rounded-2xl bg-secondary text-white font-bold shadow hover:bg-yellow-300 transition flex items-center gap-2"
            onClick={onShare}
          >
            <LinkIcon className="h-5 w-5" />
            Partager le lien
          </button>
        </div>
      </section>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}