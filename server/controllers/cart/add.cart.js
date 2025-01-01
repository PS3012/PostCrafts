import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";
import calculateTotalAmount from "../../utils/calculateTotalAmount.js";

const handleAddToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existing = cart.items.find(
      (item) => item.product.toString() === productId
    );

    const product = await Product.findById(productId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        productDetails: {
          name: product.name,
          price: product.price,
          category: product.category,
          brand: product.brand,
          image: product.image,
        },
      });
    }
    console.log("updated Cart", cart);

    cart.total = await calculateTotalAmount(cart.items);

    await cart.save();

    await cart.populate("items.product");
    res.status(200).send({ cart });
  } catch (error) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }
};

export default handleAddToCart;
