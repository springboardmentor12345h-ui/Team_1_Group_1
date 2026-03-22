import express from "express";
<<<<<<< HEAD
import upload from "../middleware/upload.js";
import { updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authmiddleware.js";
import { changePassword } from "../controllers/authController.js";
=======
import rateLimit from "express-rate-limit";
>>>>>>> origin/feature/qr-attendance
import {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authmiddleware.js";

const router = express.Router();

// ── Rate limiters ──────────────────────────────
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 10,                    // 10 attempts per IP
  message: { message: "Too many login attempts. Please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 hour
  max: 5,                     // 5 registrations per IP
  message: { message: "Too many accounts created. Please try again after an hour." },
  standardHeaders: true,
  legacyHeaders: false,
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,                     // 5 attempts per IP
  message: { message: "Too many requests. Please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});
// ───────────────────────────────────────────────

router.post("/register", registerLimiter, registerUser);
router.post("/login", loginLimiter, loginUser);
router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.get("/me", verifyToken, getMe);
router.put("/update-profile", protect, upload.single("profileImage"), updateProfile);
router.put("/change-password", protect, changePassword);
router.delete("/delete-account", protect, deleteAccount);

export default router;