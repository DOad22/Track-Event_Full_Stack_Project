import "../../components/event-history/PastEvents.css";
import React, { useState } from "react";

interface EventItem {
  id: number;
  name: string;
  date: string;
}

interface PastEventsProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

function PastEvents({ message, setMessage }: PastEventsProps) {
  const [events, setEvents] = useState<EventItem[]>([
    { id: 1, name: "Basketball", date: "2025-01-12" },
    { id: 2, name: "Cricket", date: "2025-02-05" },
    { id: 3, name: "Volleyball", date: "2025-04-20" },
    { id: 4, name: "Soccer", date: "2025-05-04" },
  ]);

  // form inputs
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  // add new event
  const addEvent = () => {
    if (!eventName.trim() || !eventDate) return;
    const newEvent: EventItem = {
      id: Date.now(),
      name: eventName.trim(),
      date: eventDate,
    };
    setEvents([...events, newEvent]);
    setEventName("");
    setEventDate("");
  };

  // remove an event
  const removeEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <section className="past-events">
      <h2>Past Events</h2>
      <p className="shared-msg">Shared Message: {message}</p>
      <input
        type="text"
        placeholder="Type to change message..."
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="add-form">
        <input
          type="text"
          placeholder="Event name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <button onClick={addEvent}>Add Event</button>
      </div>

      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.name}</strong> — {event.date}
            <button onClick={() => removeEvent(event.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PastEvents;
