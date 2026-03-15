import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";

import cookieParser from "cookie-parser";
import { logger } from "./config/logger.js";



import urlRoutes from "./routes/urlRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();
await connectDB();
const app = express();

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
//logger middleware
import { requestLogger } from "./middleware/requestLogger.js";
app.use(requestLogger);

const PORT = process.env.PORT || 5001;

// Routes
app.use("/api/users", userRoutes);
app.use("/api/", urlRoutes);
app.use("/api/auth/", authRoutes);

//Error handling middleware
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
