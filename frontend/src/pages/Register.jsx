import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    college: "",
    role: "student",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    const { fullName, email, college, role, password, confirmPassword } = formData;

    if (!fullName || !email || !college || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Temporary storage (until backend integration)
    localStorage.setItem("role", role);
    localStorage.setItem("userName", fullName);


    alert("Registration successful! Please login.");

    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="icon-circle">👤</div>

        <h2>Create Account</h2>
        <p className="subtitle">
          Join CampusEventHub
        </p>

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

        <label>Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            borderRadius: "6px",
            border: "1px solid #ddd"
          }}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
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
