import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";
import { FiUser } from "react-icons/fi";
import { registerUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [error, setError] = useState("");   // ⭐ NEW

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    college: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const handleChange = (e) => {
    setError("");   // clear error while typing
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    setError("");   // clear old error

    const { fullName, email, college, password, confirmPassword, role } =
      formData;

    if (!fullName || !email || !college || !password || !confirmPassword)
 {
      setError("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await registerUser({
        name: fullName,
        email,
        password,
        college,
        role,
      });

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
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="icon-circle">
          <FiUser size={22} />
        </div>

        <h2>Create Account</h2>
        <p className="subtitle">Join CampusEventHub</p>

        {/* ⭐ INLINE ERROR MESSAGE */}
        {error && <p className="error-text">{error}</p>}

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

        <label>Select Role</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="college_admin">College Admin</option>
        </select>

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
