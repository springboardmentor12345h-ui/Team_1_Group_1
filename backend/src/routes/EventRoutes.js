import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/EventController.js";

import { verifyToken, authorizeRoles } from "../middleware/authmiddleware.js";
import { upload } from "../middleware/upload.js"; // 🔥 import upload middleware

const router = express.Router();

/* ===============================
   CREATE EVENT (College Admin Only)
================================= */
router.post(
  "/",
  verifyToken,
  authorizeRoles("college_admin"),
  upload.single("image"),   // 🔥 handle single image upload
  createEvent
);

/* ===============================
   GET EVENTS (Public)
================================= */
router.get("/", getAllEvents);
router.get("/:id", getEventById);

/* ===============================
   UPDATE EVENT (Owner Only)
================================= */
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("college_admin"),
  upload.single("image"),   // 🔥 allow image update
  updateEvent
);

/* ===============================
   DELETE EVENT (Owner Only)
================================= */
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("college_admin"),
  deleteEvent
);

export default router;