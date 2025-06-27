// @ts-nocheck
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = "hamon.raphael@gmail.com";
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    console.error("Utilisateur non trouvé :", email);
    process.exit(1);
  }

  // Crée 2 communautés si besoin
  const communityNames = ["Communauté Gourmande", "Communauté Foodies"];
  const communities = [];
  for (const name of communityNames) {
    let community = await prisma.community.findFirst({ where: { name } });
    if (!community) {
      // Génère un code unique pour chaque communauté (obligatoire et unique)
      const code = name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "") + "-" + Math.random().toString(36).slice(2, 7);

      community = await prisma.community.create({
        data: { name, code },
      });
      console.log("Communauté créée :", name, "avec code :", code);
    }
    communities.push(community);
  }

  // Ajoute l'utilisateur dans ces communautés (si pas déjà membre)
  for (const community of communities) {
    const existing = await prisma.userCommunity.findFirst({
      where: { userId: user.id, communityId: community.id },
    });
    if (!existing) {
      await prisma.userCommunity.create({
        data: { userId: user.id, communityId: community.id },
      });
      console.log(`Ajouté à la communauté : ${community.name}`);
    }
  }

  // Récupère tous les restaurants
  const restos = await prisma.restaurant.findMany();

  // Ajoute 2 à 4 votes aléatoires pour chaque communauté
  for (const community of communities) {
    const votedRestoIds = new Set();
    const nbVotes = Math.floor(Math.random() * 3) + 2; // 2 à 4 votes

    for (let i = 0; i < nbVotes; i++) {
      const resto = restos[Math.floor(Math.random() * restos.length)];
      // Respecte la contrainte unique [userId, restaurantId, communityId]
      if (votedRestoIds.has(resto.id)) continue;
      const existingVote = await prisma.vote.findFirst({
        where: {
          userId: user.id,
          restaurantId: resto.id,
          communityId: community.id,
        },
      });
      if (existingVote) continue;

      await prisma.vote.create({
        data: {
          userId: user.id,
          restaurantId: resto.id,
          communityId: community.id,
          note: Math.round((Math.random() * 4 + 1) * 10) / 10,
        },
      });
      votedRestoIds.add(resto.id);
      console.log(`Vote ajouté pour ${resto.name} dans ${community.name}`);
    }
  }

  console.log("✅ Seed terminé pour hamon.raphael@gmail.com");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });