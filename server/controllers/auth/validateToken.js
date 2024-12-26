import jwt from "jsonwebtoken";
import {} from "dotenv/config.js";

const handleValidateToken = (req, res) => {
  const token = req.cookies.authToken;

  if (!token)
    return res
      .status(401)
      .send({ message: "No token found. Cannot Authorize" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).send({ message: "User is authenticated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error", error });
  }
};

export default handleValidateToken;
