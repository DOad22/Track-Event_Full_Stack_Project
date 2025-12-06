import express from "express";
import { pastEventController } from "../controllers/pastEvents.controller";
import { validatePastEvent } from "../validators/pastEvents.validator";
import { requireAuth } from "@clerk/express"; 

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PastEvents
 *   description: API endpoints for managing past events
 */

/**
 * @swagger
 * /api/past-events:
 *   get:
 *     summary: Get all past events
 *     tags: [PastEvents]
 *     responses:
 *       200:
 *         description: List of all past events
 */
router.get("/", pastEventController.getAll);

/**
 * @swagger
 * /api/past-events/{id}:
 *   get:
 *     summary: Get a past event by ID
 *     tags: [PastEvents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Past event ID
 *     responses:
 *       200:
 *         description: Past event details
 *       404:
 *         description: Past event not found
 */
router.get("/:id", pastEventController.getById);  

/**
 * @swagger
 * /api/past-events:
 *   post:
 *     summary: Create a new past event
 *     tags: [PastEvents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sports Day"
 *               description:
 *                 type: string
 *                 example: "Annual sports celebration event"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-11-15T10:00:00Z"
 *     responses:
 *       201:
 *         description: Past event created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", requireAuth(), validatePastEvent, pastEventController.create);  

/**
 * @swagger
 * /api/past-events/{id}:
 *   put:
 *     summary: Update an existing past event
 *     tags: [PastEvents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Past Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Past event updated successfully
 *       404:
 *         description: Event not found
 */
router.put("/:id", validatePastEvent, pastEventController.update); 

/**
 * @swagger
 * /api/past-events/{id}:
 *   delete:
 *     summary: Delete a past event
 *     tags: [PastEvents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Past Event ID
 *     responses:
 *       200:
 *         description: Past event deleted successfully
 *       404:
 *         description: Event not found
 */
router.delete("/:id", pastEventController.delete); 

export default router;
