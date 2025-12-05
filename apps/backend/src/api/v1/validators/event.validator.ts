import { Request, Response, NextFunction } from "express";

export function validateEvent(req: Request, res: Response, next: NextFunction) {
  const { title, date } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: "Title and date are required." });
  }

  next();
}
