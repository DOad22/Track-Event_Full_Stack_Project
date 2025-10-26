import { useMemo, useState } from "react";
import { eventService } from "../services/eventService";
import { EventItem } from "../types/EventItem";

export function usePastEvents() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const events: EventItem[] = useMemo(() => eventService.listSortedByDate(), []);

  const addEvent = () => {
    const created = eventService.add(name, date);
    if (created) {
      setName("");
      setDate("");
    }
  };

  const removeEvent = (id: number) => {
    eventService.remove(id);
  };

  return { events, name, date, setName, setDate, addEvent, removeEvent };
}
