"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import StarRating from "../components/StarRating";
export default function Leaderboard() {
    const [city, setCity] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [geoLoading, setGeoLoading] = useState(false);
    const inputRef = useRef(null);
    // Géolocalisation utilisateur
    useEffect(() => {
        setGeoLoading(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                var _a, _b, _c, _d, _e;
                const { latitude, longitude } = pos.coords;
                // Appel à Nominatim pour obtenir la ville à partir des coordonnées
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`);
                    const data = await res.json();
                    const cityName = ((_a = data.address) === null || _a === void 0 ? void 0 : _a.city) ||
                        ((_b = data.address) === null || _b === void 0 ? void 0 : _b.town) ||
                        ((_c = data.address) === null || _c === void 0 ? void 0 : _c.village) ||
                        ((_d = data.address) === null || _d === void 0 ? void 0 : _d.municipality) ||
                        ((_e = data.address) === null || _e === void 0 ? void 0 : _e.county) ||
                        "";
                    if (cityName) {
                        setCity(cityName);
                        setInputValue(cityName);
                    }
                }
                catch (_f) {
                    // ignore
                }
                setGeoLoading(false);
            }, () => setGeoLoading(false), { enableHighAccuracy: false, timeout: 5000 });
        }
        else {
            setGeoLoading(false);
        }
    }, []);
    // Appel à l'API OpenStreetMap Nominatim pour l'autocomplétion
    async function fetchCitySuggestions(query) {
        var _a, _b, _c;
        if (!query || query.length < 2) {
            setSuggestions([]);
            return;
        }
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`);
            const data = await res.json();
            // Filtrer pour ne garder que les villes uniques
            const uniqueCities = [];
            const seen = new Set();
            for (const item of data) {
                const cityName = ((_a = item.address) === null || _a === void 0 ? void 0 : _a.city) ||
                    ((_b = item.address) === null || _b === void 0 ? void 0 : _b.town) ||
                    ((_c = item.address) === null || _c === void 0 ? void 0 : _c.village) ||
                    item.display_name.split(",")[0];
                if (!seen.has(cityName)) {
                    seen.add(cityName);
                    uniqueCities.push({
                        display_name: cityName,
                        lat: item.lat,
                        lon: item.lon,
                    });
                }
            }
            setSuggestions(uniqueCities);
        }
        catch (_d) {
            setSuggestions([]);
        }
    }
    // Appel l'API interne pour récupérer les restaurants de la ville sélectionnée
    useEffect(() => {
        if (city) {
            setLoading(true);
            fetch(`/api/leaderboard?city=${encodeURIComponent(city)}`)
                .then(res => res.json())
                .then(data => {
                setRestaurants(data);
                setLoading(false);
            });
        }
        else {
            setRestaurants([]);
        }
    }, [city]);
    // Déclenche l'autocomplétion à chaque frappe
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchCitySuggestions(inputValue);
        }, 300);
        return () => clearTimeout(handler);
    }, [inputValue]);
    const handleSelectCity = (selected) => {
        var _a;
        setCity(selected.display_name);
        setInputValue(selected.display_name);
        setShowSuggestions(false);
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
    };
    return (<section className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-10 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 text-center tracking-tight">Leaderboard des restaurants</h1>
        <label htmlFor="city" className="mb-2 font-medium text-gray-700 text-lg">
          Recherche une ville :
          {geoLoading && <span className="ml-2 text-blue-500 text-sm">Détection de ta position…</span>}
        </label>
        <div className="relative w-full max-w-xs">
          <input ref={inputRef} id="city" type="text" value={inputValue} onChange={e => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
        }} onFocus={() => setShowSuggestions(true)} onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} placeholder="Tape une ville..." className="px-4 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-gray-300 text-gray-900 focus:outline-none shadow w-full transition" autoComplete="off"/>
          {showSuggestions && suggestions.length > 0 && (<ul className="absolute z-10 left-0 right-0 mt-1 bg-white/95 rounded-xl shadow border border-gray-200 max-h-60 overflow-auto">
              {suggestions.map((c) => (<li key={c.display_name + c.lat + c.lon} onMouseDown={() => handleSelectCity(c)} className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-gray-900 transition">
                  {c.display_name}
                </li>))}
            </ul>)}
        </div>
      </div>
      {loading ? (<div className="text-center text-gray-400 text-lg">Chargement…</div>) : (<div className="overflow-x-auto">
          <table className="min-w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-xl">
            <thead>
              <tr>
                <th className="px-4 py-4 text-left text-base font-semibold text-gray-700">#</th>
                <th className="px-4 py-4 text-left text-base font-semibold text-gray-700">Nom</th>
                <th className="px-4 py-4 text-left text-base font-semibold text-gray-700">Adresse</th>
                <th className="px-4 py-4 text-center text-base font-semibold text-gray-700">Note</th>
                <th className="px-4 py-4 text-center text-base font-semibold text-gray-700">Votes</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((resto, idx) => (<tr key={resto.id} className={`cursor-pointer ${idx === 0 ? "bg-blue-50/70" : "hover:bg-gray-100/60"} border-b border-gray-200 transition`}>
                  <td className="px-4 py-4 font-bold text-gray-500 text-lg">{idx + 1}</td>
                  <td className="px-4 py-4 font-semibold text-gray-900 text-lg">
                    <Link href={`/restaurant/${resto.id}`} className="hover:underline">
                      {resto.name}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-gray-500">{resto.address || resto.city}</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-xl font-extrabold text-blue-700">{resto.average.toFixed(1)}/5</span>
                      <StarRating value={resto.average}/>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center text-gray-700 text-lg">{resto.votes}</td>
                </tr>))}
            </tbody>
          </table>
        </div>)}
    </section>);
}
