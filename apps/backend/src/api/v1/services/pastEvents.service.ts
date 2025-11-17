import prisma from "../../../../prisma/client";

export const pastEventsService = {
  getAll: async () => {
    return await prisma.pastEvent.findMany();
  },

  getById: async (id: number) => {
    return await prisma.pastEvent.findUnique({ where: { id } });
  },

  create: async (data: any) => {
    return await prisma.pastEvent.create({ data });
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
