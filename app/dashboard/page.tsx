import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import Top10GlobalList from "@/components/restaurant/UserTop10GlobalList";
import MyCommunities from "@/components/community/MyCommunities";
import DashboardCard from "@/components/layout/DashboardCard";

export default async function DashboardPage() {
  const clerkUser = await currentUser();
  if (!clerkUser) return <div>Non authentifié</div>;

  // Création à la volée si l'utilisateur n'existe pas encore en base
  let user = await prisma.user.findUnique({ where: { clerkId: clerkUser.id } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses?.[0]?.emailAddress,
        pseudo:
          clerkUser.username ||
          clerkUser.firstName ||
          clerkUser.lastName ||
          "Utilisateur",
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        image: clerkUser.imageUrl,
        // votes, memberships, restaurants : gérés par Prisma via les relations
      },
    });
  }

  return (
    <div className="max-w-4xl mx-auto font-sans">
      <DashboardCard>
        <Top10GlobalList />
        <MyCommunities />
      </DashboardCard>
    </div>
  );
}
