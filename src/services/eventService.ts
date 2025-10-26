import eventRepository, { Event } from "../repositories/eventRepository";

const eventService = {
  getEvents(): Event[] {
    return eventRepository.getAll();
  },

  createEvent(name: string, date: string, time: string): Event[] {
    if (!name || !date || !time) throw new Error("All fields required");

    const newEvent: Event = {
      id: Date.now(),
      name,
      date,
      time
    };

    return eventRepository.add(newEvent);
  },

  deleteEvent(id: number): Event[] {
    return eventRepository.remove(id);
  }
};

export default eventService;
