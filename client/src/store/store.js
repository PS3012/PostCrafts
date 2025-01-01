import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice/cartSlice"; // Import the reducer from your slice file
import authReducer from "./authSlice/authSlice"; // Import the reducer from your slice file
import prodReducer from "./productSlice/productSlice"; // Import the reducer from your slice file

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add your reducers here
    auth: authReducer, // New slice
    product: prodReducer, // New slice
  },
});

export default store;
