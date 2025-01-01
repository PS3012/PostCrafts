import express from "express";
import {} from "dotenv/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./utils/connectToDB.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import authRouter from "./routes/auth.route.js";
import cartRouter from "./routes/cart.route.js";
import couponRouter from "./routes/coupon.route.js";
import paymentRouter from "./routes/payment.route.js";
import orderRouter from "./routes/order.route.js";

const app = express();
await connectToDB();

const allowedOrigins = [process.env.FRONTEND_URL];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/coupon", couponRouter);
app.use("/api/v1/pay", paymentRouter);
app.use("/api/v1/orders", orderRouter);

app.listen(process.env.PORT_NUMBER, () => {
  console.log("Server Started");
});
