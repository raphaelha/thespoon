import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    console.log('🔄 Début du seed...');
    // --- Communautés ---
    await prisma.community.createMany({
        data: [
            { name: 'La team produit', code: 'produit' },
            { name: 'La bande du jeudi soir', code: 'jeudi' },
            { name: 'Les runners de Rennes', code: 'runrennes' },
        ],
    });
    console.log('✅ Communautés créées');
    // --- Utilisateurs ---
    await prisma.user.createMany({
        data: [
            { name: 'Alice', pseudo: 'alice' },
            { name: 'Bob', pseudo: 'bob' },
            { name: 'Chloé', pseudo: 'chloe' },
            { name: 'David', pseudo: 'david' },
            { name: 'Emma', pseudo: 'emma' },
        ],
    });
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
        { name: 'Chez Yvonne', city: 'Rennes' },
        { name: 'Le Bistrot Local', city: 'Rennes' },
        { name: 'Côté Sushi', city: 'Rennes' },
        { name: 'La Trattoria', city: 'Rennes' },
        { name: 'Burger Square', city: 'Rennes' },
        { name: 'La Cantine Digitale', city: 'Rennes' },
        { name: 'Bento Lab', city: 'Rennes' },
        { name: 'Casa Mia', city: 'Rennes' },
        { name: 'Tandoori Express', city: 'Rennes' },
        { name: 'Les Saveurs Bretonnes', city: 'Rennes' },
    ];
    const restos = await Promise.all(restosData.map((resto, i) => prisma.restaurant.create({
        data: Object.assign(Object.assign({}, resto), { addedById: allUsers[i % allUsers.length].id }),
    })));
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
                if (votedRestoIds.has(resto.id))
                    continue;
                await prisma.vote.create({
                    data: {
                        userId: member.userId,
                        restaurantId: resto.id,
                        communityId: community.id,
                        // Note aléatoire entre 1 et 5, avec décimales pour plus de réalisme
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
    .finally(() => prisma.$disconnect());
