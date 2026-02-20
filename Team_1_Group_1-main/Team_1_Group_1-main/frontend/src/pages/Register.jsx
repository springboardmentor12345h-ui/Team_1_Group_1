import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";
import { FiUser } from "react-icons/fi";
import { registerUser } from "../services/api";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    college: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    const { fullName, email, college, password, confirmPassword, role } =
      formData;

    if (!fullName || !email || !college || !password || !confirmPassword) {
      toast.error("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
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

      if (role === "college_admin") {
        toast("Registered successfully. Wait for Super Admin approval.", {
          icon: "⏳",
        });
      } else {
        toast.success("Registration successful. Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
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
