// StudentDashboard.jsx

import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import QuickActions from "../components/QuickActions";
import RecentEvents from "../components/RecentEvents";
import { FiList, FiCalendar, FiClock, FiCheckCircle } from "react-icons/fi";

export default function StudentDashboard() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h2 style={{ marginBottom: "20px" }}>Student Dashboard</h2>

        {/* Stats Section */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <StatsCard
            title="Total Events"
            value="12"
            color="#16a34a"
            icon={<FiList size={22} />}
          />

          <StatsCard
            title="Registered Events"
            value="5"
            color="#2563eb"
            icon={<FiCalendar size={22} />}
          />

          <StatsCard
            title="Upcoming Events"
            value="3"
            color="#f59e0b"
            icon={<FiClock size={22} />}
          />

          <StatsCard
            title="Completed Events"
            value="4"
            color="#9333ea"
            icon={<FiCheckCircle size={22} />}
          />
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
