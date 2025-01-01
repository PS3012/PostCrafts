import User from "../../models/user.model.js";

const handleRemoveFromWishList = async (req, res) => {
  try {
    const { productId } = req.body; 
    const userId = req.user._id; 
    
    const user = await User.findById(userId);
    if (!user.wishlist.includes(productId)) {
      return res.status(400).send({ message: "Product not found in wishlist" });
    }
    
    await User.findByIdAndUpdate(userId, {
      $pull: { wishlist: productId },
    });

    res
      .status(200)
      .send({ message: "Product removed from wishlist successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Error removing product", error });
  }
};

export default handleRemoveFromWishList;
