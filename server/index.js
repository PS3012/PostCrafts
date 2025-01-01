import express, { json, urlencoded } from "express";
import { connectToDB } from "./db/connection.js";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import cartRouter from "./routes/cartRouter.js";
import couponRouter from "./routes/couponRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import orderRouter from "./routes/orderRouter.js";
import blogRouter from "./routes/blogRouter.js";

const app = express();
const port = process.env.PORT;
app.use(json());
app.use(urlencoded({}));

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/pay", paymentRouter);
app.use("/api/orders", orderRouter);
app.use("/api/blog", blogRouter);

await connectToDB();
app.listen(port, () => {
  console.log("Connected to Server");
});
