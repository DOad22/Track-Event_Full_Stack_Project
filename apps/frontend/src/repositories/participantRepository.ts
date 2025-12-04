import { Participant } from '../types/participant';
import { participantTestData } from '../data/participantData';

export class ParticipantRepository {

  async getAllParticipants(): Promise<Participant[]> {
    return [...participantTestData]; 
  }

  async getParticipantsByGame(game: string): Promise<Participant[]> {
    return participantTestData.filter(p => p.game.toLowerCase() === game.toLowerCase());
  }

  async addParticipant(data: Omit<Participant, 'id'>): Promise<Participant> {
   
    const nextId =
      participantTestData.length > 0
        ? (Math.max(...participantTestData.map(p => Number(p.id))) + 1).toString()
        : '1';

    const newParticipant: Participant = {
      id: nextId,
      ...data
    };

    participantTestData.push(newParticipant);
    return newParticipant;
  }

  async updateParticipant(id: string, updates: Partial<Participant>): Promise<Participant | null> {
    const index = participantTestData.findIndex(p => p.id === id);
    if (index === -1) return null;

    participantTestData[index] = {
      ...participantTestData[index],
      ...updates
    };

    return participantTestData[index];
  }

  async deleteParticipant(id: string): Promise<boolean> {
    const index = participantTestData.findIndex(p => p.id === id);
    if (index === -1) return false;

    participantTestData.splice(index, 1);
    return true;
  }
}
