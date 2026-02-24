import express from "express";
import { createEvent } from "../controllers/EventController.js";
import { verifyToken, authorizeRoles } from "../middleware/authmiddleware.js";

const router = express.Router();

// POST /api/events
router.post("/", verifyToken, authorizeRoles("college_admin"), createEvent);

export default router;