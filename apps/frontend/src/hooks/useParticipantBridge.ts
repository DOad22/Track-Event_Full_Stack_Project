import { useParticipants } from "./useParticipants";
import { Participant as ExternalParticipant } from "../types/participant";
import { Participant as ScoreParticipant } from "../types";

export const useParticipantBridge = () => {
  const { participants, loading, error } = useParticipants();

  const adaptedParticipants: ScoreParticipant[] = participants.map(
    (p: ExternalParticipant) => ({
      id: Number(p.id),
      name: p.name,
      game: p.game,
    })
  );

  return { participants: adaptedParticipants, loading, error };
};
