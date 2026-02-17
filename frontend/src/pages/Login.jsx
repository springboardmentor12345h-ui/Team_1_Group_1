import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";
import { FiMail } from "react-icons/fi";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");   // ⭐ NEW

  const handleLogin = async () => {
    setError("");   // clear old error

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const res = await loginUser({ email, password });
      const { token, user } = res.data;

      login(token, user);

      if (user.role === "student") {
  navigate("/dashboard/student");
} else if (user.role === "college_admin") {
  navigate("/dashboard/admin");
} else if (user.role === "super_admin") {
  navigate("/dashboard/superadmin");
} else {
  navigate("/");
}

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="icon-circle">
          <FiMail size={20} />
        </div>

        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your account</p>

        {/* ⭐ SIMPLE ERROR TEXT */}
        {error && <p className="error-text">{error}</p>}

        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");   // clear error while typing
          }}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");   // clear error while typing
          }}
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
