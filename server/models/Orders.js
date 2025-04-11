import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    // 🔄 New: Store pickup coordinates of this order
    pickupLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        default: [0, 0],
      },
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PickupPartner",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Index for geolocation query
orderSchema.index({ pickupLocation: "2dsphere" });

const Order = mongoose.model("Order", orderSchema);
export default Order;
