import { useState, useEffect } from 'react';
import { ParticipantService } from '../services/participantService';
import { ParticipantRepository } from '../repositories/participantRepository';
import { Participant, ParticipantFormData } from '../types/participant';

export const useParticipants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const repo = new ParticipantRepository();
  const service = new ParticipantService(repo);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await service.getAllParticipants();
      setParticipants(data);
    } catch {
      setError('Failed to load participants');
    } finally {
      setLoading(false);
    }
  };

  const loadByGame = async (game: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await service.getParticipantsByGame(game);
      setParticipants(data);
    } catch {
      setError('Failed to load game participants');
    } finally {
      setLoading(false);
    }
  };

  const addParticipant = async (formData: ParticipantFormData) => {
    setLoading(true);
    setError(null);
    try {
      const newP = await service.addParticipant(formData);
      setParticipants(prev => [...prev, newP]);
      return newP;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add participant');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const confirmParticipant = async (id: string) => {
    setError(null);
    try {
      const updated = await service.confirmParticipant(id);
      if (updated) setParticipants(prev => prev.map(p => (p.id === id ? updated : p)));
      return updated;
    } catch {
      setError('Failed to confirm participant');
      throw new Error('Failed to confirm participant');
    }
  };

  const declineParticipant = async (id: string) => {
    setError(null);
    try {
      const updated = await service.declineParticipant(id);
      if (updated) setParticipants(prev => prev.map(p => (p.id === id ? updated : p)));
      return updated;
    } catch {
      setError('Failed to decline participant');
      throw new Error('Failed to decline participant');
    }
  };

  const removeParticipant = async (id: string) => {
    setError(null);
    try {
      const success = await service.removeParticipant(id);
      if (success) setParticipants(prev => prev.filter(p => p.id !== id));
      return success;
    } catch {
      setError('Failed to remove participant');
      throw new Error('Failed to remove participant');
    }
  };

  const getStats = () => service.getParticipantStats(participants);

  return {
    participants,
    loading,
    error,
    loadAllParticipants: loadAll,
    loadGameParticipants: loadByGame,
    addParticipant,
    confirmParticipant,
    declineParticipant,
    removeParticipant,
    getStats,
    clearError: () => setError(null)
  };
};
