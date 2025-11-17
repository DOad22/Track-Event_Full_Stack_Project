import { useState } from "react";
import { Score } from "../types";
import { scoreService } from "../services/scoreService";

export const useScores = () => {
  const [scores, setScores] = useState<Score[]>(scoreService.getScores());

  const addScore = (participantId: number, points: number) => {
    const result = scoreService.addScore(participantId, points);
    if (result) {
      setScores(scoreService.getScores());
    } else {
      alert("Invalid score. Negative scores are not allowed.");
    }
  };

  return { scores, addScore };
};
