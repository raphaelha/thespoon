import { UsersIcon, LinkIcon } from "@heroicons/react/24/outline";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

type CommunityHeaderProps = {
  name: string;
  description?: string;
  membersCount: number;
  onJoin?: () => void;
  onShare?: () => void;
};

export default function CommunityHeader({
  name,
  description,
  membersCount,
  onJoin,
  onShare,
}: CommunityHeaderProps) {
  return (
    <section className="flex flex-col sm:flex-row items-center gap-6 mb-10">
      <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold shadow">
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
        <button
          className="px-5 py-2 rounded-2xl bg-primary text-white font-bold shadow hover:bg-blue-700 transition"
          onClick={onJoin}
        >
          Rejoindre
        </button>
        <button
          className="px-5 py-2 rounded-2xl bg-secondary text-primary font-bold shadow hover:bg-yellow-300 transition flex items-center gap-2"
          onClick={onShare}
        >
          <LinkIcon className="h-5 w-5" />
          Partager le lien
        </button>
      </div>
    </section>
  );
}