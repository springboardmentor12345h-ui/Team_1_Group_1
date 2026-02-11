const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "college_admin", "super_admin"],
      default: "student",
    },
    collegeName: {
      type: String,
      required: function () {
        return this.role === "college_admin";
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);