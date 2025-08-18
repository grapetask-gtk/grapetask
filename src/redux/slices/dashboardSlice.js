import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

// ------------------ Async Thunks ------------------

// Fetch user stats
export const fetchUserStats = createAsyncThunk(
  'dashboard/fetchUserStats',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching user stats...');
      
      const response = await axios.get('/user/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 Raw response:', response);
      console.log('📊 Response data:', response.data);

      // Check if the response structure matches what you expect
      if (response.data && response.data.status) {
        console.log('✅ Status is true, data:', response.data.data);
        return response.data.data;
      } else {
        console.log('❌ Status is false or missing');
        return rejectWithValue(response.data?.message || 'Failed to fetch user stats');
      }
    } catch (error) {
      console.error('💥 Error in fetchUserStats:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Fetch user activities
export const fetchUserActivities = createAsyncThunk(
  'dashboard/fetchUserActivities',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching user activities...');
      
      const response = await axios.get('/user/activities', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 Activities response:', response);
      console.log('📊 Activities data:', response.data);

      if (response.data && response.data.status) {
        console.log('✅ Activities status is true, data:', response.data.data);
        return response.data.data;
      } else {
        console.log('❌ Activities status is false or missing');
        return rejectWithValue(response.data?.message || 'Failed to fetch activities');
      }
    } catch (error) {
      console.error('💥 Error in fetchUserActivities:', error);
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

      if (!response.data.status) {
        return rejectWithValue(response?.data?.message || 'Failed to fetch tags');
      }

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
        console.log('⏳ fetchUserStats pending');
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        console.log('✅ fetchUserStats fulfilled with payload:', action.payload);
        state.isLoading = false;
        state.userStats = action.payload;
        state.error = null;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        console.log('❌ fetchUserStats rejected with error:', action.payload);
        state.isLoading = false;
        state.error = action.payload;
        state.userStats = null;
      })

      // ====== Fetch User Activities ======
      .addCase(fetchUserActivities.pending, (state) => {
        console.log('⏳ fetchUserActivities pending');
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserActivities.fulfilled, (state, action) => {
        console.log('✅ fetchUserActivities fulfilled with payload:', action.payload);
        state.isLoading = false;
        state.activities = action.payload;
        state.error = null;
      })
      .addCase(fetchUserActivities.rejected, (state, action) => {
        console.log('❌ fetchUserActivities rejected with error:', action.payload);
        state.isLoading = false;
        state.error = action.payload;
        state.activities = [];
      })

      // ====== Add Tag ======
      .addCase(addUserTag.pending, (state) => {
        state.isLoading = true;
        state.getError = null;
      })
      .addCase(addUserTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetail = action.payload;
        state.getError = null;
      })
      .addCase(addUserTag.rejected, (state, action) => {
        state.isLoading = false;
        state.getError = action.payload;
      })

      // ====== Fetch Tags ======
      .addCase(fetchUserTags.pending, (state) => {
        state.isLoadingSkills = true;
        state.getError = null;
      })
      .addCase(fetchUserTags.fulfilled, (state, action) => {
        state.isLoadingSkills = false;
        state.tagsList = action.payload;
        state.getError = null;
      })
      .addCase(fetchUserTags.rejected, (state, action) => {
        state.isLoadingSkills = false;
        state.getError = action.payload;
        state.tagsList = [];
      });
  },
});

// ------------------ Exports ------------------

export const { resetErrors, setUserDetail } = dashboardSlice.actions;
export default dashboardSlice.reducer;