import { Router } from "express";
import { login, logout, register,registerSeller,profile,editProfile,addToWishList,removeFromWishList } from "../controllers/user.js";
import { protectRoute } from "../middleware/auth.js";

const userRouter=Router();

userRouter.post('/login',login)
userRouter.post('/logout',logout)
userRouter.post('/register',register)
userRouter.post('/register-seller',registerSeller)
userRouter.get('/profile', protectRoute,profile)
userRouter.put('/profile', protectRoute,editProfile)
userRouter.post('/wishList/add', protectRoute,addToWishList)
userRouter.post('/wishList/remove', protectRoute,removeFromWishList)

export  default userRouter;