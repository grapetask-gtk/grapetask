import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { dispatch } from "../store/store";
import { getPersonalGigs } from "./offersSlice";

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
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    hasGetError(state, action) {
      state.isLoading = false;
      state.getError = action.payload;
    },
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload;
    },
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

export default gigSlice.reducer;

// User Functions

// GIG getCategory
// Update getCategory and getSubCategory thunks
export function getCategory() {
  return async () => {
    const accessToken = localStorage.getItem("accessToken");
    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.get("category", {
        headers: {
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
    dispatch(gigSlice.actions.startLoading());
    try {
      const response = await axios.get("subCategory", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      });
      dispatch(gigSlice.actions.getuserSubCategory(response.data.subCategories));
    } catch (error) {
      console.error("Subcategory Error:", error.response?.data);
      dispatch(gigSlice.actions.hasGetError(error.response?.data?.message || "Failed to load subcategories"));
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
     
      localStorage.setItem("id", response?.data?.data.id);
      dispatch(gigSlice.actions.getUserDetailsSuccess(response.data.data));
    } catch (error) {
      handleClose(error);
      dispatch(gigSlice.actions.hasGetError(error?.message));
    }
  };
}
//GIG Pricing
// GIG Pricing - Updated to include additional details
export function Pricing(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem("accessToken");

    dispatch(gigSlice.actions.startLoading());
    try {
      // Prepare the complete data object with all fields
      const pricingData = {
        // Basic package fields
        title_basic: data.title_basic,
        source_file_basic: data.source_file_basic,
        resulation_basic: data.resulation_basic,
        ravision_basic: data.ravision_basic,
        delivery_time_basic: data.delivery_time_basic,
        total_basic: data.total_basic,
        
        // Standard package fields
        title_standard: data.title_standard,
        source_file_standard: data.source_file_standard,
        resulation_standard: data.resulation_standard,
        ravision_standard: data.ravision_standard,
        delivery_time_standard: data.delivery_time_standard,
        total_standard: data.total_standard,
        
        // Premium package fields
        title_premium: data.title_premium,
        source_file_premium: data.source_file_premium,
        resulation_premium: data.resulation_premium,
        ravision_premium: data.ravision_premium,
        delivery_time_premium: data.delivery_time_premium,
        total_premium: data.total_premium,
        
        // Additional service details
        experience_level: data.experience_level,
        languages: JSON.stringify(data.languages), // Convert array to string for API
        skills: JSON.stringify(data.skills), // Convert array to string for API
        availability: data.availability,
        response_time: data.response_time,
        supported_formats: JSON.stringify(data.supported_formats), // Convert array to string
        usage_rights: data.usage_rights,
        revisions_included: data.revisions_included ? 1 : 0, // Convert boolean to number
        support_included: data.support_included ? 1 : 0, // Convert boolean to number
        
        // Gig ID
        gig_id: data.gig_id
      };

      const response = await axios.post("gig-package", pricingData, {
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


// GIG Pricing Update - Updated to include additional details
export function GigPricingUpdate(data, handleClose) {
  return async () => {
    let accessToken = localStorage.getItem('accessToken');

    dispatch(gigSlice.actions.startLoading());
    try {
      // Prepare the complete data object with all fields
      const pricingData = {
        // Basic package fields
        title_basic: data.title_basic,
        source_file_basic: data.source_file_basic,
        resulation_basic: data.resulation_basic,
        ravision_basic: data.ravision_basic,
        delivery_time_basic: data.delivery_time_basic,
        total_basic: data.total_basic,
        
        // Standard package fields
        title_standard: data.title_standard,
        source_file_standard: data.source_file_standard,
        resulation_standard: data.resulation_standard,
        ravision_standard: data.ravision_standard,
        delivery_time_standard: data.delivery_time_standard,
        total_standard: data.total_standard,
        
        // Premium package fields
        title_premium: data.title_premium,
        source_file_premium: data.source_file_premium,
        resulation_premium: data.resulation_premium,
        ravision_premium: data.ravision_premium,
        delivery_time_premium: data.delivery_time_premium,
        total_premium: data.total_premium,
        
        // Additional service details
        experience_level: data.experience_level,
        languages: JSON.stringify(data.languages), // Convert array to string for API
        skills: JSON.stringify(data.skills), // Convert array to string for API
        availability: data.availability,
        response_time: data.response_time,
        supported_formats: JSON.stringify(data.supported_formats), // Convert array to string
        usage_rights: data.usage_rights,
        revisions_included: data.revisions_included ? 1 : 0, // Convert boolean to number
        support_included: data.support_included ? 1 : 0, // Convert boolean to number
        
        // Gig ID
        gig_id: data.gig_id
      };

      const response = await axios.post('update-gig-package', pricingData, {
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

      dispatch(gigSlice.actions.getUserDetailsSuccess(response.data.data));
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