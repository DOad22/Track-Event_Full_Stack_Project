import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pastEventsData = [
  { name: "Basketball", date: "2025-01-12" },
  { name: "Cricket", date: "2025-02-05" },
  { name: "Volleyball", date: "2025-03-10" },
  { name: "Soccer", date: "2025-04-20" },
  { name: "Hockey", date: "2025-05-04" },
  { name: "Tennis", date: "2025-05-18" },
  { name: "Badminton", date: "2025-06-02" },
  { name: "Chess", date: "2025-06-15" },
  { name: "Table Tennis", date: "2025-07-01" },
  { name: "Rugby", date: "2025-07-12" }
];

async function main() {
  await prisma.pastEvent.deleteMany();
  const created = await prisma.pastEvent.createMany({
    data: pastEventsData
  });
  console.log("Seeded Past Events:", created);
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
