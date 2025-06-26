"use client";

import { useRouter } from "next/navigation";

const communities = [
	{ id: "abc1", name: "Yves Rocher" },
	{ id: "abc2", name: "Promo 2022" },
	{ id: "abc3", name: "Les copains de Lyon" },
	{ id: "abc4", name: "Le clan du cassoulet" },
];

export default function MyCommunities() {
	const router = useRouter();

	return (
		<section className="mb-10  ">
			<h2 className="text-xl px-3 font-semibold text-text mb-4">Mes communautés</h2>
			<div className="flex overflow-x-auto gap-4 pb-2">
				{communities.map((community) => (
					<div
						key={community.id}
						onClick={() => router.push(`/community/${community.id}`)}
						className="flex flex-col items-center cursor-pointer min-w-[96px] hover:scale-105 transition-transform duration-150"
					>
						{/* Cercle coloré animé en fond */}
						<div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
							<div className="absolute inset-0 rounded-full bg-primary/10 blur-xl opacity-80 -z-10" />
							<div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary flex items-center justify-center text-white font-bold shadow-md text-2xl select-none">
								{community.name
									.split(" ")
									.map((w) => w[0])
									.join("")
									.slice(0, 2)
									.toUpperCase()}
							</div>
						</div>
						<p className="text-sm text-text text-center mt-2 max-w-[120px] whitespace-normal break-words font-semibold text-primary leading-tight">
							{community.name}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
