import { StarIcon, TrophyIcon } from "@heroicons/react/24/outline";

type Resto = {
  id: string;
  name: string;
  avg: number;
  votes: number;
};

type CommunityTop10Props = {
  top10: Resto[];
  daysAgo: number;
  isTopVille?: (id: string) => boolean;
};

export default function CommunityTop10({ top10, daysAgo, isTopVille }: CommunityTop10Props) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
        <TrophyIcon className="h-6 w-6" />
        Top 10 des restaurants de la communauté
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {top10.length === 0 && (
          <div className="col-span-2 text-text/60 text-center">Aucun vote pour l’instant.</div>
        )}
        {top10.map((resto, i) => (
          <div
            key={resto.id}
            className="bg-white rounded-2xl shadow hover:bg-gray-50 transition p-5 flex flex-col gap-2 relative"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-primary">{i + 1}.</span>
              <span className="font-semibold text-text">{resto.name}</span>
              {isTopVille && isTopVille(resto.id) && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-accent text-white text-xs flex items-center gap-1">
                  <StarIcon className="h-4 w-4" /> Top ville
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-text/70">
              <span>
                Moyenne : <span className="font-bold text-text">{resto.avg.toFixed(1)}</span>
              </span>
              <span>
                {resto.votes} vote{resto.votes > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-text/50 mt-3">
        Classement mis à jour il y a {daysAgo === 0 ? "moins d'un jour" : `${daysAgo} jour${daysAgo > 1 ? "s" : ""}`}
      </div>
    </section>
  );
}