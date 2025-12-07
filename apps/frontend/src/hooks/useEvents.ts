import { useState, useEffect } from "react";
import eventService from "../services/eventService";
import { Event } from "../repositories/eventRepository";

export interface EventInput {
  title: string;
  description?: string;
  date: string;
  location: string;
  tags?: string[];
  userId: number;
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);


  useEffect(() => {
    async function fetchEvents() {
      try {
        const data: Event[] = await eventService.getEvents();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    }
    fetchEvents();
  }, []);


  const addEvent = async (eventData: EventInput) => {
    try {
      const newEvent: Event = await eventService.createEvent(eventData);
      setEvents(prev => [...prev, newEvent]);
    } catch (err) {
      console.error("Failed to create event:", err);
      throw err;
    }
  };


  const deleteEvent = async (id: number) => {
    try {
      await eventService.deleteEvent(id);
      setEvents(prev => prev.filter(ev => ev.id !== id));
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  return { events, addEvent, deleteEvent };
}
