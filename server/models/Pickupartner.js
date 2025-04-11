import mongoose from "mongoose";
import fetch from "node-fetch";

const pickupPartnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    earningsPerOrder: {
      type: Number,
      default: 0,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
    wallet: {
      type: Number,
      default: 0
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

// 🔍 Required for geospatial queries like $near
pickupPartnerSchema.index({ location: "2dsphere" });

// 🧠 Pre-save hook to geocode the address into coordinates
pickupPartnerSchema.pre("save", async function (next) {
  if (!this.isModified("address")) return next();

  try {
    const apiKey = process.env.GEOCODE_API_KEY;
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        this.address
      )}&key=${apiKey}`
    );
    const data = await res.json();

    if (data && data.results && data.results[0]?.geometry) {
      const { lat, lng } = data.results[0].geometry;
      this.location.coordinates = [lng, lat];
    }

    next();
  } catch (err) {
    console.error("Geocoding failed:", err.message);
    next(); // still save, but with default coords
  }
});

const PickupPartner = mongoose.model("PickupPartner", pickupPartnerSchema);
export default PickupPartner;

