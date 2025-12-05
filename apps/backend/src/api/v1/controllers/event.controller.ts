import { Request, Response } from "express";
import { eventService } from "../services/event.service";

export const eventController = {
  
  getEvents: async (_req: Request, res: Response) => {
    try {
      const events = await eventService.getAll();
      res.json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch events" });
    }
  },

  
  getEventById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid event ID" });

      const event = await eventService.getById(id);
      if (!event) return res.status(404).json({ error: "Event not found" });

      res.json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch event" });
    }
  },

  
  createEvent: async (req: Request, res: Response) => {
    try {
      const { title, date, location, userId, tags } = req.body;

      if (!title || !date || !userId) {
        return res.status(400).json({ error: "Title, date, and userId are required" });
      }

      const event = await eventService.create({
        title,
        date,
        location,
        userId: Number(userId),
        tags, 
      });

      res.status(201).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create event" });
    }
  },

  
  updateEvent: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid event ID" });

      const data = req.body;

      const existing = await eventService.getById(id);
      if (!existing) return res.status(404).json({ error: "Event not found" });

      const event = await eventService.update(id, data);
      res.json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update event" });
    }
  },

  
  deleteEvent: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "Invalid event ID" });

      const existing = await eventService.getById(id);
      if (!existing) return res.status(404).json({ error: "Event not found" });

      await eventService.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete event" });
    }
  },

  
  getPersonalizedEvents: async (req: Request, res: Response) => {
  try {
    const userId = Number(req.query.userId); 
    if (isNaN(userId)) return res.status(400).json({ error: "Invalid user ID" });

    const tags = (req.query.tags as string)?.split(",") || []; 

    let events = await eventService.getPersonalized(userId);

    if (tags.length > 0) {
      events = events.filter(event =>
        event.tags?.some(tag => tags.includes(tag))
      );
    }

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch personalized events" });
  }
}

};
