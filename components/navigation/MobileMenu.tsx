"use client";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  UsersIcon,
  CheckBadgeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useAuth, useUser } from "@clerk/nextjs";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  const { isSignedIn } = useUser();
  const { signOut } = useAuth();

  return (
    <Transition show as={Fragment}>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/40 flex sm:hidden"
        onClick={onClose}
      >
        {/* Menu latéral animé */}
        <Transition.Child
          as={Fragment}
          enter="transition-transform duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform duration-200"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div
            className="bg-white w-64 h-full shadow-xl p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end mb-4 p-2 rounded-full hover:bg-blue-100/50"
              onClick={onClose}
              aria-label="Fermer le menu"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Link
              href="/leaderboard"
              className="flex items-center gap-2 px-2 py-2 rounded font-medium hover:bg-blue-100/50"
              onClick={onClose}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              Explorer
            </Link>
            <Link
              href="/community"
              className="flex items-center gap-2 px-2 py-2 rounded font-medium hover:bg-blue-100/50"
              onClick={onClose}
            >
              <UsersIcon className="h-5 w-5" />
              Groupes
            </Link>
            <Link
              href="/vote"
              className="flex items-center gap-2 px-2 py-2 rounded font-medium hover:bg-blue-100/50"
              onClick={onClose}
            >
              <CheckBadgeIcon className="h-5 w-5" />
              Mes votes
            </Link>
            <hr className="my-2" />
            <Link
              href="/profile"
              className="flex items-center gap-2 px-2 py-2 rounded font-medium hover:bg-blue-100/50"
              onClick={onClose}
            >
              <UserCircleIcon className="h-5 w-5" />
              Profil
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-2 px-2 py-2 rounded font-medium hover:bg-blue-100/50"
              onClick={onClose}
            >
              <Cog6ToothIcon className="h-5 w-5" />
              Paramètres
            </Link>
            {isSignedIn ? (
              <button
                onClick={() => {
                  signOut({
                    redirectUrl:
                      "https://humble-adventure-7rw5vxxq9gfp4qj-3000.app.github.dev/",
                  });
                  onClose();
                }}
                className="flex items-center gap-2 px-2 py-2 rounded font-medium text-danger hover:bg-danger/10"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Se déconnecter
              </button>
            ) : (
              <Link
                href="/sign-in"
                className="flex items-center gap-2 px-2 py-2 rounded font-medium text-primary hover:bg-blue-100/50"
                onClick={onClose}
              >
                <UserCircleIcon className="h-5 w-5" />
                Se connecter
              </Link>
            )}
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}