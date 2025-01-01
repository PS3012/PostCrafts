import Cart from "../models/cart.js";
import { Product } from "../models/product.js";

export async function addCart(req, res) {
  try {
    console.log(req.body);
    
    const { productId, quantity = 1 } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    console.log("cart",cart);
    

    // Check if the product exists in the cart
    const existing = cart.items.find(
      (item) => item.product.toString() === productId
    );

    const product=await Product.findById(productId)
    console.log("product",product);
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity ,productDetails: {
        name: product.name,
        price: product.price,
        category: product.category,
        brand: product.brand,
        image: product.image,
      },});
    }
    console.log("updated Cart",cart);
    
    // Populate product details once
    

    cart.total = await calculateTotalAmount(cart.items);

    await cart.save();
    
    await cart.populate("items.product");
    res.status(200).send({ cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding to cart" });
  }
}
export async function removeFromCart(req, res) {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).send({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

   

    cart.total = await calculateTotalAmount(cart.items);

    await cart.save();

    await cart.populate("items.product");

    res.status(200).send({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing from cart" });
  }
}

export async function getCart(req, res) {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.status(200).send({ cart: { items: [], totalAmount: 0 } });
    }
    return res.status(200).send({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart" });
  }
}
export async function updateQuantity(req, res) {
  console.log("reached updated");
  
  try {
    const { productId, quantity } = req.body;
    console.log(req.body);
    
    const userId = req.user._id;

    console.log(productId, quantity, userId);

    if (quantity < 1)
      return res.status(400).json({ message: "Quantity must be at least 1" });

    const cart = await Cart.findOne({ user: userId });
    console.log(cart);
    
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.items.find(
      (item) => {
        console.log("item",item.product.toString());
        
        return item.product.toString() === productId}
    );
    // console.log(cartItem);
    

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cartItem.quantity = quantity;

    cart.total = await calculateTotalAmount(cart.items);

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating quantity" });
  }
}

async function calculateTotalAmount(items) {
  let total = 0;
  for (const item of items) {
    //Find the product
    const productToAdd = await Product.findOne(item.product);
    total += productToAdd.price * item.quantity;
  }
  return total;
}
