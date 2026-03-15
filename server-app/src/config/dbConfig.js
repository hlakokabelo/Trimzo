import mongoose from "mongoose";
import { logger } from "./logger.js";
const connectDB = async () => {
  try {
    logger.info("Connecting to MongoDB...");
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    logger.info({
      msg: `MongoDB Connected: ${connect.connection.host}`,
      hostname: connect.connection.name,
    });
  } catch (error) {
    logger.error(`MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
