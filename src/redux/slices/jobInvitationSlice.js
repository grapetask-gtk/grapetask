import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

const initialState = {
  invitations: [],
  isLoadingInvitations: false,
  error: null,
};

// ✅ Fetch job invitations
export const fetchJobInvitations = createAsyncThunk(
  "jobInvitation/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const userDataRaw = localStorage.getItem("UserData");
      const userId = userDataRaw ? JSON.parse(userDataRaw).id : null;

      if (!userId) throw new Error("User ID not found");

      const { data } = await axios.get(`/expert/${userId}/job-invitations`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!data?.job_invitations) {
        throw new Error("Invalid response structure");
      }

      return data.job_invitations;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Accept job invitation
export const acceptJobInvitation = createAsyncThunk(
  "jobInvitation/accept",
  async (invitationId, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("Authentication required");

      const { data } = await axios.post(
        `/expert/job-invitations/${invitationId}/accept`,
        { invitation_id: invitationId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (!data?.message) {
        throw new Error("Invalid response structure");
      }

      return { message: data.message, invitationId };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Reject job invitation
export const rejectJobInvitation = createAsyncThunk(
  "jobInvitation/reject",
  async ({ invitationId, reason }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("Authentication required");
      if (!reason.trim()) throw new Error("Rejection reason is required");

      const { data } = await axios.post(
        `/expert/job-invitations/${invitationId}/reject`,
        { reason, invitation_id: invitationId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (!data?.message) {
        throw new Error("Invalid response structure");
      }

      return { message: data.message, invitationId, reason };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const jobInvitationSlice = createSlice({
  name: "jobInvitation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchJobInvitations.pending, (state) => {
        state.isLoadingInvitations = true;
        state.error = null;
      })
      .addCase(fetchJobInvitations.fulfilled, (state, action) => {
        state.invitations = action.payload; // ✅ payload is already array
        state.isLoadingInvitations = false;
      })
      .addCase(fetchJobInvitations.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoadingInvitations = false;
        toast.error(action.payload); // ✅ Added toast for fetch errors too
      })

      // ACCEPT
      .addCase(acceptJobInvitation.pending, (state) => {
        state.isLoadingInvitations = true;
        state.error = null;
      })
      .addCase(acceptJobInvitation.fulfilled, (state, action) => {
        const { invitationId } = action.payload; // ✅ FIXED bug
        state.invitations = state.invitations.map((inv) =>
          inv.id === invitationId ? { ...inv, status: "accepted" } : inv
        );
        state.isLoadingInvitations = false;
        toast.success("Invitation accepted!"); // ✅ kept toast
      })
      .addCase(acceptJobInvitation.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoadingInvitations = false;
        toast.error(action.payload); // ✅ kept toast
      })

      // REJECT
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
        toast.success("Invitation rejected."); // ✅ kept toast
      })
      .addCase(rejectJobInvitation.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoadingInvitations = false;
        toast.error(action.payload); // ✅ kept toast
      });
  },
});

export default jobInvitationSlice.reducer;
