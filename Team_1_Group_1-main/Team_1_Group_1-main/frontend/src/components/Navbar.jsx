import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiChevronDown } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const name = user?.name || "User";
  const role = user?.role || "";
  const email = user?.email || "";

  const formattedRole = role
    ? role
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "";

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

  return (
    <header className="w-full bg-sky-200 border-sky-200 backdrop-blur-md border-b px-8 py-3 flex justify-between items-center shadow-sm">
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-semibold text-sky-900 cursor-pointer tracking-tight"
      >
        CampusEventHub
      </h1>

      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-sky-300/40 transition"
        >
          <div className="w-9 h-9 rounded-full bg-blue-100 text-sky-900 flex items-center justify-center font-semibold text-sm">
            {name?.[0]?.toUpperCase() || "U"}
          </div>

          <div className="text-left leading-tight hidden sm:block">
            <p className="text-sm font-medium text-gray-800">{name}</p>
            <p className="text-xs text-gray-500">{formattedRole}</p>
          </div>

          <FiChevronDown
            className={`text-gray-500 transition ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-56 bg-sky-50 border-sky-200 rounded-2xl shadow-xl border p-2 z-50">
            <div className="px-3 py-2 text-xs text-gray-500 border-b break-all">
              {email}
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-1 flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
            >
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
