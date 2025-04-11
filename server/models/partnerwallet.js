import mongoose from "mongoose";

const partnerTransactionSchema = new mongoose.Schema({
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PickupPartner",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    default: "wallet", // e.g., Razorpay, wallet, etc.
  },
  status: {
    type: String,
    default: "completed", // 'completed', 'pending', 'failed'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PartnerTransaction = mongoose.model("PartnerTransaction", partnerTransactionSchema);
export default PartnerTransaction;

