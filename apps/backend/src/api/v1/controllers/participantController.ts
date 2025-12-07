// apps/backend/src/api/v1/controllers/participantController.ts
import { Request, Response } from "express";
import {
  listParticipants,
  findParticipant,
  createParticipantService,
  updateParticipantService,
  deleteParticipantService,
  ParticipantData,
} from "../services/participantService";

import { getAuth } from "@clerk/express";

export async function getParticipants(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const data = await listParticipants(userId);
    return res.json(data);
  } catch (err) {
    console.error("ERROR getParticipants:", err);
    return res.status(500).json({ error: "Could not get participants" });
  }
}

export async function getParticipantById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { userId } = getAuth(req);

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const participant = await findParticipant(id, userId);
    if (!participant) return res.status(404).json({ error: "Participant not found" });

    return res.json(participant);
  } catch (err) {
    console.error("ERROR getParticipantById:", err);
    return res.status(500).json({ error: "Error getting participant" });
  }
}

export async function createParticipant(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const data: ParticipantData = { ...req.body, userId };
    const newParticipant = await createParticipantService(data);

    return res.status(201).json(newParticipant);
  } catch (err) {
    console.error("ERROR createParticipant:", err);
    return res.status(500).json({ error: "Error creating participant" });
  }
}

export async function updateParticipant(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { userId } = getAuth(req);

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const updated = await updateParticipantService(id, req.body, userId);
    if (!updated) return res.status(404).json({ error: "Participant not found or unauthorized" });

    return res.json(updated);
  } catch (err) {
    console.error("ERROR updateParticipant:", err);
    return res.status(500).json({ error: "Error updating participant" });
  }
}

export async function deleteParticipant(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { userId } = getAuth(req);

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const deleted = await deleteParticipantService(id, userId);
    if (!deleted) return res.status(404).json({ error: "Participant not found or unauthorized" });

    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("ERROR deleteParticipant:", err);
    return res.status(500).json({ error: "Error deleting participant" });
  }
}
