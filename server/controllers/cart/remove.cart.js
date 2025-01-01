import Cart from "../../models/cart.model.js";
import calculateTotalAmount from "../../utils/calculateTotalAmount.js";

const handleRemoveFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        error: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    cart.totalAmount = await calculateTotalAmount(cart.items);

    await cart.save();

    await cart.populate("items.products");

    res.status(200).send({
      error: false,
      message: "Removed from cart",
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

export default handleRemoveFromCart;
