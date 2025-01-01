import Product from "../models/product.model.js";

const calculateTotalAmount = async (items) => {
  let total = 0;
  for (const item of items) {
    const productToAdd = await Product.findOne(item.product);
    total += productToAdd.price * item.quantity;
  }
  return total;
};

export default calculateTotalAmount;
