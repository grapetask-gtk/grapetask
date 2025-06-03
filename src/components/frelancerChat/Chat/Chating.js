import { useCallback, useEffect, useRef, useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { RiFileDownloadFill, RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';

import user from "../../../assets/chatImg.webp";
import echo from "../../../echo";

import {
  downloadAuthenticatedFile,
  downloadFileDirect,
  downloadFileDirectSimple,
  downloadWithIframe,
  downloadWithNewWindow,
  fetchMessages,
  sendMessage
} from "../../../redux/slices/messageSlice";

const Chating = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const { selectedConversation, messages, loading, typingUsers } = useSelector((state) => state.message);
  const currentUser = JSON.parse(localStorage.getItem("UserData") || "{}");

  const [inputVal, setInputVal] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [downloadingFileId, setDownloadingFileId] = useState(null);

  const receiver = selectedConversation?.user ||
    selectedConversation?.users?.find(u => u?.id !== currentUser?.id);
  const receiverId = receiver?.id;

  const handleTypingWhisper = useCallback((isTyping) => {
    if (!selectedConversation?.id || !echo) return;
    const channelName = `conversation.${selectedConversation.id}`;

    try {
      echo.private(channelName)
        .whisper("typing", {
          userId: currentUser?.id,
          isTyping,
        });
    } catch (error) {
      console.error("Typing whisper error:", error);
    }
  }, [selectedConversation?.id, currentUser?.id]);

  useEffect(() => {
    if (!selectedConversation?.id || !receiverId) return;

    const interval = setInterval(() => {
      dispatch(fetchMessages({ receiverId, silent: true }));
    }, 3000);

    return () => clearInterval(interval);
  }, [dispatch, selectedConversation?.id, receiverId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputVal(value);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    if (value.length > 0) {
      handleTypingWhisper(true);
      typingTimeoutRef.current = setTimeout(() => handleTypingWhisper(false), 1000);
    } else {
      handleTypingWhisper(false);
    }
  };

  const handleSend = useCallback(() => {
    if ((!inputVal.trim() && !selectedFile) || !receiverId) return;

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    dispatch(sendMessage({
      receiver_id: receiverId,
      message_type: selectedFile ? "file" : "text",
      message: inputVal.trim(),
      file: selectedFile || null
    })).then(() => {
      dispatch(fetchMessages({ receiverId, silent: true }));
    });

    setInputVal("");
    setSelectedFile(null);
    setFilePreview(null);
    inputRef.current?.focus();
    handleTypingWhisper(false);
  }, [inputVal, receiverId, selectedFile, dispatch, handleTypingWhisper]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith("image/") || file.type.startsWith("video/") || file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onloadend = () => setFilePreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

 const handleDownload = async (filePath, fileName) => {
  // const dispatch = useDispatch();
  
  console.log('Starting download for:', filePath);
  
  try {
    // Method 1: Try Redux async thunk (fetch + axios fallback)
    await dispatch(downloadAuthenticatedFile({ filePath, fileName })).unwrap();
    console.log('Redux download successful');
    return;
  } catch (error) {
    console.log('Redux download failed:', error);
  }
  
  try {
    // Method 2: Try direct simple download
    console.log('Trying direct simple download...');
    await downloadFileDirectSimple(filePath);
    console.log('Direct simple download successful');
    return;
  } catch (error) {
    console.log('Direct simple download failed:', error);
  }
  
  try {
    // Method 3: Try direct download with query params
    console.log('Trying direct download...');
    downloadFileDirect(filePath);
    console.log('Direct download initiated');
    return;
  } catch (error) {
    console.log('Direct download failed:', error);
  }
  
  try {
    // Method 4: Try iframe download (CORS workaround)
    console.log('Trying iframe download...');
    downloadWithIframe(filePath);
    console.log('Iframe download initiated');
    return;
  } catch (error) {
    console.log('Iframe download failed:', error);
  }
  
  try {
    // Method 5: Try new window download (last resort)
    console.log('Trying new window download...');
    downloadWithNewWindow(filePath);
    console.log('New window download initiated');
    return;
  } catch (error) {
    console.log('New window download failed:', error);
    alert('All download methods failed. Please contact support.');
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  if (!selectedConversation) {
    return (
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="text-center p-4">
          <h5>Select a conversation to start chatting</h5>
          <p className="text-muted">Choose a contact from the sidebar to begin messaging</p>
        </div>
      </div>
    );
  }

  const typingUserIds = typingUsers?.[selectedConversation.id] || {};
  const isSomeoneTyping = Object.keys(typingUserIds).some(userId =>
    typingUserIds[userId] && userId !== currentUser?.id?.toString()
  );

  return (
    <div className="h-100 poppins">
      <div className="cahting h-100">
        <div className="card h-100 d-flex flex-column">
          {/* Header */}
          <div className="p-3 bg-light rounded-top">
            <div className="d-flex align-items-center">
              <img
                src={receiver?.image || user}
                width={40}
                height={40}
                alt="user"
                className="rounded-circle me-3"
                onError={(e) => { e.target.src = user; }}
              />
              <div>
                <p className="mb-0 fw-medium">{receiver?.fname || receiver?.name || "Unknown User"}</p>
                <small className="text-muted">
                  {isSomeoneTyping ? "Typing..." : "Online"}
                </small>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow-1 overflow-auto px-3 py-2">
            {loading ? (
              <div className="text-center py-3">
                <div className="spinner-border spinner-border-sm" role="status" />
                <p className="mt-2">Loading messages...</p>
              </div>
            ) : !messages?.length ? (
              <div className="text-center py-5">
                <p className="text-muted">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isUserSender = msg.sender_id === currentUser?.id;
                const messageTime = new Date(msg.created_at || Date.now());

                return (
                  <div
                    key={msg.id || `msg-${idx}`}
                    className={`d-flex mb-3 ${isUserSender ? "justify-content-end" : "justify-content-start"}`}
                  >
                    <div className={`p-2 rounded-3 position-relative ${isUserSender ? "bg-primary text-white ms-5" : "bg-light text-dark me-5"}`} style={{ maxWidth: "70%" }}>
                      <div className="mb-1 font-14">{msg.message || ""}</div>
                      {msg.file_path && (
                        <div className="mt-2">
                          {/* ✅ Enhanced file download section with multiple options */}
                          <div className="d-flex gap-2 flex-wrap">
                            <button
                              className={`btn btn-sm ${isUserSender ? "btn-outline-light" : "btn-outline-primary"}`}
                              disabled={downloadingFileId === msg.id}
                              onClick={() => handleDownload(msg)}
                              title="Download file"
                            >
                              {downloadingFileId === msg.id ? (
                                <span className="spinner-border spinner-border-sm" role="status" />
                              ) : (
                                <>📎 {msg.file_name || "Download File"}</>
                              )}
                            </button>
                            
                            {/* ✅ Alternative download button for testing */}
                            <button
                              className={`btn btn-sm ${isUserSender ? "btn-outline-light" : "btn-outline-secondary"}`}
                              onClick={() => handleDownload(msg.file_path , msg.file_name)}
                              title="Open in browser"
                              style={{ fontSize: '12px' }}
                            >
                         
      <RiFileDownloadFill size={20} />
                            </button>
                          </div>
                          
                          {/* ✅ Show file info */}
                          <small className={`d-block mt-1 ${isUserSender ? "text-white-50" : "text-muted"}`}>
                            {msg.file_name} • {msg.file_size ? `${(msg.file_size / 1024).toFixed(1)} KB` : 'Unknown size'}
                          </small>
                        </div>
                      )}
                      <div className={`d-flex align-items-center mt-1 ${isUserSender ? "justify-content-end" : "justify-content-start"}`}>
                        <small className={`font-12 ${isUserSender ? "text-white-50" : "text-muted"}`}>
                          {messageTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </small>
                        {isUserSender && (
                          <span className="ms-2">
                            {msg.read ? <span className="text-white-50">✓✓</span> : <span className="text-white-50">✓</span>}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={scrollRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-light rounded-bottom">
            <div className="input-group">
              <input
                className="form-control"
                ref={inputRef}
                value={inputVal}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type here..."
                disabled={!receiverId || loading}
              />
              <button
                className="btn btn-primary"
                onClick={handleSend}
                disabled={(!inputVal.trim() && !selectedFile) || !receiverId || loading}
              >
                <RiSendPlaneFill size={20} />
              </button>
              <IoMdAttach
                size={20}
                className="ms-2 text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => document.getElementById("fileInput").click()}
              />
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>

            {selectedFile && (
              <div className="mt-2 d-flex align-items-center">
                {filePreview ? (
                  <div className="me-2">
                    {selectedFile.type.startsWith("image/") ? (
                      <img src={filePreview} alt="preview" style={{ width: 60, height: 60, objectFit: "cover" }} />
                    ) : selectedFile.type.startsWith("video/") ? (
                      <video src={filePreview} style={{ width: 60, height: 60 }} muted />
                    ) : (
                      <small>{selectedFile.name}</small>
                    )}
                  </div>
                ) : (
                  <small className="me-2">{selectedFile.name}</small>
                )}
                <button className="btn btn-sm btn-outline-danger" onClick={() => { setSelectedFile(null); setFilePreview(null); }}>
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chating;