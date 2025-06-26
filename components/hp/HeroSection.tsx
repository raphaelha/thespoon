"use client";
import { useEffect, useRef, useState } from "react";
import { UsersIcon } from "@heroicons/react/24/outline";

export default function HeroSection({ parallaxOffset = 0 }: { parallaxOffset?: number }) {
  const desktopBtnRef = useRef<HTMLButtonElement>(null);
  const mobileBtnRef = useRef<HTMLButtonElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const desktopBtn = desktopBtnRef.current;
    const mobileBtn = mobileBtnRef.current;
    if (!desktopBtn && !mobileBtn) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        // Si aucun bouton n'est visible, on affiche le sticky
        setShowSticky(!entries.some(entry => entry.isIntersecting));
      },
      { threshold: 0.1 }
    );
    if (desktopBtn) observer.observe(desktopBtn);
    if (mobileBtn) observer.observe(mobileBtn);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full h-screen font-sans bg-black overflow-hidden">
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
        pt-10 sm:pt-10
      ">
        <h1 className="text-6xl sm:text-6xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
          TripAdvisor c’est bien
        </h1>
        <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-8 drop-shadow">
          Mais t’as pas les mêmes goûts que tata Monique.
        </h2>
        {/* Bouton desktop */}
        <div className="hidden sm:block">
          <button
            ref={desktopBtnRef}
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-gray-100 text-[#000000] text-lg font-bold uppercase shadow-lg hover:bg-beige transition-colors"
            style={{ letterSpacing: "0.05em" }}
            onClick={() => window.location.href = "/join"}
            aria-label="Rejoindre la communauté"
          >
            Rejoindre la communauté
          </button>
        </div>
      </div>
      {/* 
        Bouton mobile aligné en bas de la HeroSection, qui scrolle avec le contenu
      */}
      <div className="absolute bottom-20 left-0 w-full flex justify-center px-4 sm:hidden z-30">
        <button
          ref={mobileBtnRef}
          className="flex items-center justify-center gap-2 w-full max-w-md px-8 py-4 rounded-full bg-gray-100 text-[#000000] text-lg font-bold uppercase shadow-lg hover:bg-beige transition-colors"
          style={{ letterSpacing: "0.05em" }}
          onClick={() => window.location.href = "/join"}
          aria-label="Rejoindre la communauté"
        >
          Créer ta communauté
        </button>
      </div>
    </section>
  );
}