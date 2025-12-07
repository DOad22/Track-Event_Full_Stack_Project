import { Router } from "express";
import { requireAuth } from "@clerk/express";

import {
  getScores,
  addScore,
  updateScore,
  deleteScore,
} from "../controllers/scoreController";

import validateRequest from "../middleware/validateRequest";
import { createScoreSchema } from "../validations/scoreValidation";

const router = Router();

/**
 * @swagger
 * /api/v1/scores:
 *   get:
 *     summary: Get all scores
 *     tags: [Scores]
 *     responses:
 *       200:
 *         description: List of scores
 */
router.get("/", getScores);

/**
 * @swagger
 * /api/v1/scores:
 *   post:
 *     summary: Add a new score
 *     tags: [Scores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               player:
 *                 type: string
 *               points:
 *                 type: number
 *     responses:
 *       201:
 *         description: Score created successfully
 */
router.post("/",requireAuth(), validateRequest(createScoreSchema), addScore);

/**
 * @swagger
 * /api/v1/scores/{id}:
 *   put:
 *     summary: Update an existing score
 *     tags: [Scores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               player:
 *                 type: string
 *               points:
 *                 type: number
 *     responses:
 *       200:
 *         description: Score updated successfully
 */
router.put(  "/:id",  requireAuth(), validateRequest(createScoreSchema), updateScore);

/**
 * @swagger
 * /api/v1/scores/{id}:
 *   delete:
 *     summary: Delete a score
 *     tags: [Scores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Score deleted successfully
 */
router.delete("/:id", requireAuth(), deleteScore);

export default router;