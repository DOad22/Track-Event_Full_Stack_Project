import { useState, useEffect } from "react";

function EventApp() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [events, setEvents] = useState<any[]>([]);

  // Load events from localStorage when the page loads
  useEffect(() => {
    const saved = localStorage.getItem("events");
    if (saved) {
      setEvents(JSON.parse(saved));
    }
  }, []);

  // Save events 
  const saveEvents = (updated: any[]) => {
    setEvents(updated);
    localStorage.setItem("events", JSON.stringify(updated));
  };

  // Add new event
  const addEvent = (e: any) => {
    e.preventDefault();
    if (!name || !date || !time) return;
    const newEvent = {
      id: Date.now(), 
      name,
      date,
      time
    };
    saveEvents([...events, newEvent]);
    setName("");
    setDate("");
    setTime("");
  };

  // Delete event
  const deleteEvent = (id: number) => {
    const updated = events.filter(ev => ev.id !== id);
    saveEvents(updated);
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={addEvent}>
        <input
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button type="submit">Add Event</button>
      </form>

      <h3>Events</h3>
      <ul>
        {events.map(ev => (
          <li key={ev.id}>
            {ev.name} - {ev.date} at {ev.time}
            <button onClick={() => deleteEvent(ev.id)} style={{ marginLeft: 6 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventApp;
