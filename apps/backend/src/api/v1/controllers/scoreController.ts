import { Request, Response } from "express";
import * as scoreService from "../services/scoreService";

export const getScores = async (_req: Request, res: Response) => {
  const scores = await scoreService.getAllScores();
  res.json(scores);
};

export const addScore = async (req: Request, res: Response) => {
  const { player, points } = req.body;
  const newScore = await scoreService.createScore(player, points);
  res.status(201).json(newScore);
};

export const updateScore = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { player, points } = req.body;

  const updated = await scoreService.updateScore(id, { player, points });
  if (!updated) {
    return res.status(404).json({ message: "Score not found" });
  }
  res.json(updated);
};

export const deleteScore = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const deleted = await scoreService.deleteScore(id);
  if (!deleted) {
    return res.status(404).json({ message: "Score not found" });
  }
  res.json({ message: "Score deleted successfully" });
};
