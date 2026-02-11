import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary logic for testing
    localStorage.setItem("role", "admin");
    localStorage.setItem("token", "demo-token");

    navigate("/dashboard/admin");
  };

return (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "280px",
        padding: "20px",
        border: "1px solid #444",
        borderRadius: "8px",
        backgroundColor: "#2a2a2a",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Admin Login</h2>

      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  </div>
);

}