import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import prodReducer from "./productSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    product: prodReducer,
  },
});

export default store;
