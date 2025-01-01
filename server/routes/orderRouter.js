import express from "express";
import { createOrder } from "../controllers/order.js";
import { protectRoute } from "../middleware/auth.js";


const orderRouter = express.Router();

orderRouter.post("/create", protectRoute, createOrder);

export default orderRouter;