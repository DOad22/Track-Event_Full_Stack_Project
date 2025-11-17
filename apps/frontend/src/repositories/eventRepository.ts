import testEvents from "../data/testEvents";

export interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
}

let events: Event[] = [...testEvents]; 

const eventRepository = {
  getAll() {
    return events;
  },
  add(event: Event) {
    events.push(event);
    return events;
  },
  remove(id: number) {
    events = events.filter(ev => ev.id !== id);
    return events;
  }
};

export default eventRepository;
