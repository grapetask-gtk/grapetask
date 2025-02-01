import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";
import axios from "../../utils/axios";

const initialState = {
  isLoading: false,
  getError: null,
  userRating: [],
  userRatingDetain: {},
  allRating: [],
  userallRating: [],
};

const RatingSlice = createSlice({
  name: "rate",
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
    getUserRatingSuccess(state, action) {
      state.isLoading = false;
      state.userRating = action.payload;
    },
    getUserRating(state, action) {
      state.isLoading = false;
      state.userRatingDetain = action.payload;
    },
    getRating(state, action) {
      state.allRating = action.payload;
    },
    getUserAllRating(state, action) {
      state.allRating = action.payload;
    },
  },
});
export const { getUserRatingSuccess,getUserRating } = RatingSlice.actions;
export default RatingSlice.reducer;

// User Functions

//User Login
// export function userLogin(data, handleClose) {
//   return async () => {
//     dispatch(RatingSlice.actions.startLoading());
//     try {
//       const response = await axios.post("user/login", data, {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       });
//       handleClose(response.data);
//       if (!response.data.status) {
//         dispatch(RatingSlice.actions.hasGetError(response?.data?.message));
//       }
//       console.log(JSON.stringify(response?.data?.data));
//       dispatch(RatingSlice.actions.getUserRatingSuccess(response.data.data));
//     } catch (error) {
//       handleClose(error);
//       dispatch(RatingSlice.actions.hasGetError(error?.message));
//     }
//   };
// }

//Get User Details
export function sellerRating() {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");
    dispatch(RatingSlice.actions.startLoading());
    try {
      const response = await axios.get("rating-list", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken,
        },
      });
      dispatch(RatingSlice.actions.getUserRatingSuccess(response.data.data));
      const ratings = response.data.data.map((item) =>
        parseFloat(item.ratings)
      );
      dispatch(RatingSlice.actions.getRating(ratings));
    } catch (error) {
      // console.log(error.message);

      dispatch(RatingSlice.actions.hasGetError(error?.message));
    }
  };
}
export function UserRating() {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");
    dispatch(RatingSlice.actions.startLoading());
    try {
      const response = await axios.get("user-rating", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken,
        },
      });
      dispatch(RatingSlice.actions.getUserRating(response.data.data));
      const ratings = response.data.data.map((item) =>
        parseFloat(item.ratings)
      );
      dispatch(RatingSlice.actions.getUserAllRating(ratings));
    } catch (error) {
      // console.log(error.message);

      dispatch(RatingSlice.actions.hasGetError(error?.message));
    }
  };
}
