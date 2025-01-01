import Product from "../../models/product.model.js";

const handleCreateProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "Image file is required" });
    }

    const { name, brand, category, price, description, inventory } = req.body;

    const productToAdd = new Product({
      name,
      brand,
      category,
      price,
      description,
      inventory,
      image: req.file.filename,
      addedBy: req.user._id,
    });

    await productToAdd.save();
    res.status(201).send({ message: "Product Added" });
  } catch (error) {
    res.status(500).send({ message: "Error adding product to DB", error });
  }
};

export default handleCreateProduct;
