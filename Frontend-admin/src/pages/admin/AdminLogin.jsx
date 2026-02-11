import { useState } from "react";
import "../../styles/auth.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login successful (demo)");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
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

          <button type="submit">Login</button>
        </form>

        <p>
          New admin? <a href="/admin/register">Register</a>
        </p>
      </div>
    </div>
  );
}
