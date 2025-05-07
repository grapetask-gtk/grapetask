<<<<<<< HEAD
import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";
import axios from "../../utils/axios";
=======
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import axios from "../../utils/axios";
import { dispatch } from "../store/store";
>>>>>>> d918fe2 (cahnges by abdul qavi)

const initialState = {
  isLoading: false,
  isLoadingRegister: false,
  getError: null,
<<<<<<< HEAD
  userList: [],
=======
  users: [],
  meta: {},
>>>>>>> d918fe2 (cahnges by abdul qavi)
  userDetail: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
<<<<<<< HEAD
    //START LOADING
=======
>>>>>>> d918fe2 (cahnges by abdul qavi)
    startLoading(state) {
      state.isLoading = true;
    },
    startLoadingRegister(state) {
      state.isLoadingRegister = true;
    },
<<<<<<< HEAD
    //STOP LOADING
    stopLoading(state) {
      state.isLoading = false;
    },
    // HAS UPDATE ERROR
=======
    stopLoading(state) {
      state.isLoading = false;
      state.isLoadingRegister = false;
    },
>>>>>>> d918fe2 (cahnges by abdul qavi)
    hasGetError(state, action) {
      state.isLoading = false;
      state.isLoadingRegister = false;
      state.getError = action.payload;
    },
<<<<<<< HEAD
    // GET User Success
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.isLoadingRegister = false;
      state.userList = action.payload;
    },

    // GET User DETAILS
    getUserDetailsSuccess(state, action) {
      state.isLoading = false;
      state.isLoadingRegister = false;
      state.userDetail = action.payload;
    },
  },
});
export const { getUserDetailsSuccess } = userSlice.actions;
export default userSlice.reducer;

// User Functions

//User Login
export function userLogin(data, handleClose) {
  return async () => {
    dispatch(userSlice.actions.startLoading());
    try {
      const response = await axios.post("login", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(userSlice.actions.hasGetError(response?.data?.message));
      }
      console.log(JSON.stringify(response?.data?.data));
      dispatch(userSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(userSlice.actions.hasGetError(error?.message));
    }
  };
}
//User Register
// const response = await axios.post(
//   "https://grapetask.cs24ryk.com/api/register",
//   data,
//   {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   }
// );
export function userRegister(data, handleClose) {
  return async (dispatch) => {
    dispatch(userSlice.actions.startLoadingRegister());

    console.log("🚀 Sending Data:", JSON.stringify(data, null, 2)); // ✅ Check data before sending

    try {
      const response = await axios.post(
        "https://portal.grapetask.co/api/register",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ API Response:", JSON.stringify(response.data, null, 2)); // ✅ Check response

      handleClose(response.data);

      if (!response.data.status) {
        dispatch(userSlice.actions.hasGetError(response?.data?.message));
      }

      dispatch(userSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      console.error("❌ API Error:", error?.response?.data || error.message); // ✅ Log full error

      handleClose(error);

      dispatch(
        userSlice.actions.hasGetError(
          error.response?.data?.message || error.message
        )
      );
=======
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload.data;
      state.meta = {
        current_page: action.payload.current_page,
        total_pages: action.payload.last_page,
        total: action.payload.total,
      };
    },
    getUserDetailsSuccess(state, action) {
      state.isLoading = false;
      state.userDetail = action.payload;
    },
    setUsers(state, action) {
      state.isLoading = false;
      state.users = action.payload.data;
      state.meta = {
        current_page: action.payload.current_page,
        total_pages: action.payload.last_page,
        total: action.payload.total,
      };
    },
    setError(state, action) {
      state.isLoading = false;
      state.getError = action.payload;
    },
  },

  // 👇 FIXED: Use extraReducers as a function
  extraReducers: (builder) => {
    builder.addCase(toggleUserStatus.fulfilled, (state, action) => {
      const updatedUser = action.payload.user;
      const index = state.users.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    });
  },
});


export const {
  startLoading,
  startLoadingRegister,
  stopLoading,
  hasGetError,
  getUsersSuccess,
  getUserDetailsSuccess,
 
  setUsers,
  setError,
} = userSlice.actions;

export default userSlice.reducer;

// THUNKS

export function userLogin(data, handleClose) {
  return async () => {
    dispatch(startLoading());
    try {
      const response = await axios.post("login", data);
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(hasGetError(response.data.message));
        return;
      }
      dispatch(getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(hasGetError(error?.message));
    }
  };
}

export function userRegister(data, handleClose) {
  return async () => {
    dispatch(startLoadingRegister());
    try {
      const response = await axios.post("register", data);
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(hasGetError(response.data.message));
        return;
      }
      dispatch(getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(hasGetError(error?.response?.data?.message || error.message));
>>>>>>> d918fe2 (cahnges by abdul qavi)
    }
  };
}

export function userForgot(data, handleClose) {
<<<<<<< HEAD
  return async (dispatch) => {
    dispatch(userSlice.actions.startLoading());

    try {
      const response = await axios.post(
        "https://portal.grapetask.co/api/forgot-password",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.status) {
        console.log("Response Data:", response.data.data);
        dispatch(userSlice.actions.getUserDetailsSuccess(response.data.data));
        handleClose(response.data);
      } else {
        dispatch(userSlice.actions.hasGetError(response.data?.message || "Unknown error"));
        handleClose(null, response.data?.message || "Unknown error");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      dispatch(userSlice.actions.hasGetError(errorMessage));
      handleClose(null, errorMessage);
    }
  };
}
//User Otp
export function userOtp(data, handleClose) {
  return async () => {
    dispatch(userSlice.actions.startLoading());
    try {
      const response = await axios.post("otp-verify", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(userSlice.actions.hasGetError(response?.data?.message));
      }
      console.log(JSON.stringify(response?.data?.data));
      dispatch(userSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(userSlice.actions.hasGetError(error?.message));
    }
  };
}
//User reset-password
export function userResetPassword(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");

    dispatch(userSlice.actions.startLoading());
    try {
      const response = await axios.post("reset-password", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(userSlice.actions.hasGetError(response?.data?.message));
      }
      console.log(JSON.stringify(response?.data?.data));
      dispatch(userSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(userSlice.actions.hasGetError(error?.message));
=======
  return async () => {
    dispatch(startLoading());
    try {
      const response = await axios.post("forgot-password", data);
      if (!response.data.status) {
        dispatch(hasGetError(response.data.message));
        handleClose(null, response.data.message);
        return;
      }
      dispatch(getUserDetailsSuccess(response.data.data));
      handleClose(response.data);
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      dispatch(hasGetError(message));
      handleClose(null, message);
    }
  };
}

export function userOtp(data, handleClose) {
  return async () => {
    dispatch(startLoading());
    try {
      const response = await axios.post("otp-verify", data);
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(hasGetError(response.data.message));
        return;
      }
      dispatch(getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(hasGetError(error?.message));
    }
  };
}

export function userResetPassword(data, handleClose) {
  return async () => {
    const accessToken = localStorage.getItem("accessToken");
    dispatch(startLoading());
    try {
      const response = await axios.post("reset-password", data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(hasGetError(response.data.message));
        return;
      }
      dispatch(getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(hasGetError(error?.message));
>>>>>>> d918fe2 (cahnges by abdul qavi)
    }
  };
}

<<<<<<< HEAD
//Get User Details
export function getUser() {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");
    dispatch(userSlice.actions.startLoading());
    try {
      const response = await axios.get("user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });

      dispatch(userSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      dispatch(userSlice.actions.hasGetError(error?.message));
=======
export function getUser() {
  return async () => {
    const accessToken = localStorage.getItem("accessToken");
    dispatch(startLoading());
    try {
      const response = await axios.get("user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(getUserDetailsSuccess(response.data.data));
    } catch (error) {
      dispatch(hasGetError(error?.message));
>>>>>>> d918fe2 (cahnges by abdul qavi)
    }
  };
}

<<<<<<< HEAD
//All Users
//Get User Details
export function getAllFreelancers() {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");
    dispatch(userSlice.actions.startLoading());
    try {
      const response = await axios.get("users/freelancer", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });

      dispatch(userSlice.actions.getUsersSuccess(response.data.data));
    } catch (error) {
      dispatch(userSlice.actions.hasGetError(error?.message));
=======
export const getAllUsers = ({ page = 1, limit = 10, search = "", role = "", status = "", sort = "", order = "asc" }) => async () => {
  try {
    dispatch(startLoading());
    const accessToken = localStorage.getItem("accessToken");
    let query = `?page=${page}&limit=${limit}`;

if (search) query += `&search=${search}`;
if (role) query += `&role=${role}`;
if (status) query += `&status=${status}`;
if (sort && order) query += `&sort_by=${sort}&sort_order=${order}`;


    const { data } = await axios.get(`admin/users${query}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(setUsers(data.data));
  } catch (err) {
    dispatch(setError(err?.response?.data?.message || "Something went wrong."));
  }
};

// Ban/Unban user
export const toggleUserStatus = createAsyncThunk(
  "users/toggleUserStatus",
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.put(`/admin/user/${userId}/status`, {
        status, // Use status directly, don't flip here
      }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      toast.success(`User ${status === "banned" ? "banned" : "unbanned"} successfully`);
      return response.data;
    } catch (error) {
      toast.error("Failed to update user status");
      return rejectWithValue(error.response.data);
    }
  }
);

//udate user role
export const toggleUserrole = createAsyncThunk(
  "users/toggleUserRole",
  async ({ userId, newRole }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.put(`/admin/users/${userId}/role`, { role: newRole }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      toast.success(`User role updated successfully`);
      return response.data;
    } catch (error) {
      toast.error("Failed to update user role");
      return rejectWithValue(error.response.data);
    }
  }
);

export function getAllFreelancers(page = 1, perPage = 10) {
  return async () => {
    const accessToken = localStorage.getItem("accessToken");
    dispatch(startLoading());
    try {
      const response = await axios.get(`users/freelancer?page=${page}&per_page=${perPage}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(getUsersSuccess(response.data));
    } catch (error) {
      dispatch(hasGetError(error?.response?.data?.message || error.message));
>>>>>>> d918fe2 (cahnges by abdul qavi)
    }
  };
}
