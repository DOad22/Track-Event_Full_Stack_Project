import express from "express";
import {
  getParticipants,
  getParticipantById,
  createParticipant,
  updateParticipant,
  deleteParticipant,
} from "../controllers/participantController";
import {
  validateCreateParticipant,
  validateUpdateParticipant,
} from "../validations/participantValidator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Participants
 *   description: API endpoints for managing participants
 */

/**
 * @swagger
 * /api/v1/participants:
 *   get:
 *     summary: Get all participants
 *     tags: [Participants]
 *     responses:
 *       200:
 *         description: List of all participants
 */
router.get("/", getParticipants);

/**
 * @swagger
 * /api/v1/participants/{id}:
 *   get:
 *     summary: Get participant by ID
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the participant
 *     responses:
 *       200:
 *         description: Participant found
 *       404:
 *         description: Participant not found
 */
router.get("/:id", getParticipantById);

/**
 * @swagger
 * /api/v1/participants:
 *   post:
 *     summary: Create a new participant
 *     tags: [Participants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: number
 *             required:
 *               - name
 *               - email
 *     responses:
 *       201:
 *         description: Participant created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", validateCreateParticipant, createParticipant);

/**
 * @swagger
 * /api/v1/participants/{id}:
 *   put:
 *     summary: Update an existing participant
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the participant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       200:
 *         description: Participant updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Participant not found
 */
router.put("/:id", validateUpdateParticipant, updateParticipant);

/**
 * @swagger
 * /api/v1/participants/{id}:
 *   delete:
 *     summary: Delete a participant
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the participant
 *     responses:
 *       200:
 *         description: Participant deleted successfully
 *       404:
 *         description: Participant not found
 */
router.delete("/:id", deleteParticipant);

export default router;
