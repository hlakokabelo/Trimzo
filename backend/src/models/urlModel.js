import mongoose from "mongoose";
import { nanoid } from "nanoid";

const shortUrlSchema = new mongoose.Schema(
  {
    fullUrl: {
      type: String,
      required: true,
    },

    shortId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(6),
    },

    clicks: {
      type: Number,
      default: 0,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

export const urlModel = mongoose.model("ShortUrl", shortUrlSchema);
