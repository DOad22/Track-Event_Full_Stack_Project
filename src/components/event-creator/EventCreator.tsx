import { useState } from "react";
import { useEvents } from "../../hooks/useEvents";

function EventApp() {
  const { events, addEvent, deleteEvent } = useEvents();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent(name, date, time);
    setName("");
    setDate("");
    setTime("");
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleAdd}>
        <input placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <h3>Events</h3>
      <ul>
        {events.map(ev => (
          <li key={ev.id}>
            {ev.name} - {ev.date} at {ev.time}
            <button onClick={() => deleteEvent(ev.id)} style={{ marginLeft: 6 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventApp;
