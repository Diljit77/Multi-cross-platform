import express from "express";
import {
  createContact,
  createFundAccount,
  createPayout,
} from "../controller/payoutcontroller.js";
import { transfertopartner } from "../controller/pickuppartner.js";

const router = express.Router();

router.post("/create-contact", createContact);
router.post("/create-fund-account", createFundAccount);
router.post("/create-payout", createPayout);
// POST /payout/:partnerId
router.post("/:partnerId",transfertopartner);


export default router;
