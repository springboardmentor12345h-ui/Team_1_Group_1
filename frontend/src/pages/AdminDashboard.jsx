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
  FiUser,
  FiCalendar,
} from "react-icons/fi";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Navbar />

      <div className="flex">

        {/* SIDEBAR */}
        <div className="w-64 bg-gray-100 min-h-screen border-r border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-6">Admin Panel</h3>

          <div className="flex flex-col gap-2">
            <SidebarButton
              label="Overview"
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            />
            <SidebarButton
              label="User Management"
              active={activeTab === "users"}
              onClick={() => setActiveTab("users")}
            />
            <SidebarButton
              label="Event Management"
              active={activeTab === "events"}
              onClick={() => setActiveTab("events")}
            />
            <SidebarButton
              label="Registrations"
              active={activeTab === "registrations"}
              onClick={() => setActiveTab("registrations")}
            />
            <SidebarButton
              label="Admin Logs"
              active={activeTab === "logs"}
              onClick={() => setActiveTab("logs")}
            />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-10">
          <h2 className="mb-5 text-2xl font-semibold">Admin Dashboard</h2>

          {/* Stats Section */}
          <div className="flex flex-wrap gap-5">
            <StatsCard title="Total Events" value="24" color="#16a34a" icon={<FiFileText size={22} />} />
            <StatsCard title="Active Users" value="320" color="#2563eb" icon={<FiUsers size={22} />} />
            <StatsCard title="Registrations" value="890" color="#f59e0b" icon={<FiCheckCircle size={22} />} />
            <StatsCard title="Pending Reviews" value="6" color="#dc2626" icon={<FiAlertTriangle size={22} />} />
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === "overview" && <OverviewSection />}
            {activeTab === "users" && <UserManagement />}
            {activeTab === "events" && <EventManagement />}
            {activeTab === "registrations" && <Registrations />}
            {activeTab === "logs" && <AdminLogs />}
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- SIDEBAR BUTTON ---------- */
function SidebarButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-4 py-2 rounded-md transition ${
        active
          ? "bg-blue-100 text-[#1F3C88] font-semibold"
          : "text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}
/* ---------- OVERVIEW SECTION ---------- */
function OverviewSection() {
  return (
    <div className="flex flex-wrap gap-5">
      <div className="flex-1 min-w-[300px] bg-white p-6 rounded-xl shadow-lg shadow-black/5">
        <h3 className="mb-5 font-semibold">Recent Events</h3>

        <EventItem title="Inter-College Hackathon 2024" subtitle="tech-university · 127 participants" tag="hackathon" />
        <EventItem title="Cultural Fest - Harmony 2024" subtitle="arts-college · 342 participants" tag="cultural" />
        <EventItem title="Basketball Championship" subtitle="sports-university · 160 participants" tag="sports" />
        <EventItem title="Web Development Workshop" subtitle="tech-university · 65 participants" tag="workshop" />
      </div>

      <div className="flex-1 min-w-[300px] bg-white p-6 rounded-xl shadow-lg shadow-black/5">
        <h3 className="mb-5 font-semibold">System Health</h3>

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
    <div className="mb-4 pb-3 border-b border-gray-100 flex justify-between items-center">
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-[13px] text-gray-500">{subtitle}</div>
      </div>

      <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-[#1F3C88] font-medium">
        {tag}
      </span>
    </div>
  );
}

function HealthRow({ label, value, good }) {
  return (
    <div className="flex justify-between mb-3">
      <span className="text-gray-600">{label}</span>
      <span className={`${good ? "text-green-600" : "text-red-600"} font-semibold`}>
        {value}
      </span>
    </div>
  );
}

/* ---------- USER MANAGEMENT ---------- */
function UserManagement() {
  const users = [
    { name: "John Doe", role: "Student", college: "Tech University", lastActive: "2 hours ago", status: "Active" },
    { name: "Sarah Wilson", role: "Organizer", college: "Arts College", lastActive: "1 day ago", status: "Active" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md shadow-black/5">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-semibold">User Activity</h3>
        <button className="text-[#1F3C88] font-medium">View All Users</button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
            <th>User</th>
            <th>Role</th>
            <th>College</th>
            <th>Last Active</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b border-gray-100 h-[60px]">
              <td className="flex items-center gap-3">
                <div className="w-[34px] h-[34px] rounded-full bg-indigo-100 flex justify-center items-center text-[#1F3C88]">
                  <FiUser size={16} />
                </div>
                {user.name}
              </td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === "Student"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {user.role}
                </span>
              </td>

              <td>{user.college}</td>
              <td className="text-gray-500">{user.lastActive}</td>
              <td className="text-green-600 font-medium">{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- EVENT MANAGEMENT ---------- */
function EventManagement() {
  const navigate = useNavigate();

  const events = [
    { title: "Inter-College Hackathon 2024", college: "Tech University", category: "hackathon", participants: 127 },
    { title: "Cultural Fest - Harmony 2024", college: "Arts College", category: "cultural", participants: 342 },
    { title: "Basketball Championship", college: "Sports University", category: "sports", participants: 160 },
    { title: "Web Development Workshop", college: "Tech University", category: "workshop", participants: 65 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md shadow-black/5">
      <div className="flex justify-between mb-5">
        <h3>Event Management</h3>

        <div className="flex gap-3 items-center">
          <button className="bg-blue-100 text-[#1F3C88] px-3 py-2 rounded-md text-sm font-medium">
            Approve Pending
          </button>

          <button className="bg-red-100 text-red-600 px-3 py-2 rounded-md text-sm font-medium">
            Flagged Events
          </button>

          <button
            onClick={() => navigate("/dashboard/collegeadmin/create-event")}
            className="bg-[#1F3C88] text-white px-4 py-2 rounded-md font-semibold"
          >
            + Create Event
          </button>
        </div>
      </div>

      {events.map((event, index) => (
        <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg mb-4">
          <div className="flex gap-4 items-center">
            <div className="w-[45px] h-[45px] rounded-md bg-indigo-50 flex justify-center items-center text-[#1F3C88]">
              <FiCalendar size={20} />
            </div>

            <div>
              <div className="font-semibold">{event.title}</div>
              <div className="text-sm text-gray-500">
                {event.college} • {event.participants} participants
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              {event.category}
            </span>
            <span className="text-blue-600 cursor-pointer">View</span>
            <span className="text-red-600 cursor-pointer">Actions</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- REGISTRATIONS ---------- */
function Registrations() {
  const registrations = [
    { name: "Rahul", event: "Hackathon 2024", college: "ABC College", status: "Approved" },
    { name: "Anita", event: "Cultural Fest", college: "XYZ College", status: "Pending" },
    { name: "John", event: "Web Workshop", college: "Tech University", status: "Rejected" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md shadow-black/5">
      <h3 className="mb-5">Event Registrations</h3>

      {registrations.map((reg, index) => (
        <div key={index} className="flex justify-between p-4 border border-gray-200 rounded-lg mb-3">
          <div>
            <div className="font-semibold">{reg.name}</div>
            <div className="text-sm text-gray-500">
              {reg.event} • {reg.college}
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              reg.status === "Approved"
                ? "bg-green-100 text-green-800"
                : reg.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {reg.status}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------- ADMIN LOGS ---------- */
function AdminLogs() {
  const logs = [
    { action: "Approved event Hackathon 2024", admin: "Manikanta", time: "2 hours ago" },
    { action: "Rejected registration for Cultural Fest", admin: "Shambhavi", time: "5 hours ago" },
    { action: "Created new event Web Workshop", admin: "Manikanta", time: "1 day ago" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md shadow-black/5">
      <h3 className="mb-5">Admin Activity Logs</h3>

      {logs.map((log, index) => (
        <div key={index} className="p-4 border-b border-gray-200">
          <div className="font-medium">{log.action}</div>
          <div className="text-sm text-gray-500">
            By {log.admin} • {log.time}
          </div>
        </div>
      ))}
    </div>
  );
}