import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  isLoading: false,
  getError: null,
  orderDetail: [],
  orderCreateDetail: {},
  expertOrders: [],
  clientOrders: [],
  bdOrders: [],
};

const allOrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    hasGetError(state, action) {
      state.isLoading = false;
      state.getError = action.payload;
    },
    getOrderDetailsSuccess(state, action) {
      state.isLoading = false;
      state.orderDetail = action.payload;
    },
    getCreateOrderDetails(state, action) {
      state.isLoading = false;
      state.orderCreateDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Order Create
      .addCase(OrderCreate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(OrderCreate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderCreateDetail = action.payload;
      })
      .addCase(OrderCreate.rejected, (state, action) => {
        state.isLoading = false;
        state.getError = action.payload;
      })

      // All Orders
      .addCase(AllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetail = action.payload;
      })
      .addCase(AllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.getError = action.payload;
      })

      // Expert Orders
      .addCase(AllExpertOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AllExpertOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expertOrders = action.payload;
      })
      .addCase(AllExpertOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.getError = action.payload;
      })

      // Client Orders
      .addCase(AllClientOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AllClientOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clientOrders = action.payload;
      })
      .addCase(AllClientOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.getError = action.payload;
      })

      // BD Orders
      .addCase(AllBdOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AllBdOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bdOrders = action.payload;
      })
      .addCase(AllBdOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.getError = action.payload;
      })

      .addCase(ApproveOrderPayment.fulfilled, (state, action) => {
  // Update the status of the order in state.orderDetail
  const updated = state.orderDetail.map((order) =>
    order.id === action.payload.id ? action.payload : order
  );
  state.orderDetail = updated;
})
.addCase(RejectOrderPayment.fulfilled, (state, action) => {
  const updated = state.orderDetail.map((order) =>
    order.id === action.payload.id ? action.payload : order
  );
  state.orderDetail = updated;
});

  },
});

export const { 
  getOrderDetailsSuccess, 
  getCreateOrderDetails,
  startLoading,
  stopLoading,
  hasGetError 
} = allOrderSlice.actions;

export default allOrderSlice.reducer;


// ✅ Convert to createAsyncThunk
export const OrderCreate = createAsyncThunk(
  'order/create',
  async ({ data, handleClose }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post('order', data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + accessToken,
        }
      });
      
      handleClose(response.data);
      
      if (!response.data.status) {
        return rejectWithValue(response?.data?.message);
      }
      
      
      return response.data.data;
    } catch (error) {
      handleClose(error);
      return rejectWithValue(error?.message);
    }
  }
);

// Get Order Details
export const AllOrders = createAsyncThunk(
  'order/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("order", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken,
        },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const AllExpertOrders = createAsyncThunk(
  'order/getAllExpertOrders',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const userData = JSON.parse(localStorage.getItem("UserData") || '{}');

      if (!userData?.id) {
        throw new Error('Missing user ID');
      }

      const response = await axios.get('seller/order', {
        params: { seller_id: userData.id },
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

    
      return response.data.data;
    } catch (error) {
      console.error('Error fetching expert orders:', error);
      return rejectWithValue(
        error?.response?.data?.message || error.message
      );
    }
  }
);

// Client Orders
export const AllClientOrders = createAsyncThunk(
  'order/getAllClientOrders',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("order/client", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken,
        },
      });
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

// BD Orders
export const AllBdOrders = createAsyncThunk(
  'order/getAllBdOrders',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("order/bd", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken,
        },
      });
    
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

// Approve Payment
export const ApproveOrderPayment = createAsyncThunk(
  'order/approvePayment',
  async (orderId, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `order/verify/${orderId}`,
        { status: "active" },
        {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// Reject Payment
export const RejectOrderPayment = createAsyncThunk(
  'order/rejectPayment',
  async (orderId, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `order/verify/${orderId}`,
        { status: "cancelled" },
        {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);
