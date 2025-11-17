import { useState, useEffect } from "react";
import { Score } from "../types";
import { scoreService } from "../services/scoreService";

export const useScores = () => {
  
  const [scores, setScores] = useState<Score[]>(() => {
    const saved = localStorage.getItem("scores");
    if (saved) return JSON.parse(saved);
    const initial = scoreService.getScores();
    localStorage.setItem("scores", JSON.stringify(initial));
    return initial;
  });

  const addScore = (participantId: number, points: number) => {
    const result = scoreService.addScore(participantId, points);
    if (result) {
      const updatedScores = scoreService.getScores();
      setScores(updatedScores);
      localStorage.setItem("scores", JSON.stringify(updatedScores)); 
    } else {
      alert("Invalid score. Negative scores are not allowed.");
    }
  };
  
  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  return { scores, addScore };
};