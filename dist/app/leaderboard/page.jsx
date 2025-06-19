"use client";
import { useEffect, useState } from "react";
const mockCities = ["Paris", "Lyon", "Marseille", "Bordeaux", "Lille"];
export default function LeaderboardPage() {
    const [city, setCity] = useState(mockCities[0]);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    // Remplace ce useEffect par un fetch réel vers ton API plus tard
    useEffect(() => {
        setLoading(true);
        // Simule un fetch API
        setTimeout(() => {
            setRestaurants([
                { id: "1", name: "Le Gourmet", city, votes: 42 },
                { id: "2", name: "Chez Mario", city, votes: 37 },
                { id: "3", name: "La Table Ronde", city, votes: 29 },
                { id: "4", name: "Bistro du Coin", city, votes: 21 },
                { id: "5", name: "Epicurien", city, votes: 15 },
            ]);
            setLoading(false);
        }, 500);
    }, [city]);
    return (<main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">🏆 Leaderboard des restaurants</h1>
      <div className="mb-8 flex flex-col items-center">
        <label htmlFor="city" className="mb-2 font-medium text-gray-200">Sélectionne une ville :</label>
        <select id="city" value={city} onChange={e => setCity(e.target.value)} className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none">
          {mockCities.map(c => (<option key={c} value={c}>{c}</option>))}
        </select>
      </div>
      {loading ? (<div className="text-center text-gray-400">Chargement…</div>) : (<ul className="divide-y divide-gray-700 bg-black/60 rounded-xl shadow-lg overflow-hidden">
          {restaurants.map((resto, idx) => (<li key={resto.id} className={`flex items-center px-6 py-4 ${idx === 0 ? "bg-gradient-to-r from-yellow-400/20 to-transparent" : ""}`}>
              <span className="text-2xl font-bold w-8 text-center text-gray-300">{idx + 1}</span>
              <div className="flex-1 ml-4">
                <div className="text-lg font-semibold text-white">{resto.name}</div>
                <div className="text-sm text-gray-400">{resto.address || resto.city}</div>
              </div>
              <span className="ml-4 text-xl font-bold text-yellow-400">{resto.votes} votes</span>
            </li>))}
        </ul>)}
    </main>);
}
