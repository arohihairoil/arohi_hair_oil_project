import express from "express";
import rateLimit from "express-rate-limit";
import {
  placeOrderRazorpay,
  verifyRazorpay,
  allOrders,
  updateStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

/* =========================
   RATE LIMIT (ANTI-SPAM)
========================= */
const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 requests per IP
});

orderRouter.use(orderLimiter);

/* =========================
   ADMIN ROUTES
========================= */
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

/* =========================
   GUEST CHECKOUT (NO LOGIN)
========================= */
orderRouter.post("/razorpay", placeOrderRazorpay);
orderRouter.post("/verifyRazorpay", verifyRazorpay);

export default orderRouter;
