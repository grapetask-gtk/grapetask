import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";
import axios from "../../utils/axios";
import { getPersonalGigs, getUserGigs } from "./offersSlice";

const initialState = {
  isLoading: false,

  getError: null,
  userList: [],
  userDetail: {},
  GigOverView: {},
  userCategory: [],
  userSubCategory: [],
};

const gigSlice = createSlice({
  name: "user",
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

    // GET User Success
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload;
    },

    // GET User DETAILS
    getUserDetailsSuccess(state, action) {
      state.isLoading = false;
      state.userDetail = action.payload;
    },
    getuserSubCategory(state, action) {
      state.isLoading = false;
      state.userSubCategory = action.payload;
    },
    getuserCategory(state, action) {
      state.isLoading = false;
      state.userCategory = action.payload;
    },
    // ====  UPDATE ==========
    // GET User DETAILS
    // getGigOverView(state, action) {
    //   state.isLoading = false;
    //   state.GigOverView = action.payload
    // },
  },
});
export const { getUserDetailsSuccess } = gigSlice.actions;
export default gigSlice.reducer;

// User Functions

// GIG getCategory
export function getCategory() {
  return async () => {
    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.get("category", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      //   console.log(response.data.categories,'===res');
      // console.log('abc');
      dispatch(gigSlice.actions.getuserCategory(response.data.categories));
    } catch (error) {
      // console.log(error);
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}
// /GIG   getSubCategory
export function getSubCategory() {
  return async () => {
    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.get("subCategory", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch(
        gigSlice.actions.getuserSubCategory(response.data.subCategories)
      );
    } catch (error) {
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}
//GIG Overview
export function Overview(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");

    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.post("gig-overView", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(gigSlice.actions.hasGetError(response?.data?.message));
      }
      console.log(JSON.stringify(response?.data?.data.id));
      localStorage.setItem("id", response?.data?.data.id);
      dispatch(gigSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}
//GIG Pricing
export function Pricing(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");

    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.post("gig-package", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(gigSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data))
      dispatch(gigSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}
//GIG Description
export function Description(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");

    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.post("gig-description", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(gigSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data))
      dispatch(gigSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}
//GIG userFaqs
export function userFaqs(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");

    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.post("gig-question", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(gigSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data))
      dispatch(gigSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}
//GIG Requirements
export function Requirements(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");

    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.post("gig-requirement", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(gigSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data))
      dispatch(gigSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}
// GIG  userGallery
export function userGallery(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");

    dispatch(gigSlice.actions.startLoading());
    try {
      const formData = new FormData();
      formData.append("gig_id", data.gigID);
      formData.append("image1", data.imageFile1);
      formData.append("image2", data.imageFile2);
      formData.append("image3", data.imageFile3);
      formData.append("video", data.videoFile);
      formData.append("pdf_file1", data.pdfFile1);
      formData.append("pdf_file2", data.pdfFile2);

      const response = await axios.post("gig-gallery", formData, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });

      handleClose(response.data);
      if (!response.data.status) {
        dispatch(gigSlice.actions.hasGetError(response?.data?.message));
      }
      console.log(JSON.stringify(response?.data?.data));
      dispatch(gigSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}
// ========= Publish
export function gigPublish(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')

    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.post('gig-publish',
        data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken

        }
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(gigSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data))
      // dispatch(gigSlice.actions.getGigOverView(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}
// =============DELETE GIG===================
export function GigDelete(id) {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");

    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.post("gig-delete/" + id + "", [], {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
      // handleClose(response.data);
      if (!response.data.status) {
        dispatch(gigSlice.actions.hasGetError(response?.data?.message));
      } else {
        let userData = JSON.parse(localStorage.getItem("UserData"));
        let data = {
          user_id: userData?.id,
        };
        dispatch(getPersonalGigs(data));
      }
    } catch (error) {
      // handleClose(error);
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}
// ================
// UPDATE GIG
// ==================
// ==== GIG Overview =======
export function GigOverViewUpdate(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')

    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.post('update-gig-overView',
        data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken

        }
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(gigSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data))
      // dispatch(gigSlice.actions.getGigOverView(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}
export function GigPricingUpdate(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')

    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.post('update-gig-package',
        data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken

        }
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(gigSlice.actions.hasGetError(response?.data?.message));
      }

      // console.log(JSON.stringify(response?.data?.data))
      // dispatch(gigSlice.actions.getGigOverView(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}
export function GigDescriptionUpdate(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')

    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.post('update-gig-description',
        data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken

        }
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(gigSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data))
      // dispatch(gigSlice.actions.getGigOverView(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}
export function GigUserFaqsUpDate(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");

    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.post("update-gig-question", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(gigSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data))
      // dispatch(gigSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}
export function GigRequirmentUpdate(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')

    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.post('update-gig-requirement',
        data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken

        }
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(gigSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data))
      // dispatch(gigSlice.actions.getGigOverView(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}
export function GigUserGalleryUpdate(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");

    dispatch(gigSlice.actions.startLoading());
    try {
      const formData = new FormData();
      formData.append("gig_id", data.gigID);
      formData.append("image1", data.imageFile1);
      formData.append("image2", data.imageFile2);
      formData.append("image3", data.imageFile3);
      formData.append("video", data.videoFile);
      formData.append("pdf_file1", data.pdfFile1);
      formData.append("pdf_file2", data.pdfFile2);

      const response = await axios.post("update-gig-gallery", formData, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });

      handleClose(response.data);
      if (!response.data.status) {
        dispatch(gigSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data));
      // dispatch(gigSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}
export function GigPublishUpdate(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem('accessToken')

    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.post('update-gig-publish',
        data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken

        }
      });
      handleClose(response.data);
      if (!response.data.status) {
        dispatch(gigSlice.actions.hasGetError(response?.data?.message));
      }
      // console.log(JSON.stringify(response?.data?.data))
      // dispatch(gigSlice.actions.getGigOverView(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}