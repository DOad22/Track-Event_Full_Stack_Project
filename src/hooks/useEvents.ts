import { useState, useEffect } from "react";
import eventService from "../services/eventService";
import { Event } from "../repositories/eventRepository";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setEvents(eventService.getEvents());
  }, []);

  const addEvent = (name: string, date: string, time: string) => {
    try {
      const updated = eventService.createEvent(name, date, time);
      setEvents([...updated]);
    } catch (error: any) {
      alert(error.message || "All fields are required!");
    }
  };

  const deleteEvent = (id: number) => {
    const updated = eventService.deleteEvent(id);
    setEvents([...updated]);
  };

  return { events, addEvent, deleteEvent };
}
