import { Request, Response, NextFunction } from "express";

export function validateCreateParticipant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  next();
}

export function validateUpdateParticipant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res
      .status(400)
      .json({ error: "Name and email are required to update" });
  }

  next();
}
