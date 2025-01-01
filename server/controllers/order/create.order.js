import Cart from "../../models/cart.model.js";
import Order from "../../models/order.model.js";

const handleCreateOrder = async (req, res) => {
  const userId = req.user._id;
  const { paymentIntentId } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const order = new Order({
      user: userId,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: cart.total,
      shippingAddress: req.body.shippingAddress || {},
      paymentStatus: "completed",
    });

    await order.save();
    
    cart.items = [];
    cart.total = 0;

    await cart.save();
    
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error placing the order" });
  }
};

export default handleCreateOrder;
