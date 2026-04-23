import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const optionalAuth = async (req, res, next) => {
  try {

    const token = req.cookies.jwt;
    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findById(decoded.userId).select("-password");

    if (user) {
      req.user = user;
    }

    next();
  } catch {
    next();
  }
};
