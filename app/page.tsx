"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs"; // ou ton hook d'auth
import { useRouter } from "next/navigation";
import PublicCommunities from "@/components/community/PublicCommunities";
import HeroSection from "../components/hp/HeroSection";

export default function Home() {
  const [parallax, setParallax] = useState(0);
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isSignedIn, router]);

  useEffect(() => {
    const handleScroll = () => {
      // Plus le facteur est petit, plus l'effet est subtil
      setParallax(Math.min(0, window.scrollY * -1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      <div className="relative z-10">
        <HeroSection parallaxOffset={-parallax} />
      </div>
      <div className="relative z-20">
        <PublicCommunities />
      </div>
    </main>
  );
}