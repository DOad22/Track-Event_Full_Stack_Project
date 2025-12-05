import { Event } from "../repositories/eventRepository";

const testEvents: Event[] = [
  {
    id: 1, name: "Team Meeting", date: "2025-10-20", time: "09:00",
    title: undefined,
    location: ""
  },
  {
    id: 2, name: "Workshop", date: "2025-10-22", time: "11:00",
    title: undefined,
    location: ""
  },
  {
    id: 3, name: "Presentation", date: "2025-10-25", time: "13:00",
    title: undefined,
    location: ""
  },
  {
    id: 4, name: "Hackathon", date: "2025-10-28", time: "10:00",
    title: undefined,
    location: ""
  },
  {
    id: 5, name: "Demo Day", date: "2025-11-01", time: "15:00",
    title: undefined,
    location: ""
  },
  {
    id: 6, name: "Project Review", date: "2025-11-03", time: "14:00",
    title: undefined,
    location: ""
  },
  {
    id: 7, name: "Code Sprint", date: "2025-11-05", time: "12:00",
    title: undefined,
    location: ""
  },
  {
    id: 8, name: "Mentor Session", date: "2025-11-07", time: "10:30",
    title: undefined,
    location: ""
  },
  {
    id: 9, name: "Client Call", date: "2025-11-09", time: "09:30",
    title: undefined,
    location: ""
  },
  {
    id: 10, name: "Demo Rehearsal", date: "2025-11-10", time: "16:00",
    title: undefined,
    location: ""
  },
];

export default testEvents;
