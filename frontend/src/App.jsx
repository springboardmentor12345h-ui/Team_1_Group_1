import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/public/Landing";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import StudentDashboard from "./pages/dashboard/StudentDashboard";
import CollegeAdminDashboard from "./pages/dashboard/CollegeAdminDashboard";
import SuperAdminDashboard from "./pages/dashboard/SuperAdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* default redirect */}
<Route path="/" element={<Landing />} />

      {/* public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* protected routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="college_admin">
            <CollegeAdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/super"
        element={
          <ProtectedRoute role="super_admin">
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
