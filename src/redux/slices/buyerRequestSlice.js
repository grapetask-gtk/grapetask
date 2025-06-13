import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  isLoadingCreate: false,
  isLoadingBuyerList: false,
  bdListLoading: false, // New loading state
  getError: null,
  requestDetail: [],
  requestClientList: [],
  bdList: [],
};

const BuyerSlice = createSlice({
  name: 'buyer',
  initialState,
  reducers: {
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
    startLoadingBds: (state) => {
      state.bdListLoading = true;
    },
    stopLoadingBds: (state) => {
      state.bdListLoading = false;
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
    getBdsSuccess: (state, action) => {
      state.bdList = action.payload.data || []; // Access data array
      state.getError = null;
      state.bdListLoading = false;
    },
    getBdsFailure: (state) => {
      state.bdListLoading = false;
    }
  },
});

export const {
  startLoading,
  stopLoading,
  startLoadingCreate,
  stopLoadingCreate,
  startLoadingBuyerList,
  stopLoadingBuyerList,
  startLoadingBds,
  stopLoadingBds,
  hasGetError,
  getUserDetailsSuccess,
  getClientDetail,
  getBdsSuccess,
  getBdsFailure
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

  dispatch(startLoadingBds());

  try {
    const response = await axios.get('/bds', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    dispatch(getBdsSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(hasGetError(errorMessage));
    dispatch(getBdsFailure());
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