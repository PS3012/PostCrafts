import bcrypt from "bcrypt";
import {} from "dotenv/config.js";
import { emailRegex } from "../../utils/constants.js";
import User from "../../models/user.model.js";
import { sendVerificationEmail } from "../../middlewares/verification.js";

const handleUserRegister = async (req, res) => {
  const { name, email, phone, gender, password, username } = req.body;
  
  if (!emailRegex.test(email)) {
    return res.status(422).json({
      error: true,
      message: "Invalid e-mail id.",
    });
  }

  try {
    const existingUsername = await User.findOne({ username });

    if (existingUsername)
      return res.status(400).send({ message: `Username ${username} exists` });

    const existingEmail = await User.findOne({ email });

    if (existingEmail)
      return res.status(400).send({ message: `Email ${username} exists` });

    const password = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name,
      username,
      email,
      phone,
      password,
      gender,
    });

    await newUser.save();

    await sendVerificationEmail(newUser._id, newUser.email);

    return res.status(201).send({
      message:
        "User registered successfully. We've sent a verification link to your email address. Please check your inbox (and spam folder, just in case) to verify your email.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
};

export default handleUserRegister;
