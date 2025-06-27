// @ts-nocheck
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Génération de communautés et votes pour les utilisateurs sans votes...');

  // Récupère tous les utilisateurs sans aucun vote
  const usersWithoutVotes = await prisma.user.findMany({
    where: {
      votes: { none: {} },
    },
    include: {
      memberships: {
        include: { community: true },
      },
    },
  });

  // Récupère toutes les communautés et tous les restaurants
  const allCommunities = await prisma.community.findMany();
  const allRestaurants = await prisma.restaurant.findMany();

  let totalVotes = 0;
  let totalMemberships = 0;

  for (const user of usersWithoutVotes) {
    // Si l'utilisateur n'a aucune communauté, on lui en ajoute une au hasard
    if (user.memberships.length === 0 && allCommunities.length > 0) {
      const randomCommunity = allCommunities[Math.floor(Math.random() * allCommunities.length)];
      await prisma.userCommunity.create({
        data: {
          userId: user.id,
          communityId: randomCommunity.id,
        },
      });
      totalMemberships++;
      // On recharge les memberships pour l'utilisateur
      user.memberships = [{ community: randomCommunity }];
    }

    // Pour chaque communauté à laquelle appartient l'utilisateur
    for (const membership of user.memberships) {
      const community = membership.community;
      // Sélectionne 1 à 3 restaurants au hasard
      const shuffled = allRestaurants.sort(() => 0.5 - Math.random());
      const selectedRestos = shuffled.slice(0, Math.floor(Math.random() * 3) + 1);

      for (const resto of selectedRestos) {
        await prisma.vote.create({
          data: {
            userId: user.id,
            restaurantId: resto.id,
            communityId: community.id,
            note: Math.round((Math.random() * 4 + 1) * 10) / 10,
          },
        });
        totalVotes++;
      }
    }
  }

  console.log(`✅ ${totalMemberships} communautés ajoutées, ${totalVotes} votes générés pour ${usersWithoutVotes.length} utilisateurs sans votes.`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed supplémentaire :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });