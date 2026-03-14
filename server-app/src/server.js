import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";
import urlRoutes from "./routes/urlRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import { logger } from "./config/logger.js";

dotenv.config();
connectDB();
const app = express();

//middleware
app.use(express.json()); 
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
//logger middleware
import { requestLogger } from "./middleware/requestLogger.js";
app.use(requestLogger);

const PORT = process.env.PORT || 5001;

app.post("/", (req, res) => {
  return res.send(req.body);
});

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
