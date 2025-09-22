import "../../components/event-history/PastEvents.css";

function PastEvents() {
  const events: { name: string; date: string }[] = [
    { name: "Basketball", date: "2025-01-12" },
    { name: "Cricket", date: "2025-02-05" },
    { name: "Volleyball", date: "2025-04-20" },
    { name: "Soccer", date: "2025-05-04"}
  ];

  return (
    <section className="past-events">
      <h2>Past Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>{event.name}</strong> — {event.date}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PastEvents;
