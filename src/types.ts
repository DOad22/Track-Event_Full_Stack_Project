export interface Participant {
  id: number;
  name: string;
  game: string;
}

export interface Score {
  participantId: number;
  points: number;
}