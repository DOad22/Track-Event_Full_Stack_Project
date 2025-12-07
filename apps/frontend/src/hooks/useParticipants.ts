import { useState, useEffect } from 'react';
import { ParticipantService } from '../services/participantService';
import { ParticipantRepository } from '../repositories/participantRepository';
import { Participant, ParticipantFormData } from '../types/participant';
import { useAuth } from '@clerk/clerk-react';

export const useParticipants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const repo = new ParticipantRepository();
  const service = new ParticipantService(repo);
  const { getToken } = useAuth();

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = (await getToken()) || undefined; // null → undefined
      const data = await service.getAllParticipants(token);
      setParticipants(data);
    } catch {
      setError('Failed to load participants');
    } finally {
      setLoading(false);
    }
  };

  const addParticipant = async (formData: ParticipantFormData) => {
    setLoading(true);
    setError(null);
    try {
      const token = (await getToken()) || undefined; // null → undefined
      const newP = await service.addParticipant(formData, token!); // token guaranteed for POST
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
    const token = (await getToken()) || undefined;
    return service.confirmParticipant(id, token!);
  };

  const declineParticipant = async (id: string) => {
    const token = (await getToken()) || undefined;
    return service.declineParticipant(id, token!);
  };

  const removeParticipant = async (id: string) => {
    const token = (await getToken()) || undefined;
    return service.removeParticipant(id, token!);
  };

  const getStats = () => service.getParticipantStats(participants);

  return {
    participants,
    loading,
    error,
    loadAllParticipants: loadAll,
    addParticipant,
    confirmParticipant,
    declineParticipant,
    removeParticipant,
    getStats,
    clearError: () => setError(null)
  };
};
