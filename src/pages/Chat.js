// Fixed ChatPage.jsx
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
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
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

  const currentUser = JSON.parse(localStorage.getItem("UserData") || '{}');
  const otherUser = { name: "Support", id: "1" };

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    setError("");

    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit");
        return;
      }

      dispatch(sendMessage({
  message_type: "image",
  file: selectedFile,
  message: messageInput.trim() || "Image attachment"
})).then(() => {
  dispatch(fetchMessages());
});

      setSelectedFile(null);
      setMessageInput("");
    } else if (messageInput.trim()) {
      dispatch(sendMessage({
  message_type: "text",
  message: messageInput.trim()
})).then(() => {
  dispatch(fetchMessages());
});

      setMessageInput("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        'image/jpeg', 'image/png', 'image/jpg', 'image/gif',
        'application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
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

  const emojiPickerRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isImageUrl = (content) => {
    return content?.match(/\.(jpeg|jpg|gif|png)$/) !== null;
  };

  return (
      <div>
         <Navbar FirstNav="none" />
             
    <div className="container-fluid my-lg-5 my-4">
      <div className="row justify-content-center">
        <div className="col-11">
          <Typography variant="h4" className="cocon blackcolor mb-4">
            Support Chat
          </Typography>

          <Card className="shadow-sm rounded-3">
            <CardHeader
              avatar={<Avatar className="bg-primary text-white">{otherUser?.name?.charAt(0)}</Avatar>}
              title={<Typography variant="h6">Chat with Support</Typography>}
              subheader={loading ? "Typing..." : "Online"}
              className="border-bottom"
            />

            <CardContent className="bg-light" style={{ height: "60vh", overflowY: "auto" }}>
              {error && <Alert severity="error" onClose={() => setError("")}>{error}</Alert>}

              {messages?.length === 0 && (
                <Typography variant="body2" className="text-center text-muted py-4">
                  Start the conversation...
                </Typography>
              )}

              {messages?.map((msg, index) => {
                console.log('messages maped :', msg.message);
                const isUserSender = msg.sender_id === currentUser.id;


                return (
                  <div key={index} className={`d-flex ${isUserSender ? "justify-content-end" : "justify-content-start"} mb-3`}>
                    {!isUserSender && <Avatar className="me-2 bg-secondary">{otherUser?.name?.charAt(0)}</Avatar>}

                    <div
  className={`p-3 rounded-4 ${isUserSender ? 'bg-primary text-white' : 'bg-white border'}`}
  style={{ maxWidth: '70%' }}
>
  {msg.file_path ? (
    <>
      {/* If it's an image URL, render the img */}
      <img
        src={msg.file_path}
        alt="Attachment"
        className="w-100 rounded-2 mb-2"
        style={{ maxHeight: '200px', objectFit: 'contain' }}
      />

      {/* If it's a non-image file, show a download link */}
      {msg.message_type === 'file' && (
        <Typography>
          <a
            href={msg.file_path}
            target="_blank"
            rel="noopener noreferrer"
            className={isUserSender ? 'text-white' : 'text-primary'}
          >
            Download Attachment
          </a>
        </Typography>
      )}
    </>
  ) : (
    /* Otherwise it’s just plain text */
    <Typography>{msg.message}</Typography>
  )}

  <Typography
    variant="caption"
    className={isUserSender ? 'text-light' : 'text-muted'}
  >
    {formatTime(msg.created_at)}
  </Typography>
</div>


                    {isUserSender && <Avatar className="ms-2 bg-primary">{currentUser?.name?.charAt(0)}</Avatar>}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </CardContent>

            <div className="p-3 border-top position-relative">
              {showEmojiPicker && (
                <div ref={emojiPickerRef} className="position-absolute bottom-100 start-0 bg-white border shadow-sm p-2 rounded-3 mb-2">
                  <div className="d-flex flex-wrap gap-2" style={{ width: "250px" }}>
                    {emojis.map((emoji) => (
                      <IconButton key={emoji} onClick={() => setMessageInput(prev => prev + emoji)}>{emoji}</IconButton>
                    ))}
                  </div>
                </div>
              )}

              {selectedFile && (
                <Box className="mb-2 d-flex align-items-center">
                  <Box className="border rounded p-2 d-flex align-items-center">
                    <Typography variant="body2" className="me-2">Selected file: {selectedFile.name}</Typography>
                    <Button size="small" color="error" onClick={() => setSelectedFile(null)}>Remove</Button>
                  </Box>
                </Box>
              )}

              <form onSubmit={handleSendMessage} className="d-flex align-items-center gap-2">
                <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}><InsertEmoticon /></IconButton>
                <IconButton onClick={() => fileInputRef.current?.click()}><AttachFile /></IconButton>
                <input ref={fileInputRef} type="file" hidden accept="image/*,.pdf,.doc,.docx" onChange={handleFileChange} />
                <TextField fullWidth variant="outlined" placeholder="Type a message..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                <Button type="submit" variant="contained" color="primary" disabled={loading || (!messageInput.trim() && !selectedFile)}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : <Send />}
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>

</div>
  );
};

export default ChatPage;
