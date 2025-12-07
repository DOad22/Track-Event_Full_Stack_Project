export interface Score {
  player: string;
  id: number;
  participantId: number;
  points: number;
}

export interface Participant {
  id: number;
  name: string;
  game: string;
}