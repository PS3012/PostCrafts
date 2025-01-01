import express from "express";
import {
  
  getBlog,
  getBlogs,
  deleteBlog,
  addBlog,
  updateBlog,
  
} from "../controllers/blog.js";
import multer from "multer";
import { protectRoute } from "../middleware/auth.js";





const blogRouter = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

blogRouter.post("/add", protectRoute,upload.single("image"), addBlog);
blogRouter.get("/get", getBlogs);
blogRouter.get("/get/:id", getBlog);
blogRouter.delete("/delete/:id", deleteBlog);
blogRouter.put("/update/:id",protectRoute, updateBlog);

export default blogRouter;