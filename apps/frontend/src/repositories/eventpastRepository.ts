import { EventItem } from "../types/EventItem";

const API_BASE = "http://localhost:3000/api/past-events";

export const eventRepository = {
  async getAll(): Promise<EventItem[]> {
    const res = await fetch(API_BASE);
    return res.json();
  },

  async create(item: Omit<EventItem, "id">): Promise<EventItem> {
    const body = {
      name: item.name,
      date: item.date,
    };

    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.json();
  },

  async remove(id: number): Promise<void> {
    await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });
  }
};
