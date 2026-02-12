import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./src/config/db.js";
import { verifyToken, adminOnly, studentOnly } 
from "./src/middleware/authMiddleware.js";

const app = express();

// connect database
connectDB();

// security middleware
app.use(helmet());
app.use(cors({
   origin: "http://localhost:3000",
   credentials: true,
}));

app.use(express.json());

// test route
app.get("/", (req, res) => {
   res.send("CampusEventHub API running");
});

// protected routes example
app.get("/admin", verifyToken, adminOnly, (req, res) => {
   res.json({ message: "Welcome Admin" });
});

app.get("/student", verifyToken, studentOnly, (req, res) => {
   res.json({ message: "Welcome Student" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});