import { Score } from "../types";
import { scoreRepository } from "../repositories/scoreRepository";

export const scoreService = {
  getScores: (): Score[] => scoreRepository.getAll(),

  addScore: (participantId: number, points: number): Score | null => {
    
    if (points < 0) {
      console.warn("Attempted to add a negative score. Action ignored.");
      return null;
    }

    const newScore: Score = {
      id: Date.now(),
      participantId,
      points,
    };

    scoreRepository.add(newScore);
    return newScore;
  },
};
