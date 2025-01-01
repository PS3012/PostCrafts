import { Router } from "express";
import protectedRoute from "../middlewares/auth.js";
import handleCreateOrder from "../controllers/order/create.order.js";

const router = Router();

router.post("/create", protectedRoute, handleCreateOrder)

export default router;
