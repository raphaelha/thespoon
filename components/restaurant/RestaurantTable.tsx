import { useRouter } from "next/router";
import type { Restaurant, Vote } from "@/types/prisma";

export default function RestaurantTable({
  restaurants,
}: {
  restaurants: (Restaurant & { votes?: Vote[] })[];
}) {
  const router = useRouter();

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
          {restaurants.map((resto, idx) => (
            <tr
              key={resto.id}
              className={`cursor-pointer ${
                idx === 0 ? "bg-blue-50/70" : "hover:bg-gray-100/60"
              } border-b border-gray-200 transition`}
              onClick={() => router.push(`/restaurant/${resto.id}`)}
            >
              <td className="px-4 py-3 font-bold">{idx + 1}</td>
              <td className="px-4 py-3">{resto.name}</td>
              <td className="px-4 py-3">{resto.address ?? resto.city}</td>
              <td className="px-4 py-3 text-center">
              
              </td>
              <td className="px-4 py-3 text-center">
         
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}