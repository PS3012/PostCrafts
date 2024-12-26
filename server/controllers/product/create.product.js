import Product from "../../models/product.model.js";
import { uploadToCloudinary } from "../../utils/cloudinary.js";

const handleCreateProduct = async (req, res) => {
  const imageObj = await uploadToCloudinary(req.file);
  const { name, brand, category, price, description, inventory } = req.body;

  if (!name || !brand || !category || !price || !inventory) {
    return res.status(422).json({
      error: true,
      message: "Invalid data. All fields are required.",
    });
  }

  try {
    const newProduct = new Product({
      name,
      brand,
      category,
      price,
      description,
      inventory,
      image: imageObj.secure_url,
      addedBy: req.user._id,
    });

    await newProduct.save();
    return res.status(201).json({
      error: false,
      message: "Product added successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }
};

export default handleCreateProduct;
