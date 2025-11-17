import { EventItem } from "../types/EventItem";
import { pastEventsData } from "../Data/pastEvents.testdata";

let db: EventItem[] = [...pastEventsData];

export const eventRepository = {
  getAll(): EventItem[] {
    return [...db];
  },
  create(item: Omit<EventItem, "id">): EventItem {
    const newItem: EventItem = { id: Date.now(), ...item };
    db = [...db, newItem];
    return newItem;
  },
  remove(id: number): void {
    db = db.filter(e => e.id !== id);
  },
  update(id: number, patch: Partial<Omit<EventItem, "id">>): EventItem | null {
    let found: EventItem | null = null;
    db = db.map(e => {
      if (e.id === id) {
        found = { ...e, ...patch };
        return found!;
      }
      return e;
    });
    return found;
  }
};
