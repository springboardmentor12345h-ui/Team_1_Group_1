import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
    </Routes>
  );
}

export default App;
