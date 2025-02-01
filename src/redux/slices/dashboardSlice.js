import { createSlice } from '@reduxjs/toolkit'
import { dispatch } from '../store/store'
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  isLoadingSkills: false,
  getError: null,
  tagsList : [],
  userDetail: {},
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    //START LOADING
    startLoading(state) {
      state.isLoading = true
    },
    startLoadingSkills(state) {
      state.isLoadingSkills = true
    },
    stopLoadingSkills(state) {
      state.isLoadingSkills = false
    },
    //STOP LOADING
    stopLoading(state) {
      state.isLoading = false
      state.isLoadingSkills = false
    },
    //HAS CREATE ERROR
    hasCreateError(state, action) {
      state.isLoading = false
      state.isLoadingSkills = false

      state.createError = action.payload
    },
    //UPDATE ERROR
    hasUpdateError(state, action) {
      state.isLoading = false
      state.isLoadingSkills = false

      state.updateError = action.payload
    },
    // HAS UPDATE ERROR
    hasGetError(state, action) {
      state.isLoading = false
      state.isLoadingSkills = false

      state.getError = action.payload
    },

    // HAS UPDATE ERROR
    hasDeleteError(state, action) {
      state.isLoading = false;
      state.isLoadingSkills = false

      state.deleteError = action.payload
    },


    // GET User DETAILS
    getTagsSuccess(state, action) {
      state.isLoading = false;
      state.isLoadingSkills = false
      state.tagsList = action.payload
    },
    // GET User DETAILS
    getUserDetailsSuccess(state, action) {
      state.isLoading = false;
      state.isLoadingSkills = false
      state.userDetail = action.payload
    },
  },
})
export const { getUserDetailsSuccess } = dashboardSlice.actions;
export default dashboardSlice.reducer

// User Functions

//User TagsAdd
export function TagsAdd(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')
    dispatch(dashboardSlice.actions.startLoading());
    try {
      const response = await axios.post('skill',
        data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken

        }
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(dashboardSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data))
      dispatch(dashboardSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(dashboardSlice.actions.hasGetError(error?.message));
    }
  };
}

//Get User Details
export function usergetsTags() {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')
    dispatch(dashboardSlice.actions.startLoadingSkills());
    try {
      const response = await axios.get('skill', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      });
// console.log(response.data.data);
      dispatch(dashboardSlice.actions.getTagsSuccess(response.data.data));
    } catch (error) {

      dispatch(dashboardSlice.actions.hasGetError(error?.message));
    }
  };
}
