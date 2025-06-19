"use client";
import { UsersIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function HeroSection() {
  return (
    <section className="w-full flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16 py-12 md:py-20 px-4 max-w-6xl mx-auto font-sans bg-bg pt-20">
      {/* Texte à gauche */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left justify-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text mb-2">
          TripAdvisor c’est bien.
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4">
          Mais t’as pas les mêmes goûts que tata Monique.
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-text mb-8 max-w-xl">
          Ici, tu votes avec ton équipe, ta boîte ou tes potes.<br />
          Et tu sais enfin où aller sans te planter.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center md:justify-start">
          <button
            className="flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-primary hover:bg-blue-700 text-white font-bold shadow-lg transition w-full sm:w-auto text-lg ring-2 ring-primary/10 focus:ring-4 focus:ring-primary/30 whitespace-nowrap min-w-[270px]"
            onClick={() => window.location.href = "/leaderboard"}
          >
            <MapPinIcon className="h-6 w-6" />
            Voir le top 10 de ma ville
          </button>
          <button
            className="flex items-center justify-center gap-2 px-10 py-4 rounded-2xl border-2 border-text text-text font-bold bg-white hover:bg-secondary/20 transition w-full sm:w-auto text-lg shadow focus:ring-4 focus:ring-secondary/30 whitespace-nowrap min-w-[270px]"
            onClick={() => window.location.href = "/create-leaderboard"}
          >
            <UsersIcon className="h-6 w-6" />
            <span>Créer mon leaderboard d’équipe</span>
          </button>
        </div>
      </div>
      {/* Illustration à droite */}
      <div className="flex-1 flex items-center justify-center w-full mb-8 md:mb-0">
        <div className="w-72 h-72 sm:w-96 sm:h-96 bg-secondary/10 rounded-2xl flex items-center justify-center shadow-inner border border-secondary/30 overflow-hidden">
          <img
            src="/restaurant.jpg"
            alt="Illustration d'un restaurant"
            className="w-full h-full object-cover rounded-2xl"
            style={{ objectPosition: "center" }}
          />
        </div>
      </div>
    </section>
  );
}