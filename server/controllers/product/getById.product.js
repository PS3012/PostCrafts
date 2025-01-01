import Product from "../../models/product.model.js";

const handleGetProductById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .send({ message: "Provide the id to find the product" });
    }

    const prod = await Product.findById(id);

    if (!prod) {
      return res
        .status(400)
        .send({ message: "Product with given id is not available" });
    }

    return res.send(prod);
  } catch (error) {
    res.status(500).send({ message: "Error getting a product " + error });
  }
};

export default handleGetProductById;
