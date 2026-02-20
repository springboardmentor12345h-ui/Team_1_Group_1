import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*
========================================
📝 REGISTER USER
========================================
*/
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, college } = req.body;

    // 1️⃣ Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }

    // 2️⃣ Prevent manual super_admin registration
    if (role === "super_admin") {
      return res.status(403).json({
        message: "Super Admin cannot be registered manually",
      });
    }

    // 3️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const allowedRoles = ["student", "college_admin"];
    const selectedRole = allowedRoles.includes(role) ? role : "student";

    // ✅ ADD THIS HERE
if (selectedRole === "college_admin" && !college) {
  return res.status(400).json({
    message: "College is required for admin registration",
  });
}

    const user = await User.create({
      name,
      email,
      password,
      role: selectedRole,
      college,
    });

    res.status(201).json({
      message:
        user.role === "college_admin"
          ? "Admin registered. Waiting for Super Admin approval."
          : "Registration successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error during registration",
    });
  }
};

/*
========================================
🔐 LOGIN USER
========================================
*/
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    // 2️⃣ Find user (include password)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // 4️⃣ Check approval
    if (user.status !== "approved") {
      return res.status(403).json({
        message: "Account pending approval by Super Admin",
      });
    }

    // 5️⃣ Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error during login",
    });
  }
};

/*
========================================
👤 GET LOGGED-IN USER
========================================
*/
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};

/*
========================================
🛡 SUPER ADMIN APPROVES COLLEGE ADMIN
========================================
*/
export const approveCollegeAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await User.findById(id);

    if (!admin) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (admin.role !== "college_admin") {
      return res.status(400).json({
        message: "Not a college admin",
      });
    }
    if (admin.status === "approved") {
  return res.status(400).json({
    message: "Admin already approved",
  });
}


    admin.status = "approved";
    await admin.save();

    res.status(200).json({
      message: "College Admin approved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Approval failed",
    });
  }
};
/*
========================================
📋 GET PENDING COLLEGE ADMINS
========================================
*/
export const getPendingAdmins = async (req, res) => {
  try {
    const admins = await User.find({
      role: "college_admin",
      status: "pending",
    }).select("-password");

    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch pending admins",
    });
  }
};
