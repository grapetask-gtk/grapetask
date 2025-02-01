import { createSlice } from '@reduxjs/toolkit'
import { dispatch } from '../store/store'
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  isLoadingCreate: false,
  isLoadingBuyerList: false,
  getError: null,
  requestDetail: [],
  requestClientList: [],
}

const BuyerSlice = createSlice({
  name: 'buyer',
  initialState,
  reducers: {
    //START LOADING
    startLoading(state) {
      state.isLoading = true
    },
    startLoadingBuyerList(state) {
      state.isLoadingBuyerList = true
    },
    startLoadingCreate(state) {
      state.isLoadingCreate = true
    },
    //STOP LOADING
    stopLoading(state) {
      state.isLoading = false;
      state.isLoadingCreate = false;
      state.isLoadingBuyerList = false;
    },
 
    // HAS UPDATE ERROR
    hasGetError(state, action) {
      state.isLoading = false;
      state.isLoadingCreate = false;
      state.isLoadingBuyerList = false ;   
        state.getError = action.payload
    },

    // GET User DETAILS
    getUserDetailsSuccess(state, action) {
      state.isLoading = false;
      state.requestDetail = action.payload
    },
    // GET User DETAILS
    getClientDetail(state, action) {
      state.isLoadingBuyerList = false;
      state.requestClientList = action.payload
    },
  },
})
export const { getUserDetailsSuccess, getClientDetail } = BuyerSlice.actions;
export default BuyerSlice.reducer

// User Functions

//CreateBuyerRequest
export function CreateBuyerRequest(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')
    dispatch(BuyerSlice.actions.startLoadingCreate());
    try {
      const response = await axios.post('buyer-request',
        data, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken

          }
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(BuyerSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data))
      // dispatch(BuyerSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(BuyerSlice.actions.hasGetError(error?.message));
    }
  };
}

//Get getBuyerRequest
export function getBuyerRequest() {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')
    dispatch(BuyerSlice.actions.startLoading());
    try {
      const response = await axios.get('buyer-request', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      });

      dispatch(BuyerSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {

      dispatch(BuyerSlice.actions.hasGetError(error?.message));
    }
  };
}
//Get getClientRequest
export function getClientRequest(data) {
  return async () => {
    let  accessToken = localStorage.getItem('accessToken')
   dispatch(BuyerSlice.actions.startLoadingBuyerList());
   try {
     const response = await axios.get('buyer-client-list',{
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + accessToken
       },
       params : data
     });

     dispatch(BuyerSlice.actions.getClientDetail(response.data.data));
     console.log(response.data.data);
   } catch (error) {
       console.log(error?.message);

     dispatch(BuyerSlice.actions.hasGetError(error?.message));
   }
 };
}