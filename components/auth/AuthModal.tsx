"use client";
import { signIn } from "next-auth/react";

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Fermer"
        >
          ×
        </button>
        <div className="flex flex-col items-center">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-16 h-16 mb-4"
            style={{ filter: "drop-shadow(0 2px 8px #cbd5e1)" }}
            onError={e => (e.currentTarget.style.display = "none")}
          />
          <h1 className="text-2xl font-bold mb-8 text-center text-gray-900">Connexion</h1>
          <button
            className="w-full flex items-center justify-center gap-3 py-2 px-4 mb-4 rounded-lg bg-white border border-gray-300 shadow hover:bg-blue-50 transition font-semibold text-gray-700"
            onClick={() => signIn("google")}
          >
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5" />
            Se connecter avec Google
          </button>
          
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.3s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </div>
  );
}