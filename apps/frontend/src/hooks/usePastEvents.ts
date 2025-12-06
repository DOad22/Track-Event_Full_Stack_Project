import { useState, useMemo, useEffect } from "react";
import { eventRepository } from "../repositories/eventpastRepository";
import { EventItem } from "../types/EventItem";
import { useAuth } from "@clerk/clerk-react"; 

export function usePastEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [query, setQuery] = useState("");

  const { getToken } = useAuth();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
  const token = await getToken();
  const data = await eventRepository.getAll(token);
  setEvents(data);
};

  const addEvent = async () => {
    if (!name.trim() || !date) return;

    const token = await getToken();  
    const created = await eventRepository.create(
      { name: name.trim(), date },
      token
    );

    if (!created) return;

    await loadEvents();
    setName("");
    setDate("");
  };

  const removeEvent = async (id: number) => {
    await eventRepository.remove(id);
    await loadEvents();
  };

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return events;

    return events.filter((e) => e.name.toLowerCase().includes(q));
  }, [events, query]);

  return {
    events: filteredEvents,
    name, date, setName, setDate,
    addEvent, removeEvent,
    query, setQuery,
  };
}
