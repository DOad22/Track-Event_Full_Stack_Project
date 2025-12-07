import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface ParticipantData {
  name: string;
  email: string;
}

export async function listParticipants(userId: string) {
  return prisma.participant.findMany({
    orderBy: { id: "desc" }
  });
}

export async function findParticipant(id: number, userId: string) {
  return prisma.participant.findUnique({
    where: { id }
  });
}

export async function createParticipantService(data: ParticipantData) {
  return prisma.participant.create({
    data
  });
}

export async function updateParticipantService(id: number, data: any, userId: string) {
  return prisma.participant.update({
    where: { id },
    data
  });
}

export async function deleteParticipantService(id: number, userId: string) {
  await prisma.participant.delete({
    where: { id }
  });

  return { message: "Deleted successfully" };
}
