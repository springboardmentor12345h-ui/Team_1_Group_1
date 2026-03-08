import express from "express";
import { verifyToken } from "../middleware/authmiddleware.js";
import {
  sseConnect,
  getNotifications,
  markAsRead,
  markAllRead,
  deleteNotification,
  vapidPublicKey,
  savePushSubscription,
} from "../controllers/notificationController.js";

const router = express.Router();

/*
========================================
🔔 NOTIFICATION ROUTES
Base: /api/notifications
========================================
*/

// SSE connection — frontend connects here for real-time updates
router.get("/sse", verifyToken, sseConnect);

// Get VAPID public key (for browser push setup) — no auth needed
router.get("/vapid-public-key", vapidPublicKey);

// Get all notifications + unread count
router.get("/", verifyToken, getNotifications);

// Mark all notifications as read
router.put("/read-all", verifyToken, markAllRead);

// Mark single notification as read
router.put("/:id/read", verifyToken, markAsRead);

// Delete a notification
router.delete("/:id", verifyToken, deleteNotification);

// Save browser push subscription
router.post("/subscribe", verifyToken, savePushSubscription);

export default router;
