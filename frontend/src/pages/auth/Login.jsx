import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await login(form.email, form.password);

      if (user.role === "student") navigate("/student");
      else if (user.role === "college_admin") navigate("/admin");
      else if (user.role === "super_admin") navigate("/super");
      else navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 px-4">
      
      {/* glow background effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-30" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-30" />

      {/* animated login card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl text-white">
          <CardHeader>
            <CardTitle className="text-3xl text-center font-bold">
              Welcome Back
            </CardTitle>
            <p className="text-center text-white/70 text-sm mt-1">
              Login to continue to CampusEventHub
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
                required
              />

              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
                required
              />

              {error && (
                <p className="text-sm text-red-400 text-center">{error}</p>
              )}

              <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">
                Login
              </Button>
            </form>

            <p className="text-sm text-center mt-6 text-white/70">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-300 hover:underline"
              >
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
