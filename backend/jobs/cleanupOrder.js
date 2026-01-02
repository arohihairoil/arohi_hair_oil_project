import cron from "node-cron";
import orderModel from "../models/orderModel.js";

export const cleanupUnpaidOrders = () => {
  // 🕛 Runs every day at 12:00 AM (midnight)
  cron.schedule("0 0 * * *", async () => {
    try {
      // ⏳ 48 hours ago
      const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);

      const result = await orderModel.deleteMany({
        payment: false,
        createdAt: { $lt: cutoff },
      });

      console.log(
        `🧹 Cleaned ${result.deletedCount} unpaid orders older than 48 hours`
      );
    } catch (error) {
      console.error("❌ Error cleaning unpaid orders:", error.message);
    }
  });
};
