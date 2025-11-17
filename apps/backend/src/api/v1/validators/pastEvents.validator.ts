import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const pastEventSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().optional(),
  date: Joi.date().iso().required()
});

export function validatePastEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = pastEventSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      details: error.details.map((d) => d.message),
    });
  }

  next();
}
