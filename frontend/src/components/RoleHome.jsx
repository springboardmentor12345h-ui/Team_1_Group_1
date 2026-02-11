function RoleHome({ selectRole }) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Select Your Role</h2>

        <button
          className="primary-btn"
          onClick={() => selectRole("student")}
        >
          Student
        </button>

        <button
          className="primary-btn"
          onClick={() => selectRole("admin")}
          style={{ marginTop: "10px" }}
        >
          Admin
        </button>

        <button
          className="primary-btn"
          onClick={() => selectRole("superadmin")}
          style={{ marginTop: "10px" }}
        >
          Super Admin
        </button>
      </div>
    </div>
  );
}

export default RoleHome;
