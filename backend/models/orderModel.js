

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    amount: {
      type: Number,
      required: true,
    },

    address: {
      type: Object,
      required: true,
    },

    status: {
      type: String,
      default: 'Order Placed',
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    payment: {
      type: Boolean,
      default: false,
    },

    // ✅ ADD THIS (for frontend compatibility)
    date: {
      type: Number,
      default: Date.now,
    },
  },
  {
    timestamps: true, // still keeps createdAt & updatedAt
  }
);

const orderModel =
  mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
