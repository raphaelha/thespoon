// @ts-nocheck
const { PrismaClient } = require('@prisma/client');
const { randomUUID } = require('crypto');

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Début du seed...');

  // --- Communautés ---
  await prisma.community.createMany({
    data: [
      { name: 'La team produit', code: 'produit', description: 'Les experts produit', isPublic: true },
      { name: 'La bande du jeudi soir', code: 'jeudi', description: 'On sort tous les jeudis !', isPublic: true },
      { name: 'Les runners de Rennes', code: 'runrennes', description: 'Pour les fans de running et de galettes', isPublic: false },
      { name: 'Les gourmets de Paris', code: 'gourmetsparis', description: 'Découvre les meilleures tables de Paris', isPublic: true },
      { name: 'Brut équipe data', code: 'brutdata', description: 'La data, mais avec du goût', isPublic: false },
      { name: 'Les Veggies', code: 'veggies', description: 'Pour les fans de cuisine végétarienne', isPublic: true },
      { name: 'Afterwork Bordeaux', code: 'afterbordeaux', description: 'On trinque après le boulot', isPublic: true },
      { name: 'Les brunchers', code: 'brunchers', description: 'Brunch tous les dimanches', isPublic: true },
      { name: 'Les foodies du Sud', code: 'foodiesud', description: 'Cuisine du soleil', isPublic: true },
      { name: 'Les testeurs fous', code: 'testeurs', description: 'On teste tout, partout', isPublic: true },
    ],
  });

  console.log('✅ Communautés créées');

  // --- Utilisateurs ---
  const usersData = [
    'alice', 'bob', 'chloe', 'david', 'emma', 'lucas', 'sophie', 'hugo', 'lea', 'maxime',
    'julie', 'antoine', 'camille', 'nina', 'paul', 'sarah', 'tom', 'manon', 'louis', 'clara',
  ].map((pseudo) => ({
    pseudo,
    firstName: pseudo.charAt(0).toUpperCase() + pseudo.slice(1),
    lastName: 'User',
    email: `${pseudo}@example.com`,
    image: null,
    clerkId: randomUUID(),
  }));

  await prisma.user.createMany({ data: usersData });
  console.log('✅ Utilisateurs créés');

  const allUsers = await prisma.user.findMany();
  const allCommunities = await prisma.community.findMany();

  // --- Lien users ↔ communautés ---
  for (const user of allUsers) {
    for (const community of allCommunities) {
      if (Math.random() > 0.4) {
        await prisma.userCommunity.create({
          data: {
            userId: user.id,
            communityId: community.id,
          },
        });
      }
    }
  }
  console.log('✅ Liens utilisateurs ↔ communautés créés');

  // --- Restaurants ---
  const restosData = [
    { name: 'Chez Yvonne', city: 'Rennes', address: '12 rue de la Paix' },
    { name: 'Le Bistrot Local', city: 'Rennes', address: '5 avenue Jean Jaurès' },
    { name: 'Côté Sushi', city: 'Rennes', address: '8 rue de la Gare' },
    { name: 'La Trattoria', city: 'Rennes', address: '14 rue d’Italie' },
    { name: 'Burger Square', city: 'Rennes', address: '1 place de Bretagne' },
    { name: 'La Cantine Digitale', city: 'Rennes', address: '10 rue du Web' },
    { name: 'Bento Lab', city: 'Rennes', address: '3 rue des Sciences' },
    { name: 'Casa Mia', city: 'Rennes', address: '7 rue de Rome' },
    { name: 'Tandoori Express', city: 'Rennes', address: '22 rue de l’Inde' },
    { name: 'Les Saveurs Bretonnes', city: 'Rennes', address: '2 rue de la Crêpe' },
    { name: 'Le Gourmet', city: 'Paris', address: '15 rue de Paris' },
    { name: 'Brunch Factory', city: 'Paris', address: '22 avenue Montaigne' },
    { name: 'Vegan Place', city: 'Paris', address: '10 rue Verte' },
    { name: 'Le Sud', city: 'Marseille', address: '1 rue du Soleil' },
    { name: 'Bordeaux Bistro', city: 'Bordeaux', address: '8 quai des Chartrons' },
    { name: 'Toulouse Tapas', city: 'Toulouse', address: '4 place du Capitole' },
    { name: 'Nice Nissart', city: 'Nice', address: '3 rue Masséna' },
    { name: 'Lyon Bouchon', city: 'Lyon', address: '6 rue Mercière' },
    { name: 'Strasbourg Winstub', city: 'Strasbourg', address: '9 rue des Tonneliers' },
    { name: 'Lille Friterie', city: 'Lille', address: '2 rue de la Frite' },
  ];

  const restos = await Promise.all(
    restosData.map((resto, i) =>
      prisma.restaurant.create({
        data: {
          ...resto,
          addedById: allUsers[i % allUsers.length].id,
        },
      })
    )
  );
  console.log('✅ Restaurants créés');

  // --- Votes aléatoires avec notes ---
  for (const community of allCommunities) {
    const members = await prisma.userCommunity.findMany({
      where: { communityId: community.id },
    });

    for (const member of members) {
      const votedRestoIds = new Set();

      for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
        const resto = restos[Math.floor(Math.random() * restos.length)];
        if (votedRestoIds.has(resto.id)) continue;

        await prisma.vote.create({
          data: {
            userId: member.userId,
            restaurantId: resto.id,
            communityId: community.id,
            note: Math.round((Math.random() * 4 + 1) * 10) / 10,
          },
        });
        votedRestoIds.add(resto.id);
      }
    }
  }
  console.log('✅ Votes générés');

  console.log('🌱 Seed terminé avec succès.');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
