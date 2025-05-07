import { createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD
import { dispatch } from "../store/store";
import axios from "../../utils/axios";
import { getPersonalGigs, getUserGigs } from "./offersSlice";

const initialState = {
  isLoading: false,

=======
import axios from "../../utils/axios";
import { dispatch } from "../store/store";
import { getPersonalGigs } from "./offersSlice";

const initialState = {
  isLoading: false,
>>>>>>> d918fe2 (cahnges by abdul qavi)
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
<<<<<<< HEAD
    //START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    //STOP LOADING
    stopLoading(state) {
      state.isLoading = false;
    },

    // HAS UPDATE ERROR
=======
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
>>>>>>> d918fe2 (cahnges by abdul qavi)
    hasGetError(state, action) {
      state.isLoading = false;
      state.getError = action.payload;
    },
<<<<<<< HEAD

    // GET User Success
=======
>>>>>>> d918fe2 (cahnges by abdul qavi)
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload;
    },
<<<<<<< HEAD

    // GET User DETAILS
=======
>>>>>>> d918fe2 (cahnges by abdul qavi)
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
<<<<<<< HEAD
    // ====  UPDATE ==========
    // GET User DETAILS
    // getGigOverView(state, action) {
    //   state.isLoading = false;
    //   state.GigOverView = action.payload
    // },
  },
});
export const { getUserDetailsSuccess } = gigSlice.actions;
=======
  },
});

// Export Actions and Reducer correctly
export const {
  getUserDetailsSuccess,
  getUsersSuccess,
  getuserCategory,
  getuserSubCategory,
  hasGetError,
  startLoading,
  stopLoading,
} = gigSlice.actions;

>>>>>>> d918fe2 (cahnges by abdul qavi)
export default gigSlice.reducer;

// User Functions

// GIG getCategory
<<<<<<< HEAD
export function getCategory() {
  return async () => {
=======
// Update getCategory and getSubCategory thunks
export function getCategory() {
  return async () => {
    const accessToken = localStorage.getItem("accessToken");
>>>>>>> d918fe2 (cahnges by abdul qavi)
    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.get("category", {
        headers: {
<<<<<<< HEAD
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
=======
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      });
      dispatch(gigSlice.actions.getuserCategory(response.data.categories));
    } catch (error) {
      console.error("Category Error:", error.response?.data);
      dispatch(gigSlice.actions.hasGetError(error.response?.data?.message || "Failed to load categories"));
    }
  };
}

export function getSubCategory() {
  return async () => {
    const accessToken = localStorage.getItem("accessToken");
>>>>>>> d918fe2 (cahnges by abdul qavi)
    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.get("subCategory", {
        headers: {
<<<<<<< HEAD
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch(
        gigSlice.actions.getuserSubCategory(response.data.subCategories)
      );
    } catch (error) {
      dispatch(gigSlice.actions.hasGetError(error?.message));
=======
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      });
      dispatch(gigSlice.actions.getuserSubCategory(response.data.subCategories));
    } catch (error) {
      console.error("Subcategory Error:", error.response?.data);
      dispatch(gigSlice.actions.hasGetError(error.response?.data?.message || "Failed to load subcategories"));
>>>>>>> d918fe2 (cahnges by abdul qavi)
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