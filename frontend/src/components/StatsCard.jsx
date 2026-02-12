// StatsCard.jsx

export default function StatsCard({ title, value, color, icon }) {
  return (
    <div
      style={{
        flex: "1 1 220px",
        backgroundColor: "#ffffff",
        borderRadius: "14px",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        gap: "15px",
        borderLeft: `4px solid ${color}`,
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        transition: "all 0.25s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 12px 24px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 6px 18px rgba(0,0,0,0.06)";
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "10px",
          backgroundColor: `${color}15`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: color,
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div>
        <div
          style={{
            fontSize: "13px",
            color: "#6b7280",
            marginBottom: "5px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "22px",
            fontWeight: "600",
            color: "#111827",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
