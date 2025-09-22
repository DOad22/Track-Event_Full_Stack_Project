export default function ParticipantList() {
  const participants = [
    { id: 1, name: "Kim", game: "Chess" },
    { id: 2, name: "Jimmy", game: "Tennis" },
    { id: 3, name: "Jack", game: "Soccer" }
  ];

  return (
    <section className="participant-list">
      <h2>Participants</h2>
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
