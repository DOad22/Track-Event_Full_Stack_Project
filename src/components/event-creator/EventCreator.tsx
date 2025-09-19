import "./EventCreator.css";   

function EventCreator() {
  // A list of static events with name, date, and time
  const events = [
    { name: "Cricket Match", date: "2025-09-20", time: "10:00 AM" },
    { name: "Football Game", date: "2025-09-22", time: "03:30 PM" },
    { name: "Basketball Tournament", date: "2025-09-25", time: "01:00 PM" },
    { name: "Volleyball Game", date: "2025-09-28", time: "11:30 AM" },
    { name: "Badminton Match", date: "2025-10-01", time: "09:00 AM" }
  ];

  // Show the events on the screen
  return (
    <section className="event-creator">
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((ev, i) => (
          <li key={i}>
            {ev.name} - {ev.date} at {ev.time}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EventCreator;
