import authRoutes from "./routes/authRoutes.js";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import connectDB from './config/db.js';
import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import adminLogRoutes from "./routes/adminLogRoutes.js";


dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

// Global rate limiter: 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiter for auth routes: 20 requests per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(globalLimiter);

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin-logs", adminLogRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Event Hub backend running on port ${PORT}`);
});

