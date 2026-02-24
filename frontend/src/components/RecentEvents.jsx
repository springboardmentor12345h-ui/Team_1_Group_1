export default function RecentEvents() {
  const dummyEvents = [
    { name: "Hackathon 2024", date: "20 Feb 2024" },
    { name: "Cultural Fest", date: "15 Mar 2024" },
    { name: "Tech Workshop", date: "10 Apr 2024" },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-md shadow-black/5 w-full">
      <h3 className="font-semibold mb-4">Recent Events</h3>

      {dummyEvents.map((event, index) => (
        <div
          key={index}
          className="py-3 border-b border-gray-100 last:border-b-0"
        >
          <p className="font-semibold text-sm">{event.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{event.date}</p>
        </div>
      ))}
    </div>
  );
}