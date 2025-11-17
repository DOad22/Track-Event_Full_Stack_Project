import { Router } from "express";
import {
  getScores,
  addScore,
  updateScore,
  deleteScore,
} from "../controllers/scoreController";

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
router.post("/", addScore);

/**
 * @swagger
 * /api/v1/scores/{id}:
 *   put:
 *     summary: Update an existing score
 *     tags: [Scores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Score ID
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
 *       404:
 *         description: Score not found
 */
router.put("/:id", updateScore);

/**
 * @swagger
 * /api/v1/scores/{id}:
 *   delete:
 *     summary: Delete a score
 *     tags: [Scores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Score ID
 *     responses:
 *       200:
 *         description: Score deleted successfully
 *       404:
 *         description: Score not found
 */
router.delete("/:id", deleteScore);

export default router;