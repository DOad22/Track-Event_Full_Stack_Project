import { PrismaClient } from "@prisma/client";
import { participants } from "./seedData";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding development database...");

  
  await prisma.score.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "testuser@example.com"
    }
  });

  
  for (const p of participants) {
    await prisma.participant.create({
      data: p
    });
  }

  
  await prisma.score.createMany({
    data: participants.map((p) => ({
      player: p.name,
      points: 0,
    })),
  });

  
  await prisma.event.createMany({
    data: [
      {
        title: "Tech Conference 2025",
        date: new Date("2025-12-15"),
        location: "Winnipeg Convention Centre",
        tags: ["tech", "conference"],
        userId: user.id, 
      },
      {
        title: "Music Festival",
        date: new Date("2025-08-20"),
        location: "The Forks",
        tags: ["music", "festival"],
        userId: user.id,
      },
      {
        title: "Art Exhibition",
        date: new Date("2025-06-05"),
        location: "Winnipeg Art Gallery",
        tags: ["art", "exhibition"],
        userId: user.id,
      },
    ],
  });

  console.log(" Seeding complete!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
