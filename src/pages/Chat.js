import {
    AttachFile,
    InsertEmoticon,
    Send
} from "@mui/icons-material";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, sendMessage } from "../redux/slices/messageSlice";
  
  const emojis = ['😊', '👍', '❤️', '🎉', '🔥', '😂', '🤔', '👏'];
  
  const ChatPage = () => {
    const [messageInput, setMessageInput] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");
    
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.message.messages) || [];
    const loading = useSelector((state) => state.message.loading);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
  
    const currentUser = { name: "User", id: "user-id" };
    const otherUser = { name: "Support", id: "support-id" };
  
    // Fetch messages when component mounts
    useEffect(() => {
      dispatch(fetchMessages());
    }, [dispatch]);
  
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
    const handleSendMessage = (e) => {
      e.preventDefault();
      setError("");
  
      // For file/image message
      if (selectedFile) {
        // Validate file size (limit to 10MB as per backend)
        if (selectedFile.size > 10 * 1024 * 1024) {
          setError("File size exceeds 10MB limit");
          return;
        }
  
        console.log("Sending file message:", {
          message_type: "image",
          file: selectedFile
        });
  
        dispatch(
          sendMessage({
            message_type: "image",
            file: selectedFile,
            // Include a message with the image if there's text input
            message: messageInput.trim() || "Image attachment"
          })
        );
        
        setSelectedFile(null);
        setMessageInput("");
      } 
      // For text message
      else if (messageInput.trim()) {
        console.log("Sending text message:", {
          message_type: "text",
          message: messageInput.trim()
        });
  
        dispatch(
          sendMessage({
            message_type: "text",
            message: messageInput.trim()
          })
        );
        
        setMessageInput("");
      }
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
          setError("Please select a valid file type (JPG, PNG, GIF, PDF, DOC, DOCX)");
          return;
        }
        setSelectedFile(file);
      }
    };
  
    const formatTime = (timestamp) => {
      try {
        return new Date(timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch (error) {
        console.error("Invalid timestamp:", timestamp);
        return "";
      }
    };
  
    // Handle clicking outside emoji picker to close it
    const emojiPickerRef = useRef(null);
    useEffect(() => {
      function handleClickOutside(event) {
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
          setShowEmojiPicker(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [emojiPickerRef]);
  
    // Function to determine if a message content is a URL (for displaying images)
    const isImageUrl = (content) => {
      if (!content) return false;
      return content.match(/\.(jpeg|jpg|gif|png)$/) !== null;
    };
  
    return (
      <div className="container-fluid my-lg-5 my-4">
        <div className="row justify-content-center">
          <div className="col-11">
            <Typography variant="h4" className="cocon blackcolor mb-4">
              Support Chat
            </Typography>
            
            <Card className="shadow-sm rounded-3">
              {/* Header */}
              <CardHeader
                avatar={
                  <Avatar className="bg-primary text-white">
                    {otherUser.name.charAt(0)}
                  </Avatar>
                }
                title={<Typography variant="h6">Chat with Support</Typography>}
                subheader={loading ? "Typing..." : "Online"}
                className="border-bottom"
              />
  
              {/* Messages */}
              <CardContent className="bg-light" style={{ height: "60vh", overflowY: "auto" }}>
                {error && (
                  <Alert severity="error" onClose={() => setError("")} className="mb-3">
                    {error}
                  </Alert>
                )}
                
                {Array.isArray(messages) && messages.length === 0 && (
                  <Typography variant="body2" className="text-center text-muted py-4">
                    Start the conversation...
                  </Typography>
                )}
  
                {Array.isArray(messages) && messages.map((msg, index) => {
                  // Determine if the user is the sender
                  const isUserSender = msg.user_id !== 1; // Assuming admin_id is 1
                  
                  return (
                    <div
                      key={index}
                      className={`d-flex ${isUserSender ? "justify-content-end" : "justify-content-start"} mb-3`}
                    >
                      {!isUserSender && (
                        <Avatar className="me-2 bg-secondary">
                          {otherUser.name.charAt(0)}
                        </Avatar>
                      )}
                      
                      <div
                        className={`p-3 rounded-4 ${
                          isUserSender ? "bg-primary text-white" : "bg-white border"
                        }`}
                        style={{ maxWidth: "70%" }}
                      >
                        {/* Handle text messages */}
                        {msg.message_type === "text" && (
                          <Typography variant="body1" className="mb-1">
                            {msg.message}
                          </Typography>
                        )}
                        
                        {/* Handle image messages - if message is a URL to an image */}
                        {msg.message_type === "image" && isImageUrl(msg.message) && (
                          <div>
                            <img 
                              src={msg.message} 
                              alt="Attachment" 
                              className="w-100 rounded-2 mb-2"
                              style={{ maxHeight: "200px", objectFit: "contain" }}
                            />
                          </div>
                        )}
                        
                        {/* For non-image files that still have a message */}
                        {msg.message_type === "image" && !isImageUrl(msg.message) && (
                          <Typography variant="body1" className="mb-1">
                            <a 
                              href={msg.message} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={isUserSender ? "text-white" : "text-primary"}
                            >
                              File Attachment
                            </a>
                          </Typography>
                        )}
                        
                        <Typography variant="caption" className={isUserSender ? "text-light" : "text-muted"}>
                          {formatTime(msg.created_at || msg.timestamp)}
                        </Typography>
                      </div>
  
                      {isUserSender && (
                        <Avatar className="ms-2 bg-primary">
                          {currentUser.name.charAt(0)}
                        </Avatar>
                      )}
                    </div>
                  );
                })}
                 
                <div ref={messagesEndRef} />
              </CardContent>
  
              {/* Input Area */}
              <div className="p-3 border-top position-relative">
                {showEmojiPicker && (
                  <div 
                    ref={emojiPickerRef}
                    className="position-absolute bottom-100 start-0 bg-white border shadow-sm p-2 rounded-3 mb-2"
                  >
                    <div className="d-flex flex-wrap gap-2" style={{ width: "250px" }}>
                      {emojis.map((emoji) => (
                        <IconButton
                          key={emoji}
                          onClick={() => {
                            setMessageInput((prev) => prev + emoji);
                          }}
                          size="small"
                        >
                          {emoji}
                        </IconButton>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedFile && (
                  <Box className="mb-2 d-flex align-items-center">
                    <Box className="border rounded p-2 d-flex align-items-center">
                      <Typography variant="body2" className="me-2">
                        Selected file: {selectedFile.name}
                      </Typography>
                      <Button 
                        size="small" 
                        color="error" 
                        onClick={() => setSelectedFile(null)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                )}
                
                <form onSubmit={handleSendMessage} className="d-flex align-items-center gap-2">
                  <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <InsertEmoticon />
                  </IconButton>
  
                  <IconButton onClick={() => fileInputRef.current?.click()}>
                    <AttachFile />
                  </IconButton>
                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    accept="image/jpeg,image/png,image/jpg,image/gif,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                  />
  
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-grow-1"
                  />
  
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading || (!messageInput.trim() && !selectedFile)}
                    className="ms-2"
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : <Send />}
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };
  
  export default ChatPage;