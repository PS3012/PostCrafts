import { Router } from "express";
import handleUserLogin from "../controllers/user/login.user.js";
import handleUserRegister from "../controllers/user/register.user.js";
import handleUserLogout from "../controllers/user/logout.user.js";

const router = Router();

router.post("/login", handleUserLogin);
router.post("/register", handleUserRegister);
router.post("/logout", handleUserLogout);

export default router;
