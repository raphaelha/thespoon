"use client";
import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type Community = {
	id: string;
	name: string;
	members?: number;
	description?: string;
};

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
		<section className="w-full flex flex-col items-left justify-center px-4 max-w-6xl mx-auto font-sans bg-bg">
			<h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 flex items-center gap-2">
				<UsersIcon className="h-7 w-7" />
				Communautés publiques
			</h2>
			{loading ? (
				<div className="text-text/60 py-12 text-center">Chargement...</div>
			) : (
				<div className="grid gap-6 sm:grid-cols-2 w-full">
					{communities.length === 0 && (
						<div className="col-span-2 text-text/60 text-center">
							Aucune communauté publique pour le moment.
						</div>
					)}
					{communities.map((community) => (
						<div
							key={community.id}
							className="bg-white border border-secondary/30 rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col gap-2"
						>
							<div className="flex items-center gap-2 mb-1">
								<UsersIcon className="h-5 w-5 text-primary" />
								<span className="font-semibold text-lg text-text">
									{community.name}
								</span>
							</div>
							<div className="text-sm text-text/70 mb-2">
								{community.description || "Aucune description."}
							</div>
							<div className="flex items-center justify-between mt-auto">
								<span className="text-xs text-text/60">
									{community.members !== undefined
										? `${community.members} membres`
										: ""}
								</span>
								<Link
									href={`/community/${community.id}`}
									className="px-4 py-2 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-blue-700 transition"
								>
									Voir
								</Link>
							</div>
						</div>
					))}
				</div>
			)}
		</section>
	);
}