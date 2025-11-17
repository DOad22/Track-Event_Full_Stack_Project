import { Request, Response } from "express";
import {
  listParticipants,
  findParticipant,
  createParticipantService,
  updateParticipantService,
  deleteParticipantService,
} from "../services/participantService";

export async function getParticipants(req: Request, res: Response) {
  try {
    const data = await listParticipants();
    res.json(data);
  } catch (err) {
    console.error("ERROR getParticipants:", err);
    res.status(500).json({ error: "Could not get participants" });
  }
}

export async function getParticipantById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const participant = await findParticipant(id);

    if (!participant) {
      return res.status(404).json({ error: "Participant not found" });
    }

    res.json(participant);
  } catch (err) {
    console.error("ERROR getParticipantById:", err);
    res.status(500).json({ error: "Error getting participant" });
  }
}

export async function createParticipant(req: Request, res: Response) {
  try {
    const newParticipant = await createParticipantService(req.body);
    res.status(201).json(newParticipant);
  } catch (err) {
    console.error("ERROR createParticipant:", err);
    res.status(500).json({ error: "Error creating participant" });
  }
}

export async function updateParticipant(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updated = await updateParticipantService(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Participant not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("ERROR updateParticipant:", err);
    res.status(500).json({ error: "Error updating participant" });
  }
}

export async function deleteParticipant(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const deleted = await deleteParticipantService(id);

    if (!deleted) {
      return res.status(404).json({ error: "Participant not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("ERROR deleteParticipant:", err);
    res.status(500).json({ error: "Error deleting participant" });
  }
}
