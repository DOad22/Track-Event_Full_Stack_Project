import { useState } from "react";
import "./score.css";
import { Participant, Score } from "../../types";

interface Props {
  participants: Participant[];
  scores: Score[];
  addScore: (participantId: number, points: number) => void;
}

export default function ScoreTracker({ participants, scores, addScore }: Props) {
  const [selectedId, setSelectedId] = useState<string>("");
  const [points, setPoints] = useState<string>("");

  const handleAdd = () => {
    if (selectedId && points) {
      addScore(Number(selectedId), Number(points));
      setSelectedId("");
      setPoints("");
    }
  };

  return (
    <section className="score-tracking">
      <h2>Score Tracking</h2>

      <div className="form">
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">Select Participant</option>
          {participants.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — {p.game}
            </option>
          ))}
        </select>

        <input
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          placeholder="Score"
          type="number"
          min="0"
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
          {scores.map((score, index) => {
            const participant = participants.find((p) => p.id === score.participantId);
            return (
              <tr key={index}>
                <td>{participant?.game || "Unknown"}</td>
                <td>{participant?.name || "Unknown"}</td>
                <td>{score.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
