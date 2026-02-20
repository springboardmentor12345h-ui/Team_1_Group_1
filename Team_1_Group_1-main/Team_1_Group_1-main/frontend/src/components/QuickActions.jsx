export default function QuickActions() {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        flex: 1,
        minWidth: "280px",
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>Quick Actions</h3>

      <button
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          background: "linear-gradient(90deg, #4CAF50, #2196F3)",
          border: "none",
          borderRadius: "6px",
          color: "white",
        }}
      >
        Register for Event
      </button>

      <button
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#eee",
          border: "none",
          borderRadius: "6px",
        }}
      >
        View My Events
      </button>
    </div>
  );
}
