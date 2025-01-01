import User from "../../models/user.model.js";

const handleAddToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;
    
    const user = await User.findById(userId);
    
    if (user.wishlist.includes(productId)) {
      return res.status(400).send({ message: "Product already in a wishlist" });
    }

    console.log("reached push");
    user.wishlist.push(productId);

    console.log(user);

    await user.save();

    res
      .status(200)
      .send({ message: "Product added to wishList successfully!!" });
  } catch (error) {
    res.status(500).send({ message: "Error adding product", error });
  }
};

export default handleAddToWishlist;
