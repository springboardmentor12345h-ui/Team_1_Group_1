import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import {
  FiEdit2,
  FiSave,
  FiX,
  FiMail,
  FiUser,
  FiShield,
  FiCalendar,
  FiMapPin,
  FiLogOut,
  FiCheckCircle,
  FiClock,
  FiAward,
} from "react-icons/fi";
import toast from "react-hot-toast";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    college: user?.college || "",
    phone: user?.phone || "",
  });

  const name = user?.name || "User";
  const role = user?.role || "";
  const email = user?.email || "";
  const college = user?.college || "—";
  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  const formattedRole = role
    ? role.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "Member";

  const roleColor = {
    student: "bg-blue-50 text-blue-700 border-blue-200",
    college_admin: "bg-amber-50 text-amber-700 border-amber-200",
    super_admin: "bg-red-50 text-red-700 border-red-200",
  }[role] || "bg-gray-50 text-gray-700 border-gray-200";

  const roleIcon = {
    student: <FiUser size={12} />,
    college_admin: <FiShield size={12} />,
    super_admin: <FiShield size={12} />,
  }[role] || <FiUser size={12} />;

  const handleSave = () => {
    // TODO: wire to API.put("/user/profile", form)
    toast.success("Profile updated successfully");
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Mock stats — replace with real data from API
  const stats = [
    { label: "Events Joined", value: "12", icon: <FiCalendar size={18} />, color: "text-blue-600 bg-blue-50" },
    { label: "Completed", value: "8", icon: <FiCheckCircle size={18} />, color: "text-emerald-600 bg-emerald-50" },
    { label: "Upcoming", value: "4", icon: <FiClock size={18} />, color: "text-amber-600 bg-amber-50" },
    { label: "Certificates", value: "3", icon: <FiAward size={18} />, color: "text-violet-600 bg-violet-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-16">
        {/* ── HERO BANNER + AVATAR (single container) ── */}
        <div className="relative h-36 sm:h-44 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 mb-16 sm:mb-20">
          {/* Subtle dot pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Soft blobs */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-8 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl" />

          {/* Avatar — anchored to bottom-left of banner */}
          <div className="absolute -bottom-12 sm:-bottom-14 left-4 sm:left-6 max-w-4xl">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-blue-600 border-4 border-white shadow-xl flex items-center justify-center">
              <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {initials}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* ── NAME + ACTIONS ROW ── */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">

            {/* Name & badges */}
            <motion.div {...fadeUp(0)}>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{name}</h1>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${roleColor}`}>
                  {roleIcon} {formattedRole}
                </span>
                {college !== "—" && (
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <FiMapPin size={11} /> {college}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div {...fadeUp(0.1)} className="flex gap-2">
              {editing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition shadow-sm"
                  >
                    <FiSave size={14} /> Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold transition"
                  >
                    <FiX size={14} /> Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold border border-gray-200 transition shadow-sm"
                  >
                    <FiEdit2 size={14} /> Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-red-50 text-red-600 text-sm font-semibold border border-gray-200 hover:border-red-200 transition shadow-sm"
                  >
                    <FiLogOut size={14} /> Logout
                  </button>
                </>
              )}
            </motion.div>
          </div>

          {/* ── STATS ROW ── */}
          <motion.div {...fadeUp(0.15)} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 shadow-sm"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900 leading-none">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── PROFILE DETAILS CARD ── */}
          <motion.div {...fadeUp(0.2)} className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-8">

            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Personal Information</h2>
              {editing && (
                <span className="text-xs text-blue-600 font-medium">Editing mode</span>
              )}
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Full Name */}
              <Field
                label="Full Name"
                icon={<FiUser size={14} />}
                value={form.name}
                editing={editing}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="Your full name"
              />

              {/* Email */}
              <Field
                label="Email Address"
                icon={<FiMail size={14} />}
                value={form.email}
                editing={editing}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder="your@email.com"
                type="email"
                disabled // email usually not editable
              />

              {/* College */}
              <Field
                label="College / Institution"
                icon={<FiMapPin size={14} />}
                value={form.college}
                editing={editing}
                onChange={(v) => setForm({ ...form, college: v })}
                placeholder="Your college name"
              />

              {/* Phone */}
              <Field
                label="Phone Number"
                icon={<FiUser size={14} />}
                value={form.phone}
                editing={editing}
                onChange={(v) => setForm({ ...form, phone: v })}
                placeholder="+91 00000 00000"
                type="tel"
              />

              {/* Role — always read-only */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                  <FiShield size={13} /> Role
                </label>
                <div className="px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700 font-medium">
                  {formattedRole}
                </div>
              </div>

            </div>
          </motion.div>

          {/* ── DANGER ZONE ── */}
          <motion.div {...fadeUp(0.25)} className="bg-white rounded-2xl border border-red-100 shadow-sm mb-10">
            <div className="px-6 py-4 border-b border-red-100">
              <h2 className="text-sm font-semibold text-red-600">Danger Zone</h2>
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-800">Delete Account</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Permanently remove your account and all associated data.
                </p>
              </div>
              <button className="px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition flex-shrink-0">
                Delete Account
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

/* ── REUSABLE FIELD ── */
function Field({ label, icon, value, editing, onChange, placeholder, type = "text", disabled = false }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
        {icon} {label}
      </label>

      {editing && !disabled ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="px-3.5 py-2.5 rounded-lg border border-blue-200 bg-blue-50/30 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder:text-gray-400"
        />
      ) : (
        <div className={`px-3.5 py-2.5 rounded-lg text-sm border ${
          disabled
            ? "bg-gray-50 border-gray-200 text-gray-400"
            : "bg-gray-50 border-gray-200 text-gray-700"
        }`}>
          {value || <span className="text-gray-400 italic">Not provided</span>}
        </div>
      )}
    </div>
  );
}