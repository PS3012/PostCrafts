import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios.config";

// Initial state
const initialState = {
  products: [], // Renamed for clarity
  error: null,
  loading: false, // Added loading state
};

// Async thunk to fetch the products
export const getProduct = createAsyncThunk(
  "product/getProduct", // Cleaned up prefix
  async (_, thunkAPI) => {
    try {
      const response = await instance.get("/product/get");
      console.log(response.data);
      return response.data.products; // Resolved data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// Create the product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true; // Indicate loading
        state.error = null; // Clear previous errors
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false; // Reset loading
        state.products = action.payload; // Update products
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false; // Reset loading
        state.error = action.payload; // Capture error
      });
  },
});

// Export the reducer
export default productSlice.reducer;
