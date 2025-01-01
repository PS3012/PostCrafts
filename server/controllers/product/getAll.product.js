import Product from "../../models/product.model.js";

const handleGetAllProducts = async (req, res) => {
  try {
    let query = {};

    if (req.query.name) {
      query.name = { $regex: new RegExp(req.query.name, "i") };
    }
    if (req.query.brand) {
      query.brand = { $regex: new RegExp(req.query.brand, "i") };
    }
    if (req.query.category) {
      query.category = { $regex: new RegExp(req.query.category, "i") };
    }
    if (req.query.minPrice && req.query.maxPrice) {
      query.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
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
    res.status(500).send({ message: "error", error });
  }
};

export default handleGetAllProducts;
