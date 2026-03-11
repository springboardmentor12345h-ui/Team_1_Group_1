import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    role: {
      type: String,
      enum: ["student", "college_admin", "super_admin"],
      default: "student",
    },
    college: {
      type: String,
      required: function () {
        return this.role === "college_admin";
      },
    },
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> fa7d4b60bc871122a25387589696ab1194809c05

    // ✅ Added phone field
    phone: {
      type: String,
      default: "",
    },

<<<<<<< HEAD
>>>>>>> 200716d (Implement profile management (update, password change, delete account) with phone support and userController separation)
=======
>>>>>>> fa7d4b60bc871122a25387589696ab1194809c05
    profileImage: {
      type: String,
      default: "",
    },
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 200716d (Implement profile management (update, password change, delete account) with phone support and userController separation)
=======

>>>>>>> fa7d4b60bc871122a25387589696ab1194809c05
    // 🔐 Approval system
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: function () {
        if (this.role === "student") return "approved";
        if (this.role === "college_admin") return "pending";
        return "approved";
      },
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;