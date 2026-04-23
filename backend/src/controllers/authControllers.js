import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { encryptPassword } from "../utils/encryptPassword.js";
import { validateSignUp } from "../utils/validateSignUp.js";
import { cleanEmail } from "../utils/cleanEmail.js";
/**
 * signs jwt and sets cookie
 * @param {*} user_id
 * @param {*} res
 */
const setCookie = (user_id, res) => {
  const token = jwt.sign({ userId: user_id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none", // important for cross-site cookies
    secure: true, // must be true when sameSite is none
  });
};

const signup = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    validateSignUp(res, { password, username, email });

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
    const encryptedPassword = await encryptPassword(password);

    /*create user
     */

    const name = cleanEmail(email);
    const payload = {
      email,
      name,
      password: encryptedPassword,
      username,
    };
    const newUser = await userModel.create({ ...payload });

    // removing hashed password from user we returning
    const { password: _, ...user_ } = newUser._doc;

    setCookie(newUser._id, res);

    res.status(200).json({ success: true, user: user_ });
  } catch (error) {
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

    // removing hashed password from user we returning

    const { password: _, ...user_ } = user._doc;

    setCookie(user._id, res);

    res.status(200).json({ success: true, user: user_ });
  } catch (error) {
    res.status(500).json({ message: "Interal Server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout success" });
};

export { login, logout, signup };
