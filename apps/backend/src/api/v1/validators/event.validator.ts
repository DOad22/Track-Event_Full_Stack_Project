import { Request, Response, NextFunction } from "express";

export function validateEvent(req: Request, res: Response, next: NextFunction) {
  const { title, date, location } = req.body;

  if (!title || !date || !location) {
    return res.status(400).json({ message: "Title, date, and location are required." });
  }

  next();
}
