import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";
import axios from "../../utils/axios";

const initialState = {
  isLoading: false,
  getError: null,
  orderDetail: [],
  orderCreateDetail: {},
};

const allOrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    //START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    //STOP LOADING
    stopLoading(state) {
      state.isLoading = false;
    },
    // HAS UPDATE ERROR
    hasGetError(state, action) {
      state.isLoading = false;
      state.getError = action.payload;
    },
    // GET User DETAILS
    getOrderDetailsSuccess(state, action) {
      state.isLoading = false;
      state.orderDetail = action.payload;
    },
    getCreateOrderDetails(state, action) {
      state.isLoading = false;
      state.orderCreateDetail = action.payload;
    },

  },
});
export const { getOrderDetailsSuccess,getCreateOrderDetails } = allOrderSlice.actions;
export default allOrderSlice.reducer;

export function OrderCreate(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");
    dispatch(allOrderSlice.actions.startLoading());
    try {
      const response = await axios.post('order',
        data, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + accessToken,

          }
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(allOrderSlice.actions.hasGetError(response?.data?.message));
        
      }
      console.log(JSON.stringify(response?.data?.data))
      dispatch(allOrderSlice.actions.getCreateOrderDetails(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(allOrderSlice.actions.hasGetError(error?.message));
    }
  };
}

//Get Order Details
export function AllOrders() {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");
    dispatch(allOrderSlice.actions.startLoading());
    try {
      const response = await axios.get("order", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken,
        },
      });
      console.log(response.data.data);
      dispatch(allOrderSlice.actions.getOrderDetailsSuccess(response.data.data));
 
    } catch (error) {
      // console.log(error.message);

      dispatch(allOrderSlice.actions.hasGetError(error?.message));
    }
  };
}
