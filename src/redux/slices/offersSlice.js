import { createSlice } from '@reduxjs/toolkit'
import { dispatch } from '../store/store'
import axios from '../../utils/axios';

const initialState = {
  offerIsLoading: false,
  isLoadingCreate: false,
  isLoadingOffer: false,
  getError: null,
  offerDetail: [],
  personalGigs: [],
  userGigs: {},
  buyerOfferlist: [],
}

const OffersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    //START LOADING
    startLoading(state) {
      state.offerIsLoading = true
    },
    startLoadingCreate(state) {
      state.isLoadingCreate = true
    },
    startLoadingOfferDetail(state) {
      state.isLoadingOffer = true
    },
    //STOP LOADING
    stopLoading(state) {
      state.offerIsLoading = false;
      state.isLoadingCreate = false;
      state.isLoadingOffer = false;
    },
 
    // HAS UPDATE ERROR
    hasGetError(state, action) {
      state.offerIsLoading = false;
      state.isLoadingCreate = false;
      state.isLoadingOffer = false;  
      state.getError = action.payload
    },

    // GET All OFFERS DETAILS
    getAllOfferDetails(state, action) {
      state.offerIsLoading = false;
      state.offerDetail = action.payload
    },
    // GET GIGS DETAILS
    getOfferGigDetails(state, action) {
      state.offerIsLoading = false;
      state.personalGigs= action.payload
    },
    // GET USER GIGS DETAILS
    getUserGigDetails(state, action) {
      state.offerIsLoading = false;
      state.userGigs= action.payload
    },
    // GET BUYER OFFER DETAILS
    getBuyerOfferDetail(state, action) {
      state.isLoadingOffer = false;
      state.buyerOfferlist= action.payload
    },
  },
})
export const { getAllOfferDetails, getOfferGigDetails ,getBuyerOfferDetail, getUserGigDetails} = OffersSlice.actions;
export default OffersSlice.reducer

// User Functions


//Invite to Job
export function inviteToJob(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')
    dispatch(OffersSlice.actions.startLoadingCreate());
    try {
      const response = await axios.post('job-invitation',
        data, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken

          }
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(OffersSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data))
      // dispatch(OffersSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(OffersSlice.actions.hasGetError(error?.message));
    }
  };
}
//Create Offer Request
export function CreateOfferRequest(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')
    dispatch(OffersSlice.actions.startLoadingCreate());
    try {
      const response = await axios.post('offer-request',
        data, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken

          }
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(OffersSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data))
      // dispatch(OffersSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(OffersSlice.actions.hasGetError(error?.message));
    }
  };
}

//Get getOfferGigs
export function getPersonalGigs(data) {
  return async () => {
     let  accessToken = localStorage.getItem('accessToken')
    dispatch(OffersSlice.actions.startLoading());
    try {
      const response = await axios.get('user-gig-detail',{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        },
        params : data
      });

      dispatch(OffersSlice.actions.getOfferGigDetails(response.data.data));
      console.log(response.data.data);
    } catch (error) {
        console.log(error?.message);

      dispatch(OffersSlice.actions.hasGetError(error?.message));
    }
  };
}
// Get get ALL OFFER Request
export function getOfferRequest() {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')
    dispatch(OffersSlice.actions.startLoading());
    try {
      const response = await axios.get('offer-request', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      });

      dispatch(OffersSlice.actions.getAllOfferDetails(response.data.data));
      console.log(response.data.data );
    } catch (error) {

      dispatch(OffersSlice.actions.hasGetError(error?.message));
      console.log(error?.message);
    }
  };
}
//Get get Offer Request
export function getBuyerOfferRequest(data) {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')
    dispatch(OffersSlice.actions.startLoadingOfferDetail());
    try {
      const response = await axios.get('buyer-offer-list', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        },
        params : data

      });

      dispatch(OffersSlice.actions.getBuyerOfferDetail(response.data.data));
    } catch (error) {

      dispatch(OffersSlice.actions.hasGetError(error?.message));
    }
  };
}


//Get getUserGigs
export function getUserGigs(data) {
  return async () => {
     let  accessToken = localStorage.getItem('accessToken')
    dispatch(OffersSlice.actions.startLoading());
    try {
      const response = await axios.get('gig-user',{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        },
        params : data
      });

      dispatch(OffersSlice.actions.getUserGigDetails(response.data.data));
      console.log(response.data.data);
    } catch (error) {
        console.log(error?.message);

      dispatch(OffersSlice.actions.hasGetError(error?.message));
    }
  };
}