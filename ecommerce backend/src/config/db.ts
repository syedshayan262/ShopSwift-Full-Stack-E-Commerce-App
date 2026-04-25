import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI as string;
    await mongoose.connect(url);
    console.log("Database connected");
  } catch (err) {
    console.log("DB error:", err);
  }
};