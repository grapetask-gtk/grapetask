import { createSlice } from '@reduxjs/toolkit'
import { dispatch } from '../store/store'
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  createError: null,
  updateError: null,
  getError: null,
  deleteError: null,
  userList: [],
  userDetail: {},
  myReferrals:[],
}

const profileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //START LOADING
    startLoading(state) {
      state.isLoading = true
    },
    //STOP LOADING
    stopLoading(state) {
      state.isLoading = false
    },
    //HAS CREATE ERROR
    hasCreateError(state, action) {
      state.isLoading = false
      state.createError = action.payload
    },
    //UPDATE ERROR
    hasUpdateError(state, action) {
      state.isLoading = false
      state.updateError = action.payload
    },
    // HAS UPDATE ERROR
    hasGetError(state, action) {
      state.isLoading = false
      state.getError = action.payload
    },

    // HAS UPDATE ERROR
    hasDeleteError(state, action) {
      state.isLoading = false;
      state.deleteError = action.payload
    },
    // GET User Success
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload
    },

    // GET User DETAILS
    getUserDetailsSuccess(state, action) {
      state.isLoading = false;
      state.userDetail = action.payload
    },
    getMyReferralSuccess(state, action) {
      state.isLoading = false;
      state.myReferrals = action.payload
    },
  },
})
export const { getUserDetailsSuccess } = profileSlice.actions;
export default profileSlice.reducer

// User Functions

//User profileUpdate
// export function profileUpdate(data, handleClose) {
//   return async () => {
//     let accessToken = localStorage.getItem('accessToken')

//     dispatch(profileSlice.actions.startLoading());
//     try {
//       const response = await axios.post('update-profile',
//         data, {
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + accessToken

//           }
//       });
//       handleClose(response.data);
//       if (!response.data.status) {
//         dispatch(profileSlice.actions.hasGetError(response?.data?.message));
//       }
//       // console.log(JSON.stringify(response?.data?.data))
//       dispatch(profileSlice.actions.getUserDetailsSuccess(response.data.data));
//     } catch (error) {
//       handleClose(error);
//       dispatch(profileSlice.actions.hasGetError(error?.message));
//     }
//   };
// }
//User profileUpdate
export function userProfile(data) {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')

    dispatch(profileSlice.actions.startLoading());
    try {
      const response = await axios.post('profile',
        data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      });
      // handleClose(response.data);
      if (!response.data.status) {
        dispatch(profileSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data))
      dispatch(profileSlice.actions.getUserDetailsSuccess(response.data.data));
      dispatch(profileSlice.actions.getMyReferralSuccess(response.data.referralList));

    } catch (error) {
      // handleClose(error);
      dispatch(profileSlice.actions.hasGetError(error?.message));
    }
  };
}
export function profileUpdate(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')
console.log(accessToken,'=========================================profile slice');
    dispatch(profileSlice.actions.startLoading());
    try {
      const formData = new FormData();
      data.fname && formData.append('fname', data.fname);
      data.lname && formData.append('lname', data.lname);
      data.phone && formData.append('phone', data.phone);
      data.country && formData.append('country', data.country);
      data.city && formData.append('city', data.city);
      data.state && formData.append('state', data.state);
      data.postalCode && formData.append('postalCode', data.postalCode);
      data.image && formData.append('image', data.image);
      data.device_token && formData.append('device_token', data.device_token);

      const response = await axios.post('update-profile', formData, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        },
      });

      handleClose(response.data);
      if (!response.data.status) {
        dispatch(profileSlice.actions.hasGetError(response?.data?.message));
      }
      console.log(JSON.stringify(response?.data?.data));
      dispatch(profileSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(profileSlice.actions.hasGetError(error?.message));
    }
  };
}
// ----------Change--Password----------
export function profileChangePassword(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')

    dispatch(profileSlice.actions.startLoading());
    try {
      const response = await axios.post('change-password',
        data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken

        }
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(profileSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data))
      dispatch(profileSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(profileSlice.actions.hasGetError(error?.message));
    }
  };
}
//Get Email  Verify
export function getPhoneNumberVer() {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')
    dispatch(profileSlice.actions.startLoading());
    try {
      const response = await axios.get('send-otp', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      });

      dispatch(profileSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {

      dispatch(profileSlice.actions.hasGetError(error?.message));
    }
  };
}
// -----Otp---Verify----
export function PrifileOtp(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')

    dispatch(profileSlice.actions.startLoading());
    try {
      const response = await axios.post('verify-otp',
        data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken

        }
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(profileSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data))
      dispatch(profileSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(profileSlice.actions.hasGetError(error?.message));
    }
  };
}