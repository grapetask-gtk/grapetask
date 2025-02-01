import { createSlice } from '@reduxjs/toolkit'
import { dispatch } from '../store/store'
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  isPreLoading: false,
  getError: null,
  gigsList: [],
  gigsDetail: [],
  singleGigDetail:[],
}

const allGigsSlice = createSlice({
  name: 'allGigs',
  initialState,
  reducers: {
    //START LOADING
    startLoading(state) {
      state.isLoading = true
    },
    startPreLoading(state) {
      state.isPreLoading = true
    },
    //STOP LOADING
    stopLoading(state) {
      state.isLoading = false
      state.isPreLoading = false
    },
    // HAS UPDATE ERROR
    hasGetError(state, action) {
      state.isLoading = false
      state.isPreLoading = false
      state.getError = action.payload
    },
    // GET Gigs Success
    getGigssSuccess(state, action) {
      state.isLoading = false; 
      state.isPreLoading = false; 
      state.gigsList = action.payload
    },

    // GET Gigs DETAILS
    getGigsDetailsSuccess(state, action) {
      state.isLoading = false;
      state.isPreLoading = false;
      state.gigsDetail = action.payload
    },
    getSingleGigsDetailsSuccess(state, action) {
      state.isLoading = false;
      state.isPreLoading = false;
      state.singleGigDetail = action.payload
    },
  },
})
export const { getGigsDetailsSuccess } = allGigsSlice.actions;
export default allGigsSlice.reducer


//Get Gigs Details
export function geAllGigs() {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')
    dispatch(allGigsSlice.actions.startLoading());
    try {
      const response = await axios.get('category-wise-gigs', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      });

      dispatch(allGigsSlice.actions.getGigsDetailsSuccess(response.data.data));
      console.log(response.data.data,'=======================================allGigs');
    } catch (error) {

      dispatch(allGigsSlice.actions.hasGetError(error?.message));
    }
  };
}

export function getGigDetail(gigId) {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')
    dispatch(allGigsSlice.actions.startPreLoading());
    try {
      const response = await axios.get('gig-detail/'+gigId, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      });

      dispatch(allGigsSlice.actions.getSingleGigsDetailsSuccess(response.data.data));
      console.log(response.data.data,'=======================================gig Details');
    } catch (error) {

      dispatch(allGigsSlice.actions.hasGetError(error?.message));
    }
  };
}