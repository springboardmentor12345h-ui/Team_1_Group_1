import { useState } from "react";
import Navbar from "../components/Navbar";

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Event will be created (backend coming next)");
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          padding: "40px",
background: "#f9fafb", // subtle dashboard gray (optional but professional)

          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "920px",
            background: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 20px 45px rgba(0,0,0,0.08)",
            padding: "40px",
            transition: "0.3s ease",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "25px" }}>
            <h2 style={{ margin: 0, fontSize: "26px" }}>Create New Event</h2>
            <p style={{ color: "#6b7280", marginTop: "8px", fontSize: "14px" }}>
              Fill in the details below to publish a new campus event.
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "#e5e7eb",
              marginBottom: "25px",
            }}
          />

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Row 1 */}
            <Grid>
              <Input
                label="Event Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
              />

              <Input
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Hackathon, Cultural, Workshop..."
              />
            </Grid>

            {/* Row 2 */}
            <Grid>
              <Input
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />

              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Event venue"
              />
            </Grid>

            {/* Description */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={labelStyle}>Description</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write full event details..."
                style={inputStyle}
                required
              />
            </div>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <button type="submit" style={primaryBtn}>
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

/* ---------- Layout Grid ---------- */
function Grid({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "18px",
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Reusable Input ---------- */
function Input({ label, type = "text", ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>{label}</label>
      <input type={type} {...props} style={inputStyle} required />
    </div>
  );
}

/* ---------- Styles ---------- */

const labelStyle = {
  fontSize: "13px",
  fontWeight: "600",
  marginBottom: "6px",
  color: "#374151",
};

const inputStyle = {
  padding: "11px 13px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  outline: "none",
  transition: "all 0.2s ease",
};

const primaryBtn = {
  background: "linear-gradient(135deg, #1F3C88, #2563eb)",
  color: "#fff",
  border: "none",
  padding: "12px 26px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
  boxShadow: "0 8px 18px rgba(37,99,235,0.35)",
  transition: "all 0.2s ease",
};
