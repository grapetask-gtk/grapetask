import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all conversations
export const fetchConversations = createAsyncThunk(
  "message/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/conversations");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch messages for a specific conversation
export const fetchMessagesByConversation = createAsyncThunk(
  "message/fetchMessagesByConversation",
  async (conversationId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/conversations/${conversationId}/messages`);
      return {
        conversationId,
        messages: response.data
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Send a new message
export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async ({ conversationId, content }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/conversations/${conversationId}/messages`, {
        content
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// For backward compatibility
export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (_, { dispatch }) => {
    // This function now just calls fetchConversations for compatibility
    return dispatch(fetchConversations());
  }
);

const initialState = {
  conversations: [],
  currentMessages: [],
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    clearCurrentMessages: (state) => {
      state.currentMessages = [];
    },
    markConversationAsRead: (state, action) => {
      const conversationId = action.payload;
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.unreadCount = 0;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch conversations
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch conversations";
      })
      
      // Fetch messages for a conversation
      .addCase(fetchMessagesByConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessagesByConversation.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMessages = action.payload.messages;
        
        // Mark conversation as read when fetching messages
        const conversation = state.conversations.find(
          c => c.id === action.payload.conversationId
        );
        
        if (conversation) {
          conversation.unreadCount = 0;
        }
      })
      .addCase(fetchMessagesByConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch messages";
      })
      
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        
        // Add new message to current messages
        state.currentMessages.push(action.payload);
        
        // Update last message in conversation list
        const conversation = state.conversations.find(
          c => c.id === action.payload.conversationId
        );
        
        if (conversation) {
          conversation.lastMessage = action.payload.content;
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send message";
      });
  },
});

export const { clearCurrentMessages, markConversationAsRead } = messageSlice.actions;
export default messageSlice.reducer;