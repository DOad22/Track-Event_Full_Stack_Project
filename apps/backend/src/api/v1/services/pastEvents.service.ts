import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const pastEventsService = {
  getAll: async (userId?: string | null) => {
    if (!userId) {
      return [];
    }

    return await prisma.pastEvent.findMany({
      where: { userId: userId },
      orderBy: { date: "desc" },
    });
  },

  getById: async (id: number) => {
    return await prisma.pastEvent.findUnique({ where: { id } });
  },

  create: async (data: any, userId: string) => {
    return await prisma.pastEvent.create({
      data: {
        ...data,
        userId,
      },
    });
  },

  update: async (id: number, data: any) => {
    return await prisma.pastEvent.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number) => {
    const event = await prisma.pastEvent.findUnique({ where: { id } });
    if (!event) return null;

    return await prisma.pastEvent.delete({ where: { id } });
  },
};
