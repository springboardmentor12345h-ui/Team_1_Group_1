import { Routes, Route } from "react-router-dom"
import StudentRegister from "./pages/StudentRegister"
import StudentLogin from "./pages/StudentLogin"

function App() {
  return (
    <Routes>
      <Route path="/student/register" element={<StudentRegister />} />
      <Route path="/student/login" element={<StudentLogin />} />
    </Routes>
  )
}

export default App
