import express from "express";
import { eventController } from "../controllers/event.controller";
import { validateEvent } from "../validators/event.validator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management endpoints
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 */
router.get("/", eventController.getEvents);

/**
 * @swagger
 * /api/events/personalized:
 *   get:
 *     summary: Get personalized events for a user
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *         example: 13
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         required: false
 *         description: Comma-separated list of tags for filtering events
 *         example: games,fun
 *     responses:
 *       200:
 *         description: List of personalized events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   location:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Server error
 */
router.get("/personalized", eventController.getPersonalizedEvents);

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               userId:
 *                 type: integer
 *             required:
 *               - title
 *               - date
 *               - userId
 *           example:
 *             title: "Board Game Night"
 *             description: "An evening to play and enjoy all types of board games."
 *             date: "2025-12-05T19:07:08.394Z"
 *             location: "Winnipeg Community Center"
 *             tags: ["games", "fun", "friends"]
 *             userId: 123
 *     responses:
 *       201:
 *         description: Event created successfully
 */
router.post("/", validateEvent, eventController.createEvent);


/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 */
router.get("/:id", eventController.getEventById);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Update an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 */
router.put("/:id", validateEvent, eventController.updateEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 */
router.delete("/:id", eventController.deleteEvent);

export default router;
