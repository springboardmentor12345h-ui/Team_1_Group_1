import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import CreateEvent from "./pages/CreateEvent";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Student */}
        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute roles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* College Admin */}
        <Route
          path="/dashboard/collegeadmin"
          element={
            <ProtectedRoute roles={["college_admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/dashboard/admin/create-event"
  element={
    <ProtectedRoute roles={["college_admin"]}>
      <CreateEvent />
    </ProtectedRoute>
  }
/>


        {/* Super Admin */}
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
