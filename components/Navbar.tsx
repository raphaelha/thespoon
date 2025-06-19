"use client";
import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UsersIcon,
  CheckBadgeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import AuthModal from "./auth/AuthModal";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [authOpen, setAuthOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`w-full fixed top-0 left-0 z-50 font-sans transition-all
          ${scrolled
            ? "bg-white/80 backdrop-blur-md shadow-md"
            : "bg-white/100"}
          text-[#1b3670]`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
          {/* Logo à gauche */}
          <div className="flex items-center flex-shrink-0 font-extrabold text-2xl tracking-tight">
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity"
            >
              The Spoon
            </Link>
          </div>
          {/* Menu centré */}
          <div className="flex-1 flex justify-center">
            <div className="flex gap-2 sm:gap-4">
              <Link
                href="/leaderboard"
                className="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors hover:bg-blue-100/50"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
                Explorer
              </Link>
              <Link
                href="/community"
                className="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors hover:bg-blue-100/50"
              >
                <UsersIcon className="h-5 w-5" />
                Groupes
              </Link>
              <Link
                href="/vote"
                className="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors hover:bg-blue-100/50"
              >
                <CheckBadgeIcon className="h-5 w-5" />
                Mes votes
              </Link>
            </div>
          </div>
          {/* Utilisateur à droite */}
          <div className="flex items-center gap-3 ml-4">
            {status === "authenticated" ? (
              <>
                <span className="font-medium hidden sm:block">
                  Bonjour {session.user?.name}
                </span>
                <Menu as="div" className="relative">
                  <Menu.Button className="p-2 rounded-full hover:bg-blue-100/50 transition-colors duration-200 focus:outline-none">
                    <UserCircleIcon className="h-8 w-8 text-[#1b3670]" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none z-50">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={`flex items-center gap-2 px-4 py-2 text-[#1b3670] hover:bg-blue-100/50 rounded-full ${
                                active ? "bg-blue-100/50" : ""
                              }`}
                            >
                              <UserCircleIcon className="h-5 w-5" />
                              Profil
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/settings"
                              className={`flex items-center gap-2 px-4 py-2 text-[#1b3670] hover:bg-blue-100/50 rounded-full ${
                                active ? "bg-blue-100/50" : ""
                              }`}
                            >
                              <Cog6ToothIcon className="h-5 w-5" />
                              Paramètres
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => signOut()}
                              className={`flex items-center gap-2 px-4 py-2 w-full text-left text-danger hover:bg-danger/10 rounded-full ${
                                active ? "bg-danger/10" : ""
                              }`}
                            >
                              <ArrowRightOnRectangleIcon className="h-5 w-5" />
                              Déconnexion
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="p-2 rounded-full hover:bg-blue-100/50 transition-colors"
                aria-label="Connexion"
              >
                <UserCircleIcon className="h-8 w-8 text-[#1b3670]" />
              </button>
            )}
          </div>
        </div>
      </nav>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
