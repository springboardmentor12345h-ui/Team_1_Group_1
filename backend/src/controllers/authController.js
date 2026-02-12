import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


/* ===============================
   GENERATE JWT TOKEN
================================= */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


/* ===============================
   REGISTER USER
   POST /api/auth/register
================================= */
export const registerUser = async (req, res) => {
  try {
const { name, email, password, college } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let hashedPassword = password;

    // If model DOESN’T hash automatically → hash here
    if (!User.schema.methods.comparePassword) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const user = await User.create({
  name,
  email,
  password: hashedPassword,
  college,
  role: "student", // 🔒 force student role
});


    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        college: user.college,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


/* ===============================
   LOGIN USER
   POST /api/auth/login
================================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Include password even if select:false exists
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let isMatch = false;

    // If secure model → use comparePassword()
    if (user.comparePassword) {
      isMatch = await user.comparePassword(password);
    } else {
      // fallback for basic model
      isMatch = await bcrypt.compare(password, user.password);
    }

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        college: user.college,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


/* ===============================
   GET CURRENT USER
   GET /api/auth/me
   (Protected route)
================================= */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        college: user.college,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
