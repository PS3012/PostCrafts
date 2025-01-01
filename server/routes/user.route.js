import { Router } from "express";
import protectedRoute from "../middlewares/auth.js";
import handleUserLogin from "../controllers/user/login.user.js";
import handleUserRegister from "../controllers/user/register.user.js";
import handleUserLogout from "../controllers/user/logout.user.js";
import handleSellerRegister from "../controllers/user/register.seller.js";
import handleGetProfile from "../controllers/user/get.profile.js";
import handleUpdateProfile from "../controllers/user/update.profile.js";
import handleAddToWishlist from "../controllers/user/add.wishlist.js";
import handleRemoveFromWishList from "../controllers/user/remove.wishlist.js";

const router = Router();

router.post("/login", handleUserLogin);
router.post("/register", handleUserRegister);
router.post("/logout", handleUserLogout);
router.post("/register-seller", handleSellerRegister);
router.get("/profile", protectedRoute, handleGetProfile);
router.put("/profile", protectedRoute, handleUpdateProfile);
router.post("/wishList/add", protectedRoute, handleAddToWishlist);
router.post("/wishList/remove", protectedRoute, handleRemoveFromWishList);

export default router;
