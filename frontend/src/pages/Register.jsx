import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Sparkles, Calendar, Building2, ArrowRight, CheckCircle2 } from "lucide-react";
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&])[A-Za-z\d@#$%&]{8,}$/;

  const passwordRules = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[@#$%&]/.test(formData.password),
  };

  const passwordsMatch =
    formData.confirmPassword && formData.password === formData.confirmPassword;

  const handleRegister = async () => {
    const { fullName, email, college, password, confirmPassword, role } = formData;

    if (!fullName || !email || !college || !password || !confirmPassword) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!passwordRegex.test(password)) {
      toast.error("Password must include 8+ characters, uppercase, number & special character");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await registerUser({ name: fullName, email, password, college, role });
      if (role === "college_admin") {
        toast("Registered! Wait for Super Admin approval.", { icon: "⏳" });
      } else {
        toast.success("Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 1200);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const InputField = ({ icon: Icon, label, name, type, placeholder, value, extra }) => (
    <div>
      <label className="block text-xs font-medium text-slate-300 mb-2">{label}</label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="w-full bg-white/[0.06] border border-white/[0.1] text-white placeholder-slate-500 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.09] transition-all"
        />
        {extra}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[#0a0f1e]">

      {/* ── Background blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-blue-500/15 blur-[100px]" />
        <div className="absolute -bottom-40 right-1/3 w-[350px] h-[350px] rounded-full bg-violet-600/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ── Left Panel - Form ── */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div
            className="flex lg:hidden items-center gap-2 justify-center mb-8 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Calendar size={14} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg">CampusEventHub</span>
          </div>

          {/* Card */}
          <div className="bg-white/[0.05] border border-white/[0.08] rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Create Account</h2>
              <p className="text-slate-400 text-sm mt-1">
                Join CampusEventHub and explore inter-college events
              </p>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <InputField
                icon={FiUser}
                label="Full Name"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
              />

              {/* Email */}
              <InputField
                icon={FiMail}
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
              />

              {/* College */}
              <InputField
                icon={Building2}
                label="College / University"
                name="college"
                type="text"
                placeholder="Enter your college name"
                value={formData.college}
              />

              {/* Role */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Select Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-white/[0.06] border border-white/[0.1] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/60 transition-all"
                >
                  <option value="student" className="bg-[#0a0f1e]">Student</option>
                  <option value="college_admin" className="bg-[#0a0f1e]">College Admin</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setIsTypingPassword(true)}
                    onBlur={() => setTimeout(() => setIsTypingPassword(false), 200)}
                    className="w-full bg-white/[0.06] border border-white/[0.1] text-white placeholder-slate-500 rounded-xl pl-11 pr-12 py-3 text-sm focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.09] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                  >
                    {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>

                {/* Password rules */}
                {isTypingPassword && formData.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 grid grid-cols-2 gap-1"
                  >
                    {[
                      { rule: passwordRules.length, label: "8+ characters" },
                      { rule: passwordRules.uppercase, label: "Uppercase letter" },
                      { rule: passwordRules.number, label: "One number" },
                      { rule: passwordRules.special, label: "Special (@#$%&)" },
                    ].map((r) => (
                      <div key={r.label} className={`flex items-center gap-1.5 text-[11px] ${r.rule ? "text-emerald-400" : "text-slate-500"}`}>
                        <CheckCircle2 size={10} className={r.rule ? "text-emerald-400" : "text-slate-600"} />
                        {r.label}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-white/[0.06] border border-white/[0.1] text-white placeholder-slate-500 rounded-xl pl-11 pr-12 py-3 text-sm focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.09] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                  >
                    {showConfirmPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <p className={`text-[11px] mt-1.5 ${passwordsMatch ? "text-emerald-400" : "text-red-400"}`}>
                    {passwordsMatch ? "✓ Passwords match" : "✗ Passwords do not match"}
                  </p>
                )}
              </div>

              {/* Register Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRegister}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
              >
                Create Account
                <ArrowRight size={15} />
              </motion.button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-slate-500 text-xs">Already have an account?</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 rounded-xl border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 hover:border-white/20 transition-all"
            >
              Sign In Instead
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Right Panel (hidden on mobile) ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex flex-col justify-between w-[45%] p-14 relative z-10"
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Calendar size={18} className="text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            CampusEventHub
          </span>
        </div>

        {/* Center content */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <Sparkles size={12} />
              Join 5,000+ Students
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight">
              Your campus
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                starts here.
              </span>
            </h1>
            <p className="text-slate-400 text-lg mt-4 leading-relaxed max-w-sm">
              Register once and get access to all inter-college events across your region.
            </p>
          </motion.div>

          {/* Feature list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-3"
          >
            {[
              "Browse events from 50+ colleges",
              "Register for events in one click",
              "Track your registrations easily",
              "Get real-time event updates",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-slate-300 text-sm">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={11} className="text-blue-400" />
                </div>
                {feature}
              </div>
            ))}
          </motion.div>
        </div>

        <p className="text-slate-600 text-xs">
          © 2025 CampusEventHub. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
