import { useState } from "react";
interface Participant {
  id: number;
  name: string;
  game: string;
}
interface Props {
  participants: Participant[];
  addParticipant: (name: string, game: string) => void;
}
export default function ParticipantList({
  participants,
  addParticipant,
}: Props) {
  const [name, setName] = useState("");
  const [game, setGame] = useState("");
  const handleAdd = () => {
    if (name && game) {
      addParticipant(name, game);
      setName("");
      setGame("");
    }
  };
  return (
    <section className="participant-list">
      <h2>Participants</h2>

      <div className="form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Participant Name"
        />
        <input
          value={game}
          onChange={(e) => setGame(e.target.value)}
          placeholder="Game"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      
      <ul>
        {participants.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> — {p.game}
          </li>
        ))}
      </ul>
    </section>
  );
}
