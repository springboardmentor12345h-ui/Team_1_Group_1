import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";   // ⭐ NEW

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();   // ⭐ FROM CONTEXT

  // Wait until auth check finishes
  if (loading) return null;

  // Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
