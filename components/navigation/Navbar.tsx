"use client";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  UsersIcon,
  CheckBadgeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useUser, useAuth, SignInButton } from "@clerk/nextjs";
import MobileMenu from "./MobileMenu";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  return (
    <nav className="h-16">
      <DesktopNavbar />
      <MobileNavbar />
    </nav>
  );
}
