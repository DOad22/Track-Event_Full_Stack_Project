import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const createParticipantSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  email: Joi.string().email().required(),
  idNo: Joi.string().trim().min(1).required(), 
  game: Joi.string().optional(),
  age: Joi.number().integer().min(0).optional(),
});

const updateParticipantSchema = Joi.object({
  name: Joi.string().trim().min(1).optional(),
  email: Joi.string().email().optional(),
  idNo: Joi.string().trim().min(1).optional(), 
  game: Joi.string().optional(),
  age: Joi.number().integer().min(0).optional(),
});

export function validateCreateParticipant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = createParticipantSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      error: "Validation failed",
      details: error.details.map((d) => d.message),
    });
  }
  next();
}

export function validateUpdateParticipant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = updateParticipantSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      error: "Validation failed",
      details: error.details.map((d) => d.message),
    });
  }
  next();
}
