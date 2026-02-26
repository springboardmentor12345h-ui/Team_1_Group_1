import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/events
 * @desc    Get all events
 * @access  Public
 */
router.get("/", getAllEvents);

/**
 * @route   GET /api/events/:id
 * @desc    Get single event
 * @access  Public
 */
router.get("/:id", getEventById);

/**
 * @route   POST /api/events
 * @desc    Create event
 * @access  Private (college_admin, super_admin)
 */
router.post(
  "/",
  protect,
  authorize("college_admin", "super_admin"),
  createEvent
);

/**
 * @route   PUT /api/events/:id
 * @desc    Update event
 * @access  Private (college_admin, super_admin)
 */
router.put(
  "/:id",
  protect,
  authorize("college_admin", "super_admin"),
  updateEvent
);

/**
 * @route   DELETE /api/events/:id
 * @desc    Delete event
 * @access  Private (college_admin, super_admin)
 */
router.delete(
  "/:id",
  protect,
  authorize("college_admin", "super_admin"),
  deleteEvent
);

export default router;
