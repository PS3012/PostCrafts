import { Router } from "express"
import { addCart, getCart, removeFromCart, updateQuantity } from "../controllers/cart.js";
import { protectRoute } from "../middleware/auth.js";

const cartRouter=Router();

cartRouter.get("/",protectRoute,getCart)
cartRouter.post("/add",protectRoute,addCart)
cartRouter.put("/updateQuantity",protectRoute,updateQuantity)
cartRouter.delete("/remove/:productId",protectRoute,removeFromCart)
export default cartRouter