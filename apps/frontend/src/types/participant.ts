export interface Participant {
  id: string;
  name: string;
  email: string;
  game: string;
  status: 'confirmed' | 'pending' | 'declined';
}

export interface ParticipantFormData {
  name: string;
  email: string;
  game: string;
} 