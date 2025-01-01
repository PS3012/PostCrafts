import mongoose, { model, Schema } from "mongoose";

const ProductDetailsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
  });

const CartItemsSchema=Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        min:1,
        default:1,
    },
    productDetails: { type: ProductDetailsSchema, required: true },
})



const cartSchema=Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    },
    items:[CartItemsSchema],
    total:{
        type:Number,
        default:0,
    },


},{
    timestamps:true
})

const Cart=model("cart",cartSchema);

export default Cart