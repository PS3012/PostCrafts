import Cart from "../../models/cart.model.js";
import Coupon from "../../models/coupon.model.js";

const handleApplyCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user._id;

    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ message: "Invalid coupon code" });
    }

    if (coupon.expiryDate < new Date()) {
      return res.status(400).json({ message: "Coupon has expired" });
    }
    
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    
    if (cart.total < coupon.minPrice) {
      return res.status(400).json({
        message: `Minimum purchase amount of ₹${coupon.minPrice} required`,
      });
    }

    const discountAmount = (cart.total * coupon.discountPercentage) / 100;
    
    const finalAmount = cart.total - discountAmount;
    
    cart.total = finalAmount;
    await cart.save();

    res.status(200).json({
      message: "Coupon applied successfully",
      discountAmount,
      finalAmount,
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error applying coupon" });
  }
};

export default handleApplyCoupon;
