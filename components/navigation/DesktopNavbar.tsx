"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";
import ProfileDropdown from "./ProfileDropdown";
import SearchBar from "./SearchBar";

export default function DesktopNavbar() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="w-full fixed top-0 left-0 z-50 font-sans bg-black shadow-md text-white hidden sm:block">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4 relative">
        {/* Logo à gauche */}
        <div className="flex items-center flex-shrink-0 font-extrabold text-2xl tracking-tight">
          <Link href="/" className="hover:opacity-80 transition-opacity text-white">
            The Spoon
          </Link>
        </div>
        {/* Champ de recherche centré */}
        <SearchBar />
        {/* À droite : connexion ou menu profil */}
        <div className="flex items-center gap-3 ml-4">
          {isSignedIn ? (
            <>
              <span className="font-medium hidden md:block text-white">
                Bonjour {user?.firstName}
              </span>
              <ProfileDropdown />
            </>
          ) : (
            <SignInButton mode="modal">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors bg-white text-black hover:bg-gray-200"
                aria-label="Connexion"
                type="button"
              >
                <UserCircleIcon className="h-5 w-5 text-black" />
                Se connecter
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </nav>
  );
}