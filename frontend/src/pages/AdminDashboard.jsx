// AdminDashboard.jsx
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import {
  FiUsers,
  FiFileText,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h2 style={{ marginBottom: "20px" }}>Admin Dashboard</h2>

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
            value="24"
            color="#16a34a"
            icon={<FiFileText size={22} />}
          />

          <StatsCard
            title="Active Users"
            value="320"
            color="#2563eb"
            icon={<FiUsers size={22} />}
          />

          <StatsCard
            title="Registrations"
            value="890"
            color="#f59e0b"
            icon={<FiCheckCircle size={22} />}
          />

          <StatsCard
            title="Pending Reviews"
            value="6"
            color="#dc2626"
            icon={<FiAlertTriangle size={22} />}
          />
        </div>

        {/* Tabs */}
        <div
          style={{
            marginTop: "35px",
            display: "flex",
            gap: "30px",
            borderBottom: "2px solid #e5e7eb",
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
          <TabButton
            label="Registrations"
            active={activeTab === "registrations"}
            onClick={() => setActiveTab("registrations")}
          />

          <TabButton
            label="Admin Logs"
            active={activeTab === "logs"}
            onClick={() => setActiveTab("logs")}
          />


        </div>

        {/* Tab Content */}
        <div style={{ marginTop: "30px" }}>
          {activeTab === "overview" && <OverviewSection />}
          {activeTab === "users" && <UserManagement />}
          {activeTab === "events" && <EventManagement />}
          {activeTab === "registrations" && <Registrations />}
          {activeTab === "logs" && <AdminLogs />}
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
        padding: "10px 0",
        border: "none",
        borderBottom: active ? "3px solid #1F3C88" : "3px solid transparent",
        backgroundColor: "transparent",
        fontWeight: active ? "600" : "500",
        cursor: "pointer",
        color: active ? "#1F3C88" : "#555",
        transition: "0.2s ease",
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
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      {/* Recent Events */}
      <div
        style={{
          flex: 1,
          minWidth: "300px",
          backgroundColor: "#ffffff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>Recent Events</h3>

        <EventItem
          title="Inter-College Hackathon 2024"
          subtitle="tech-university · 127 participants"
          tag="hackathon"
        />

        <EventItem
          title="Cultural Fest - Harmony 2024"
          subtitle="arts-college · 342 participants"
          tag="cultural"
        />

        <EventItem
          title="Basketball Championship"
          subtitle="sports-university · 160 participants"
          tag="sports"
        />

        <EventItem
          title="Web Development Workshop"
          subtitle="tech-university · 65 participants"
          tag="workshop"
        />
      </div>

      {/* System Health */}
      <div
        style={{
          flex: 1,
          minWidth: "300px",
          backgroundColor: "#ffffff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>System Health</h3>

        <HealthRow label="Server Status" value="Healthy" good />
        <HealthRow label="Database" value="Connected" good />
        <HealthRow label="API Response" value="152ms" good />
        <HealthRow label="Uptime" value="99.9%" good />
      </div>
    </div>
  );
}

function EventItem({ title, subtitle, tag }) {
  return (
    <div
      style={{
        marginBottom: "15px",
        paddingBottom: "12px",
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div style={{ fontWeight: "600" }}>{title}</div>
        <div style={{ fontSize: "13px", color: "#666" }}>
          {subtitle}
        </div>
      </div>

      <span
        style={{
          fontSize: "12px",
          padding: "4px 10px",
          borderRadius: "20px",
          backgroundColor: "#e0ecff",
          color: "#1F3C88",
          fontWeight: "500",
        }}
      >
        {tag}
      </span>
    </div>
  );
}

function HealthRow({ label, value, good }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "12px",
      }}
    >
      <span style={{ color: "#555" }}>{label}</span>
      <span
        style={{
          color: good ? "#16a34a" : "#dc2626",
          fontWeight: "600",
        }}
      >
        {value}
      </span>
    </div>
  );
}


/* ---------- USER MANAGEMENT ---------- */
/* ---------- USER MANAGEMENT ---------- */
import { FiUser } from "react-icons/fi";

function UserManagement() {
  const users = [
    {
      name: "John Doe",
      role: "Student",
      college: "Tech University",
      lastActive: "2 hours ago",
      status: "Active",
    },
    {
      name: "Sarah Wilson",
      role: "Organizer",
      college: "Arts College",
      lastActive: "1 day ago",
      status: "Active",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ margin: 0 }}>User Activity</h3>
        <button
          style={{
            background: "transparent",
            border: "none",
            color: "#1F3C88",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          View All Users
        </button>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr
            style={{
              textAlign: "left",
              fontSize: "14px",
              color: "#6b7280",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <th>User</th>
            <th>Role</th>
            <th>College</th>
            <th>Last Active</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              style={{
                borderBottom: "1px solid #f1f1f1",
                height: "60px",
              }}
            >
              {/* USER WITH ICON */}
              <td style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    backgroundColor: "#e0e7ff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#1F3C88",
                  }}
                >
                  <FiUser size={16} />
                </div>
                {user.name}
              </td>

              {/* ROLE BADGE */}
              <td>
                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "500",
                    backgroundColor:
                      user.role === "Student"
                        ? "#d1fae5"
                        : "#dbeafe",
                    color:
                      user.role === "Student"
                        ? "#065f46"
                        : "#1e40af",
                  }}
                >
                  {user.role}
                </span>
              </td>

              <td>{user.college}</td>
              <td style={{ color: "#6b7280" }}>{user.lastActive}</td>

              {/* STATUS */}
              <td style={{ color: "#16a34a", fontWeight: "500" }}>
                {user.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


/* ---------- EVENT MANAGEMENT ---------- */
import { FiCalendar } from "react-icons/fi";

function EventManagement() {

  const navigate = useNavigate();

  const events = [
    {
      title: "Inter-College Hackathon 2024",
      college: "Tech University",
      category: "hackathon",
      participants: 127,
    },
    {
      title: "Cultural Fest - Harmony 2024",
      college: "Arts College",
      category: "cultural",
      participants: 342,
    },
    {
      title: "Basketball Championship",
      college: "Sports University",
      category: "sports",
      participants: 160,
    },
    {
      title: "Web Development Workshop",
      college: "Tech University",
      category: "workshop",
      participants: 65,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  }}
>
  <h3>Event Management</h3>

  {/* RIGHT SIDE ACTIONS */}
  {/* RIGHT SIDE ACTION BUTTONS */}
<div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
  
  {/* Approve Pending */}
  <button
    style={{
      backgroundColor: "#e0ecff",
      color: "#1F3C88",
      border: "none",
      padding: "7px 12px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "500",
    }}
    onClick={() => alert("Pending approvals view coming soon")}
  >
    Approve Pending
  </button>

  {/* Flagged Events */}
  <button
    style={{
      backgroundColor: "#fee2e2",
      color: "#dc2626",
      border: "none",
      padding: "7px 12px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "500",
    }}
    onClick={() => alert("Flagged events view coming soon")}
  >
    Flagged Events
  </button>

  {/* Create Event */}
  <button
    style={{
      backgroundColor: "#1F3C88",
      color: "#fff",
      border: "none",
      padding: "8px 14px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
    }}
    onClick={() => navigate("/dashboard/admin/create-event")}

  >
    + Create Event
  </button>
</div>

</div>


      {/* Event Cards */}
      {events.map((event, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            marginBottom: "15px",
            transition: "0.2s ease",
          }}
        >
          {/* Left Side */}
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "8px",
                backgroundColor: "#eef2ff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#1F3C88",
              }}
            >
              <FiCalendar size={20} />
            </div>

            <div>
              <div style={{ fontWeight: "600" }}>{event.title}</div>
              <div style={{ fontSize: "13px", color: "#6b7280" }}>
                {event.college} • {event.participants} participants
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <span
              style={{
                backgroundColor: "#dbeafe",
                color: "#1e40af",
                padding: "5px 10px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              {event.category}
            </span>

            <span
              style={{
                color: "#2563eb",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              View
            </span>

            <span
              style={{
                color: "#dc2626",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Actions
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Registrations() {
  const registrations = [
    { name: "Rahul", event: "Hackathon 2024", college: "ABC College", status: "Approved" },
    { name: "Anita", event: "Cultural Fest", college: "XYZ College", status: "Pending" },
    { name: "John", event: "Web Workshop", college: "Tech University", status: "Rejected" },
  ];

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Event Registrations</h3>

      {registrations.map((reg, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            marginBottom: "12px",
          }}
        >
          <div>
            <div style={{ fontWeight: "600" }}>{reg.name}</div>
            <div style={{ fontSize: "13px", color: "#6b7280" }}>
              {reg.event} • {reg.college}
            </div>
          </div>

          <span
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "500",
              backgroundColor:
                reg.status === "Approved"
                  ? "#dcfce7"
                  : reg.status === "Pending"
                  ? "#fef9c3"
                  : "#fee2e2",
              color:
                reg.status === "Approved"
                  ? "#166534"
                  : reg.status === "Pending"
                  ? "#92400e"
                  : "#991b1b",
            }}
          >
            {reg.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function AdminLogs() {
  const logs = [
    { action: "Approved event Hackathon 2024", admin: "Manikanta", time: "2 hours ago" },
    { action: "Rejected registration for Cultural Fest", admin: "Shambhavi", time: "5 hours ago" },
    { action: "Created new event Web Workshop", admin: "Manikanta", time: "1 day ago" },
  ];

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Admin Activity Logs</h3>

      {logs.map((log, index) => (
        <div
          key={index}
          style={{
            padding: "15px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div style={{ fontWeight: "500" }}>{log.action}</div>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>
            By {log.admin} • {log.time}
          </div>
        </div>
      ))}
    </div>
  );
}


/* ---------- TABLE WRAPPER ---------- */
function TableWrapper({ title, children }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>{title}</h3>
      {children}
    </div>
  );
}
