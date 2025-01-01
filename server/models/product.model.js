import mongoose from "mongoose";
import { nanoid } from "nanoid";

const productSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      default: () => nanoid(),
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    inventory: {
      type: Number,
      required: true,
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    totalRating: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);

export default Product;
