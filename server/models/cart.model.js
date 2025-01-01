import mongoose from "mongoose";

const productDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  productDetails: { type: productDetailsSchema, required: true },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    items: [cartItemSchema],
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
