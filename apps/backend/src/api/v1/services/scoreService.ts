import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllScores = () => {
  return prisma.score.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const createScore = (player: string, points: number, userId?: string) => {
  return prisma.score.create({
    data: { player, points },
  });
};

export const updateScore = (id: number, data: { player?: string; points?: number }) => {
  return prisma.score
    .update({
      where: { id },
      data,
    })
    .catch(() => null);
};

export const deleteScore = (id: number) => {
  return prisma.score
    .delete({ where: { id } })
    .then(() => true)
    .catch(() => false);
};
