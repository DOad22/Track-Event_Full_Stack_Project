import { Score } from "../types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const scoreRepository = {
  getAll: async (): Promise<Score[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/scores`);
      return await res.json();
    } catch (err) {
      console.error("Failed to fetch scores", err);
      return [];
    }
  },

  add: async (
    player: string,
    points: number,
    sessionToken?: string
  ): Promise<Score | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/scores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {}),
        },
        body: JSON.stringify({ player, points }),
      });

      if (!res.ok) throw new Error("Failed to add score");

      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },
};
 