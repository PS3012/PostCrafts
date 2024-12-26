import mongoose from "mongoose";
import {} from "dotenv/config.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Error connecting to database", err);
  }
};

export default connectToDB;
