import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState("");

  return (
    <div className="main-container">

      {/* ---------------- HOME PAGE ---------------- */}
      {page === "home" && (
        <div className="card">
          <h1>Campus Event Hub</h1>
          <p className="subtitle">Welcome</p>

          <button onClick={() => setPage("login")}>Login</button>
          <button onClick={() => setPage("registerChoice")}>Register</button>
        </div>
      )}

      {/* ---------------- LOGIN PAGE (COMMON) ---------------- */}
      {page === "login" && (
        <div className="card">
          <div className="icon-circle">🔐</div>
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to your account</p>

          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />

          <button className="primary-btn">Sign In</button>

          <p className="switch-text">
            Don't have an account?{" "}
            <span onClick={() => setPage("registerChoice")}>
              Register
            </span>
          </p>

          <span className="back-link" onClick={() => setPage("home")}>
            ← Go Back
          </span>
        </div>
      )}

      {/* ---------------- REGISTER ROLE SELECTION ---------------- */}
      {page === "registerChoice" && (
        <div className="card">
          <h2>Select Registration Type</h2>
          <p className="subtitle">Choose your role</p>

          <button onClick={() => { setRole("Student"); setPage("register"); }}>
            🎓 Student
          </button>

          <button onClick={() => { setRole("Admin"); setPage("register"); }}>
            🛠 Admin
          </button>

          <span className="back-link" onClick={() => setPage("home")}>
            ← Go Back
          </span>
        </div>
      )}

      {/* ---------------- REGISTER PAGE (DYNAMIC) ---------------- */}
      {page === "register" && (
        <div className="card">
          <div className="icon-circle">👤</div>
          <h2>Create {role} Account</h2>
          <p className="subtitle">Register as {role}</p>

          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />

          {role === "Student" && (
            <input type="text" placeholder="College/University" />
          )}

          {role === "Admin" && (
            <input type="text" placeholder="Department Name" />
          )}

          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />

          <button className="primary-btn">
            Create Account
          </button>

          <p className="switch-text">
            Already have an account?{" "}
            <span onClick={() => setPage("login")}>
              Login
            </span>
          </p>

          <span
            className="back-link"
            onClick={() => setPage("registerChoice")}
          >
            ← Go Back
          </span>
        </div>
      )}

    </div>
  );
}
