"use client";
import { useState, useEffect } from "react";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import MobileMenu from "./MobileMenu";
import Link from "next/link";

export default function MobileNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        // Scroll vers le bas
        setShowNavbar(false);
      } else {
        // Scroll vers le haut
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Exemple d'action pour la recherche
  const handleSearch = () => {
    window.location.href = "/search";
  };

  return (
    <>
      <nav
        className={`w-full fixed top-0 left-0 z-50 font-sans bg-black shadow-md text-white sm:hidden transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center h-16 px-4 relative">
          {/* Burger menu à gauche */}
          <button
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Bars3Icon className="h-7 w-7 text-white" />
          </button>
          {/* Logo centré et cliquable */}
          <div className="flex-1 flex justify-center">
            <Link
              href="/"
              className="font-extrabold text-2xl tracking-tight text-white hover:opacity-80 transition-opacity"
            >
              The Spoon
            </Link>
          </div>
          {/* Bouton recherche à droite */}
          <button
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            onClick={handleSearch}
            aria-label="Rechercher"
          >
            <MagnifyingGlassIcon className="h-7 w-7 text-white" />
          </button>
        </div>
      </nav>
      {/* Décale le contenu principal pour ne pas passer sous le header */}
      <div className="h-16 sm:hidden" />
      {/* Menu mobile latéral */}
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </>
  );
}