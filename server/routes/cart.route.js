import express from "express";
import protectedRoute from "../middlewares/auth.js";
import handleAddToCart from "../controllers/cart/add.cart.js";
import handleRemoveFromCart from "../controllers/cart/remove.cart.js";
import handleGetCart from "../controllers/cart/get.cart.js";
import handleUpdateCart from "../controllers/cart/update.cart.js";

const router = express.Router();

router.get("/", protectedRoute, handleGetCart);
router.post("/add", protectedRoute, handleAddToCart);
router.put("/updateQuantity", protectedRoute, handleUpdateCart);
router.delete("/remove/:productId", protectedRoute, handleRemoveFromCart);

export default router;
