"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function CommunityList() {
  const [communities, setCommunities] = useState<any[]>([]); // doit être un tableau

  useEffect(() => {
    fetch("/api/communities")
      .then(res => res.json())
      .then(data => {
        // Si data n'est pas un tableau, adapte ici :
        setCommunities(Array.isArray(data) ? data : []);
      });
  }, []);

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-text">Mes communautés</h2>
        <button className="flex items-center gap-2 text-sm bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90">
          <PlusIcon className="w-4 h-4" />
          Créer une communauté
        </button>
      </div>
      {communities.length === 0 ? (
        <p className="text-gray-500">Tu n’as rejoint aucune communauté.</p>
      ) : (
        <ul className="space-y-3">
          {communities.map((c: any) => (
            <li key={c.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
              <div>
                <p className="font-medium text-text">{c.name}</p>
                <p className="text-sm text-gray-500">{c.membersCount} membres</p>
              </div>
              <button className="text-sm text-primary font-medium hover:underline">Voir</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}