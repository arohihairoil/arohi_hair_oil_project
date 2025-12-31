
// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import razorpay from 'razorpay'

// // global variables
// const currency = 'inr';
// const deliveryCharge = 0;


// // Razorpay initialize
// const razorpayInstance = new razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// })

// /* ===========================
//    RAZORPAY ORDER (ACTIVE)
// =========================== */
// // const placeOrderRazorpay = async (req, res) => {
// //     try {
// //          const userId = req.userId; // ✅ FIX

// //         const { items, amount, address } = req.body

// //         const orderData = {
// //             userId,
// //             items,
// //             address,
// //             amount,
// //             paymentMethod: "Razorpay",
// //             payment: false,
// //         }

// //         const newOrder = new orderModel(orderData)
// //         await newOrder.save()

// //         const options = {
// //             amount: amount * 100,
// //             currency: currency.toUpperCase(),
// //             receipt: newOrder._id.toString()
// //         }

// //         razorpayInstance.orders.create(options, (error, order) => {
// //             if (error) {
// //                 console.log(error)
// //                 return res.json({ success: false, message: error })
// //             }
// //             res.json({ success: true, order })
// //         })

// //     } catch (error) {
// //         console.log(error)
// //         res.json({ success: false, message: error.message })
// //     }
// // }

// const placeOrderRazorpay = async (req, res) => {
//   try {
//     const userId = req.userId;

//     const { items, amount, address } = req.body;

//     if (!items || items.length === 0) {
//       return res.json({ success: false, message: "No items in order" });
//     }

//     // ✅ Items already contain name, image, price (from frontend)
//     const orderData = {
//       userId,
//       items,
//       address,
//       amount,
//       paymentMethod: "Razorpay",
//       payment: false,
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     const options = {
//       amount: amount * 100, // Razorpay needs paise
//       currency: "INR",
//       receipt: newOrder._id.toString(),
//     };

//     razorpayInstance.orders.create(options, (error, order) => {
//       if (error) {
//         console.log(error);
//         return res.json({ success: false, message: "Razorpay order failed" });
//       }

//       res.json({ success: true, order });
//     });

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };


// const verifyRazorpay = async (req, res) => {
//     try {
//             const userId = req.userId; // ✅ FIX

//         const {  razorpay_order_id } = req.body

//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

//         if (orderInfo.status === 'paid') {
//             await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
//             await userModel.findByIdAndUpdate(userId, { cartData: {} })
//             res.json({ success: true, message: "Payment Successful" })
//         } else {
//             res.json({ success: false, message: 'Payment Failed' })
//         }

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// /* ===========================
//    ADMIN & USER ORDERS
// =========================== */
// const allOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({})
//         res.json({ success: true, orders })
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// const userOrders = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const orders = await orderModel.find({ userId }).populate('items.productId'); 
//         res.json({ success: true, orders })
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// const updateStatus = async (req, res) => {
//     try {
//         const { orderId, status } = req.body
//         await orderModel.findByIdAndUpdate(orderId, { status })
//         res.json({ success: true, message: 'Status Updated' })
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// /* ===========================
//    EXPORTS (RAZORPAY ONLY)
// =========================== */
// export {
//     placeOrderRazorpay,
//     verifyRazorpay,
//     allOrders,
//     userOrders,
//     updateStatus
// }
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";

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
const placeOrderRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "No items in order" });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({
          success: false,
          message: "Razorpay order creation failed",
        });
      }

      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/* ===========================
   VERIFY PAYMENT
=========================== */
const verifyRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(
      razorpay_order_id
    );

    if (orderInfo.status === "paid") {
      // ✅ Update only once
      await orderModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });

      // ✅ Clear user cart safely
      await userModel.findByIdAndUpdate(userId, {
        cartData: {},
      });

      return res.json({
        success: true,
        message: "Payment Successful",
      });
    }

    res.json({ success: false, message: "Payment Failed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
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
      .find({ payment: true })          // ✅ only paid
      .sort({ createdAt: 1 })          // ✅ latest first
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
      .find({ userId, payment: true })   // ✅ hide failed payments
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
