import bcrypt from "bcrypt";
import User from "../../models/user.model.js";

const handleSellerRegister = async (req, res) => {
  const { name, username, email, phone, gender } = req.body;
  
  try {
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(400).send({ message: `Username ${username} exists` });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      if (existingEmail.role === "seller")
        return res.status(400).send({ message: `Email ${username} exists` });
      else {
        await User.findOneAndUpdate({ email }, { role: "seller" });

        return res
          .status(200)
          .send({ message: `Your status is now elevated to a seller` });
      }
    }

    const password = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name,
      username,
      email,
      phone,
      password,
      gender,
      role: "seller",
    });

    await newUser.save();
    
    await sendVerificationEmail(newUser._id, newUser.email);

    return res.status(201).send({ message: "User registered" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
};

export default handleSellerRegister;
