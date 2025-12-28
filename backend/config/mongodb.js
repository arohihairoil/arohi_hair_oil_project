import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.once("connected", () => {
      console.log("DB Connected");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
  } catch (error) {
    console.error("DB Connection Error:", error.message);
    process.exit(1); // optional: stop the app if DB fails
  }
};

export default connectDB;
