// import express from 'express'
// import { placeOrderRazorpay, verifyRazorpay, allOrders, userOrders, updateStatus} from '../controllers/orderController.js';
// import adminAuth  from '../middleware/adminAuth.js'
// // import authUser from '../middleware/auth.js'

// const orderRouter = express.Router()

// // Admin Features
// orderRouter.post('/list',adminAuth,allOrders)
// orderRouter.post('/status',adminAuth,updateStatus)

// orderRouter.post('/razorpay',placeOrderRazorpay) //('/razorpay',authUser,placeOrderRazorpay)

// // User Feature
// orderRouter.post('/userorders',userOrders)// userOrder

// // verify payment
// orderRouter.post('/verifyRazorpay', verifyRazorpay) //('/verifyRazorpay',authUser, verifyRazorpay)

// export default orderRouter
// import express from "express";
// import {
//   placeOrderRazorpay,
//   verifyRazorpay,
//   allOrders,
//   userOrders,
//   updateStatus,
// } from "../controllers/orderController.js";
// import adminAuth from "../middleware/adminAuth.js";
// import authUser from "../middleware/auth.js";

// const orderRouter = express.Router();

// // Admin
// orderRouter.post("/list", adminAuth, allOrders);
// orderRouter.post("/status", adminAuth, updateStatus);

// // ✅ GUEST ORDER (NO LOGIN)
// orderRouter.post("/razorpay", placeOrderRazorpay);
// orderRouter.post("/verifyRazorpay", verifyRazorpay);

// // User-only (optional, safe)
// orderRouter.post("/userorders", authUser, userOrders);

// export default orderRouter;

// import express from "express";
// import {
//   placeOrderRazorpay,
//   verifyRazorpay,
//   allOrders,
//   updateStatus,
// } from "../controllers/orderController.js";
// import adminAuth from "../middleware/adminAuth.js";
// import rateLimit from "express-rate-limit";

// const orderLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 50,
// });

// // const orderRouter = express.Router();
// const orderRouter = orderLimiter;

// // Admin
// orderRouter.post("/list", adminAuth, allOrders);
// orderRouter.post("/status", adminAuth, updateStatus);

// // Guest checkout
// orderRouter.post("/razorpay", placeOrderRazorpay);
// orderRouter.post("/verifyRazorpay", verifyRazorpay);

// export default orderRouter;

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
