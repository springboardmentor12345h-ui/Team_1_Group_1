import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiEye, FiEyeOff } from "react-icons/fi";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({ email: email.trim(), password });
      const { token, user } = res.data;

      login(token, user);
      toast.success("Login successful");

      if (user.role === "student") {
        navigate("/dashboard/student");
      } else if (user.role === "college_admin") {
        navigate("/dashboard/collegeadmin");
      } else if (user.role === "super_admin") {
        navigate("/dashboard/superadmin");
      } else {
        navigate("/");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      
      <div className="w-[420px] max-w-full bg-indigo-200 p-[28px] sm:p-[30px] rounded-[14px] shadow-[0_12px_30px_rgba(0,0,0,0.08)]">

        {/* Icon */}
        <div className="w-[48px] h-[48px] mx-auto mb-[15px] rounded-full bg-[#1F3C88] flex items-center justify-center text-white">
          <FiMail size={20} />
        </div>

        <h2 className="text-center mb-1 text-[20px] font-semibold">
          Welcome Back
        </h2>

        <p className="text-center text-[13px] text-gray-600 mb-[18px]">
          Sign in to your account
        </p>

        {/* Email */}
        <label className="block text-[12px] font-medium text-slate-800 mt-[12px]">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-[4px] px-[10px] py-[8px] text-[13px] h-[36px] border border-slate-300 rounded-[6px] focus:border-[#1F3C88] focus:ring-2 focus:ring-[#1F3C88]/20 outline-none transition"
        />

        {/* Password */}
        <label className="block text-[12px] font-medium text-slate-800 mt-[12px]">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-[4px] px-[10px] py-[8px] text-[13px] h-[36px] border border-slate-300 rounded-[6px] pr-10 focus:border-[#1F3C88] focus:ring-2 focus:ring-[#1F3C88]/20 outline-none transition"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[10px] text-gray-500 hover:text-[#1F3C88] transition"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end mt-[6px]">
          <span
            onClick={() => navigate("/forgot-password")}
            className="text-[12px] text-[#1F3C88] cursor-pointer hover:underline"
          >
            Forgot Password?
          </span>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full mt-[18px] py-[9px] rounded-[6px] text-[14px] font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#1F3C88] hover:bg-[#163172] text-white"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register */}
        <p className="mt-[14px] text-center text-[12px]">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#1F3C88] font-medium cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}