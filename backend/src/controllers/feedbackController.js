import Feedback from "../models/Feedback.js";
import Event from "../models/Event.js";
import mongoose from "mongoose";

/* ================================
   ⭐ SUBMIT FEEDBACK
================================ */
export const submitFeedback = async (req, res) => {
  try {
    const userId = req.user.id;
    let { eventId, rating, comment } = req.body;

    if (!eventId || !rating) {
      return res.status(400).json({ success: false, message: "Event and rating required" });
    }

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ success: false, message: "Invalid event ID" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: "Rating must be 1–5" });
    }

    const cleanComment = comment?.replace(/<[^>]*>?/gm, "");

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    if (new Date(event.date) > new Date()) {
      return res.status(400).json({ success: false, message: "Event not completed yet" });
    }

    const attended = event.attendees.some(id => id.toString() === userId);
    if (!attended) {
      return res.status(403).json({ success: false, message: "You did not attend this event" });
    }

    const exists = await Feedback.findOne({ userId, eventId });
    if (exists) {
      return res.status(400).json({ success: false, message: "Feedback already submitted" });
    }

    const feedback = await Feedback.create({
      userId,
      eventId,
      rating,
      comment: cleanComment,
    });

    res.status(201).json({ success: true, data: feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================================
   📖 GET EVENT FEEDBACK
================================ */
export const getEventFeedback = async (req, res) => {
  try {
    const { rating, page = 1, sort, limit = 5 } = req.query;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid event ID" });
    }

    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(10, Number(limit) || 5);

    const filter = { eventId: req.params.id };

    if (rating) {
      const r = Number(rating);
      if (r < 1 || r > 5) {
        return res.status(400).json({ success: false, message: "Invalid rating filter" });
      }
      filter.rating = r;
    }

    const sortOption = sort === "top" ? { rating: -1 } : { createdAt: -1 };

    const feedbacks = await Feedback.find(filter)
      .populate("userId", "name profileImage")
      .sort(sortOption)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean();

    const total = await Feedback.countDocuments(filter);

    // ⚡ Single aggregation (fast)
    const stats = await Feedback.aggregate([
      { $match: { eventId: new mongoose.Types.ObjectId(req.params.id) } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          total: { $sum: 1 },
        },
      },
    ]);

    const avg = stats[0]?.avgRating || 0;

    res.json({
      success: true,
      data: {
        feedbacks,
        averageRating: avg.toFixed(2),
        totalReviews: total,
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching feedback" });
  }
};

/* ================================
   ✏️ UPDATE FEEDBACK
================================ */
export const updateFeedback = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ success: false, message: "Feedback not found" });
    }

    if (feedback.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not allowed" });
    }

    const hours = (Date.now() - feedback.createdAt) / (1000 * 60 * 60);
    if (hours > 24) {
      return res.status(400).json({ success: false, message: "Edit time expired" });
    }

    if (req.body.rating) {
      const r = Number(req.body.rating);
      if (r < 1 || r > 5) {
        return res.status(400).json({ success: false, message: "Rating must be 1–5" });
      }
      feedback.rating = r;
    }

    if (req.body.comment) {
      feedback.comment = req.body.comment.replace(/<[^>]*>?/gm, "");
    }

    await feedback.save();

    res.json({ success: true, data: feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

/* ================================
   ❌ DELETE FEEDBACK
================================ */
export const deleteFeedback = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ success: false, message: "Feedback not found" });
    }

    if (
      feedback.userId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ success: false, message: "Not allowed" });
    }

    await Feedback.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};

/* ================================
   👤 GET MY FEEDBACK
================================ */
export const getMyFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ userId: req.user.id })
      .populate("eventId", "title")
      .lean();

    res.json({ success: true, data: feedbacks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching feedback" });
  }
};

/* ================================
   📊 ADMIN ANALYTICS
================================ */
export const getAdminAnalytics = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admin only" });
    }

    const events = await Event.find({ createdBy: req.user.id });
    const eventIds = events.map(e => e._id);

    const stats = await Feedback.aggregate([
      { $match: { eventId: { $in: eventIds } } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          avg: { $avg: "$rating" },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        totalFeedbacks: stats[0]?.total || 0,
        averageRating: (stats[0]?.avg || 0).toFixed(2),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Analytics error" });
  }
};

/* ================================
   📊 EVENT ANALYTICS
================================ */
export const getEventAnalytics = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const stats = await Feedback.aggregate([
      { $match: { eventId: new mongoose.Types.ObjectId(req.params.eventId) } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          avg: { $avg: "$rating" },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        totalFeedbacks: stats[0]?.total || 0,
        averageRating: (stats[0]?.avg || 0).toFixed(2),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching analytics" });
  }
};