import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F4F6F9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          marginBottom: "60px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            color: "#1F3C88",
            marginBottom: "15px",
          }}
        >
          Welcome to CampusEventHub
        </h1>

        <p
          style={{
            fontSize: "18px",
            maxWidth: "650px",
            color: "#555",
            margin: "0 auto 30px auto",
          }}
        >
          A unified platform to manage, organize and participate in campus events seamlessly.
        </p>

        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "12px 28px",
              backgroundColor: "#1F3C88",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.opacity = "0.9")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.opacity = "1")
            }
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "12px 28px",
              backgroundColor: "#fff",
              color: "#1F3C88",
              border: "2px solid #1F3C88",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#E8ECF8")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#fff")
            }
          >
            Register
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          maxWidth: "1000px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[
        {
            title: "Participate in Events",
            desc: "Explore upcoming campus events and register with ease.",
        },
        {
            title: "Event Management",
            desc: "Create and manage campus events efficiently.",
        },
        {
            title: "Participation Tracking",
            desc: "Track registrations and monitor attendance seamlessly.",
        },
        ].map((feature, index) => (

          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              padding: "25px",
              borderRadius: "10px",
              width: "280px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                color: "#1F3C88",
                marginBottom: "10px",
              }}
            >
              {feature.title}
            </h3>

            <p style={{ color: "#666", fontSize: "14px" }}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
