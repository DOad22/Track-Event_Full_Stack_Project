import { Request, Response } from "express";
import { eventService } from "../services/event.service";

export const eventController = {
  getEvents: async (_req: Request, res: Response) => {
    try {
      const events = await eventService.getAll();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  },

  getEventById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const event = await eventService.getById(id);
      if (!event) return res.status(404).json({ error: "Event not found" });
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event" });
    }
  },

  createEvent: async (req: Request, res: Response) => {
    try {
      const event = await eventService.create(req.body);
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to create event" });
    }
  },

  updateEvent: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const event = await eventService.update(id, req.body);
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to update event" });
    }
  },

  deleteEvent: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await eventService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete event" });
    }
  },
};
