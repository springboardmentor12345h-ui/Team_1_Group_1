import express from "express";
import {
  getAllAdminLogs,
  getLogsByAdmin,
  getMyAdminLogs,
  createAdminLog,
} from "../controllers/adminLogController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * =================================
 * Admin Logs Routes
 * =================================
 */

/**
 * @route   GET /api/admin-logs
 * @desc    Get all admin activity logs
 * @access  Private (super_admin)
 */
router.get(
  "/",
  protect,
  authorize("super_admin"),
  getAllAdminLogs
);

/**
 * @route   GET /api/admin-logs/me
 * @desc    Get logs of the currently logged-in admin
 * @access  Private (college_admin, super_admin)
 */
router.get(
  "/me",
  protect,
  authorize("college_admin", "super_admin"),
  getMyAdminLogs
);

/**
 * @route   GET /api/admin-logs/user/:userId
 * @desc    Get logs for a specific admin
 * @access  Private (super_admin)
 */
router.get(
  "/user/:userId",
  protect,
  authorize("super_admin"),
  getLogsByAdmin
);

/**
 * @route   POST /api/admin-logs
 * @desc    Create an admin log entry
 * @note    Usually called internally after admin actions
 * @access  Private (college_admin, super_admin)
 */
router.post(
  "/",
  protect,
  authorize("college_admin", "super_admin"),
  createAdminLog
);

export default router;
