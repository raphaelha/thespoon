import { PrismaClient } from "@prisma/client";
import StarRating from "../../../components/StarRating";
const prisma = new PrismaClient();
export default async function RestaurantDetail({ params }) {
    const resto = await prisma.restaurant.findUnique({
        where: { id: params.id },
        include: { votes: true },
    });
    if (!resto) {
        return <div className="p-8 text-center text-red-600">Restaurant introuvable.</div>;
    }
    const votesCount = resto.votes.length;
    const average = votesCount > 0
        ? resto.votes.reduce((acc, v) => { var _a; return acc + ((_a = v.note) !== null && _a !== void 0 ? _a : 0); }, 0) / votesCount
        : 0;
    return (<section className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">{resto.name}</h1>
      <div className="mb-2 text-gray-700">{resto.address || resto.city}</div>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl font-extrabold text-blue-700">{average.toFixed(1)}/5</span>
        <StarRating value={average}/>
        <span className="text-gray-600 ml-2">({votesCount} votes)</span>
      </div>
      {/* Ajoute ici d'autres infos ou actions */}
    </section>);
}
