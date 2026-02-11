function Home({ goTo }) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Campus Event Hub</h2>
        <p className="subtitle">Welcome! Choose an option</p>

        <button
          className="primary-btn"
          onClick={() => goTo("login")}
        >
          Login
        </button>

        <button
          className="primary-btn"
          onClick={() => goTo("register")}
          style={{ marginTop: "10px" }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Home;
