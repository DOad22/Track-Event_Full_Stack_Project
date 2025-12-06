import { useState } from "react";
import { useEvents, EventInput } from "../../hooks/useEvents";
import "./EventCreator.css";

export default function EventCreator() {
  const { events, addEvent, deleteEvent } = useEvents();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date || !time) {
      alert("Please fill in title, date, and time");
      return;
    }

    const dateTime = new Date(`${date}T${time}`);
    if (isNaN(dateTime.getTime())) {
      alert("Invalid date or time");
      return;
    }

    const eventData: EventInput = {
      title,
      description,
      date: dateTime.toISOString(),
      location,
      tags: tags.split(",").map(t => t.trim()).filter(t => t),
      userId: 1, 
    };

    try {
      await addEvent(eventData);

      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setLocation("");
      setTags("");
    } catch (err) {
      alert("Failed to create event");
    }
  };

  return (
    <section className="event-creator">
      <h2>Create Event</h2>
      <form onSubmit={handleAdd} className="event-form">
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input type="time" value={time} onChange={e => setTime(e.target.value)} />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <input placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
        <button type="submit">Add Event</button>
      </form>

      <h3>Event List</h3>
      <table className="event-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(ev => (
            <tr key={ev.id}>
              <td>{ev.title}</td>
              <td>{new Date(ev.date).toLocaleDateString()}</td>
              <td>{new Date(ev.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
              <td>{ev.location || "-"}</td>
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
