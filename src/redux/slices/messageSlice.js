import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

// New action for typing indicator
export const setUserTyping = createAction('message/setUserTyping');

// ✅ FIXED: Create or find existing conversation
export const createOrFindConversation = createAsyncThunk(
  'message/createOrFindConversation',
  async ({ participantId, jobInvitationId, initialMessage }, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.post(
        '/conversations',
        {
          participant_id: participantId,
          job_invitation_id: jobInvitationId,
          initial_message: initialMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      // ✅ FIXED: Proper status checking (200-299 are success status codes)
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

// ✅ Fetch all conversations
export const fetchConversations = createAsyncThunk(
  "message/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get("/conversations", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Fetch messages for a specific receiver or conversation
export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async ({ receiverId, silent = false }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const params = receiverId ? `?receiver_id=${receiverId}` : "";
      const res = await axios.get(`/messages${params}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      return { messages: res.data.messages, silent };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Send a message
export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (payload, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("message_type", payload.message_type);
      formData.append("message", payload.message);
      formData.append("receiver_id", payload.receiver_id);
      if(payload.offer_id){
      formData.append("offer_id", payload.offer_id);
}
      if (payload.file) {
        formData.append("file", payload.file);
      }

      const res = await axios.post("/messages", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ UPDATED: Download function with CORS handling
export const downloadAuthenticatedFile = createAsyncThunk(
  'message/downloadAuthenticatedFile',
  async ({ filePath, fileName }, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      
      // Try fetch API first (better CORS handling)
      try {
        const response = await fetch(`/api/storage/messages/${filePath}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/octet-stream',
          },
          credentials: 'same-origin', // Changed from 'include' to avoid CORS issues
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = fileName || filePath.split('/').pop() || 'download';
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        return { success: true, fileName: fileName || filePath };
      } catch (fetchError) {
        console.log('Fetch failed, trying axios...', fetchError.message);
        
        // Fallback to axios without credentials mode
        const response = await axios.get(`/storage/messages/${filePath}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/octet-stream',
          },
          responseType: 'blob',
          withCredentials: false, // Disable credentials to avoid CORS
        });
        
        const blob = new Blob([response.data], { 
          type: response.headers['content-type'] || 'application/octet-stream' 
        });
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = fileName || filePath.split('/').pop() || 'download';
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        return { success: true, fileName: fileName || filePath };
      }
    } catch (error) {
      console.error('Download error:', error);
      return rejectWithValue(error.response?.data?.message || error.message || 'Download failed');
    }
  }
);

// ✅ UPDATED: Direct download with CORS handling
export const downloadFileDirectSimple = async (filePath) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    
    // Method 1: Try with query parameter instead of header
    try {
      const response = await axios({
        method: 'GET',
        url: `/storage/messages/${filePath}?token=${accessToken}`,
        responseType: 'blob',
        withCredentials: false, // Disable to avoid CORS
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.download = filePath.split('/').pop() || 'download';
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      
      
      // Method 2: Try with header but no credentials
      const response = await axios({
        method: 'GET',
        url: `/storage/messages/${filePath}`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        responseType: 'blob',
        withCredentials: false,
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.download = filePath.split('/').pop() || 'download';
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      
      return true;
    }
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
};

// ✅ UPDATED: Direct download with multiple fallback methods
export const downloadFileDirect = (filePath) => {
  const accessToken = localStorage.getItem('accessToken');
  
  // Method 1: Try with query parameter
  try {
    const url = `/api/storage/messages/${filePath}?token=${accessToken}`;
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filePath.split('/').pop() || 'download';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error('Direct download failed:', error);
    throw error;
  }
};

// ✅ NEW: Iframe download method (CORS workaround)
export const downloadWithIframe = (filePath) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    
    // Create hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.src = `/api/storage/messages/${filePath}?token=${accessToken}&download=1`;
    
    document.body.appendChild(iframe);
    
    // Remove iframe after download initiates
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 2000);
    
    return true;
  } catch (error) {
    console.error('Iframe download failed:', error);
    throw error;
  }
};

// ✅ NEW: Window.open download method (another CORS workaround)
export const downloadWithNewWindow = (filePath) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const url = `/api/storage/messages/${filePath}?token=${accessToken}&download=1`;
    
    // Open in new window
    const newWindow = window.open(url, '_blank', 'width=1,height=1');
    
    // Close the window after a short delay
    if (newWindow) {
      setTimeout(() => {
        newWindow.close();
      }, 1000);
    }
    
    return true;
  } catch (error) {
    console.error('New window download failed:', error);
    throw error;
  }
};

const messageSlice = createSlice({
  name: "message",
  initialState: {
    conversations: [],
    selectedConversation: null,
    messages: [],
    loading: false,
    error: null,
    typingUsers: {},
    creatingConversation: false,
    downloading: false,
    downloadError: null,
    downloadSuccess: null,
  },
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    addNewMessage: (state, action) => {
      const messageExists = state.messages.some(msg => msg.id === action.payload.id);
      if (!messageExists) {
        state.messages.push(action.payload);
      }
    },
    updateMessageStatus: (state, action) => {
      const { messageId, status } = action.payload;
      const message = state.messages.find(msg => msg.id === messageId);
      if (message) {
        message.read = status;
      }
    },
    setUserTyping: (state, action) => {
      const { conversationId, userId, isTyping } = action.payload;

      if (!state.typingUsers[conversationId]) {
        state.typingUsers[conversationId] = {};
      }

      if (isTyping) {
        state.typingUsers[conversationId][userId] = true;
      } else {
        delete state.typingUsers[conversationId][userId];
      }
    },
    setMessagesForConversation: (state, action) => {
      const { conversationId, messages } = action.payload;
      state.messages = messages;
    },
    clearConversationError: (state) => {
      state.error = null;
      state.creatingConversation = false;
    },
    clearDownloadStatus: (state) => {
      state.downloadError = null;
      state.downloadSuccess = null;
    },
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
        state.error = action.payload;
      })

      // Fetch messages
      .addCase(fetchMessages.pending, (state, action) => {
        if (!action.meta.arg.silent) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload.messages || [];
        if (!action.payload.silent) {
          state.loading = false;
        }
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        if (!action.meta.arg.silent) {
          state.loading = false;
        }
        state.error = action.payload;
      })

      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        const messageExists = state.messages.some(msg => msg.id === action.payload.id);
        if (!messageExists) {
          state.messages.push(action.payload);
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create or find conversation
      .addCase(createOrFindConversation.pending, (state) => {
        state.creatingConversation = true;
        state.error = null;
      })
      .addCase(createOrFindConversation.fulfilled, (state, action) => {
        state.creatingConversation = false;
        const { conversation, participantId } = action.payload;

        if (conversation) {
          const existingIndex = state.conversations.findIndex(c => c.id === conversation.id);
          if (existingIndex !== -1) {
            state.conversations[existingIndex] = conversation;
          } else {
            state.conversations.push(conversation);
          }
          state.selectedConversation = conversation;
        } else {
          console.warn('No conversation returned from createOrFindConversation');
        }
      })
      .addCase(createOrFindConversation.rejected, (state, action) => {
        state.creatingConversation = false;
        state.error = action.payload;
      })

      // ✅ UPDATED: Download with better error handling
      .addCase(downloadAuthenticatedFile.pending, (state) => {
        state.downloading = true;
        state.downloadError = null;
        state.downloadSuccess = null;
      })
      .addCase(downloadAuthenticatedFile.fulfilled, (state, action) => {
        state.downloading = false;
        state.downloadSuccess = `File "${action.payload.fileName}" downloaded successfully`;
      })
      .addCase(downloadAuthenticatedFile.rejected, (state, action) => {
        state.downloading = false;
        state.downloadError = action.payload || 'Download failed';
      });
  },
});

// Export actions
export const { 
  setSelectedConversation, 
  clearMessages, 
  addNewMessage, 
  updateMessageStatus,
  setMessagesForConversation,
  clearConversationError,
  clearDownloadStatus
} = messageSlice.actions;

export default messageSlice.reducer;