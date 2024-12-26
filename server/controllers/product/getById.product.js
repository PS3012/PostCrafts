import Product from "../../models/product.model.js";

const handleGetProductById = async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    return res.status(400).json({
      error: true,
      message: "Invalid Product Id",
    });
  }

  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(400).json({
        error: true,
        message: `Product with id - ${productId} not exist`,
      });
    }

    return res.status(200).json({
      error: false,
      message: "Product found successfully",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export default handleGetProductById;