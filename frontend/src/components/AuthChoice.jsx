function AuthChoice({ goToLogin, goToRegister }) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Choose Option</h2>

        <button className="primary-btn" onClick={goToLogin}>
          Login
        </button>

        <button
          className="primary-btn"
          onClick={goToRegister}
          style={{ marginTop: "10px" }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default AuthChoice;
