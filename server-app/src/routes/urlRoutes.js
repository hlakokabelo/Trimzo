import express from "express";
import {
  createUrl,
  deleteUrl,
  getMyUrls,
  getUrl,
  saveUrls,
  updateUrlAlias,
} from "../controllers/urlController.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { optionalAuth } from "../middleware/optionalAuth.js";

const router = express.Router();

router.get("/shortenUrl/:id", getUrl);

/* anyone can shorten */
router.post("/shortenUrl", optionalAuth, createUrl);

/* logged-in user URLs */
router.delete("/urls/:id", protectRoute, deleteUrl);
router.get("/urls/me", protectRoute, getMyUrls);
router.patch("/urls/saveUrls", protectRoute, saveUrls);
router.patch("/urls/alias", protectRoute, updateUrlAlias);

export default router;

