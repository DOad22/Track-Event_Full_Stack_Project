import React from "react";
import "./PastEvents.css";
import { usePastEvents } from "../../hooks/usePastEvents";

interface PastEventsProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

function PastEvents({ message, setMessage }: PastEventsProps) {
  const {
    events, name, date, setName, setDate,
    addEvent, removeEvent,
    query, setQuery,             
  } = usePastEvents();

  return (
    <section className="past-events">
      <h2>Past Events</h2>

      <p className="shared-msg">Shared Message: {message}</p>
      <input
        type="text"
        placeholder="Type to change message..."
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="pe-search">
        <input
          type="text"
          placeholder="Search events..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="add-form">
        <input
          type="text"
          placeholder="Event name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={addEvent}>Add Event</button>
      </div>

      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.name}</strong> — {event.date.split("T")[0]}
            <button onClick={() => removeEvent(event.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PastEvents;
