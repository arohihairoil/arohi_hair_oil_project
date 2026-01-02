import orderModel from "../models/orderModel.js";
import razorpay from "razorpay";
import { sendOrderSuccessEmail } from "../utils/sendOrderEmail.js";
import productModel from "../models/productModel.js";
import { createHmac } from "crypto";

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

// const placeOrderRazorpay = async (req, res) => {
//   try {
//     const { items, address } = req.body;

//     /* ---------------- VALIDATIONS ---------------- */
//     if (!items || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No items in order",
//       });
//     }

//     if (!address || !address.email || !address.phone) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid address details",
//       });
//     }

//     /* ---------------- RE-CALCULATE AMOUNT (SECURE) ---------------- */
//     let serverAmount = 0;

//     for (const item of items) {
//       const product = await productModel.findById(item.productId);

//       if (!product) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid product",
//         });
//       }

//       serverAmount += product.price * item.quantity;
//     }

//     /* ---------------- CREATE ORDER IN DB ---------------- */
//     const newOrder = await orderModel.create({
//       items,
//       address,
//       email: address.email, // ✅ store email separately
//       amount: serverAmount,
//       status: "Order Placed", // ✅ initial status
//       paymentMethod: "Razorpay",
//       payment: false,
//     });

//     /* ---------------- CREATE RAZORPAY ORDER ---------------- */
//     const razorpayOrder = await razorpayInstance.orders.create({
//       amount: serverAmount * 100, // paise
//       currency: "INR",
//       receipt: newOrder._id.toString(),
//     });

//     /* ---------------- SAVE RAZORPAY ORDER ID ---------------- */
//     newOrder.razorpayOrderId = razorpayOrder.id;
//     await newOrder.save();

//     /* ---------------- RESPONSE ---------------- */
//     res.json({
//       success: true,
//       order: razorpayOrder,
//       orderId: newOrder._id, // useful for retry
//     });
//   } catch (error) {
//     console.error("❌ placeOrderRazorpay error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Order creation failed",
//     });
//   }
// };
const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, address } = req.body;

    if (!items?.length) {
      return res.status(400).json({
        success: false,
        message: "No items in order",
      });
    }

    if (!address?.email || !address?.phone) {
      return res.status(400).json({
        success: false,
        message: "Invalid address details",
      });
    }

    // 🔐 Recalculate amount securely
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

    // ✅ Payment NOT done yet
    const newOrder = await orderModel.create({
      items,
      address,
      email: address.email,
      amount: serverAmount,
      status: "Payment Pending", // ✅ FIX 2
      paymentMethod: "Razorpay",
      payment: false,
    });

    const razorpayOrder = await razorpayInstance.orders.create({
      amount: serverAmount * 100,
      currency: "INR",
      receipt: newOrder._id.toString(),
    });

    newOrder.razorpayOrderId = razorpayOrder.id;
    await newOrder.save();

    res.json({
      success: true,
      order: razorpayOrder,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("❌ placeOrderRazorpay:", error);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
};
/* ===========================
   VERIFY PAYMENT
=========================== */

// const verifyRazorpay = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;

//     // 1️⃣ Validate
//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payment data",
//       });
//     }

//     // 2️⃣ VERIFY SIGNATURE (CRITICAL)
//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = createHmac(
//       "sha256",
//       process.env.RAZORPAY_KEY_SECRET
//     )
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Payment verification failed",
//       });
//     }

//     // 3️⃣ Fetch Razorpay order
//     const razorpayOrder = await razorpayInstance.orders.fetch(
//       razorpay_order_id
//     );

//     // 4️⃣ Update DB order (receipt = orderId)
//     const order = await orderModel.findByIdAndUpdate(
//       razorpayOrder.receipt,
//       {
//         payment: true,
//         status: "Order Placed",
//         razorpayPaymentId: razorpay_payment_id,
//       },
//       { new: true }
//     );

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     // 5️⃣ Send success email
//     sendOrderSuccessEmail({
//       email: order.address.email,
//       orderId: order._id,
//       amount: order.amount,
//       items: order.items,
//     }).catch((err) => console.log("Email failed:", err.message));

//     return res.json({
//       success: true,
//       message: "Payment verified successfully",
//       orderId: order._id,
//     });
//   } catch (error) {
//     console.error("Verify Razorpay Error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// const verifyRazorpay = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payment data",
//       });
//     }

//     // 🔐 Signature verification
//     const body = `${razorpay_order_id}|${razorpay_payment_id}`;
//     const expectedSignature = createHmac(
//       "sha256",
//       process.env.RAZORPAY_KEY_SECRET
//     )
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Payment verification failed",
//       });
//     }

//     const razorpayOrder = await razorpayInstance.orders.fetch(
//       razorpay_order_id
//     );

//     const order = await orderModel.findByIdAndUpdate(
//       razorpayOrder.receipt,
//       {
//         payment: true,
//         status: "Order Placed", // ✅ FIX 3
//         razorpayPaymentId: razorpay_payment_id,
//       },
//       { new: true }
//     );

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     // 📧 Success email
//     sendOrderSuccessEmail({
//       email: order.email,
//       orderId: order._id,
//       amount: order.amount,
//       items: order.items,
//     }).catch(console.error);

//     res.json({
//       success: true,
//       orderId: order._id, // 🔥 REQUIRED for success page
//     });
//   } catch (error) {
//     console.error("❌ verifyRazorpay:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment data",
      });
    }

    // ✅ Signature verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET
    )
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // ✅ Fetch Razorpay order
    const razorpayOrder = await razorpayInstance.orders.fetch(
      razorpay_order_id
    );

    // ✅ Update MongoDB order (receipt === orderId)
    const order = await orderModel.findByIdAndUpdate(
      razorpayOrder.receipt,
      {
        payment: true,
        status: "Order Placed",
        razorpayPaymentId: razorpay_payment_id,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ✅ SEND EMAIL (safe)
    sendOrderSuccessEmail({
      email: order.address.email,
      orderId: order._id,
      amount: order.amount,
      items: order.items,
    }).catch(() => {});

    // ✅ THIS IS THE MOST IMPORTANT PART
    return res.json({
      success: true,
      orderId: order._id.toString(), // 👈 MUST EXIST
    });
  } catch (error) {
    console.error("Verify Razorpay Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
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
// const updateStatus = async (req, res) => {
//   try {
//     const { orderId, status } = req.body;

//     const order = await orderModel.findById(orderId);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     order.status = status;
//     await order.save();

//     // ✅ SEND EMAIL BASED ON STATUS (NON-BLOCKING)
//     sendOrderStatusEmail({
//       email: order.email || order.address.email,
//       orderId: order._id,
//       status: order.status,
//       items: order.items,
//     }).catch((err) => console.log("Status email failed:", err.message));

//     res.json({
//       success: true,
//       message: "Order status updated",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    // 📧 Status update email
    sendOrderStatusEmail({
      email: order.email,
      orderId: order._id,
      status: order.status,
      items: order.items,
    }).catch(console.error);

    res.json({
      success: true,
      message: "Order status updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
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
