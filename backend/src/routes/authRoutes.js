import express from "express";
import {
  getPendingAdmins,
  approveAdmin,
} from "../controllers/adminController.js";

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
  approveAdmin
);

export default router;
