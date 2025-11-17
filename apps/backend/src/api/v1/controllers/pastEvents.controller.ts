import { Request, Response, NextFunction } from "express";
import { pastEventsService } from "../services/pastEvents.service";

export const pastEventController = {
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await pastEventsService.getAll();
      res.json(events);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const event = await pastEventsService.getById(id);

      if (!event) {
        return res.status(404).json({ error: "Past event not found" });
      }

      res.json(event);
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event = await pastEventsService.create(req.body);
      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const event = await pastEventsService.update(id, req.body);
      res.json(event);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await pastEventsService.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Event not found" });
      }

      return res.status(200).json({ message: "Past event deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};
