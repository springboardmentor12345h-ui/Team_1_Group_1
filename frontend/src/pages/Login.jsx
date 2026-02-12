import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";
import { FiMail } from "react-icons/fi";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";   // ⭐ NEW

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();   // ⭐ NEW
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ================= UPDATED LOGIN LOGIC ================= */
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await loginUser({ email, password });

      const { token, user } = res.data;

      // ⭐ INFORM CONTEXT (instead of manual localStorage)
      login(token, user);

      // redirect
      if (user.role === "student") {
        navigate("/dashboard/student");
      } else {
        navigate("/dashboard/admin");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };
  /* ======================================================= */

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="icon-circle">
          <FiMail size={20} />
        </div>

        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your account</p>

        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="switch-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}
