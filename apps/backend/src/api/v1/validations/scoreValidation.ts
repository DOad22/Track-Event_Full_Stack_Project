import Joi from "joi";

export const createScoreSchema = Joi.object({
  userId: Joi.string().required(),
  player: Joi.string().min(2).max(50).required(),
  score: Joi.number().integer().min(0).required()
});
