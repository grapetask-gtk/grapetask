// src/redux/slices/jobInvitationSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

// --- INITIAL STATE ---
const initialState = {
  invitations: [],
  isLoadingInvitations: false,
  error: null,
};

// --- THUNKS ---
export const fetchJobInvitations = createAsyncThunk(
  "jobInvitation/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const userDataRaw = localStorage.getItem("UserData");
      const userId = userDataRaw ? JSON.parse(userDataRaw).id : null;

      const { data } = await axios.get(
        `/expert/${userId}/job-invitations`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
     

      return data; // payload for fulfilled
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load job invitations"
      );
    }
  }
);

export const acceptJobInvitation = createAsyncThunk(
  "jobInvitation/accept",
  async (invitationId, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(
        `/expert/job-invitations/${invitationId}/accept`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return invitationId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to accept invitation"
      );
    }
  }
);


// export const sendMessage = createAsyncThunk(
//   "message/send",
//   async (message, { rejectWithValue }) => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       await axios.post(
//         `message/create`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );
//       return message;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to send message"
//       );
//     }
//   }
// );

export const rejectJobInvitation = createAsyncThunk(
  "jobInvitation/reject",
  async ({ invitationId, reason }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(
        `/expert/job-invitations/${invitationId}/reject`,
        { reason },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return { invitationId, reason };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to reject invitation"
      );
    }
  }
);

// --- SLICE ---
const jobInvitationSlice = createSlice({
  name: "jobInvitation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH
    builder
      .addCase(fetchJobInvitations.pending, (state) => {
        state.isLoadingInvitations = true;
        state.error = null;
      })
      .addCase(fetchJobInvitations.fulfilled, (state, action) => {
        state.invitations = action.payload.job_invitations; // ✅ Assign the actual array
        state.isLoadingInvitations = false;
      })
      
      // .addCase(fetchJobInvitations.fulfilled, (state, action) => {
      //   state.invitations = action.payload;
      //   state.isLoadingInvitations = false;
      // })
      .addCase(fetchJobInvitations.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoadingInvitations = false;
      });

    // ACCEPT
    builder
      .addCase(acceptJobInvitation.pending, (state) => {
        state.isLoadingInvitations = true;
        state.error = null;
      })
      .addCase(acceptJobInvitation.fulfilled, (state, action) => {
        // mark that invitation as accepted in the list
        state.invitations = state.invitations.map((inv) =>
          inv.id === action.payload ? { ...inv, status: "accepted" } : inv
        );
        state.isLoadingInvitations = false;
        toast.success("Invitation accepted!");
      })
      .addCase(acceptJobInvitation.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoadingInvitations = false;
        toast.error(action.payload);
      });

    // REJECT
    builder
      .addCase(rejectJobInvitation.pending, (state) => {
        state.isLoadingInvitations = true;
        state.error = null;
      })
      .addCase(rejectJobInvitation.fulfilled, (state, action) => {
        const { invitationId, reason } = action.payload;
        state.invitations = state.invitations.map((inv) =>
          inv.id === invitationId
            ? { ...inv, status: "rejected", rejectReason: reason }
            : inv
        );
        state.isLoadingInvitations = false;
        toast.success("Invitation rejected.");
      })
      .addCase(rejectJobInvitation.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoadingInvitations = false;
        toast.error(action.payload);
      });
  },
});

export default jobInvitationSlice.reducer;
