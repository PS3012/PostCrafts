import { Router } from "express";
import protectedRoute from "../middlewares/auth.js";
import { isSeller } from "../middlewares/isSeller.js";
import handleGetCoupon from "../controllers/coupon/get.coupon.js";
import handleCreateCoupon from "../controllers/coupon/create.coupon.js";
import handleApplyCoupon from "../controllers/coupon/apply.coupon.js";

const router = Router();

router.get("/", protectedRoute, handleGetCoupon);
router.post("/create", protectedRoute, isSeller, handleCreateCoupon);
router.post("/apply", protectedRoute, handleApplyCoupon);

export default router;
