import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import QuickActions from "../components/QuickActions";
import RecentEvents from "../components/RecentEvents";

export default function StudentDashboard() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h2>Student Dashboard</h2>

        {/* Stats Section */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <StatsCard title="Total Events" value="12" color="#4CAF50" />
          <StatsCard title="Registered Events" value="5" color="#2196F3" />
          <StatsCard title="Upcoming Events" value="3" color="#FF9800" />
          <StatsCard title="Completed Events" value="4" color="#9C27B0" />
        </div>

        {/* Bottom Section */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          <RecentEvents />
          <QuickActions />
        </div>
      </div>
    </>
  );
}
