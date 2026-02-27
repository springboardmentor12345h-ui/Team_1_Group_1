import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { ArrowRight, Calendar, CheckCircle2, Building2, Zap, Shield, Globe } from "lucide-react";
import { registerUser } from "../services/api";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "", email: "", college: "",
    password: "", confirmPassword: "", role: "student",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&])[A-Za-z\d@#$%&]{8,}$/;
  const passwordRules = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[@#$%&]/.test(formData.password),
  };
  const passwordsMatch = formData.confirmPassword && formData.password === formData.confirmPassword;

  const handleRegister = async () => {
    const { fullName, email, college, password, confirmPassword, role } = formData;
    if (!fullName || !email || !college || !password || !confirmPassword) {
      toast.error("Please fill all required fields"); return;
    }
    if (!passwordRegex.test(password)) {
      toast.error("Password must include 8+ characters, uppercase, number & special character"); return;
    }
    if (password !== confirmPassword) { toast.error("Passwords do not match"); return; }
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

  return (
    <div className="min-h-screen flex">

      {/* ══════════════════════════════
          LEFT — Register Form
      ══════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center bg-white px-8 py-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div
            className="flex lg:hidden items-center gap-2 justify-center mb-6 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <Calendar size={14} className="text-white" />
            </div>
            <span className="text-slate-800 font-bold text-lg">CampusEventHub</span>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-slate-800">Create Account ✨</h2>
            <p className="text-slate-400 text-sm mt-2">Join thousands of students on CampusEventHub</p>
          </div>

          <div className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type="text" name="fullName" placeholder="Your full name"
                  value={formData.fullName} onChange={handleChange}
                  className="w-full border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type="email" name="email" placeholder="you@college.edu"
                  value={formData.email} onChange={handleChange}
                  className="w-full border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* College */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">College / University</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type="text" name="college" placeholder="Your college name"
                  value={formData.college} onChange={handleChange}
                  className="w-full border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Role</label>
              <select
                name="role" value={formData.role} onChange={handleChange}
                className="w-full border border-slate-200 bg-slate-50 text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              >
                <option value="student">Student</option>
                <option value="college_admin">College Admin</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type={showPassword ? "text" : "password"} name="password" placeholder="Create a strong password"
                  value={formData.password} onChange={handleChange}
                  onFocus={() => setIsTypingPassword(true)}
                  onBlur={() => setTimeout(() => setIsTypingPassword(false), 200)}
                  className="w-full border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 rounded-xl pl-11 pr-12 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">
                  {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>

              {isTypingPassword && formData.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2 grid grid-cols-2 gap-1"
                >
                  {[
                    { rule: passwordRules.length,    label: "8+ characters" },
                    { rule: passwordRules.uppercase, label: "Uppercase letter" },
                    { rule: passwordRules.number,    label: "One number" },
                    { rule: passwordRules.special,   label: "Special (@#$%&)" },
                  ].map((r) => (
                    <div key={r.label} className={`flex items-center gap-1.5 text-[11px] ${r.rule ? "text-emerald-600" : "text-slate-400"}`}>
                      <CheckCircle2 size={10} className={r.rule ? "text-emerald-500" : "text-slate-300"} />
                      {r.label}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm your password"
                  value={formData.confirmPassword} onChange={handleChange}
                  className="w-full border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 rounded-xl pl-11 pr-12 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">
                  {showConfirmPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
              {formData.confirmPassword && (
                <p className={`text-[11px] mt-1.5 ${passwordsMatch ? "text-emerald-600" : "text-red-500"}`}>
                  {passwordsMatch ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>
              )}
            </div>

            {/* Register Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRegister}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all"
              style={{
                background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #1e40af 100%)",
                boxShadow: "0 4px 20px rgba(37, 99, 235, 0.35)",
              }}
            >
              Create Account
              <ArrowRight size={15} />
            </motion.button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-slate-400 text-xs">Already have an account?</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <button
            onClick={() => navigate("/login")}
            className="w-full py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
          >
            Sign In Instead
          </button>

          <p className="text-center text-slate-400 text-xs mt-6">
            © 2025 CampusEventHub. All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* ══════════════════════════════
          RIGHT — Gradient Illustrated Panel
      ══════════════════════════════ */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex w-[48%] relative overflow-hidden flex-col justify-between p-12"
        style={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #1e40af 100%)",
        }}
      >
        {/* Floating pill shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { w: 130, h: 42, top: "8%",  left: "60%", rotate: 30,  opacity: 0.15 },
            { w: 90,  h: 30, top: "18%", left: "5%",  rotate: -40, opacity: 0.12 },
            { w: 150, h: 44, top: "35%", left: "55%", rotate: -25, opacity: 0.14 },
            { w: 100, h: 34, top: "50%", left: "10%", rotate: 20,  opacity: 0.16 },
            { w: 120, h: 38, top: "65%", left: "50%", rotate: 40,  opacity: 0.12 },
            { w: 80,  h: 26, top: "80%", left: "5%",  rotate: -30, opacity: 0.18 },
            { w: 60,  h: 22, top: "90%", left: "60%", rotate: 15,  opacity: 0.1  },
          ].map((p, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0], rotate: [p.rotate, p.rotate + 4, p.rotate] }}
              transition={{ duration: 4.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: p.w, height: p.h,
                top: p.top, left: p.left,
                borderRadius: 999,
                background: "rgba(255,255,255," + p.opacity + ")",
                transform: `rotate(${p.rotate}deg)`,
              }}
            />
          ))}
          <div className="absolute top-[25%] left-[10%] w-52 h-52 rounded-full border-2 border-white/10" />
          <div className="absolute bottom-[15%] right-[5%] w-36 h-36 rounded-full border-2 border-white/10" />
        </div>

        {/* Logo */}
        <div
          className="flex items-center gap-3 relative z-10 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
            <Calendar size={18} className="text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">CampusEventHub</span>
        </div>

        {/* Center */}
        <div className="relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <h1 className="text-5xl font-bold text-white leading-tight">
              Your campus
              <br />life,
              <br />
              <span className="text-blue-100">amplified.</span>
            </h1>
            <p className="text-blue-100/80 text-base mt-4 leading-relaxed max-w-xs">
              Register once, participate everywhere. Access events from colleges across the region.
            </p>
          </motion.div>

          {/* Feature list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            {[
              { icon: Globe,   text: "Events from 50+ colleges" },
              { icon: Zap,     text: "Instant event registration" },
              { icon: Shield,  text: "Secure & role-based access" },
              { icon: CheckCircle2, text: "Track all your registrations" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                  <f.icon size={13} className="text-white" />
                </div>
                <span className="text-blue-100/90 text-sm">{f.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white/80 text-xs px-4 py-2 rounded-full">
            <Zap size={12} className="text-yellow-300" />
            Trusted by students across Telangana
          </div>
        </div>
      </motion.div>
    </div>
  );
}
