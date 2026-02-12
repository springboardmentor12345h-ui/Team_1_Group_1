import jwt from "jsonwebtoken";

/* ===============================
   VERIFY TOKEN MIDDLEWARE
================================= */
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if header exists
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Must start with Bearer
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid authorization format" });
    }

    const tokenParts = authHeader.split(" ");

    if (tokenParts.length !== 2) {
      return res.status(401).json({ message: "Malformed token" });
    }

    const token = tokenParts[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (error) {

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};


/* ===============================
   ROLE BASED MIDDLEWARE
================================= */

// College Admin only
export const collegeAdminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== "college_admin") {
    return res.status(403).json({ message: "College Admin access only" });
  }

  next();
};


// Super Admin only
export const superAdminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== "super_admin") {
    return res.status(403).json({ message: "Super Admin access only" });
  }

  next();
};


// Student only
export const studentOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Student access only" });
  }

  next();
};