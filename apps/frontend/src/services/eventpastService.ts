import { eventRepository } from "../repositories/eventpastRepository";
import { EventItem } from "../types/EventItem";

export const eventService = {
  async list(): Promise<EventItem[]> {
    const events = await eventRepository.getAll();
    return events;
  },

  async add(name: string, date: string): Promise<EventItem | null> {
    if (!name.trim() || !date) return null;

    const created = await eventRepository.create({
      name: name.trim(),
      date,
    });

    return created;
  },

  async remove(id: number): Promise<void> {
    await eventRepository.remove(id);
  },

  async listSortedByDate(): Promise<EventItem[]> {
    const events = await eventRepository.getAll();
    return events.sort((a, b) => a.date.localeCompare(b.date));
  },
};
