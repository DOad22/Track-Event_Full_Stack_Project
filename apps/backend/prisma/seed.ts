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
  }

  console.log("✔ Seed complete!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
