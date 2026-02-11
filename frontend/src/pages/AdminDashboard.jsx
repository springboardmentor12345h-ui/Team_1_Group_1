import { useState } from "react";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h2>Admin Dashboard</h2>

        {/* Stats Section */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <StatsCard title="Total Events" value="24" color="#4CAF50" />
          <StatsCard title="Active Users" value="320" color="#2196F3" />
          <StatsCard title="Registrations" value="890" color="#FF9800" />
          <StatsCard title="Pending Reviews" value="6" color="#f44336" />
        </div>

        {/* Tabs */}
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            gap: "20px",
            borderBottom: "2px solid #ddd",
          }}
        >
          <TabButton
            label="Overview"
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <TabButton
            label="User Management"
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
          />
          <TabButton
            label="Event Management"
            active={activeTab === "events"}
            onClick={() => setActiveTab("events")}
          />
        </div>

        {/* Tab Content */}
        <div style={{ marginTop: "30px" }}>
          {activeTab === "overview" && <OverviewSection />}
          {activeTab === "users" && <UserManagement />}
          {activeTab === "events" && <EventManagement />}
        </div>
      </div>
    </>
  );
}

/* ---------- TAB BUTTON ---------- */
function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 15px",
        border: "none",
        borderBottom: active ? "3px solid #4CAF50" : "none",
        backgroundColor: "transparent",
        fontWeight: active ? "bold" : "normal",
      }}
    >
      {label}
    </button>
  );
}

/* ---------- OVERVIEW SECTION ---------- */
function OverviewSection() {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <h3>System Overview</h3>
      <p>Everything is running smoothly.</p>
    </div>
  );
}

/* ---------- USER MANAGEMENT ---------- */
function UserManagement() {
  return (
    <TableWrapper title="User Management">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
            <th>User</th>
            <th>Role</th>
            <th>College</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rahul</td>
            <td>Student</td>
            <td>ABC College</td>
            <td>Active</td>
          </tr>
          <tr>
            <td>Anita</td>
            <td>Admin</td>
            <td>XYZ College</td>
            <td>Active</td>
          </tr>
        </tbody>
      </table>
    </TableWrapper>
  );
}

/* ---------- EVENT MANAGEMENT ---------- */
function EventManagement() {
  return (
    <TableWrapper title="Event Management">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
            <th>Event</th>
            <th>College</th>
            <th>Participants</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hackathon 2024</td>
            <td>ABC College</td>
            <td>120</td>
            <td>Approved</td>
          </tr>
          <tr>
            <td>Cultural Fest</td>
            <td>XYZ College</td>
            <td>80</td>
            <td>Pending</td>
          </tr>
        </tbody>
      </table>
    </TableWrapper>
  );
}

/* ---------- TABLE WRAPPER ---------- */
function TableWrapper({ title, children }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>{title}</h3>
      {children}
    </div>
  );
}
