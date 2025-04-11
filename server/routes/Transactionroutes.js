import express from "express";
import {
  getWalletSummary,
  addMoney,
  transferToPartner,
} from "../controller/Transactioncontroller.js";
import authMiddleware from "../middleware/Authmiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/summary", getWalletSummary);      // 📊 Get balance and transaction history
router.post("/add", addMoney);                 // 💰 Add money
router.post("/transfer", transferToPartner);   // 🔁 Transfer to partner

export default router;
