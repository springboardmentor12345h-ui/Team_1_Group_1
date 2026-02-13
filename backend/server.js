import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();

// Connect database
connectDB();

// Security middlewares
app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).send("CampusEventHub API running");
});

// Routes
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
