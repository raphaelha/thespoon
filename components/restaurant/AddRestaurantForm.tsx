"use client";
import { useState } from "react";

export default function AddRestaurantForm() {
  const [show, setShow] = useState(false);

  return (
    <section>
      <button
        className="bg-accent text-white font-medium px-6 py-3 rounded-xl shadow hover:bg-accent/90"
        onClick={() => setShow(!show)}
      >
        {show ? "Fermer le formulaire" : "Ajouter un restaurant"}
      </button>

      {show && (
        <form className="mt-6 space-y-4 bg-white p-6 rounded-xl shadow">
          <div>
            <label className="block text-sm text-text mb-1">Nom du restaurant</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm text-text mb-1">Adresse</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm text-text mb-1">Ville</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2" />
          </div>
          <button type="submit" className="bg-primary text-white px-6 py-2 rounded-xl font-medium">
            Ajouter
          </button>
        </form>
      )}
    </section>
  );
