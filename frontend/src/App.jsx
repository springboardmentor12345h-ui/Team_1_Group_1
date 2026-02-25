import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import Chatbot from "./components/Chatbot";
import Events from "./pages/Events";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>

      {/* ✅ GLOBAL CHATBOT */}
      <Chatbot />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Student Dashboard */}
        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute roles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* College Admin Dashboard */}
        <Route
          path="/dashboard/collegeadmin"
          element={
            <ProtectedRoute roles={["college_admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* College Admin - Create Event */}
        <Route
          path="/dashboard/collegeadmin/create-event"
          element={
            <ProtectedRoute roles={["college_admin"]}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        {/* Super Admin Dashboard */}
        <Route
          path="/dashboard/superadmin"
          element={
            <ProtectedRoute roles={["super_admin"]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;