import { useState } from "react"
import axios from "axios"

function StudentLogin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/student/login",
        form
      )

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("role", "student")

      alert("Login successful")
      console.log(res.data)
    } catch (error) {
      alert("Login failed")
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Student Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default StudentLogin

