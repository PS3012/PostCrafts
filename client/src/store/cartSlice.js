import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosReq from "../utils/axiosReq";
import toast from "react-hot-toast";

const initialState = {
  cart: null,
  status: "idle",
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const response = await axiosReq.get("/cart");
      return response.data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      const response = await axiosReq.post("/cart/add", {
        productId,
        quantity,
      });
      toast.success("Product added to the cart!!");
      return response.data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add product to cart"
      );
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const response = await axiosReq.put("/cart/updateQuantity", {
        productId,
        quantity,
      });
      return response.data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update quantity"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, thunkAPI) => {
    try {
      const response = await axiosReq.delete(`/cart/remove/${productId}`);
      return response.data.cart;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove product from cart"
      );
    }
  }
);

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
        state.cart = action.payload;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export const { modifyCart } = cartSlice.actions;
export default cartSlice.reducer;
