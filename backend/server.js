import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./src/config/db.js";

import {
   verifyToken,
   collegeAdminOnly,
   superAdminOnly,
   studentOnly
} from "./src/middleware/authMiddleware.js";

const app = express();

/* ===============================
   CONNECT DATABASE
================================ */
connectDB();

/* ===============================
   SECURITY MIDDLEWARE
================================ */
app.use(helmet());

app.use(cors({
   origin: "http://localhost:3000",
   credentials: true,
}));

app.use(express.json());

/* ===============================
   TEST ROUTE
================================ */
app.get("/", (req, res) => {
   res.send("CampusEventHub API running");
});

/* ===============================
   PROTECTED ROUTES
================================ */

// College Admin Route
app.get("/admin", verifyToken, collegeAdminOnly, (req, res) => {
   res.json({ message: "Welcome College Admin" });
});

// Super Admin Route
app.get("/superadmin", verifyToken, superAdminOnly, (req, res) => {
   res.json({ message: "Welcome Super Admin" });
});

// Student Route
app.get("/student", verifyToken, studentOnly, (req, res) => {
   res.json({ message: "Welcome Student" });
});

/* ===============================
   START SERVER
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});