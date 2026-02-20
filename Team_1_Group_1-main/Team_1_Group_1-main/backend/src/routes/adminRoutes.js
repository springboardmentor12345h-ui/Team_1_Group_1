import express from "express";
import {
  getPendingAdmins,
  approveCollegeAdmin,
} from "../controllers/authController.js";

import {
  verifyToken,
  authorizeRoles,
} from "../middleware/authmiddleware.js";

const router = express.Router();

/*
========================================
👑 SUPER ADMIN ROUTES
========================================
*/

// Get all pending college admins
router.get(
  "/pending-admins",
  verifyToken,
  authorizeRoles("super_admin"),
  getPendingAdmins
);

// Approve college admin
router.put(
  "/approve/:id",
  verifyToken,
  authorizeRoles("super_admin"),
  approveCollegeAdmin

);

export default router;
