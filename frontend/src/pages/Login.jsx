import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";
import { FiMail } from "react-icons/fi";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({ email: email.trim(), password });
      const { token, user } = res.data;

      login(token, user);

      toast.success("Login successful");

      if (user.role === "student") {
        navigate("/dashboard/student");
      } else if (user.role === "college_admin") {
        navigate("/dashboard/collegeadmin");
      } else if (user.role === "super_admin") {
        navigate("/dashboard/superadmin");
      } else {
        navigate("/login");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
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

        <button className="primary-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="switch-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}
