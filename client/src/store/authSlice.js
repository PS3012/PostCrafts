import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosReq from "../utils/axiosReq";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const response = await axiosReq.get("/auth/validate-token", {
        withCredentials: true,
      });
      console.log("Reached here");

      console.log(response);

      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axiosReq.post("/user/logout", {}, { withCredentials: true });
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    loginUser: (state, action) => {
      console.log(action.payload);

      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    updateUserWishlist: (state, action) => {
      console.log(action.payload);

      const { productId, actionType } = action.payload; // `actionType` can be "add" or "remove"

      if (actionType === "add") {
        state.user = {
          ...state.user,
          wishlist: [...state.user.wishlist, productId],
        };
      } else if (actionType === "remove") {
        state.user = {
          ...state.user,
          wishlist: state.user.wishlist.filter((id) => id !== productId),
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { loginUser, updateUserWishlist } = authSlice.actions;

export default authSlice.reducer;
