import { Participant, ParticipantFormData } from '../types/participant';

export class ParticipantService {
  repo: any | null;
  baseUrl: string;

  constructor(repository?: any, baseUrl?: string) {
    this.repo = repository || null;
    this.baseUrl = baseUrl || import.meta.env.VITE_API_URL || 'http://localhost:3000';
  }

  async getAllParticipants(token?: string): Promise<Participant[]> {
    if (this.repo && typeof this.repo.getAllParticipants === 'function') {
      return await this.repo.getAllParticipants(token);
    }

    const res = await fetch(`${this.baseUrl}/api/v1/participants`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (!res.ok) throw new Error('Failed to fetch participants');
    return await res.json();
  }

  async getParticipantsByGame(game: string, token?: string): Promise<Participant[]> {
    if (!game) throw new Error('Game is required');

    if (this.repo && typeof this.repo.getParticipantsByGame === 'function') {
      return await this.repo.getParticipantsByGame(game);
    }

    const res = await fetch(`${this.baseUrl}/api/v1/participants?game=${encodeURIComponent(game)}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    if (!res.ok) throw new Error('Failed to fetch participants by game');
    return await res.json();
  }

  async addParticipant(data: ParticipantFormData, token?: string): Promise<Participant> {
    if (!data.name.trim()) throw new Error('Participant name is required');
    if (!this.isValidEmail(data.email)) throw new Error('Valid email is required');
    if (!data.game) throw new Error('Game selection is required');

    if (this.repo && typeof this.repo.addParticipant === 'function' && !token) {
      return await this.repo.addParticipant({ ...data, status: 'pending' });
    }

    const res = await fetch(`${this.baseUrl}/api/v1/participants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || 'Failed to add participant');
    }
    return await res.json();
  }

  async confirmParticipant(id: string, token?: string): Promise<Participant | null> {
    if (this.repo && typeof this.repo.updateParticipant === 'function' && !token) {
      return await this.repo.updateParticipant(id, { status: 'confirmed' });
    }

    const res = await fetch(`${this.baseUrl}/api/v1/participants/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ status: 'confirmed' }),
    });

    if (res.status === 404) return null;
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || 'Failed to confirm participant');
    }
    return await res.json();
  }

  async declineParticipant(id: string, token?: string): Promise<Participant | null> {
    if (this.repo && typeof this.repo.updateParticipant === 'function' && !token) {
      return await this.repo.updateParticipant(id, { status: 'declined' });
    }

    const res = await fetch(`${this.baseUrl}/api/v1/participants/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ status: 'declined' }),
    });

    if (res.status === 404) return null;
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || 'Failed to decline participant');
    }
    return await res.json();
  }

  async removeParticipant(id: string, token?: string): Promise<boolean> {
    if (this.repo && typeof this.repo.deleteParticipant === 'function' && !token) {
      return await this.repo.deleteParticipant(id);
    }

    const res = await fetch(`${this.baseUrl}/api/v1/participants/${id}`, {
      method: 'DELETE',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (res.status === 404) return false;
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || 'Failed to delete participant');
    }
    return true;
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
