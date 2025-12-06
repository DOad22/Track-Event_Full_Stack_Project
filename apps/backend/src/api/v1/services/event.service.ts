import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const eventService = {
  getAll: async () => prisma.event.findMany({ orderBy: { date: "asc" } }),

  getById: async (id: number) => prisma.event.findUnique({ where: { id } }),

  create: async (data: { title: string; date: string; location?: string; userId: number; tags?: string[] }) =>
    prisma.event.create({ data }),

  update: async (id: number, data: Partial<{ title: string; date: string; location: string; tags: string[] }>) =>
    prisma.event.update({ where: { id }, data }),

  delete: async (id: number) => prisma.event.delete({ where: { id } }),

  getPersonalized: async (userId: number) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return [];

    return prisma.event.findMany({
      where: { userId },
      orderBy: { date: "asc" },
    });
  },
};
