import Coupon from "../../models/coupon.model.js";

const handleGetCoupon = async (req, res) => {
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
};

export default handleGetCoupon;
