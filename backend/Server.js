import authRoutes from "./routes/authRoutes.js";
import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import connectDB from './config/db.js';
import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import adminLogRoutes from "./routes/adminLogRoutes.js";


configDotenv();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin-logs", adminLogRoutes);



app.listen(5000, () => {
  console.log("Event Hub backend running on port 5000");
});

