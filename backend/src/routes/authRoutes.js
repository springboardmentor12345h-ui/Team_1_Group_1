import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/authController.js";

import { verifyToken } from "../middleware/authmiddleware.js";

const router = express.Router();

/* ===============================
   AUTH ROUTES (TEST ONLY)
================================= */

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

// Get logged-in user
router.get("/me", verifyToken, getMe);

export default router;
