import Coupon from "../../models/coupon.model.js";

const handleCreateCoupon = async (req, res) => {
  try {
    const { name, code, discountPercentage, minPrice } = req.body;
    const userId = req.user._id;

    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

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
};

export default handleCreateCoupon;
