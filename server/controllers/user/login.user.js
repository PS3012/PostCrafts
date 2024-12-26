import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {} from "dotenv/config.js";
import { emailRegex } from "../../utils/constants.js";
import User from "../../models/user.model.js";

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
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
    if (!existingUser) {
      return res.status(409).json({
        error: true,
        message: `User with ${email} not exits.`,
      });
    }

    if (!existingUser.isEmailVerified) {
      return res.status(403).json({
        error: true,
        message: "Please verify your email before logging in",
      });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: true,
        message: "Incorrect credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      error: false,
      message: "User login successfully.",
      data: { name: existingUser.name, email, role: existingUser.role },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }
};

export default handleUserLogin;
