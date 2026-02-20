export default function RecentEvents() {
  const dummyEvents = [
    { name: "Hackathon 2024", date: "20 Feb 2024" },
    { name: "Cultural Fest", date: "15 Mar 2024" },
    { name: "Tech Workshop", date: "10 Apr 2024" },
  ];

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        flex: 2,
        minWidth: "350px",
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>Recent Events</h3>

      {dummyEvents.map((event, index) => (
        <div
          key={index}
          style={{
            padding: "10px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <strong>{event.name}</strong>
          <div style={{ fontSize: "13px", color: "#777" }}>
            {event.date}
          </div>
        </div>
      ))}
    </div>
  );
}
