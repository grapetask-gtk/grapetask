// src/redux/slices/bidsSlice.js

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
      // Assuming the packages are in response.data.data
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
      const response = await axios.post(
        '/purchase-bids',
        payload,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      // Return entire response data or update accordingly
         console.log('response of purchasing bids ', response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: 'Purchase failed' }
      );
    }
  }
);

const initialState = {
  packages: [],
  isLoading: false,
  error: null,
};

const bidsSlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {
    // You can add non-async reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      // Handle getBidPackages actions
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
      // Handle purchaseBidPackage actions
      .addCase(purchaseBidPackage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(purchaseBidPackage.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally update user's bid balance if available in action.payload
        // For example: state.userBidBalance = action.payload.newBalance;
      })
      .addCase(purchaseBidPackage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || "Purchase failed";
      });
  },
});

export default bidsSlice.reducer;
