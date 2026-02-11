function Login({ role, goToRegister }) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="icon-circle">✉️</div>

        <h2>Welcome Back</h2>
        <p className="subtitle">
          Sign in to your {role.toUpperCase()} account
        </p>

        <label>Email Address</label>
        <input type="email" placeholder="Enter your email" />

        <label>Password</label>
        <input type="password" placeholder="Enter your password" />

        <button className="primary-btn">
          Sign In as {role}
        </button>

        <p className="switch-text">
          Don't have an account?{" "}
          <span onClick={goToRegister}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
