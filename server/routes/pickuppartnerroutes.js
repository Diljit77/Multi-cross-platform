import express from "express";
import {
  createPartner,
  getAllPartners,
  updatePartner,
  deletePartner,
  setupPartner,
} from "../controller/pickuppartner.js";
import authMiddleware from "../middleware/Authmiddleware.js";
const router = express.Router();

router.use(authMiddleware);
router.post("/", createPartner);         // ➕ Add new partner
router.get("/", getAllPartners);         // 📋 List all partners
router.put("/:id", updatePartner);       // ✏️ Update a partner
router.delete("/:id", deletePartner);
router.post("/setup",setupPartner);    // ❌ Delete a partner

export default router;
