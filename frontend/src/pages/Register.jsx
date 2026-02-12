import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";
import { FiUser } from "react-icons/fi";
import { registerUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    college: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= UPDATED REGISTER LOGIC ================= */
  const handleRegister = async () => {
    const { fullName, email, college, password, confirmPassword } = formData;

    if (!fullName || !email || !college || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await registerUser({
        name: fullName,
        email,
        password,
        college,
      });

      const { token, user } = res.data;

      // Inform Auth Context
      login(token, user);

      // Redirect based on role
      if (user.role === "student") {
        navigate("/dashboard/student");
      } else {
        navigate("/dashboard/admin");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };
  /* ========================================================== */

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="icon-circle">
          <FiUser size={22} />
        </div>

        <h2>Create Account</h2>
        <p className="subtitle">Join CampusEventHub</p>

        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>College/University</label>
        <input
          type="text"
          name="college"
          placeholder="Enter your college name"
          value={formData.college}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button className="primary-btn" onClick={handleRegister}>
          Register
        </button>

        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign in</span>
        </p>
      </div>
    </div>
  );
}
