<<<<<<< HEAD
import { createSlice } from '@reduxjs/toolkit'
import { dispatch } from '../store/store'
=======
import { createSlice } from '@reduxjs/toolkit';
>>>>>>> d918fe2 (cahnges by abdul qavi)
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  isLoadingCreate: false,
  isLoadingBuyerList: false,
  getError: null,
  requestDetail: [],
  requestClientList: [],
<<<<<<< HEAD
}
=======
  bdList: [], // New field to store BD list
};
>>>>>>> d918fe2 (cahnges by abdul qavi)

const BuyerSlice = createSlice({
  name: 'buyer',
  initialState,
  reducers: {
<<<<<<< HEAD
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
=======
    // Loading controls
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    startLoadingCreate: (state) => {
      state.isLoadingCreate = true;
    },
    stopLoadingCreate: (state) => {
      state.isLoadingCreate = false;
    },
    startLoadingBuyerList: (state) => {
      state.isLoadingBuyerList = true;
    },
    stopLoadingBuyerList: (state) => {
      state.isLoadingBuyerList = false;
    },

    // Error handling
    hasGetError: (state, action) => {
      state.getError = action.payload;
    },

    // Data setters
    getUserDetailsSuccess: (state, action) => {
      state.requestDetail = action.payload;
      state.getError = null;
    },
    getClientDetail: (state, action) => {
      state.requestClientList = action.payload;
      state.getError = null;
    },
    // New reducer to store BD list
    getBdsSuccess: (state, action) => {
      state.bdList = action.payload;
      state.getError = null;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  startLoadingCreate,
  stopLoadingCreate,
  startLoadingBuyerList,
  stopLoadingBuyerList,
  hasGetError,
  getUserDetailsSuccess,
  getClientDetail,
  getBdsSuccess, // Exporting new action
} = BuyerSlice.actions;

export default BuyerSlice.reducer;

// Thunk Actions
export const CreateBuyerRequest = (data, handleClose) => async (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    dispatch(hasGetError('Authentication required'));
    return;
  }

  dispatch(startLoadingCreate());

  try {
    const response = await axios.post('buyer-request', data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.data.status) {
      handleClose({ success: true, data: response.data });
    } else {
      dispatch(hasGetError(response.data.message || 'Request failed'));
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(hasGetError(errorMessage));
    handleClose({ success: false, error: errorMessage });
  } finally {
    dispatch(stopLoadingCreate());
  }
};

export const getBuyerRequest = () => async (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    dispatch(hasGetError('Authentication required'));
    return;
  }

  dispatch(startLoading());

  try {
    const response = await axios.get('buyer-request', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    dispatch(getUserDetailsSuccess(response.data.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(hasGetError(errorMessage));
  } finally {
    dispatch(stopLoading());
  }
};

export const getBdBuyerRequest = () => async (dispatch) => {

  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    dispatch(hasGetError('Authentication required'));
    return;
  }

  dispatch(startLoading());

  try {
    const response = await axios.get('bd-buyer-request', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    dispatch(getUserDetailsSuccess(response.data.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(hasGetError(errorMessage));
  } finally {
    dispatch(stopLoading());
  }
};

export const getBds = () => async (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    dispatch(hasGetError('Authentication required'));
    return;
  }

  dispatch(startLoading());

  try {
    const response = await axios.get('/bds', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // Dispatch new action for BD list
    console.log('bds list  ',response.data);
    dispatch(getBdsSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(hasGetError(errorMessage));
  } finally {
    dispatch(stopLoading());
  }
};

export const getClientRequest = (data) => async (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    dispatch(hasGetError('Authentication required'));
    return;
  }

  dispatch(startLoadingBuyerList());

  try {
    const response = await axios.get('buyer-client-list', {
      params: data,
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    dispatch(getClientDetail(response.data.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(hasGetError(errorMessage));
  } finally {
    dispatch(stopLoadingBuyerList());
  }
};
>>>>>>> d918fe2 (cahnges by abdul qavi)
