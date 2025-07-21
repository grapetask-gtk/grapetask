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
      // BD Orders (FIXED)
      .addCase(AllBdOrders.pending, (state) => {
        state.isLoading = true;
      })
.addCase(AllBdOrders.fulfilled, (state, action) => {
  state.isLoading = false;
  // Store the array directly, not nested in data property
  state.bdOrders = action.payload; 
})   
.addCase(AllBdOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.getError = action.payload;
      })

      .addCase(ApproveOrderPayment.fulfilled, (state, action) => {
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
      })

      // Order Submit
.addCase(OrderSubmit.pending, (state) => {
  state.isLoading = true;
})
.addCase(OrderSubmit.fulfilled, (state, action) => {
  state.isLoading = false;
  // Optionally update relevant order in orderDetail
  const updatedOrders = state.orderDetail.map(order =>
    order.id === action.payload.id ? action.payload : order
  );
  state.orderDetail = updatedOrders;
})
.addCase(OrderSubmit.rejected, (state, action) => {
  state.isLoading = false;
  state.getError = action.payload;
})

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
// Thunks
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
      return rejectWithValue(
        error?.response?.data?.message || error.message
      );
    }
  }
);

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

// FIXED BD Orders Thunk

export const AllBdOrders = createAsyncThunk(
  'order/getAllBdOrders',
  async (_, { rejectWithValue }) => {
    try {
      console.log('=== BD ORDERS THUNK STARTED ===');
      
      const accessToken = localStorage.getItem("accessToken");
      const userData = JSON.parse(localStorage.getItem("UserData") || '{}');

      console.log('User data:', userData);

      if (!userData?.id) {
        console.log('ERROR: Missing user ID');
        throw new Error('Missing user ID');
      }

      const response = await axios.get("bd/order", {
        params: { bd_id: userData.id },
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      console.log('=== BD ORDERS API RESPONSE ===');
      console.log('Full response:', response);
      console.log('Response data:', response.data);
      console.log('Response data.data:', response.data.data);
      
      // Make sure we're returning the actual array
      const ordersData = response.data?.data || [];
      console.log('Returning orders data:', ordersData);
      console.log('Orders data length:', ordersData.length);
      
      return ordersData;
     
    } catch (error) {
      console.log('=== BD ORDERS THUNK ERROR ===');
      console.log('Error:', error);
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const ApproveOrderPayment = createAsyncThunk(
  'order/approvePayment',
  async (orderId, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `order/verify/${orderId}`,
        { status: "Project Started" },
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

export const OrderSubmit = createAsyncThunk(
  'order/submit',
  async ({ orderId, payload, onUploadProgress }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        `order/submit`,
        payload,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
          onUploadProgress // this will come from the component
        }
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);


   
export const OrderComplete = createAsyncThunk(
  'order/complete',
  async ({ orderId, payload }, { rejectWithValue }) => {  // 👈 Destructure arguments
    try {
      const accessToken = localStorage.getItem("accessToken");
      
      // Convert FormData to URL-encoded format
      const params = new URLSearchParams();
      params.append('status', payload.get('status'));
      params.append('order_id', payload.get('order_id'));
      
      const response = await axios.post(
        `order/complete`,  // Endpoint without ID in URL
        params,  // Send as URL-encoded form data
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
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
export const ReviewSubmit = createAsyncThunk(
  'order/submit',
  async (payload, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(`order/complete`, payload, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + accessToken,
        }
      });

      if (!response.data.status) {
        return rejectWithValue(response?.data?.message);
      }

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

 


//       const response = await axios.post(API_URL, formData, {
//   onUploadProgress: progressEvent => {
//     const percentCompleted = Math.round(
//       (progressEvent.loaded * 100) / progressEvent.total
//     );
//     setUploadProgress(prev => ({
//       ...prev,
//       [file.name]: percentCompleted
//     }));
//   }
// });


//       return response.data.data; // success payload
//     } catch (error) {
//       console.error("OrderSubmit Error:", error);
//       return rejectWithValue(error?.response?.data?.message || error.message);
//     }
//   }
// );

