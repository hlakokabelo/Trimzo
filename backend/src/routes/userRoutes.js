import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getMe, updateProfile } from "../controllers/userController.js";
import { optionalAuth } from "../middleware/optionalAuth.js";

const router = express.Router();

router.patch("/me", protectRoute, updateProfile);
router.post("/me", optionalAuth, getMe);

export default router;