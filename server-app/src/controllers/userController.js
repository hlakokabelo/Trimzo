import { userModel } from "../models/userModel.js";
import { encryptPassword } from "../utils/encryptPassword.js";

export const updateProfile = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username && username !== user.username) {
      const existing = await userModel.findOne({ username });

      if (existing) {
        return res.status(400).json({ message: "Username already taken" });
      }

      user.username = username;
    }

    if (email && email !== user.email) {
      const existing = await userModel.findOne({ email });

      if (existing) {
        return res.status(400).json({ message: "Email already in use" });
      }

      user.email = email;
    }

    if (name) user.name = name;

    if (password && password !== "") {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: `Password must be at least 6 characters` });
      }
      user.password = encryptPassword(password);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    if (!req.user) return res.status(200).json({ user });
    const user = await userModel.findById(req.user._id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
