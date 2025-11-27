import { useState } from "react";
import { useEvents } from "../../hooks/useEvents";
import "./EventCreator.css";


export default function EventCreator() {
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
    <section className="event-creator">
      <h2>Create Event</h2>

      <form onSubmit={handleAdd} className="event-form">
        <input
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <button type="submit">Add Event</button>
      </form>

      <h3>Event List</h3>
      <table className="event-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev) => (
            <tr key={ev.id}>
              <td>{ev.name}</td>
              <td>{ev.date}</td>
              <td>{ev.time}</td>
              <td>
                <button onClick={() => deleteEvent(ev.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
