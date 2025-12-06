import { Request, Response } from "express";
import {
  listParticipants,
  findParticipant,
  createParticipantService,
  updateParticipantService,
  deleteParticipantService,
  ParticipantData,
} from "../services/participantService";

// Clerk import
import { getAuth } from "@clerk/express";

// Get all participants for logged-in user
export async function getParticipants(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);

    if (!userId) return res.json([]); 

    const data = await listParticipants(userId);
    res.json(data);
  } catch (err) {
    console.error("ERROR getParticipants:", err);
    res.status(500).json({ error: "Could not get participants" });
  }
}

// Get a single participant
export async function getParticipantById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { userId } = getAuth(req);

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const participant = await findParticipant(id, userId);
    if (!participant)
      return res.status(404).json({ error: "Participant not found" });

    res.json(participant);
  } catch (err) {
    console.error("ERROR getParticipantById:", err);
    res.status(500).json({ error: "Error getting participant" });
  }
}

// Create a new participant
export async function createParticipant(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const data: ParticipantData = { ...req.body, userId };
    const newParticipant = await createParticipantService(data);

    res.status(201).json(newParticipant);
  } catch (err) {
    console.error("ERROR createParticipant:", err);
    res.status(500).json({ error: "Error creating participant" });
  }
}

// Update a participant
export async function updateParticipant(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { userId } = getAuth(req);

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const updated = await updateParticipantService(id, req.body, userId);
    if (!updated)
      return res.status(404).json({ error: "Participant not found" });

    res.json(updated);
  } catch (err) {
    console.error("ERROR updateParticipant:", err);
    res.status(500).json({ error: "Error updating participant" });
  }
}

// Delete a participant
export async function deleteParticipant(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { userId } = getAuth(req);

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const deleted = await deleteParticipantService(id, userId);
    if (!deleted)
      return res.status(404).json({ error: "Participant not found" });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("ERROR deleteParticipant:", err);
    res.status(500).json({ error: "Error deleting participant" });
  }
}
