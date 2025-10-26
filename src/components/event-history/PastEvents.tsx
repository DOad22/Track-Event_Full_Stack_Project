import "../../components/event-history/PastEvents.css";
import React from "react";
import { usePastEvents } from "../../hooks/usePastEvents";

interface PastEventsProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

function PastEvents({ message, setMessage }: PastEventsProps) {
  const {
    events,          
    name,            
    date,            
    setName,         
    setDate,         
    addEvent,        
    removeEvent,     
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
            <strong>{event.name}</strong> — {event.date}
            <button onClick={() => removeEvent(event.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PastEvents;
