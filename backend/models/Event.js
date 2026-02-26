import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    // ===== Document-required fields =====
    college_id: {
      type: String,
      required: [true, "College ID is required"],
      trim: true,
    },

    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },

    category: {
      type: String,
      required: [true, "Event category is required"],
      enum: ["sports", "hackathon", "cultural", "workshop", "other"],
    },

    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },

    start_date: {
      type: Date,
      required: [true, "Start date is required"],
    },

    end_date: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: function (value) {
          return value >= this.start_date;
        },
        message: "End date must be after start date",
      },
    },

    created_at: {
      type: Date,
      default: Date.now,
    },

    // ===== Internal system field (NOT in document, but REQUIRED for RBAC) =====
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    // keeps automatic updatedAt for audit trail
    timestamps: true,
  }
);


// ===== Indexes for performance =====
eventSchema.index({ title: "text", description: "text", category: 1 });
eventSchema.index({ start_date: 1 });


const Event = mongoose.model("Event", eventSchema);

export default Event;
