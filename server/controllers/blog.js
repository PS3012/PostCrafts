import mongoose from "mongoose";
import Blog from "../models/blog.js";
import { uploadToCloudinary } from "../middleware/cloudinary.js";



export async function addBlog(req,res){
    try {
      // console.log(req.file);
      
      
      const image=await uploadToCloudinary(req.file);
      console.log(image);
        const {title, author, content, category}=req.body
    
        const blogToAdd=new Blog({
            title, author, content, category,image
        })
        await blogToAdd.save();
        console.log(req.body);
        res.status(201).send({message:"Blog Added Sucessfully"});
        
    } catch (error) {
        res.status(500).send({message:"Error adding blog"+ error});
    }
    
}
export async function getBlog(req,res){
    const idToFetch = req.params.id;
  try {
    if (!idToFetch)
      return res.status(400).send({ message: "You must specify a blog ID" });

    if (!mongoose.Types.ObjectId.isValid(idToFetch))
      return res
        .status(400)
        .send({ message: "Given ID is not in proper format" });

    const blog = await Blog.findById(idToFetch);
    console.log("blog", blog);
    if (!blog)
      return res
        .status(404)
        .send({ message: "No blog found with the given ID" });

    return res.send(blog);
  } catch (error) {
    return res.status(500).send({ message: "Error fetching blog "+ error });
  }

}
export async function getBlogs(req,res){
    try {
        let query={};
        if(req.query.author){
          query.author={$regex : new RegExp(req.query.author,"i")};
          
        }
        if(req.query.category){
          query.category={$regex : new RegExp(req.query.category,"i")}
        }
        if(req.query.title){
          query.title={$regex : new RegExp(req.query.title,"i")}
        } 
        
        console.log(req.query);

        //PAGINATION
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 5; //how many products to display per page
    const skip = (page - 1) * limit; //0 5

    const allBlogs = await Blog.find(query).skip(skip).limit(limit);

    const totalCount = await Blog.countDocuments(query);
    res.send({
        allBlogs,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
      });
         
      } catch (error) {
        res.status(500).send({message:"error",error})
        
      }
}
export async function deleteBlog(req,res){
    const idToDelete = req.params.id;

  try {
    if (!idToDelete)
      return res.status(400).send({ message: "You must specify a blog ID" });

    if (!mongoose.Types.ObjectId.isValid(idToDelete))
      return res
        .status(400)
        .send({ message: "Given ID is not in proper format" });

    const deletedBlog = await Blog.findByIdAndDelete(idToDelete);

    // const deletedBlog = await Blog.find({ id: idToDelete });

    // const deletedBlog = await Blog.deleteOne({ id: idToDelete });

    if (!deletedBlog)
      return res
        .status(404)
        .send({ message: "No blog found with the given ID" });

    res.send({ message: "Blog with the given ID deleted" });
  } catch (error) {
    return res.status(500).send({ message: "Error deleting blog", error });
  }

}
export async function updateBlog(req,res){
    const idToUpdate = req.params.id;
  const { title, author, content, category } = req.body;
  try {
    if (!idToUpdate)
      return res.status(400).send({ message: "You must specify a blog ID" });

    if (!mongoose.Types.ObjectId.isValid(idToUpdate))
      return res
        .status(400)
        .send({ message: "Given ID is not in proper format" });

    const updatedBlog = await Blog.findByIdAndUpdate(idToUpdate, {
      title,
      author,
      content,
      category,
    });
    if (!updatedBlog)
      return res
        .status(404)
        .send({ message: "No blog found with the given ID" });

    res.send({ message: "Blog with the given ID is updated" });
  } catch (error) {
    return res.status(500).send({ message: "Error updating blog", error });
  }
}