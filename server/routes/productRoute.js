import { Router } from "express";
import { addProduct, getProduct, getProducts } from "../controllers/product.js";
import multer from "multer";
import { protectRoute } from "../middleware/auth.js";

const productRouter=Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

productRouter.post('/add',protectRoute,upload.single("image"),addProduct)
productRouter.get('/get',getProducts)
productRouter.get('/get/:id',getProduct)

export  default productRouter;