import { Score } from "../types";
import { scoresData } from "../data/scoresData";


let scores: Score[] = [...scoresData];

export const scoreRepository = {

  getAll: (): Score[] => scores,

  add: (newScore: Score): void => {
    if (newScore.points < 0) {
      console.error("Score cannot be negative.");
      return;
    }
    scores = [...scores, newScore];
  },
};
