import { ParticipantRepository } from '../repositories/participantRepository';
import { Participant, ParticipantFormData } from '../types/participant';

export class ParticipantService {
  repo: ParticipantRepository;

  constructor(repository: ParticipantRepository) {
    this.repo = repository;
  }

  async getAllParticipants(): Promise<Participant[]> {
    return await this.repo.getAllParticipants();
  }

  async getParticipantsByGame(game: string): Promise<Participant[]> {
    if (!game) throw new Error('Game is required');
    return await this.repo.getParticipantsByGame(game);
  }

  async addParticipant(data: ParticipantFormData): Promise<Participant> {
    if (!data.name.trim()) throw new Error('Participant name is required');
    if (!this.isValidEmail(data.email)) throw new Error('Valid email is required');
    if (!data.game) throw new Error('Game selection is required');

    const newP = await this.repo.addParticipant({ ...data, status: 'pending' });
    return newP;
  }

  async confirmParticipant(id: string): Promise<Participant | null> {
    return await this.repo.updateParticipant(id, { status: 'confirmed' });
  }

  async declineParticipant(id: string): Promise<Participant | null> {
    return await this.repo.updateParticipant(id, { status: 'declined' });
  }

  async removeParticipant(id: string): Promise<boolean> {
    return await this.repo.deleteParticipant(id);
  }

  getParticipantStats(list: Participant[]) {
    const total = list.length;
    const confirmed = list.filter(p => p.status === 'confirmed').length;
    const pending = list.filter(p => p.status === 'pending').length;
    const declined = list.filter(p => p.status === 'declined').length;

    const games = [...new Set(list.map(p => p.game))];
    const gameStats = games.map(game => {
      const g = list.filter(p => p.game === game);
      return { game, count: g.length };
    });

    return {
      total,
      confirmed,
      pending,
      declined,
      confirmationRate: total ? (confirmed / total) * 100 : 0,
      gameStats
    };
  }

  private isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
