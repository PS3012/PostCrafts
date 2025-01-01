import Product from "../../models/product.model.js";
import { uploadToCloudinary } from "../../middlewares/cloudinary.js";

const handleCreateProduct = async (req, res) => {
  try {
    const imageObj = await uploadToCloudinary(req.file);

    const { name, brand, category, price, description, inventory } = req.body;

    const productToAdd = new Product({
      name,
      brand,
      category,
      price,
      description,
      inventory,
      image: imageObj.secure_url,
      addedBy: req.user._id,
    });

    await productToAdd.save();
    res.status(201).send({ message: "Product Added" });
  } catch (error) {
    res.status(500).send({ message: "Error adding product to DB", error });
  }
};

export default handleCreateProduct;
