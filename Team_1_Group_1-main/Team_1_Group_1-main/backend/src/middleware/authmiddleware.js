import jwt from "jsonwebtoken";
import User from "../models/User.js";
// 🔐 Verify Token
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.status !== "approved") {
      return res.status(403).json({
        message: "Account pending approval",
      });
    }

    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
// 🎭 Role Authorization
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};