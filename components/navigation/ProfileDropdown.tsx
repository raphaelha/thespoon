"use client";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export default function ProfileDropdown() {
  const { signOut } = useAuth();

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className="p-2 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Profil"
      >
        <UserCircleIcon className="h-8 w-8 text-white" />
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
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-white/10 focus:outline-none z-50">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/profile"
                  className={`flex items-center gap-2 px-4 py-2 text-sm text-white ${
                    active ? "bg-white/20" : ""
                  }`}
                >
                  <UserCircleIcon className="h-5 w-5 text-white" />
                  Profil
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/settings"
                  className={`flex items-center gap-2 px-4 py-2 text-sm text-white ${
                    active ? "bg-white/20" : ""
                  }`}
                >
                  <Cog6ToothIcon className="h-5 w-5 text-white" />
                  Paramètres
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left text-red-500 ${
                    active ? "bg-red-500/20" : ""
                  }`}
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-500" />
                  Se déconnecter
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}