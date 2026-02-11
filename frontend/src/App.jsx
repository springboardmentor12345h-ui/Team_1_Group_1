import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";

import StudentDashboard from "./pages/StudentDashboard";

import AdminDashboard from "./pages/AdminDashboard";


function Home() {
  return <h2>Home Page</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Login Routes */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
