"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import CommunityHeader from "@/components/community/CommunityHeader";
import CommunityTop from "@/components/community/CommunityTop";
import CommunityMembers from "@/components/community/CommunityMembers";
import { ArrowLeftOnRectangleIcon, LinkIcon } from "@heroicons/react/24/outline";
import DashboardCard from "@/components/layout/DashboardCard";


export default function CommunityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [community, setCommunity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/community/${id}`)
      .then((res) => res.json())
      .then((data) => setCommunity(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (!loading && (!community || community.error)) return notFound();

  // Ici, tu peux ajouter la logique pour détecter si l'utilisateur est membre (ex: via un autre fetch ou context utilisateur)
  // Pour l'exemple, on suppose que tu n'as pas cette info côté client
  const isMember = true; // À adapter selon ton auth

  // Les scores membres ne sont plus calculés ici, mais tu peux les charger via une autre API si besoin

  return (
    <div className="max-w-4xl mx-auto font-sans">
      <DashboardCard>
        {loading ? (
          <div className="p-8 text-center text-text/60">Chargement…</div>
        ) : (
          <>
            <CommunityHeader
              communityId={community.id}
              name={community.name}
              description={community.description ?? undefined}
              membersCount={community.membersCount ?? 0}
              isMember={isMember}
              isPublic={community.isPublic}
            />
            <CommunityTop communityId={community.id} />
            <CommunityMembers communityId={community.id} memberScores={{}} />
          </>
        )}
      </DashboardCard>
    </div>
  );
}