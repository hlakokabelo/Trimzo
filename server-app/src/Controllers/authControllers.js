import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const validateUserName = () => {};

const signup = async (req, res) => {
  const { email, password, username } = req.body;
  console.log({ email, password, username });
  try {
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: `Password must be at least 6 characters` });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const emailTaken = await userModel.findOne({ email });
    if (emailTaken) {
      return res
        .status(400)
        .json({ message: "Email already exists, use different one" });
    }

    const userNameTaken = await userModel.findOne({ username });
    if (userNameTaken) {
      return res
        .status(400)
        .json({ message: "Username already exists, use different one" });
    }

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    /*create user
     */

    const name = email.split("@")[0];
    const payload = {
      email,
      name,
      password: encryptedPassword,
      username,
    };
    const newUser = await userModel.create({ ...payload });

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true, //prevent xss attack,
      sameSute: "strict", //prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    // removing hashed password from user we returning
    const { password: _, ...user_ } = newUser._doc;

    res.status(200).json({ success: true, user: user_ });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Interal Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Invalid email or password" });

    //verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid email or password" });

    //sign token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true, //prevent xss attack,
      sameSute: "strict", //prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    // removing hashed password from user we returning

    const { password: _, ...user_ } = user._doc;

    res.status(200).json({ success: true, user: user_ });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Interal Server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout success" });
};

export { login, logout, signup };
