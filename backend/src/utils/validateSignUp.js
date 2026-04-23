import { validatePassword, validateUsername } from "./validation.js";

export const validateSignUp = (res, { password, username, email }) => {
  let validate = validatePassword(password);
  if (password && !validate.isValid) {
    return res.status(400).json({ message: validate.message });
  }

  validate = validateUsername(username);
  if (username && !validate.isValid) {
    return res.status(400).json({ message: validate.message });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
};
