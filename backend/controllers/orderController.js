import orderModel from "../models/orderModel.js";
import razorpay from "razorpay";
import { sendOrderSuccessEmail } from "../utils/sendOrderEmail.js";

/* ===========================
   GLOBALS
=========================== */
const currency = "inr";
const deliveryCharge = 0;

/* ===========================
   RAZORPAY INIT
=========================== */
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ===========================
   PLACE ORDER (RAZORPAY)
=========================== */

import productModel from "../models/productModel.js";

const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items in order",
      });
    }

    // ✅ RE-CALCULATE AMOUNT ON SERVER
    let serverAmount = 0;

    for (const item of items) {
      const product = await productModel.findById(item.productId);

      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Invalid product",
        });
      }

      serverAmount += product.price * item.quantity;
    }

    const newOrder = new orderModel({
      items,
      address,
      amount: serverAmount,
      paymentMethod: "Razorpay",
      payment: false,
    });

    await newOrder.save();

    const razorpayOrder = await razorpayInstance.orders.create({
      amount: serverAmount * 100,
      currency: "INR",
      receipt: newOrder._id.toString(),
    });

    res.json({ success: true, order: razorpayOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================
   VERIFY PAYMENT
=========================== */

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const order = await orderModel.findByIdAndUpdate(
        orderInfo.receipt,
        { payment: true },
        { new: true }
      );

      // ✅ SEND EMAIL (NON-BLOCKING)
      sendOrderSuccessEmail({
        email: order.address.email,
        orderId: order._id,
        amount: order.amount,
      }).catch((err) => console.log("Email failed:", err.message));

      return res.json({
        success: true,
        message: "Payment Successful",
      });
    }

    res.json({ success: false, message: "Payment Failed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================
   ADMIN: ALL ORDERS (OPTIMIZED)
=========================== */
const allOrders = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const orders = await orderModel
      .find({ payment: true }) // ✅ only paid
      .sort({ createdAt: 1 }) // ✅ latest first
      .skip(skip)
      .limit(limit);

    const totalOrders = await orderModel.countDocuments({
      payment: true,
    });

    res.json({
      success: true,
      orders,
      totalOrders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/* ===========================
   USER ORDERS (OPTIMIZED)
=========================== */
const userOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await orderModel
      .find({ userId, payment: true }) // ✅ hide failed payments
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/* ===========================
   UPDATE ORDER STATUS
=========================== */
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/* ===========================
   EXPORTS
=========================== */
export {
  placeOrderRazorpay,
  verifyRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
