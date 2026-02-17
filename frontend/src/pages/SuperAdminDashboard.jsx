import { useState } from "react";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import { FiUsers, FiShield, FiSettings, FiActivity } from "react-icons/fi";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h2 style={{ marginBottom: "20px" }}>Super Admin Dashboard</h2>

        {/* Stats Section */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <StatsCard
            title="Total Admins"
            value="8"
            color="#dc2626"
            icon={<FiShield size={22} />}
          />
          <StatsCard
            title="Total Students"
            value="1,250"
            color="#2563eb"
            icon={<FiUsers size={22} />}
          />
          <StatsCard
            title="Active Sessions"
            value="342"
            color="#16a34a"
            icon={<FiActivity size={22} />}
          />
          <StatsCard
            title="System Status"
            value="Healthy"
            color="#9333ea"
            icon={<FiSettings size={22} />}
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
          <TabButton label="Overview" active={activeTab==="overview"} onClick={()=>setActiveTab("overview")} />
          <TabButton label="Manage Admins" active={activeTab==="admins"} onClick={()=>setActiveTab("admins")} />
          <TabButton label="All Users" active={activeTab==="users"} onClick={()=>setActiveTab("users")} />
          <TabButton label="Platform Settings" active={activeTab==="settings"} onClick={()=>setActiveTab("settings")} />
          <TabButton label="System Logs" active={activeTab==="logs"} onClick={()=>setActiveTab("logs")} />
        </div>

        <div style={{ marginTop: "30px" }}>
          {activeTab === "overview" && <Overview />}
          {activeTab === "admins" && <ManageAdmins />}
          {activeTab === "users" && <AllUsers />}
          {activeTab === "settings" && <PlatformSettings />}
          {activeTab === "logs" && <SystemLogs />}
        </div>
      </div>
    </>
  );
}

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
      }}
    >
      {label}
    </button>
  );
}

/* Sections */

function Overview() {
  return <div>Platform-wide analytics and overview information.</div>;
}

function ManageAdmins() {
  return <div>UI to create, edit, deactivate or remove admins.</div>;
}

function AllUsers() {
  return <div>View all users including students and admins.</div>;
}

function PlatformSettings() {
  return <div>Configure platform options and maintenance settings.</div>;
}

function SystemLogs() {
  return <div>Complete system activity logs and monitoring.</div>;
}
