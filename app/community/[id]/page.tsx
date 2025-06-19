import { notFound } from "next/navigation";
import { getCommunityById } from "@/data/getCommunityById";
import { getServerSession } from "next-auth";
import { UsersIcon, LinkIcon, ArrowLeftOnRectangleIcon, StarIcon, TrophyIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import CommunityHeader from "@/components/community/CommunityHeader";
import CommunityTop10 from "@/components/community/CommunityTop10";
import CommunityMembers from "@/components/community/CommunityMembers";

// Utilitaire pour les initiales
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Simule le top ville (à remplacer par une vraie logique)
function isTopVille(restaurantId: string) {
  return Math.random() > 0.7;
}

export default async function CommunityDetailPage(props: { params: { id: string } }) {
  const { id } = await props.params;
  const community = await getCommunityById(id);
  const session = await getServerSession();

  if (!community) return notFound();

  // Classement des restos par moyenne des notes
  const restoStats: {
    id: string;
    name: string;
    avg: number;
    votes: number;
  }[] = [];
  const restoMap: Record<string, { total: number; count: number; name: string }> = {};

  for (const vote of community.votes) {
    if (!restoMap[vote.restaurantId]) {
      restoMap[vote.restaurantId] = { total: 0, count: 0, name: vote.restaurant.name };
    }
    restoMap[vote.restaurantId].total += vote.note;
    restoMap[vote.restaurantId].count += 1;
  }
  for (const [id, { total, count, name }] of Object.entries(restoMap)) {
    restoStats.push({ id, name, avg: total / count, votes: count });
  }
  restoStats.sort((a, b) => b.avg - a.avg);
  const top10 = restoStats.slice(0, 10);

  // Score total par membre
  const memberScores: Record<string, number> = {};
  for (const vote of community.votes) {
    memberScores[vote.userId] = (memberScores[vote.userId] || 0) + vote.note;
  }

  // Date de dernière maj du classement
  const lastUpdate = community.votes.length
    ? Math.max(...community.votes.map((v) => v.createdAt.getTime()))
    : community.createdAt.getTime();
  const daysAgo = Math.floor((Date.now() - lastUpdate) / (1000 * 60 * 60 * 24));

  // Vérifie si l'utilisateur connecté appartient à la communauté
  const isMember =
    !!session &&
    community.members.some(
      (m: any) => m.userId === (session.user as { id?: string })?.id
    );

  return (
    <main className="max-w-4xl mx-auto py-10 px-4 pt-20">
      <CommunityHeader
        name={community.name}
        description={community.description ?? undefined}
        membersCount={community.members.length}
        // Ajoute ici les handlers si besoin
      />

      {/* Classement personnalisé */}
      <CommunityTop10 top10={top10} daysAgo={daysAgo} isTopVille={isTopVille} />

      {/* Membres : visible uniquement si connecté ET membre */}
      {isMember && (
        <CommunityMembers members={community.members} memberScores={memberScores} />
      )}

      {/* CTA quitter/inviter : visible uniquement si connecté ET membre */}
      {isMember && (
        <section className="flex gap-3 mt-8">
          <button className="px-5 py-2 rounded-2xl bg-danger text-white font-bold shadow hover:bg-red-600 transition flex items-center gap-2">
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            Quitter la communauté
          </button>
          <button className="px-5 py-2 rounded-2xl bg-secondary text-primary font-bold shadow hover:bg-yellow-300 transition flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            Inviter via lien
          </button>
        </section>
      )}
    </main>
  );
}