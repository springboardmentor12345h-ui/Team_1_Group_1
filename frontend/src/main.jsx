import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: "#f0f9ff",      // light sky background
      color: "#0c4a6e",           // deep sky text
      border: "1px solid #bae6fd",
      borderRadius: "12px",
      padding: "12px 16px",
      fontSize: "14px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    },

    success: {
      iconTheme: {
        primary: "#16a34a",
        secondary: "#ecfdf5",
      },
    },

    error: {
      iconTheme: {
        primary: "#dc2626",
        secondary: "#fef2f2",
      },
    },
  }}
/>
   {/* ⭐ ADD THIS */}
    </AuthProvider>
  </StrictMode>
)

