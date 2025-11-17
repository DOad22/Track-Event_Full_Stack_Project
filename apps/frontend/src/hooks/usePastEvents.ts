import { useState, useMemo } from "react";
import { eventService } from "../services/eventpastService";
import { EventItem } from "../types/EventItem";

export function usePastEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function load() {
      const all = await eventService.list();
      setEvents(all);
    }
    load();
  }, []);

  const addEvent = async () => {
    if (!name.trim() || !date) return;

    const created = await eventService.add(name, date);
    if (!created) return;

    const sorted = await eventService.listSortedByDate();
    setEvents(sorted);

    setName("");
    setDate("");
  };

  const removeEvent = async (id: number) => {
    await eventService.remove(id);

    const updated = await eventService.list();
    setEvents(updated);
  };

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return events;
    return events.filter((e) => e.name.toLowerCase().includes(q));
  }, [events, query]);

  return {
    events: filteredEvents,
    name,
    date,
    setName,
    setDate,
    addEvent,
    removeEvent,
    query,
    setQuery,
  };
}
