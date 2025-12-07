import { Score } from "../types";
import { scoreRepository } from "../repositories/scoreRepository";

export const scoreService = {
  getScores: async (): Promise<Score[]> => {
    return await scoreRepository.getAll();
  },

  addScore: async (
    player: string,
    points: number,
    token?: string
  ): Promise<Score | null> => {
    if (points < 0) {
      console.warn("Attempted to add a negative score. Action ignored.");
      return null;
    }
    
    return await scoreRepository.add(player, points, token);
  },
};
