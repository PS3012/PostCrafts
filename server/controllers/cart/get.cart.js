import Cart from "../../models/cart.model.js";

const handleGetCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.products"
    );
    if (!cart) {
      return res.status(200).json({
        error: false,
        message: "No item in the cart.",
        data: { items: [], totalAmount: 0 },
      });
    }
    return res.status(200).json({
      error: false,
      message: "Cart items fetched successfully.",
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

export default handleGetCart;
