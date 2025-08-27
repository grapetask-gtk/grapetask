import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

const initialState = {
  // Authentication state
  isAuthenticated: false,
  tokenValidated: false,
  authLoading: false,  // Separate loading state for auth checks
  authError: null,
    isLoadingCategories: false,  
  categories: [],    
  // Existing user state
  isLoading: false,
  isLoadingRegister: false,
  getError: null,
  users: [],
  userList: [],
  meta: {},
  userDetail: null,  // Changed from {} to null for better initial state
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Existing reducers
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
    
    // New auth-related reducers
    logoutUser(state) {
      state.isAuthenticated = false;
      state.userDetail = null;
      state.tokenValidated = true;
      localStorage.removeItem('accessToken');
    },
    setAuthState(state, action) {
      state.isAuthenticated = action.payload;
    },
    resetAuthError(state) {
      state.authError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Existing cases
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const updatedUser = action.payload.user;
        const index = state.users.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      
      // Enhanced auth cases
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.getError = null;
        state.authLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authLoading = false;
        state.userDetail = action.payload;
        state.isAuthenticated = true;
        state.tokenValidated = true;
        state.getError = null;
        localStorage.setItem('accessToken', action.payload.token || action.payload.access_token);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.authLoading = false;
        state.getError = action.payload;
        state.isAuthenticated = false;
        state.tokenValidated = true;
      })
      
      .addCase(validateToken.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.authLoading = false;
        state.isAuthenticated = true;
        state.tokenValidated = true;
        state.userDetail = action.payload;
      })
      .addCase(validateToken.rejected, (state) => {
        state.authLoading = false;
        state.isAuthenticated = false;
        state.tokenValidated = true;
        state.userDetail = null;
      })
      
      // Rest of your existing cases
      .addCase(userRegister.pending, (state) => {
        state.isLoadingRegister = true;
        state.getError = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoadingRegister = false;
        state.userDetail = action.payload;
        state.getError = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoadingRegister = false;
        state.getError = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.getError = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetail = action.payload;
        state.isAuthenticated = true;
        state.getError = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.getError = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.getError = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.meta = {
          current_page: action.payload.current_page,
          total_pages: action.payload.last_page,
          total: action.payload.total,
        };
        state.getError = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.getError = action.payload;
      })
      .addCase(getAllFreelancers.pending, (state) => {
        state.isLoading = true;
        state.getError = null;
      })
      .addCase(getAllFreelancers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getError = null;
        if (action.payload && action.payload.data) {
          state.userList = action.payload.data;
          state.meta = {
            current_page: action.payload.current_page || 1,
            total_pages: action.payload.last_page || 1,
            total: action.payload.total || action.payload.data.length,
          };
        } else {
          state.userList = Array.isArray(action.payload) ? action.payload : [];
        }
      })
      .addCase(getAllFreelancers.rejected, (state, action) => {
        state.isLoading = false;
        state.getError = action.payload;
        state.userList = [];
      })


 // Fetch Users
     
      // .addCase(fetchUsers.fulfilled, (state, action) => {
      //   state.isLoadingUsers = false;
      //   // Extract users from the response based on your API structure
      //   state.users = action.payload.data.users || [];
      // })


       // Fetch Categories
    .addCase(getCategories.pending, (state) => {
      state.isLoadingCategories = true;
      state.error = null;
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.isLoadingCategories = false;
      state.categories = action.payload || [];
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.isLoadingCategories = false;
      state.error = action.payload;
    });



  }
});

// Export all actions
export const {
  startLoading,
  startLoadingRegister,
  stopLoading,
  hasGetError,
  getUsersSuccess,
  getUserDetailsSuccess,
  setUsers,
  setError,
  logoutUser,
  setAuthState,
  resetAuthError
} = userSlice.actions;

// Thunks
export const validateToken = createAsyncThunk(
  'user/validateToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return rejectWithValue('No token found');
      
      const response = await axios.get('/auth/validate', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.user;
    } catch (error) {
      localStorage.removeItem('accessToken');
      return rejectWithValue(error.response?.data?.message || 'Invalid token');
    }
  }
);

// ✅ Authentication thunks
export const userLogin = createAsyncThunk(
  'user/login',
  async ({ data, handleClose }, { rejectWithValue }) => {
    try {
      const response = await axios.post("login", data);
      handleClose(response.data);
      
      if (!response.data.status) {
        return rejectWithValue(response.data.message);
      }
      
      return response.data;
    } catch (error) {
      handleClose(error);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const userRegister = createAsyncThunk(
  'user/register',
  async ({ data, handleClose }, { rejectWithValue }) => {
    try {
      const response = await axios.post("register", data);
      handleClose(response.data);
      
      if (!response.data.status) {
        return rejectWithValue(response.data.message);
      }
      
      return response.data.data;
    } catch (error) {
      handleClose(error);
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const userForgot = createAsyncThunk(
  'user/forgot',
  async ({ data, handleClose }, { rejectWithValue }) => {
    try {
      const response = await axios.post("forgot-password", data);
      
      if (!response.data.status) {
        handleClose(null, response.data.message);
        return rejectWithValue(response.data.message);
      }
      
      handleClose(response.data);
      return response.data.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      handleClose(null, message);
      return rejectWithValue(message);
    }
  }
);

export const userOtp = createAsyncThunk(
  'user/otp',
  async ({ data, handleClose }, { rejectWithValue }) => {
    try {
      const response = await axios.post("otp-verify", data);
      handleClose(response.data);
      
      if (!response.data.status) {
        return rejectWithValue(response.data.message);
      }
      
      return response.data.data;
    } catch (error) {
      handleClose(error);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const userResetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ data, handleClose }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post("reset-password", data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
      handleClose(response.data);
      
      if (!response.data.status) {
        return rejectWithValue(response.data.message);
      }
      
      return response.data.data;
    } catch (error) {
      handleClose(error);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async ({ page = 1, limit = 10, search = "", role = "", status = "", sort = "", order = "asc" }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      let query = `?page=${page}&limit=${limit}`;

      if (search) query += `&search=${search}`;
      if (role) query += `&role=${role}`;
      if (status) query += `&status=${status}`;
      if (sort && order) query += `&sort_by=${sort}&sort_order=${order}`;

      const { data } = await axios.get(`admin/users${query}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
      return data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Something went wrong.");
    }
  }
);

// Fetch Categories
export const getCategories = createAsyncThunk(
  "user/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("category"); 
      if (response.data.status) {
        return response.data.categories; // assuming API returns { status: true, categories: [...] }
      } else {
        toast.error(response.data.message || "Failed to fetch categories.");
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching categories.");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const toggleUserStatus = createAsyncThunk(
  "users/toggleUserStatus",
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.put(`/admin/user/${userId}/status`, {
        status,
      }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      toast.success(`User ${status === "banned" ? "banned" : "unbanned"} successfully`);
      return response.data;
    } catch (error) {
      toast.error("Failed to update user status");
      return rejectWithValue(error?.response?.data?.message || "Failed to update user status");
    }
  }
);

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
      return rejectWithValue(error?.response?.data?.message || "Failed to update user role");
    }
  }
);

// ✅ FIXED: getAllFreelancers with better error handling
export const getAllFreelancers = createAsyncThunk(
  'user/getAllFreelancers',
  async ({ page = 1, perPage = 10 } = {}, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      
      if (!accessToken) {
        return rejectWithValue("No access token found. Please login again.");
      }

      const response = await axios.get(`users/freelancer?page=${page}&per_page=${perPage}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
      // ✅ FIXED: Return the complete response data structure
      return response.data;
    } catch (error) {
      console.error("getAllFreelancers error:", error);
      
      if (error.response?.status === 401) {
        return rejectWithValue("Authentication failed. Please login again.");
      }
      
      return rejectWithValue(error?.response?.data?.message || error.message || "Failed to fetch freelancers");
    }
  }
);

export default userSlice.reducer;