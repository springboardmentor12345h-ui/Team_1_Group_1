import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },

  comments: {
    type: String,
    required: true,
    trim: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});


const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
