import { participants } from "../../../../prisma/seedData";

export interface ParticipantData {
  name: string;
  email: string;
}

export async function listParticipants() {
  // Return most recent first
  return [...participants].reverse();
}

export async function findParticipant(id: number) {
  const participant = participants.find(p => p.id === id);
  return participant || null;
}

export async function createParticipantService(data: ParticipantData) {
  // Assign next ID
  const newId = participants.length ? participants[participants.length - 1].id + 1 : 1;
  const newParticipant = { id: newId, ...data };
  participants.push(newParticipant);
  return newParticipant;
}

export async function updateParticipantService(id: number, data: ParticipantData) {
  const participant = participants.find(p => p.id === id);
  if (!participant) return null;

  Object.assign(participant, data);
  return participant;
}

export async function deleteParticipantService(id: number) {
  const index = participants.findIndex(p => p.id === id);
  if (index === -1) return null;

  participants.splice(index, 1);
  return { message: "Deleted successfully" };
}
