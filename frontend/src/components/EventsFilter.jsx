import { useMemo } from "react";

export default function EventsFilter({
  events,
  search,
  activeCategory,
}) {
  const filteredEvents = useMemo(() => {
    const q = search.toLowerCase();

    return events.filter((ev) => {
      const matchSearch =
        ev.title.toLowerCase().includes(q) ||
        ev.description?.toLowerCase().includes(q) ||
        ev.location?.toLowerCase().includes(q) ||
        ev.createdBy?.college?.toLowerCase().includes(q);

      const matchCategory =
        activeCategory === "All" || ev.category === activeCategory;

      return matchSearch && matchCategory;
    });
  }, [events, search, activeCategory]);

  return filteredEvents;
}
