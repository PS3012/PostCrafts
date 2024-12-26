import express from "express";
import protectedRoute from "../utils/auth.js";
import handleVerifyToken from "../controllers/auth/verifyToken.js";

const router = express.Router();

router.post("/verifyToken", handleVerifyToken);

router.get("/validate-token", protectedRoute, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
