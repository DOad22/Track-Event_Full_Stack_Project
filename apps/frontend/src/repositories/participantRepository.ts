import { Participant } from "../types/participant";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const PARTICIPANT_ENDPOINT = "/participants";

type ParticipantsResponseJSON = { message: string; data: Participant[] };
type ParticipantResponseJSON = { message: string; data: Participant };

export class ParticipantRepository {
  // GET ALL PARTICIPANTS
  async getAllParticipants(sessionToken?: string | null): Promise<Participant[]> {
    const headers: Record<string, string> = {};

    if (sessionToken) {
      headers["Authorization"] = `Bearer ${sessionToken}`;
    }

    const response = await fetch(`${BASE_URL}${PARTICIPANT_ENDPOINT}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch participants");
    }

    const json: ParticipantsResponseJSON = await response.json();
    return json.data;
  }

  async getParticipantsByGame(
    game: string,
    sessionToken?: string | null
  ): Promise<Participant[]> {
    const headers: Record<string, string> = {};

    if (sessionToken) {
      headers["Authorization"] = `Bearer ${sessionToken}`;
    }

    const response = await fetch(
      `${BASE_URL}${PARTICIPANT_ENDPOINT}?game=${encodeURIComponent(game)}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch participants for game: ${game}`);
    }

    const json: ParticipantsResponseJSON = await response.json();
    return json.data;
  }

  async addParticipant(
    data: Omit<Participant, "id">,
    sessionToken: string
  ): Promise<Participant> {
    const response = await fetch(`${BASE_URL}${PARTICIPANT_ENDPOINT}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to add participant");
    }

    const json: ParticipantResponseJSON = await response.json();
    return json.data;
  }

  async updateParticipant(
    id: string,
    updates: Partial<Participant>,
    sessionToken: string
  ): Promise<Participant> {
    const response = await fetch(`${BASE_URL}${PARTICIPANT_ENDPOINT}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to update participant with id ${id}`);
    }

    const json: ParticipantResponseJSON = await response.json();
    return json.data;
  }
  
  async deleteParticipant(
    id: string,
    sessionToken: string
  ): Promise<boolean> {
    const response = await fetch(`${BASE_URL}${PARTICIPANT_ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete participant with id ${id}`);
    }

    return true;
  }
}
