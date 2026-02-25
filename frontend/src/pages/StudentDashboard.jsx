import { useState } from "react";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import Sidebar from "../components/Sidebar";
import QuickActions from "../components/QuickActions";
import RecentEvents from "../components/RecentEvents";
import {
  FiList,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiHome,
  FiUser,
} from "react-icons/fi";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Fixed Navbar */}
      <Navbar toggleSidebar={() => setMobileOpen(true)} />

      {/* Below navbar: sidebar + main content */}
      <div className="flex flex-1 pt-16 overflow-hidden">

        {/* Collapsible Sidebar */}
        <Sidebar
          title="Student Panel"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          items={[
            { key: "overview", label: "Overview", icon: <FiHome /> },
            { key: "myevents", label: "My Events", icon: <FiCalendar /> },
            { key: "profile", label: "Profile", icon: <FiUser /> },
          ]}
        />

        {/* Main Content - shifts based on sidebar state */}
        <main
          className={`
            flex-1 overflow-y-auto bg-gray-50
            transition-all duration-300
            ${collapsed ? "md:ml-[68px]" : "md:ml-64"}
          `}
        >
          <div className="p-5 sm:p-8">
            <h2 className="mb-6 text-xl sm:text-2xl font-semibold text-gray-800">
              Student Dashboard
            </h2>

            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <>
                {/* Stats - responsive grid: 1 col mobile, 2 col sm, 4 col lg */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

                {/* Bottom section - stacks on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <RecentEvents />
                  <QuickActions />
                </div>
              </>
            )}

            {activeTab === "myevents" && <MyEvents />}
            {activeTab === "profile" && <StudentProfile />}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ================= MY EVENTS SECTION ================= */

function MyEvents() {
  const events = [
    { title: "Hackathon 2024", date: "March 20, 2026", status: "Upcoming" },
    { title: "Cultural Fest", date: "February 10, 2026", status: "Completed" },
  ];

  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md shadow-black/5">
      <h3 className="mb-5 text-lg font-semibold">My Events</h3>

      {events.map((event, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-4 border border-gray-200 rounded-lg mb-4"
        >
          <div>
            <div className="font-semibold">{event.title}</div>
            <div className="text-sm text-gray-500">{event.date}</div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-3 ${
              event.status === "Upcoming"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {event.status}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ================= PROFILE SECTION ================= */

function StudentProfile() {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md shadow-black/5 max-w-lg">
      <h3 className="mb-5 text-lg font-semibold">My Profile</h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-500">Name</label>
          <p className="font-medium">John Doe</p>
        </div>

        <div>
          <label className="text-sm text-gray-500">Email</label>
          <p className="font-medium">john@example.com</p>
        </div>

        <div>
          <label className="text-sm text-gray-500">College</label>
          <p className="font-medium">Tech University</p>
        </div>

        <button className="mt-4 bg-[#1F3C88] text-white px-4 py-2 rounded-md hover:bg-[#162e66] transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
}