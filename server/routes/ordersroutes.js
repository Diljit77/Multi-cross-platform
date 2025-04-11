import express from "express";
import {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  autoAssignPartner,
} from "../controller/ordercontroller.js";
import authMiddleware from "../middleware/Authmiddleware.js";

const router = express.Router();

router.use(authMiddleware);
// 👇 Main Routes
router.post("/", createOrder);         // Create order
router.get("/", getAllOrders);         // Get all orders
router.put("/:id", updateOrder);       // Update order (status/assign)
router.delete("/:id", deleteOrder);    // Delete order

// 👇 Optional: Auto-assign to nearest partner
router.post("/auto-assign", autoAssignPartner);

export default router;
