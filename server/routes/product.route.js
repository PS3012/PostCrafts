import { Router } from "express";
import upload from "../middlewares/multer.js";
import handleCreateProduct from "../controllers/product/create.product.js";
import handleGetAllProducts from "../controllers/product/getAll.product.js";
import handleDeleteProduct from "../controllers/product/delete.product.js";
import handleUpdateProduct from "../controllers/product/update.product.js";
import handleGetProductById from "../controllers/product/getById.product.js";
import protectedRoute from "../middlewares/auth.js";

const router = Router();

const setUploadFolder = (req, res, next) => {
  req.uploadFolder = "uploads/products";
  next();
};

router.get("/", handleGetAllProducts);
router.post(
  "/",
  protectedRoute,
  setUploadFolder,
  upload.single("image"),
  handleCreateProduct
);
router.get("/:productId", handleGetProductById);
router.put("/:productId", handleUpdateProduct);
router.delete("/:productId", handleDeleteProduct);

export default router;
