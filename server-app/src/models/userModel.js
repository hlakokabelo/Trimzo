import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
      lowercase: true,
    },

    name: {
      type: String,
      trim: true,
      maxlength: 80,
    },
  },
  { timestamps: true },
);

export const userModel = mongoose.model("User", userSchema);
