import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiLogOut,
  FiChevronDown,
  FiMenu,
  FiUser,
  FiHome,
  FiCalendar,
  FiLayout,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar({ toggleSidebar, setSidebarOpen }) {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Derive user info first so getDashboardPath can use role
  const isGuest = !user;
  const name = user?.name || "";
  const role = user?.role || "";
  const email = user?.email || "";

  const formattedRole = role
    ? role.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "";

  // Correct dashboard path based on role
  const getDashboardPath = () => {
    switch (role) {
      case "student":       return "/dashboard/student";
      case "college_admin": return "/dashboard/collegeadmin";
      case "super_admin":   return "/dashboard/superadmin";
      default:              return "/";
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;
  const handleToggle = toggleSidebar || setSidebarOpen;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm h-16">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* LEFT - hamburger (logged-in dashboard only) + logo */}
        <div className="flex items-center gap-4">
          {handleToggle && !isGuest && (
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
              onClick={() => handleToggle(true)}
            >
              <FiMenu size={22} className="text-gray-600" />
            </button>
          )}
          <h1
            onClick={() => navigate("/")}
            className="text-xl font-bold text-blue-600 cursor-pointer tracking-tight"
          >
            CampusEventHub
          </h1>
        </div>

        {/* CENTER NAV - desktop only */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => navigate("/")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              isActive("/")
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <FiHome size={15} /> Home
          </button>
          <button
            onClick={() => navigate("/events")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              isActive("/events")
                ? "bg-blue-50 text-blue-700 font-semibold"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <FiCalendar size={15} /> Events
          </button>
        </nav>

        {/* RIGHT — guest or authenticated */}
        {isGuest ? (
          <>
            {/* Desktop: Login + Register */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
              >
                Register
              </button>
            </div>

            {/* Mobile hamburger for guest */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-md hover:bg-gray-100 transition text-gray-600"
            >
              {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </>
        ) : (
          /* Authenticated user dropdown */
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                {name?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <p className="text-sm font-medium text-gray-800">{name}</p>
                <p className="text-xs text-gray-500">{formattedRole}</p>
              </div>
              <FiChevronDown
                size={15}
                className={`text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-200 p-1.5 z-50">
                {/* User info */}
                <div className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100 mb-1 break-all">
                  {email}
                </div>

                {/* Home & Events — mobile only */}
                <div className="md:hidden border-b border-gray-100 pb-1 mb-1">
                  <button
                    onClick={() => { navigate("/"); setOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition ${isActive("/") ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    <FiHome size={15} /> Home
                  </button>
                  <button
                    onClick={() => { navigate("/events"); setOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition ${isActive("/events") ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    <FiCalendar size={15} /> Events
                  </button>
                </div>

                <button
                  onClick={() => { navigate("/profile"); setOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  <FiUser size={15} /> Profile
                </button>
                <button
                  onClick={() => { navigate(getDashboardPath()); setOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  <FiLayout size={15} /> Dashboard
                </button>

                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-red-600 hover:bg-red-50 transition"
                  >
                    <FiLogOut size={15} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile dropdown for guest */}
      {isGuest && mobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-1 shadow-sm">
          <button
            onClick={() => { navigate("/"); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${isActive("/") ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
          >
            <FiHome size={15} /> Home
          </button>
          <button
            onClick={() => { navigate("/events"); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${isActive("/events") ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
          >
            <FiCalendar size={15} /> Events
          </button>
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-1.5">
            <button
              onClick={() => { navigate("/login"); setMobileMenuOpen(false); }}
              className="w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition text-left"
            >
              Login
            </button>
            <button
              onClick={() => { navigate("/register"); setMobileMenuOpen(false); }}
              className="w-full px-3 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
}