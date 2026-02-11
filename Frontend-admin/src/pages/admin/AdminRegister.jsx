import { useState } from "react";
import "../../styles/auth.css";

export default function AdminRegister() {
  const [collegeName, setCollegeName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Registered successfully (demo)");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Admin Registration</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="College Name"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Register</button>
        </form>

        <p>
          Already registered? <a href="/admin/login">Login</a>
        </p>
      </div>
    </div>
  );
}
