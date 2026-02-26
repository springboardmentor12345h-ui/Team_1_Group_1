import express from "express";
import {
  registerForEvent,
  getMyRegistrations,
  getEventRegistrations,
  approveRegistration,
  rejectRegistration,
} from "../controllers/registrationController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * ===============================
 * Student Routes
 * ===============================
 */

/**
 * @route   POST /api/registrations
 * @desc    Register for an event
 * @access  Private (student)
 */
router.post(
  "/",
  protect,
  authorize("student"),
  registerForEvent
);

/**
 * @route   GET /api/registrations/my
 * @desc    Get logged-in student's registrations
 * @access  Private (student)
 */
router.get(
  "/my",
  protect,
  authorize("student"),
  getMyRegistrations
);


/**
 * ===============================
 * Admin Routes
 * ===============================
 */

/**
 * @route   GET /api/registrations/event/:eventId
 * @desc    Get all registrations for a specific event
 * @access  Private (college_admin, super_admin)
 */
router.get(
  "/event/:eventId",
  protect,
  authorize("college_admin", "super_admin"),
  getEventRegistrations
);

/**
 * @route   PUT /api/registrations/:id/approve
 * @desc    Approve a registration
 * @access  Private (college_admin, super_admin)
 */
router.put(
  "/:id/approve",
  protect,
  authorize("college_admin", "super_admin"),
  approveRegistration
);

/**
 * @route   PUT /api/registrations/:id/reject
 * @desc    Reject a registration
 * @access  Private (college_admin, super_admin)
 */
router.put(
  "/:id/reject",
  protect,
  authorize("college_admin", "super_admin"),
  rejectRegistration
);

export default router;
