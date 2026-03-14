import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { updateProfile } from "../controllers/userController.js";

const router = express.Router();

router.patch("/me", protectRoute, updateProfile);

export default router;