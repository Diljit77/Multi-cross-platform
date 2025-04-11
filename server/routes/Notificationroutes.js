import express from "express";
import {
  getNotifications,
  markAsRead,
  createNotification,
} from "../controller/Notificationcontroller.js";
import authMiddleware from "../middleware/Authmiddleware.js";

const router = express.Router();
// router.use(authMiddleware);
router.use(authMiddleware);
router.get("/", getNotifications);             // 🔔 Get all notifications
router.put("/:id/read", markAsRead);           // ✅ Mark as read
router.post("/", createNotification);          // ➕ (optional) Create new notification

export default router;
