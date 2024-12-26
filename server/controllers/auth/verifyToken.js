import jwt from "jsonwebtoken";
import {} from "dotenv/config.js";
import User from "../../models/user.model.js";

const handleVerifyToken = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOneAndUpdate(
      { _id: decoded.userId },
      { isEmailVerified: true }
    );

    if (!user) return res.status(404).send({ message: "User not found" });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error", error });
  }
};

export default handleVerifyToken;
