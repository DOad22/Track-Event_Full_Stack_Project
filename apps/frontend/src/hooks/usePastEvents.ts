import { useState, useMemo } from "react";
import { eventService } from "../services/eventpastService";
import { EventItem } from "../types/EventItem";

export function usePastEvents() {
  const [events, setEvents] = useState<EventItem[]>(eventService.listSortedByDate());
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [query, setQuery] = useState(""); 

  const addEvent = () => {
    const created = eventService.add(name, date);
    if (created) {
      setEvents(eventService.listSortedByDate());
      setName("");
      setDate("");
    }
  };

  const removeEvent = (id: number) => {
    eventService.remove(id);
    setEvents(eventService.listSortedByDate());
  };

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return events;
    return events.filter(e => e.name.toLowerCase().includes(q));
  }, [events, query]);

  return {
    events: filteredEvents, 
    name, date, setName, setDate,
    addEvent, removeEvent,
    query, setQuery,         
  };
}
