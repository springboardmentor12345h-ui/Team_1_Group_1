import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { ArrowRight, Calendar, Users, Star, Zap } from "lucide-react";
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
    if (!email || !password) { toast.error("Please enter email and password"); return; }
    try {
      setLoading(true);
      const res = await loginUser({ email: email.trim(), password });
      const { token, user } = res.data;
      login(token, user);
      toast.success("Login successful");
      // if (user.role === "student") navigate("/dashboard/student");
      // else if (user.role === "college_admin") navigate("/dashboard/collegeadmin");
      // else if (user.role === "super_admin") navigate("/dashboard/superadmin");
      // else 
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex" style={{minHeight: "620px"}}>

      {/* ══════════════════════════════
          LEFT — Gradient Illustrated Panel
      ══════════════════════════════ */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex w-[52%] relative overflow-hidden flex-col justify-between p-12"
        style={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #1e40af 100%)",
        }}
      >
        {/* Floating pill shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { w: 120, h: 40, top: "12%", left: "8%",  rotate: -35, opacity: 0.18 },
            { w: 80,  h: 28, top: "22%", left: "55%", rotate: 20,  opacity: 0.15 },
            { w: 160, h: 44, top: "38%", left: "-4%", rotate: -40, opacity: 0.12 },
            { w: 100, h: 34, top: "55%", left: "60%", rotate: 30,  opacity: 0.16 },
            { w: 140, h: 40, top: "68%", left: "15%", rotate: -25, opacity: 0.14 },
            { w: 90,  h: 30, top: "78%", left: "50%", rotate: 15,  opacity: 0.18 },
            { w: 60,  h: 22, top: "88%", left: "5%",  rotate: -50, opacity: 0.12 },
            { w: 110, h: 36, top: "5%",  left: "40%", rotate: 40,  opacity: 0.1  },
          ].map((p, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -12, 0], rotate: [p.rotate, p.rotate + 5, p.rotate] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
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
          <div className="absolute top-[30%] right-[10%] w-48 h-48 rounded-full border-2 border-white/10" />
          <div className="absolute bottom-[20%] left-[5%] w-32 h-32 rounded-full border-2 border-white/10" />
          <div className="absolute top-[60%] right-[5%] w-20 h-20 rounded-full bg-white/5" />
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

        {/* Center text */}
        <div className="relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <h1 className="text-5xl font-bold text-white leading-tight">
              Connect.<br />Explore.<br />
              <span className="text-blue-100">Participate.</span>
            </h1>
            <p className="text-blue-100/80 text-base mt-4 leading-relaxed max-w-xs">
              The one platform for all inter-college events — sports, hackathons, cultural fests and workshops.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-6"
          >
            {[
              { icon: Calendar, value: "200+", label: "Events" },
              { icon: Users,    value: "5K+",  label: "Students" },
              { icon: Star,     value: "50+",  label: "Colleges" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <s.icon size={16} className="text-blue-100 mx-auto mb-1" />
                <div className="text-white font-bold text-lg">{s.value}</div>
                <div className="text-blue-100/70 text-xs">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom tag */}
        {/* <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white/80 text-xs px-4 py-2 rounded-full">
            <Zap size={12} className="text-yellow-300" />
            Trusted by students across Telangana
          </div>
        </div> */}
      </motion.div>

      {/* ══════════════════════════════
          RIGHT — Login Form
      ══════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center bg-white px-8 py-12">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div
            className="flex lg:hidden items-center gap-2 justify-center mb-8 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <Calendar size={14} className="text-white" />
            </div>
            <span className="text-slate-800 font-bold text-lg">CampusEventHub</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Welcome back 👋</h2>
            <p className="text-slate-400 text-sm mt-2">Sign in to your account to continue</p>
          </div>

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type="email"
                  placeholder="you@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Password
                </label>
                {/* ✅ Forgot Password Link */}
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline transition"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 rounded-xl pl-11 pr-12 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: loading
                  ? "#94a3b8"
                  : "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #1e40af 100%)",
                boxShadow: loading ? "none" : "0 4px 20px rgba(37, 99, 235, 0.35)",
              }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={15} />
                </>
              )}
            </motion.button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-slate-400 text-xs">Don't have an account?</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <button
            onClick={() => navigate("/register")}
            className="w-full py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
          >
            Create an Account
          </button>

          <p className="text-center text-slate-400 text-xs mt-8">
            © 2025 CampusEventHub. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
    </div>
  );
}