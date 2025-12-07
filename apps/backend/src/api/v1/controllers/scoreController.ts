import { Request, Response } from "express";
import * as scoreService from "../services/scoreService";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import { createScoreSchema } from "../validations/scoreValidation";

export const protectRoute = requireAuth();

export const getScores = async (_req: Request, res: Response) => {
  try {
    const scores = await scoreService.getAllScores();
    res.json(scores);
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ message: "Error fetching scores" });
  }
};

export const addScore = [
  protectRoute,
  async (req: any, res: Response) => {
    try {
      const { error } = createScoreSchema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const { player, points } = req.body;

      const userId = req.auth?.userId;
      if (!userId) return res.status(401).json({ message: "Unauthorized" });

      const newScore = await scoreService.createScore(player, points, userId);
      return res.status(201).json(newScore);

    } catch (error) {
      console.error("Error adding score:", error);
      return res.status(500).json({ message: "Error adding score" });
    }
  },
];

export const updateScore = [
  protectRoute,
  async (req: any, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { player, points } = req.body;

      const updated = await scoreService.updateScore(id, { player, points });
      if (!updated) return res.status(404).json({ message: "Score not found" });

      res.json(updated);
    } catch (error) {
      console.error("Error updating score:", error);
      res.status(500).json({ message: "Error updating score" });
    }
  }
];

export const deleteScore = [
  protectRoute,
  async (req: any, res: Response) => {
    try {
      const id = Number(req.params.id);

      const deleted = await scoreService.deleteScore(id);
      if (!deleted) return res.status(404).json({ message: "Score not found" });

      res.json({ message: "Score deleted successfully" });
    } catch (error) {
      console.error("Error deleting score:", error);
      res.status(500).json({ message: "Error deleting score" });
    }
  }
];
