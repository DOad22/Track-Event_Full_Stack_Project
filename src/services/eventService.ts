import { eventRepository } from "../repositories/eventRepository";
import { EventItem } from "../types/EventItem";

export const eventService = {
  list(): EventItem[] {
    return eventRepository.getAll();
  },
  add(name: string, date: string): EventItem | null {
    if (!name.trim() || !date) return null; 
    return eventRepository.create({ name: name.trim(), date });
  },
  remove(id: number): void {
    eventRepository.remove(id);
  },
  listSortedByDate(): EventItem[] {
    return eventRepository.getAll().sort((a, b) => a.date.localeCompare(b.date));
  }
};
