import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  isLoadingRegister: false,
  user: null,
  error: null,
};

export const userRegister = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://portal.grapetask.co/api/register",
        userData
      );
      if (response.data.status) {
        toast.success("Successfully Registered! Please log in.");
        return response.data;
      } else {
        toast.error(response.data.message || "Registration failed.");
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      toast.error("Registration failed. Try again.");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const userOtp = createAsyncThunk(
  "user/verifyOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://portal.grapetask.co/api/verify-otp",
        otpData
      );
      if (response.data.status) {
        toast.success("OTP verified successfully.");
        return response.data;
      } else {
        toast.error(response.data.message || "OTP verification failed.");
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      toast.error("OTP verification failed. Try again.");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoadingRegister = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoadingRegister = false;
        state.user = action.payload;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoadingRegister = false;
        state.error = action.payload;
      })
      .addCase(userOtp.pending, (state) => {
        state.isLoadingRegister = true;
      })
      .addCase(userOtp.fulfilled, (state, action) => {
        state.isLoadingRegister = false;
        state.user = action.payload;
      })
      .addCase(userOtp.rejected, (state, action) => {
        state.isLoadingRegister = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
