import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface ParticipantData {
  name: string;
  email: string;
  game?: string;
  age?: number;
  userId?: string; 
}

export async function listParticipants(userId?: string) {
  const where = userId ? ({ userId } as any) : undefined;
  return prisma.participant.findMany({
    where,
    orderBy: { id: "desc" },
  });
}

export async function findParticipant(id: number, userId?: string) {
  const where = userId ? ({ id, userId } as any) : ({ id } as any);
  return prisma.participant.findFirst({
    where,
  } as any);
}

export async function createParticipantService(data: ParticipantData) {
  return prisma.participant.create({
    data,
  });
}

export async function updateParticipantService(id: number, data: any, userId?: string) {
  if (userId) {
    const existing = await prisma.participant.findFirst({
      where: { id, ...(userId ? ({ userId } as any) : {}) } as any,
    });
    if (!existing) return null;
  }
  const updated = await prisma.participant.update({
    where: { id },
    data,
  });
  return updated;
}

export async function deleteParticipantService(id: number, userId?: string) {
  if (userId) {
    const result = await prisma.participant.deleteMany({
      where: { id, ...(userId ? ({ userId } as any) : {}) } as any,
    });
    if (result.count === 0) return null;
    return { message: "Deleted successfully" };
  }

  await prisma.participant.delete({
    where: { id },
  });

  return { message: "Deleted successfully" };
}
