function Register({ role, goToLogin }) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="icon-circle">👤</div>

        <h2>Create Account</h2>
        <p className="subtitle">
          Join CampusEventHub as {role.toUpperCase()}
        </p>

        <label>Full Name</label>
        <input type="text" placeholder="Enter your full name" />

        <label>Email Address</label>
        <input type="email" placeholder="Enter your email" />

        <label>College/University</label>
        <input type="text" placeholder="Enter your college name" />

        <label>Password</label>
        <input type="password" placeholder="Create a password" />

        <label>Confirm Password</label>
        <input type="password" placeholder="Confirm your password" />

        <button className="primary-btn">
          Register as {role}
        </button>

        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={goToLogin}>Sign in</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
