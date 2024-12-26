import Product from "../../models/product.model.js";

const handleGetAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    return res.status(200).json({
      error: false,
      message: "Products fetched successfully!",
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export default handleGetAllProducts;
