"use client";
import { SignIn } from "@clerk/nextjs";

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm min-h-[350px] relative animate-fade-in overflow-hidden flex flex-col justify-between">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Fermer"
        >
          ×
        </button>
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-16 h-16 mb-4"
            style={{ filter: "drop-shadow(0 2px 8px #cbd5e1)" }}
            onError={e => (e.currentTarget.style.display = "none")}
          />
          <h1 className="text-2xl font-bold mb-8 text-center text-gray-900">Connexion</h1>
          <SignIn appearance={{ elements: { card: "shadow-none border-none" } }} />
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </div>
  );
}