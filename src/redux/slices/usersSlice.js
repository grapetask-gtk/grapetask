<<<<<<< HEAD
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
=======
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
>>>>>>> d918fe2 (cahnges by abdul qavi)
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  isLoadingRegister: false,
<<<<<<< HEAD
  user: null,
  error: null,
};

=======
  isLoadingUsers: false,
  user: null,
  users: [], // ✅ important fix
  error: null,
};

// Register
>>>>>>> d918fe2 (cahnges by abdul qavi)
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

<<<<<<< HEAD
=======
// OTP Verification
>>>>>>> d918fe2 (cahnges by abdul qavi)
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

<<<<<<< HEAD
=======
//fetch users
// Fetch Admin Users
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    let accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get("http://localhost:8000/api/admin/users", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      console.log('Response is ', response);
      
      // Return the WHOLE response data object
      return response.data;
    } catch (error) {
      toast.error("Error fetching users.");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


>>>>>>> d918fe2 (cahnges by abdul qavi)
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
<<<<<<< HEAD
=======
      // Register
>>>>>>> d918fe2 (cahnges by abdul qavi)
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
<<<<<<< HEAD
=======

      // OTP
>>>>>>> d918fe2 (cahnges by abdul qavi)
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
<<<<<<< HEAD
      });
=======
      })

      // Fetch Users
     
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoadingUsers = false;
        // Extract users from the response based on your API structure
        state.users = action.payload.data.users || [];
      })


>>>>>>> d918fe2 (cahnges by abdul qavi)
  },
});

export default userSlice.reducer;
