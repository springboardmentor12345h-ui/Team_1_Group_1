import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import logoutIcon from "V:/CIP/Internships/Infosys Springboard/Team_1_Group_1/frontend/src/assetslogout.png";
import { FiLogOut } from "react-icons/fi";


export default function Navbar({ name = "User", role = "Student" }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/");
  };

  // Close dropdown when clicking outside
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
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "12px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #e0e0e0",
        position: "relative",
      }}
    >
      <h3 style={{ margin: 0 }}>CampusEventHub</h3>

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
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#2874F0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {name.charAt(0)}
          </div>

          <div>
            <div style={{ fontWeight: "500" }}>{name}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>{role}</div>
          </div>
        </div>

        {open && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "50px",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              width: "160px",
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "8px 10px",
                border: "none",
                backgroundColor: "transparent",
                color: "#333",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: "500",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f5f5f5";
                e.currentTarget.style.color = "#f44336";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#333";
              }}
            >
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
