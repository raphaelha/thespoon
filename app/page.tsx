"use client";
import PublicCommunities from "@/components/community/PublicCommunities";
import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <HeroSection />
      <PublicCommunities />

    </main>
  );
}