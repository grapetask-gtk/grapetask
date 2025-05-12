import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import axios from "../../utils/axios";
import { dispatch } from "../store/store";

const initialState = {
  isLoading: false,
  isLoadingRegister: false,
  getError: null,
  users: [],
  meta: {},
  userDetail: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    startLoadingRegister(state) {
      state.isLoadingRegister = true;
    },
    stopLoading(state) {
      state.isLoading = false;
      state.isLoadingRegister = false;
    },
    hasGetError(state, action) {
      state.isLoading = false;
      state.isLoadingRegister = false;
      state.getError = action.payload;
    },
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
    }
  };
}

export function userForgot(data, handleClose) {
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
    }
  };
}

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
    }
  };
}

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
    }
  };
}
