import { useState, useEffect } from "react";
import { Score } from "../types";
import { scoreRepository } from "../repositories/scoreRepository";
import { useAuth } from "@clerk/clerk-react";

export const useScores = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const { getToken } = useAuth();

  const fetchScores = async () => {
    try {
      const data = await scoreRepository.getAll();
      setScores(data);
    } catch (err) {
      console.error("Error loading scores:", err);
    }
  };

  const addScore = async (player: string, points: number) => {
    try {
      const token = await getToken({ template: "default" });

      if (!token) {
        alert("You must be signed in to add a score.");
        return;
      }

      const newScore = await scoreRepository.add(player, points, token);

      if (newScore) {
        setScores((prev) => [newScore, ...prev]);
      } else {
        alert("Error adding score.");
      }
    } catch (err) {
      console.error("Error adding score:", err);
      alert("Error adding score.");
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return { scores, addScore };
};
