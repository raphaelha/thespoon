import Image from "next/image";
import { UsersIcon } from "@heroicons/react/24/outline";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

type Member = {
  user: {
    id: string;
    name?: string | null;
    image?: string | null;
  };
};

type CommunityMembersProps = {
  members: Member[];
  memberScores: Record<string, number>;
};

export default function CommunityMembers({ members, memberScores }: CommunityMembersProps) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
        <UsersIcon className="h-6 w-6" />
        Membres
      </h2>
      <div className="flex flex-wrap gap-4">
        {members.length === 0 && (
          <div className="text-text/60">Aucun membre pour l’instant.</div>
        )}
        {members.map(({ user }) => (
          <div key={user.id} className="flex flex-col items-center">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "Avatar"}
                width={48}
                height={48}
                className="rounded-full object-cover border border-secondary"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-lg">
                {user.name ? getInitials(user.name) : "?"}
              </div>
            )}
            <span className="text-xs mt-1 font-semibold text-text">{user.name || "Anonyme"}</span>
            <span className="text-xs text-text/60">
              {memberScores[user.id] ? `Score : ${memberScores[user.id].toFixed(1)}` : "Pas encore de vote"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}