import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {} from "dotenv/config.js";
import { emailRegex } from "../../utils/constants.js";
import User from "../../models/user.model.js";
import { sendVerificationEmail } from "../../utils/verification.js";

const handleUserRegister = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(422).json({
      error: true,
      message: "Invalid Data. All fields are required.",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(422).json({
      error: true,
      message: "Invalid e-mail id.",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: true,
        message: "User already exists with this email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "BUYER",
    });
    await sendVerificationEmail(newUser._id, newUser.email);
    await newUser.save();

    return res.status(201).json({
      error: false,
      message:
        "User registered successfully. We've sent a verification link to your email address. Please check your inbox (and spam folder, just in case) to verify your email.",
      data: { name: newUser.name, email: newUser.email, role: newUser.role },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }
};

export default handleUserRegister;
