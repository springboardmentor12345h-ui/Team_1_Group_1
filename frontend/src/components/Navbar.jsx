import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";   // ⭐ NEW

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { user, logout } = useAuth();   // ⭐ NEW

  // 🔹 Get values from Context instead of localStorage
  const name = user?.name || "User";
  const role = user?.role || "";
  const email = user?.email || "";

  const formattedRole =
    role.charAt(0).toUpperCase() + role.slice(1);

  const handleLogout = () => {
    logout();        // ⭐ context logout
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#1F3C88",
        padding: "10px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Brand */}
      <div
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "white",
          letterSpacing: "0.5px",
        }}
      >
        CampusEventHub
      </div>

      <div ref={dropdownRef} style={{ position: "relative" }}>
        <div
          onClick={() => setOpen(!open)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#1F3C88",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {name.charAt(0).toUpperCase()}
          </div>

          {/* Name + Role */}
          <div style={{ lineHeight: "1.2" }}>
            <div style={{ fontSize: "14px", fontWeight: "500", color: "white" }}>
              {name}
            </div>
            <div style={{ fontSize: "11px", color: "#dbeafe" }}>
              {formattedRole}
            </div>
          </div>
        </div>

        {open && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "45px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "8px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
              width: "200px",
            }}
          >
            {/* Email Only */}
            <div
              style={{
                padding: "8px",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "6px",
                fontSize: "12px",
                color: "#6b7280",
                wordBreak: "break-all",
              }}
            >
              {email}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "8px",
                border: "none",
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "500",
                borderRadius: "6px",
                color: "#333",
                transition: "0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fee2e2";
                e.currentTarget.style.color = "#E53935";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#333";
              }}
            >
              <FiLogOut size={14} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
