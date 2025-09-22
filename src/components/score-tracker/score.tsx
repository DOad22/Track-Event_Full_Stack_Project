export default function ScoreTracking() {
  const scores = [
    { game: "Cricket", player: "Kim", points: 250 },
    { game: "Football", player: "Jimmy", points: 3 },
    { game: "Badminton", player: "Jack", points: 21 }
  ];

  return (
    <section className="score-tracking">
      <h2>Score Tracking</h2>
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Player </th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{score.game}</td>
              <td>{score.player}</td>
              <td>{score.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
