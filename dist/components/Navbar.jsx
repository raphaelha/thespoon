"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { HomeIcon, MagnifyingGlassIcon, UsersIcon, CheckBadgeIcon, UserCircleIcon, ArrowRightOnRectangleIcon, } from "@heroicons/react/24/outline";
export default function Navbar() {
    var _a, _b;
    const { data: session, status } = useSession();
    return (<nav className="w-full flex items-center justify-center py-4 px-8 bg-white/70 backdrop-blur-md shadow-lg rounded-b-2xl">
      <div className="flex-1 flex justify-center gap-10">
        <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100/70">
          <HomeIcon className="h-5 w-5"/>
          Accueil
        </Link>
        <Link href="/leaderboard" className="flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100/70">
          <MagnifyingGlassIcon className="h-5 w-5"/>
          Explorer
        </Link>
        <Link href="/community" className="flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100/70">
          <UsersIcon className="h-5 w-5"/>
          Mes groupes
        </Link>
        <Link href="/vote" className="flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100/70">
          <CheckBadgeIcon className="h-5 w-5"/>
          Mes votes
        </Link>
      </div>
      <div className="flex items-center gap-3 ml-8">
        {status === "authenticated" ? (<>
            <span className="font-medium text-gray-900 hidden sm:block">
              {((_a = session.user) === null || _a === void 0 ? void 0 : _a.name) || ((_b = session.user) === null || _b === void 0 ? void 0 : _b.email)}
            </span>
            <button className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-200" onClick={() => signOut()} title="Se déconnecter">
              <ArrowRightOnRectangleIcon className="h-7 w-7 text-gray-900"/>
            </button>
          </>) : (<button className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-200" onClick={() => signIn()} title="Se connecter">
            <UserCircleIcon className="h-8 w-8 text-gray-900"/>
          </button>)}
      </div>
    </nav>);
}
