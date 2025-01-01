import Cart from "../models/cart.js";
import { Order } from "../models/order.js";


export async function createOrder(req, res) {
  const userId = req.user._id;
  const { paymentIntentId } = req.body;
  console.log("reached order");
  

  try {
    //Retrieve cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    //Create Order
    const order = new Order({
      user: userId,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: cart.total,
      shippingAddress: req.body.shippingAddress || {}, // Add shipping address if needed
      paymentStatus: "completed", // Update based on actual payment intent
    });
console.log("before saving");

    await order.save();
    console.log("after saving");
    //Clear the cart
    cart.items = [];
    cart.total = 0;
    console.log("before cart");
    await cart.save();
    console.log("after cart");

    //Send the response back
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error placing the order" });
  }
}