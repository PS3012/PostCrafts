import { Router } from "express";
import { applyCoupon, createCoupon, getCoupon } from "../controllers/coupon.js";
import { protectRoute } from "../middleware/auth.js";
import { isSeller } from "../middleware/isSeller.js";

const couponRouter=Router();

couponRouter.get("/",protectRoute,getCoupon);
couponRouter.post("/create",protectRoute,isSeller,createCoupon);
couponRouter.post("/apply",protectRoute,applyCoupon);


export default couponRouter;