const { PrismaClient } = require('@prisma/client');
const { participants } = require('./seedData');

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding development database...");

  await prisma.participant.deleteMany();

  for (const p of participants) {
    await prisma.participant.create({
      data: p
    });

  await prisma.score.deleteMany();

  await prisma.score.createMany({
  data: participants.map((p) => ({
    player: p.name,
    points: 0 
  })),
  skipDuplicates: true
});

  }

  await prisma.event.deleteMany();

    await prisma.event.createMany({
        data: [
            {
                title: 'Tech Conference 2025',
                description: 'A conference about the latest in tech innovation.',
                date: new Date('2025-12-15'),
                location: 'Winnipeg Convention Centre',
            },
            {
                title: 'Music Festival',
                description: 'Outdoor event with live bands and food trucks.',
                date: new Date('2025-08-20'),
                location: 'The Forks',
            },
            {
                title: 'Art Exhibition',
                description: 'Local artists showcase their work.',
                date: new Date('2025-06-05'),
                location: 'Winnipeg Art Gallery',
            },
        ],
    });

  console.log(" Seed complete!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

