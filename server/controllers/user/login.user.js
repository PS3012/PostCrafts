import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {} from "dotenv/config.js";
import User from "../../models/user.model.js";

const handleUserLogin = async (req, res) => {
  const { username, password } = request.body;
  
  try {
    const user = await User.findOne({ username });

    if (!user)
      return response.status(401).send({ message: "Incorrect credentials" });

    if (!user.isEmailVerified)
      return response
        .status(403)
        .send({ message: "Please verify your email before logging in" });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return response.status(401).send({ message: "Incorrect credentials" });
    
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    
    response.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const loggedInUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
    };
    
    response.send(loggedInUser);
  } catch (error) {
    return response.status(500).send({ message: error });
  }
};

export default handleUserLogin;
