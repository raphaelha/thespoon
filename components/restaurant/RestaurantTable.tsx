import Link from "next/link";
import StarRating from "../StarRating";

type Restaurant = {
  id: string;
  name: string;
  city: string;
  address?: string;
  votes: number;
  average: number;
};

export default function RestaurantTable({ restaurants }: { restaurants: Restaurant[] }) {
  // Tri du mieux noté au moins bien noté
  const sorted = [...restaurants].sort((a, b) => b.average - a.average);

  return (
    <div className="overflow-x-auto">
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
          {sorted.map((resto, idx) => (
            <tr
              key={resto.id}
              className={`cursor-pointer ${
                idx === 0 ? "bg-blue-50/70" : "hover:bg-gray-100/60"
              } border-b border-gray-200 transition`}
            >
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
                  <StarRating value={resto.average} />
                </div>
              </td>
              <td className="px-4 py-4 text-center text-gray-700 text-lg">{resto.votes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}