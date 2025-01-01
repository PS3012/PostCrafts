import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 100,
    },
    phone: {
      type: Number,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);

export default User;
