import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js"; // 👈 must include .js extension in ESM
import AuthRoute from "./routes/authroutes.js";
import pickupPartnerRoutes from "./routes/pickuppartnerroutes.js";
import orderRoutes from "./routes/ordersroutes.js";
import walletRoutes from "./routes/Transactionroutes.js";
import notificationRoutes from "./routes/Notificationroutes.js";
import PayoutRoute from "./routes/payroutes.js"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// Test route
app.use("/api/auth",AuthRoute);
app.use("/api/partners", pickupPartnerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/notification",notificationRoutes);
app.use("/api/payout", PayoutRoute);

// Connect DB and start server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
