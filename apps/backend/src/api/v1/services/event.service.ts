import prisma from "../../../../prisma/client";

export const eventService = {
  getAll: async () => {
    return await prisma.event.findMany();
  },

  getById: async (id: number) => {
    return await prisma.event.findUnique({ where: { id } });
  },

  create: async (data: any) => {
    return await prisma.event.create({ data });
  },

  update: async (id: number, data: any) => {
    return await prisma.event.update({ where: { id }, data });
  },

  delete: async (id: number) => {
    return await prisma.event.delete({ where: { id } });
  },
};
