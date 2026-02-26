import Feedback from "../models/Feedback.js";
import Event from "../models/Event.js";
import mongoose from "mongoose";

/**
 * @desc    Submit feedback for an event
 * @route   POST /api/feedback
 * @access  Private (student)
 */
export const submitFeedback = async (req, res, next) => {
  try {
    const { event_id, rating, comments } = req.body;

    // Basic validation
    if (!event_id || !rating || !comments) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure event exists
    const event = await Event.findById(event_id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Create feedback
    const feedback = await Feedback.create({
      event_id,
      user_id: req.user.id,
      rating,
      comments,
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Get feedback submitted by logged-in user
 * @route   GET /api/feedback/my
 * @access  Private (student)
 */
export const getMyFeedback = async (req, res, next) => {
  try {
    const feedbackList = await Feedback.find({ user_id: req.user.id })
      .populate("event_id", "title category start_date end_date")
      .sort({ timestamp: -1 });

    res.status(200).json(feedbackList);
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Get all feedback for a specific event
 * @route   GET /api/feedback/event/:eventId
 * @access  Private (college_admin, super_admin)
 */
export const getFeedbackByEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const feedbackList = await Feedback.find({ event_id: eventId })
      .populate("user_id", "name email college")
      .sort({ timestamp: -1 });

    res.status(200).json(feedbackList);
  } catch (error) {
    next(error);
  }
};


/**
 * @desc    Get average rating for an event (basic analytics)
 * @route   GET /api/feedback/event/:eventId/average
 * @access  Private (college_admin, super_admin)
 */
export const getAverageRating = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const result = await Feedback.aggregate([
      { $match: { event_id: new mongoose.Types.ObjectId(eventId) } },
      {
        $group: {
          _id: "$event_id",
          averageRating: { $avg: "$rating" },
          totalFeedback: { $sum: 1 },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No feedback found for this event" });
    }

    res.status(200).json({
      event_id: eventId,
      averageRating: result[0].averageRating,
      totalFeedback: result[0].totalFeedback,
    });
  } catch (error) {
    next(error);
  }
};
