import "./score.css";
import { useScores } from "../../hooks/useScores";
import { Participant } from "../../types";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

interface Props {
  participants: Participant[];
}

export default function ScoreTracker({ participants }: Props) {
  const { scores, addScore } = useScores();
  const { isSignedIn } = useUser();

  const [selectedId, setSelectedId] = useState<string>("");
  const [points, setPoints] = useState<string>("");

  const handleAdd = () => {
    if (!isSignedIn) return alert("Please login to add a score");

    if (!selectedId || !points) return;

    const participant = participants.find(
      (p) => p.id.toString() === selectedId
    );

    if (!participant) return;

    addScore(participant.name, Number(points));
    setPoints("");
  };

  return (
    <section className="score-tracking">
      <h2>Score Tracking</h2>

      <div className="form">
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">Select Participant</option>
          {participants.map((p) => (
            <option key={p.id} value={p.id.toString()}>
              {p.name} — {p.game}
            </option>
          ))}
        </select>

        <input
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          placeholder="Score"
          type="number"
        />

        <button onClick={handleAdd}>Add</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => {
            const participant = participants.find((p) => p.name === score.player);

            return (
              <tr key={score.id}>
                <td>{participant?.game}</td>
                <td>{participant?.name}</td>
                <td>{score.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}