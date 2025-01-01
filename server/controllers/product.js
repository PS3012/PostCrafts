import { uploadToCloudinary } from "../middleware/cloudinary.js";
import { Product } from "../models/product.js";


export async function getProducts(req,res){
  console.log("reached get products");
  
    try {
        let query={};
        if(req.query.name){
          query.name={$regex : new RegExp(req.query.name,"i")};
          
        }
        if(req.query.brand){
          query.brand={$regex : new RegExp(req.query.brand,"i")}
        }
        if(req.query.category){
          query.category={$regex : new RegExp(req.query.category,"i")}
        } 
        if(req.query.minPrice && req.query.maxPrice){
          query.price={$gte : req.query.minPrice, $lte:req.query.maxPrice}
        } 
        const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const products = await Product.find(query).skip(skip).limit(limit);

    const totalCount = await Product.countDocuments(query);

    if (!products)
      return res.status(400).send({ message: "No Products found" });

    res.send({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
      } catch (error) {
        res.status(500).send({message:"error",error})
        
      }
}
export async function getProduct(req,res){
    try {
        const id=req.params.id;
        if(!id){
            return res.status(400).send({message:"Provide the id to find the product"})
        }
    
        const prod=await Product.findById(id)
        console.log(prod);
        
        if(!prod){
           return res.status(400).send({message:"Product with given id is not available"})
        }

        return res.send(prod)
    } catch (error) {
        res.status(500).send({message:"Error getting a product "+error})
    }
}
export async function addProduct(req,res){
    try {
      console.log("reached product");
      
        const imageObj = await uploadToCloudinary(req.file); 
        console.log(req.file);
        
    const { name, brand, category, price, description, inStock, inventory } =
      req.body;
      let attributes;
if (req.body.attributes) {
  try {
    attributes = JSON.parse(req.body.attributes);
  } catch (error) {
    return res.status(400).send({ message: "Invalid attributes format" });
  }
}

    console.log("product", req.body);

    const productToAdd = new Product({
      name,
      brand,
      category,
      price,
      description,
      inStock,
      inventory,
      attributes,
      image: imageObj.secure_url,
      addedBy: req.user._id,
    });


    await productToAdd.save();
    res.status(201).send({message:"Product Added"})
    } catch (error) {
        res.status(500).send({ message: "Error adding product to DB", error });
    }
    

    
}