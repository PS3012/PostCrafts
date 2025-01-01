import Cart from "../../models/cart.model.js";
import calculateTotalAmount from "../../utils/calculateTotalAmount.js";

const handleUpdateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    console.log(productId, quantity, userId);

    if (quantity < 1) {
      return res.status(400).json({
        error: true,
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        error: true,
        message: "Cart not found",
      });
    }

    const cartItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({
        error: true,
        message: "Product not found in cart",
      });
    }

    cartItem.quantity = quantity;

    cart.totalAmount = await calculateTotalAmount(cart.items);

    await cart.save();

    await cart.populate("items.products");

    res.status(200).json({
      error: false,
      message: "Cart updated",
      data: cart,
    });
  } catch (error) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }
};

export default handleUpdateCart;
