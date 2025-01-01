import Cart from "../models/cart.js";
import { Coupon } from "../models/coupon.js";

export async function createCoupon(req,res){
    try {
        const { name, code, discountPercentage, minPrice } = req.body;
        const userId = req.user._id;
    
        //coupon with same code exists
        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
          return res.status(400).json({ message: "Coupon code already exists" });
        }
    
        //save coupon
        const coupon = new Coupon({
          name,
          code,
          minPrice,
          discountPercentage,
          seller: userId,
        });
    
        await coupon.save();
        res.status(201).json({ message: "Coupon created successfully", coupon });
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error Adding Coupon" });
      }
}
export async function getCoupon(req,res){
    try {
        const userId = req.user._id;
    
        const coupons = await Coupon.find({ seller: userId });
    
        if (!coupons)
          return res
            .status(404)
            .send({ message: "No coupons found for this seller" });
    
        res.send(coupons);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching coupon" });
      }
}

export async function applyCoupon(req, res) {
  try {
    const { code } = req.body;
    console.log(code);
    
    const userId = req.user._id;

    // Find the coupon
    const coupon = await Coupon.findOne({ code });
    
    
    if (!coupon) {
      return res.status(404).json({ message: "Invalid coupon code" });
    }

    // Check if coupon is expired
    if (coupon.expiryDate < new Date()) {
      return res.status(400).json({ message: "Coupon has expired" });
    }

    // Get user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    console.log("cart",cart);
    // Check minimum price requirement
    if (cart.total < coupon.minPrice) {
      return res.status(400).json({
        message: `Minimum purchase amount of ₹${coupon.minPrice} required`,
      });
    }

    // Calculate discount
    const discountAmount = (cart.total * coupon.discountPercentage) / 100;
    console.log("total",cart.total);
    
    console.log("discount",discountAmount);
    
    const finalAmount = cart.total - discountAmount;
    console.log("finalAmount",finalAmount);
    

    // Update cart with discount
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
}