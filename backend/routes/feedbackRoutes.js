import express from "express";
import {
  submitFeedback,
  getMyFeedback,
  getFeedbackByEvent,
  getAverageRating,
} from "../controllers/feedbackController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * =================================
 * Student Routes
 * =================================
 */

/**
 * @route   POST /api/feedback
 * @desc    Submit feedback for an event
 * @access  Private (student)
 */
router.post(
  "/",
  protect,
  authorize("student"),
  submitFeedback
);

/**
 * @route   GET /api/feedback/my
 * @desc    Get logged-in student's feedback history
 * @access  Private (student)
 */
router.get(
  "/my",
  protect,
  authorize("student"),
  getMyFeedback
);


/**
 * =================================
 * Admin Routes
 * =================================
 */

/**
 * @route   GET /api/feedback/event/:eventId
 * @desc    Get all feedback for a specific event
 * @access  Private (college_admin, super_admin)
 */
router.get(
  "/event/:eventId",
  protect,
  authorize("college_admin", "super_admin"),
  getFeedbackByEvent
);

/**
 * @route   GET /api/feedback/event/:eventId/average
 * @desc    Get average rating and feedback count for an event
 * @access  Private (college_admin, super_admin)
 */
router.get(
  "/event/:eventId/average",
  protect,
  authorize("college_admin", "super_admin"),
  getAverageRating
);

export default router;
