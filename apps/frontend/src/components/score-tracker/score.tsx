import "./score.css";
import { useScores } from "../../hooks/useScores";
import { useScoreForm } from "../../hooks/useScoreForm"; 
import { Participant } from "../../types";

interface Props {
  participants: Participant[];
}

export default function ScoreTracker({ participants }: Props) {
  const { scores, addScore } = useScores();
  const { selectedId, setSelectedId, points, setPoints, handleAdd } = useScoreForm(addScore);

  return (
    <section className="score-tracking">
      <h2>Score Tracking</h2>

      <div className="form">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
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
            const participant = participants.find(
              (p) => p.id === score.participantId
            );
            return (
              <tr key={index}>
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