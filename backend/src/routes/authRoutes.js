import express from "express";
import upload from "../middleware/upload.js";
import { updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authmiddleware.js";
import { changePassword } from "../controllers/authController.js";
import {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword
} from "../controllers/authController.js";

import { verifyToken } from "../middleware/authmiddleware.js";

const router = express.Router();

/* ===============================
   AUTH ROUTES
================================= */

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.put("/reset-password/:token", resetPassword);

// Get logged-in user
router.get("/me", verifyToken, getMe);
router.put("/update-profile", protect, upload.single("profileImage"), updateProfile);
router.put("/change-password", protect, changePassword);
router.delete("/delete-account", protect, deleteAccount);

export default router;