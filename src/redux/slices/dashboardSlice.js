import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

// ------------------ Async Thunks ------------------

// Fetch user stats
export const fetchUserStats = createAsyncThunk(
  'dashboard/fetchUserStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/user/stats', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user stats');

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch user activities
export const fetchUserActivities = createAsyncThunk(
  'dashboard/fetchUserActivities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/user/activities', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user activities');

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add user tags
export const addUserTag = createAsyncThunk(
  'dashboard/addUserTag',
  async ({ data }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post('skill', data, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.data.status) {
        return rejectWithValue(response?.data?.message || 'Tag add failed');
      }

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.message || 'Something went wrong');
    }
  }
);

// Get user tags
export const fetchUserTags = createAsyncThunk(
  'dashboard/fetchUserTags',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('skill', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to fetch tags');
    }
  }
);

// ------------------ Initial State ------------------

const initialState = {
  isLoading: false,
  isLoadingSkills: false,
  getError: null,
  tagsList: [],
  userDetail: {},
  userStats: null,
  activities: [],
  error: null,
};

// ------------------ Slice ------------------

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetErrors(state) {
      state.getError = null;
      state.error = null;
    },
    setUserDetail(state, action) {
      state.userDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // ====== Fetch User Stats ======
      .addCase(fetchUserStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userStats = action.payload;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ====== Fetch User Activities ======
      .addCase(fetchUserActivities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserActivities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities = action.payload;
      })
      .addCase(fetchUserActivities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ====== Add Tag ======
      .addCase(addUserTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUserTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetail = action.payload; // Assuming response returns user detail
      })
      .addCase(addUserTag.rejected, (state, action) => {
        state.isLoading = false;
        state.getError = action.payload;
      })

      // ====== Fetch Tags ======
      .addCase(fetchUserTags.pending, (state) => {
        state.isLoadingSkills = true;
      })
      .addCase(fetchUserTags.fulfilled, (state, action) => {
        state.isLoadingSkills = false;
        state.tagsList = action.payload;
      })
      .addCase(fetchUserTags.rejected, (state, action) => {
        state.isLoadingSkills = false;
        state.getError = action.payload;
      });
  },
});

// ------------------ Exports ------------------

export const { resetErrors, setUserDetail } = dashboardSlice.actions;
export default dashboardSlice.reducer;
