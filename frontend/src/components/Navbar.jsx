import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ margin: 0 }}>CampusEventHub</h3>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>Home</Link>
        <Link to="/dashboard/student" style={{ textDecoration: "none" }}>Student</Link>
        <Link to="/dashboard/admin" style={{ textDecoration: "none" }}>Admin</Link>
      </div>
    </div>
  );
}
