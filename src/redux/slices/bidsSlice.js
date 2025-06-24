import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

// Async thunk to fetch bid packages
export const getBidPackages = createAsyncThunk(
  'bids/getBidPackages',
  async (_, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('/bid-packages', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: 'Failed to fetch bid packages' }
      );
    }
  }
);

// Async thunk to purchase a bid package
export const purchaseBidPackage = createAsyncThunk(
  'bids/purchaseBidPackage',
  async (payload, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post('/purchase-bids', payload, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: 'Purchase failed' }
      );
    }
  }
);

// ✅ New async thunk to fetch bids for admin
export const getBids = createAsyncThunk(
  'bids/getBids',
  async (_, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('/admin/bids', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: 'Failed to fetch bids' }
      );
    }
  }
);

const initialState = {
  packages: [],
  bids: [],          // ✅ Added bids array
  isLoading: false,
  error: null,
};

const bidsSlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {
    // Add non-async reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // getBidPackages
      .addCase(getBidPackages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBidPackages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packages = action.payload;
      })
      .addCase(getBidPackages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || "Failed to fetch bid packages";
      })

      // purchaseBidPackage
      .addCase(purchaseBidPackage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(purchaseBidPackage.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(purchaseBidPackage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || "Purchase failed";
      })

      // ✅ getBids
      .addCase(getBids.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBids.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bids = action.payload;
      })
      .addCase(getBids.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || "Failed to fetch bids";
      });
  },
});

export default bidsSlice.reducer;
