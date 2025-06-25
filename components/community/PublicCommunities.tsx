"use client";
import Link from "next/link";
import { UsersIcon, UserGroupIcon, FireIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import CommunityCard from "./CommunityCard";

// Type basé sur Prisma Community + relations utiles
type Community = {
	id: string;
	name: string;
	description?: string | null;
	isPublic: boolean;
	createdAt: string;
	members: { id: string }[];
	votes: { id: string }[];
};

function getAvatarUrl(name: string) {
	// Avatar initials avec DiceBear
	return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
		name
	)}&backgroundType=gradientLinear&fontSize=36`;
}

export default function PublicCommunities() {
	const [communities, setCommunities] = useState<Community[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/community")
			.then((res) => res.json())
			.then((data) => {
				setCommunities(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	return (
		<section className="w-full flex flex-col items-start justify-center px-4 max-w-6xl mx-auto font-sans bg-gray-50 py-10 rounded-xl">
			<h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-8 flex items-center gap-3">
				<UsersIcon className="h-8 w-8" />
				Communautés les plus actives
			</h2>
			{loading ? (
				<div className="text-text/60 py-12 text-center w-full">
					Chargement...
				</div>
			) : (
				<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 w-full">
					{communities.length === 0 && (
						<div className="col-span-full text-text/60 text-center py-12">
							Aucune communauté publique pour le moment.
						</div>
					)}
					{communities.map((community) => (
						<CommunityCard key={community.id} community={community} />
					))}
				</div>
			)}
		</section>
	);
}