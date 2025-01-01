import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios.config";

// Initial state
const initialState = {
  cart: null,
  status: "idle", 
  error: null,
};

// Async thunk to fetch the cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
  try {
    const response = await instance.get("/cart");
    console.log(response.data.cart);
    
    return response.data.cart;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
  }
});

// Async thunk to add a product to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    console.log("reached add to cart");
    
    try {
      console.log(productId, quantity);
      
      const response = await instance.post("/cart/add", { productId, quantity });
      console.log(response.data);
      alert("Product added to the cart!!")
      
      return response.data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to add product to cart");
    }
  }
);

// Async thunk to update product quantity
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, thunkAPI) => {
    console.log("updated thunk");
    console.log(productId,quantity);
    
    try {
      const response = await instance.put("/cart/updateQuantity", { productId, quantity });
      return response.data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update quantity");
    }
  }
);

// Async thunk to remove a product from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, thunkAPI) => {
    try {
      const response = await instance.delete(`/cart/remove/${productId}`);
      return response.data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to remove product from cart");
    }
  }
);

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    modifyCart(state, action) {
      const { finalAmount, discountAmount } = action.payload;
      if (state.cart) {
        state.cart.totalAmount = finalAmount;
        state.cart.discountAmount = discountAmount;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        
        console.log(action.payload);
        
        state.cart = action.payload;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        console.log("reached updated");
        state.cart = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

// Export the actions and reducer
export const { modifyCart } = cartSlice.actions;
export default cartSlice.reducer;
