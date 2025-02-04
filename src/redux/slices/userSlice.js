import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";
import axios from "../../utils/axios";

const initialState = {
  isLoading: false,
  isLoadingRegister: false,
  getError: null,
  userList: [],
  userDetail: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    startLoadingRegister(state) {
      state.isLoadingRegister = true;
    },
    //STOP LOADING
    stopLoading(state) {
      state.isLoading = false;
    },
    // HAS UPDATE ERROR
    hasGetError(state, action) {
      state.isLoading = false;
      state.isLoadingRegister = false;
      state.getError = action.payload;
    },
    // GET User Success
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.isLoadingRegister = false;
      state.userList = action.payload;
    },

    // GET User DETAILS
    getUserDetailsSuccess(state, action) {
      state.isLoading = false;
      state.isLoadingRegister = false;
      state.userDetail = action.payload;
    },
  },
});
export const { getUserDetailsSuccess } = userSlice.actions;
export default userSlice.reducer;

// User Functions

//User Login
export function userLogin(data, handleClose) {
  return async () => {
    dispatch(userSlice.actions.startLoading());
    try {
      const response = await axios.post("login", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(userSlice.actions.hasGetError(response?.data?.message));
      }
      console.log(JSON.stringify(response?.data?.data));
      dispatch(userSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(userSlice.actions.hasGetError(error?.message));
    }
  };
}
//User Register
// const response = await axios.post(
//   "https://grapetask.cs24ryk.com/api/register",
//   data,
//   {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   }
// );
export function userRegister(data, handleClose) {
  return async (dispatch) => {
    dispatch(userSlice.actions.startLoadingRegister());

    console.log("🚀 Sending Data:", JSON.stringify(data, null, 2)); // ✅ Check data before sending

    try {
      const response = await axios.post(
        "https://portal.grapetask.co/api/register",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ API Response:", JSON.stringify(response.data, null, 2)); // ✅ Check response

      handleClose(response.data);

      if (!response.data.status) {
        dispatch(userSlice.actions.hasGetError(response?.data?.message));
      }

      dispatch(userSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      console.error("❌ API Error:", error?.response?.data || error.message); // ✅ Log full error

      handleClose(error);

      dispatch(
        userSlice.actions.hasGetError(
          error.response?.data?.message || error.message
        )
      );
    }
  };
}

export function userForgot(data, handleClose) {
  return async (dispatch) => {
    dispatch(userSlice.actions.startLoading());

    try {
      const response = await axios.post(
        "https://portal.grapetask.co/api/forgot-password",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.status) {
        console.log("Response Data:", response.data.data);
        dispatch(userSlice.actions.getUserDetailsSuccess(response.data.data));
        handleClose(response.data);
      } else {
        dispatch(userSlice.actions.hasGetError(response.data?.message || "Unknown error"));
        handleClose(null, response.data?.message || "Unknown error");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      dispatch(userSlice.actions.hasGetError(errorMessage));
      handleClose(null, errorMessage);
    }
  };
}
//User Otp
export function userOtp(data, handleClose) {
  return async () => {
    dispatch(userSlice.actions.startLoading());
    try {
      const response = await axios.post("otp-verify", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(userSlice.actions.hasGetError(response?.data?.message));
      }
      console.log(JSON.stringify(response?.data?.data));
      dispatch(userSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(userSlice.actions.hasGetError(error?.message));
    }
  };
}
//User reset-password
export function userResetPassword(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");

    dispatch(userSlice.actions.startLoading());
    try {
      const response = await axios.post("reset-password", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(userSlice.actions.hasGetError(response?.data?.message));
      }
      console.log(JSON.stringify(response?.data?.data));
      dispatch(userSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(userSlice.actions.hasGetError(error?.message));
    }
  };
}

//Get User Details
export function getUser() {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");
    dispatch(userSlice.actions.startLoading());
    try {
      const response = await axios.get("user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });

      dispatch(userSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      dispatch(userSlice.actions.hasGetError(error?.message));
    }
  };
}

//All Users
//Get User Details
export function getAllFreelancers() {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");
    dispatch(userSlice.actions.startLoading());
    try {
      const response = await axios.get("users/freelancer", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });

      dispatch(userSlice.actions.getUsersSuccess(response.data.data));
    } catch (error) {
      dispatch(userSlice.actions.hasGetError(error?.message));
    }
  };
}
