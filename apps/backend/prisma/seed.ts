import { PrismaClient } from "@prisma/client";
import { participants } from "./seedData";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.score.deleteMany();

  await prisma.score.createMany({
  data: participants.map((p) => ({
    player: p.name,
    points: 0 
  })),
  skipDuplicates: true
});

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
