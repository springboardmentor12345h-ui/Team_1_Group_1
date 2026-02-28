import express from "express";
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

export default router;