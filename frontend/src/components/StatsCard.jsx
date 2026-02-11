export default function StatsCard({ title, value, color }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        flex: 1,
        minWidth: "200px",
        borderLeft: `5px solid ${color}`,
      }}
    >
      <h4 style={{ margin: 0, fontSize: "14px", color: "#777" }}>
        {title}
      </h4>
      <h2 style={{ margin: "10px 0 0 0" }}>{value}</h2>
    </div>
  );
}
