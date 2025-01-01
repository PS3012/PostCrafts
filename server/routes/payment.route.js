import { Router } from "express";
import handleCreatePaymentIntent from "../controllers/payment/createIntent.payment.js";

const router = Router();

router.post("/create-payment-intent", handleCreatePaymentIntent);

export default router;
