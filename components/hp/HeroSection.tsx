"use client";
import { useEffect, useRef, useState } from "react";
import { UsersIcon } from "@heroicons/react/24/outline";

export default function HeroSection({ parallaxOffset = 0 }: { parallaxOffset?: number }) {
  const mainBtnRef = useRef<HTMLButtonElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const btn = mainBtnRef.current;
    if (!btn) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(btn);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full h-screen font-sans bg-bg overflow-hidden">
      {/* Image en arrière-plan avec effet parallaxe */}
      <img
        src="/restaurant.jpg"
        alt="Illustration d'un restaurant"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: "center",
          transform: `translateY(calc(-200px + ${parallaxOffset * 0.5}px))`,
          willChange: "transform",
        }}
      />
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenu centré */}
      <div className="relative z-10 flex flex-col h-full justify-center px-4
        items-start text-left
        sm:items-center sm:text-center
        pt-80 sm:pt-100
      ">
        <h1 className="text-6xl sm:text-6xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
          TripAdvisor c’est bien
        </h1>
        <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-8 drop-shadow">
          Mais t’as pas les mêmes goûts que tata Monique.
        </h2>
        {/* Bouton visible dans le flux seulement sur desktop */}
        <div className="hidden sm:block">
          <button
            ref={mainBtnRef}
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-gray-100 text-[#000000] text-lg font-bold uppercase shadow-lg hover:bg-beige transition-colors"
            style={{ letterSpacing: "0.05em" }}
            onClick={() => window.location.href = "/join"}
            aria-label="Rejoindre la communauté"
          >
            Rejoindre la communauté
          </button>
        </div>
      </div>
      {/* Bouton fixé en bas sur mobile */}
      <div className="sm:hidden absolute bottom-20 left-0 w-full flex justify-center px-4">
        <button
          ref={mainBtnRef}
          className="flex items-center justify-center gap-2 w-full max-w-md px-8 py-4 rounded-full bg-gray-100 text-[#000000] text-lg font-bold uppercase shadow-lg hover:bg-beige transition-colors"
          style={{ letterSpacing: "0.05em" }}
          onClick={() => window.location.href = "/join"}
          aria-label="Rejoindre la communauté"
        >
          Créer ta communauté
        </button>
      </div>
      {/* Sticky bouton en bas à droite */}
      {showSticky && (
        <button
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-white/90 text-[#1b3670] text-base font-bold shadow-lg border border-gray-200 hover:bg-beige transition-colors"
          style={{ letterSpacing: "0.05em" }}
          onClick={() => window.location.href = "/join"}
          aria-label="Rejoindre la communauté"
        >
          <UsersIcon className="h-5 w-5" />
          Rejoindre
        </button>
      )}
    </section>
  );
}