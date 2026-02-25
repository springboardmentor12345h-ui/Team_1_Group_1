import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { registerUser } from "../services/api";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    college: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ SAME AS BACKEND
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&])[A-Za-z\d@#$%&]{8,}$/;

  const passwordRules = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[@#$%&]/.test(formData.password),
  };

  const passwordsMatch =
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const handleRegister = async () => {
    const { fullName, email, college, password, confirmPassword, role } =
      formData;

    if (!fullName || !email || !college || !password || !confirmPassword) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must include 8 characters, uppercase, number & special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await registerUser({
        name: fullName,
        email,
        password,
        college,
        role,
      });

      if (role === "college_admin") {
        toast("Registered successfully. Wait for Super Admin approval.", {
          icon: "⏳",
        });
      } else {
        toast.success("Registration successful. Redirecting...");
        setTimeout(() => navigate("/login"), 1200);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      
      {/* ✅ Wider container */}
      <div className="w-[420px] max-w-full bg-indigo-200 p-[28px] sm:p-[30px] rounded-[14px] shadow-[0_12px_30px_rgba(0,0,0,0.08)]">

        {/* Icon */}
        <div className="w-[48px] h-[48px] mx-auto mb-[15px] rounded-full bg-[#1F3C88] flex items-center justify-center text-white">
          <FiUser size={22} />
        </div>

        <h2 className="text-center mb-1 text-[20px] font-semibold">
          Create Account
        </h2>

        <p className="text-center text-[13px] text-gray-600 mb-[18px]">
          Join CampusEventHub
        </p>

        {/* Full Name */}
        <label className="block text-[12px] font-medium text-slate-800 mt-[12px]">
          Full Name
        </label>
        <input
          className="w-full mt-[4px] px-[10px] py-[8px] text-[13px] h-[36px] border border-slate-300 rounded-[6px] focus:border-[#1F3C88] focus:ring-2 focus:ring-[#1F3C88]/20 outline-none transition"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
        />

        {/* Email */}
        <label className="block text-[12px] font-medium text-slate-800 mt-[12px]">
          Email Address
        </label>
        <input
          className="w-full mt-[4px] px-[10px] py-[8px] text-[13px] h-[36px] border border-slate-300 rounded-[6px] focus:border-[#1F3C88] focus:ring-2 focus:ring-[#1F3C88]/20 outline-none transition"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        {/* College */}
        <label className="block text-[12px] font-medium text-slate-800 mt-[12px]">
          College/University
        </label>
        <input
          className="w-full mt-[4px] px-[10px] py-[8px] text-[13px] h-[36px] border border-slate-300 rounded-[6px] focus:border-[#1F3C88] focus:ring-2 focus:ring-[#1F3C88]/20 outline-none transition"
          type="text"
          name="college"
          placeholder="Enter your college name"
          value={formData.college}
          onChange={handleChange}
        />

        {/* Role */}
        <label className="block text-[12px] font-medium text-slate-800 mt-[12px]">
          Select Role
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full mt-[4px] px-[10px] text-[13px] h-[36px] border border-slate-300 rounded-[6px] focus:border-[#1F3C88] focus:ring-2 focus:ring-[#1F3C88]/20 outline-none transition"
        >
          <option value="student">Student</option>
          <option value="college_admin">College Admin</option>
        </select>

        {/* Password */}
        <label className="block text-[12px] font-medium text-slate-800 mt-[12px]">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => setIsTypingPassword(true)}
            onBlur={() => setTimeout(() => setIsTypingPassword(false), 200)}
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

        {/* ✅ Rules show ONLY while typing */}
        {isTypingPassword && formData.password && (
          <div className="text-[11px] mt-2 space-y-1 transition-all duration-300">
            <p className={passwordRules.length ? "text-green-600" : "text-gray-500"}>
              • At least 8 characters
            </p>
            <p className={passwordRules.uppercase ? "text-green-600" : "text-gray-500"}>
              • One uppercase letter
            </p>
            <p className={passwordRules.number ? "text-green-600" : "text-gray-500"}>
              • One number
            </p>
            <p className={passwordRules.special ? "text-green-600" : "text-gray-500"}>
              • One special character (@#$%&)
            </p>
          </div>
        )}

        {/* Confirm Password */}
        <label className="block text-[12px] font-medium text-slate-800 mt-[12px]">
          Confirm Password
        </label>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full mt-[4px] px-[10px] py-[8px] text-[13px] h-[36px] border border-slate-300 rounded-[6px] pr-10 focus:border-[#1F3C88] focus:ring-2 focus:ring-[#1F3C88]/20 outline-none transition"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-[10px] text-gray-500 hover:text-[#1F3C88] transition"
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {formData.confirmPassword && (
          <p className={`text-[11px] mt-1 ${passwordsMatch ? "text-green-600" : "text-red-500"}`}>
            {passwordsMatch ? "Passwords match ✓" : "Passwords do not match"}
          </p>
        )}

        <button
          onClick={handleRegister}
          className="w-full mt-[18px] py-[9px] rounded-[6px] bg-[#1F3C88] text-white text-[14px] font-medium hover:bg-[#163172] transition"
        >
          Register
        </button>

        <p className="mt-[14px] text-center text-[12px]">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#1F3C88] font-medium cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}