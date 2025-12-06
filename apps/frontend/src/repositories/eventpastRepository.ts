import { EventItem } from "../types/EventItem";

const API_BASE = "http://localhost:3000/api/past-events";

export const eventRepository = {
  async getAll(token: string | null): Promise<EventItem[]> {
    const res = await fetch(API_BASE, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.json();
  },

  async create(item: Omit<EventItem, "id">, token: string | null): Promise<EventItem | null> {
    const isoDate = new Date(item.date + "T00:00:00Z").toISOString();

    const body = {
      name: item.name,
      date: isoDate,
    };

    const res = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error("Create Error:", await res.json());
      return null;
    }

    return res.json();
  },

  async remove(id: number): Promise<void> {
    await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  },
};
