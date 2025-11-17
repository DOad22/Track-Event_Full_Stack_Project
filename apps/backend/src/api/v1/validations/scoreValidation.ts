import Joi from "joi";

export const createScoreSchema = Joi.object({
  player: Joi.string().min(2).max(50).required(),
  points: Joi.number().integer().min(0).required(),
});
