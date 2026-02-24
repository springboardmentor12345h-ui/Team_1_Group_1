import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function CreateEvent() {

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Basic Validation
  const validateForm = () => {
    if (formData.title.length < 3) {
      return "Title must be at least 3 characters";
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      return "End date must be after start date";
    }

    return null;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setMessage(error);
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Unauthorized. Please login again.");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/events",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Event created successfully!");

      setFormData({
        title: "",
        category: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
      });

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to create event"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={{ marginBottom: "20px" }}>Create Event</h2>

          {message && (
            <p style={{ color: message.includes("success") ? "green" : "red" }}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} style={formStyle}>

            <Input
              label="Event Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
            />

            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter event location"
            />

            <Input
              label="Start Date"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />

            <Input
              label="End Date"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />

            <div>
              <label style={labelStyle}>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={inputStyle}
                required
              >
                <option value="">Select Category</option>
                <option value="Tech">Tech</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Workshop">Workshop</option>
              </select>
            </div>

            <div>
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

            <button type="submit" style={buttonStyle} disabled={loading}>
              {loading ? "Creating..." : "Create Event"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

/* ---------- Reusable Input ---------- */
function Input({ label, type = "text", ...props }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} {...props} style={inputStyle} required />
    </div>
  );
}

/* ---------- Styles ---------- */

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f4f6f8",
  padding: "20px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "600px",
  background: "#ffffff",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const labelStyle = {
  marginBottom: "6px",
  fontWeight: "600",
  fontSize: "14px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px",
};

const buttonStyle = {
  padding: "14px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
};