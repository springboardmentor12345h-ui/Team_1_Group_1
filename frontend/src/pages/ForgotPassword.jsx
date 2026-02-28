import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      toast.success(res.data.message || "Reset link sent");
      navigate("/login");

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-[420px] bg-indigo-200 p-8 rounded-xl shadow-lg">

        <h2 className="text-center text-xl font-semibold mb-2">
          Forgot Password
        </h2>

        <p className="text-center text-sm text-gray-600 mb-6">
          Enter your email to receive reset link
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-4 focus:ring-2 focus:ring-[#1F3C88] outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white transition ${
              loading
                ? "bg-gray-400"
                : "bg-[#1F3C88] hover:bg-[#163172]"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p
          onClick={() => navigate("/login")}
          className="text-center text-sm mt-4 text-[#1F3C88] cursor-pointer hover:underline"
        >
          Back to Login
        </p>
      </div>
    </div>
  );
}