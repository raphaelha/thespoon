"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
        <button
          className="w-full py-2 px-4 mb-4 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          onClick={() => signIn("google")}
        >
          Se connecter avec Google
        </button>
        <button
          className="w-full py-2 px-4 rounded bg-black text-white font-semibold hover:bg-gray-900 transition"
          onClick={() => signIn("apple")}
        >
          Se connecter avec Apple
        </button>
      </div>
    </div>
  );
}