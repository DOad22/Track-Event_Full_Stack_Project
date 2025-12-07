import { Event } from "../repositories/eventRepository";

const API_URL = "http://localhost:3000/api/events";

interface EventData {
  title: string;
  description?: string;
  date: string;
  location: string;
  tags?: string[];
  userId: number;
}

const eventService = {
  
  async getEvents(): Promise<Event[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch events");
    return res.json();
  },

  
  async getPersonalizedEvents(userTags: string[]): Promise<Event[]> {
    const res = await fetch(`${API_URL}/personalized?tags=${encodeURIComponent(userTags.join(","))}`);
    if (!res.ok) throw new Error("Failed to fetch personalized events");
    return res.json();
  },

  
  async createEvent(eventData: EventData): Promise<Event> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Error response:", err);
      throw new Error("Failed to create event");
    }
    return res.json();
  },

  
  async deleteEvent(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete event");
  },
};

export default eventService;
