import { Request, Response, NextFunction } from "express";

export function pastEventsErrorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("PastEvents Error:", err);

  if (err.code === "P2025") {
    return res.status(404).json({ error: "Past event not found" });
  }

  if (err.code === "P2002") {
    return res.status(400).json({ error: "Duplicate data error" });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).json({
    error: "Internal Server Error",
  });
}
