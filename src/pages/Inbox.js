import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ChatWindow from "../components/ChatWindow"; // We'll create this component
import Navbar from "../components/Navbar";
import { fetchConversations } from "../redux/slices/messageSlice"; // Updated action

const FreelanceInbox = () => {
  const dispatch = useDispatch();
  const [selectedConversation, setSelectedConversation] = useState(null);
  
  // get conversations from Redux store (modified from messages)
  const { conversations, loading } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  // Handler for when a conversation is clicked
  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div className="inbox-container">
      <Navbar FirstNav="none" />
      
      <div className="inbox-content">
        <div className="conversations-sidebar">
          <h2 className="inbox-title">Conversations</h2>
          
          {loading ? (
            <p className="loading-text">Loading conversations...</p>
          ) : (
            <div className="conversations-list">
              {conversations?.length > 0 ? (
                conversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`conversation-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
                    onClick={() => handleConversationClick(conversation)}
                  >
                    <div className="conversation-avatar">
                      {conversation.user.avatar ? (
                        <img src={conversation.user.avatar} alt={conversation.user.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {conversation.user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="conversation-details">
                      <div className="conversation-name">{conversation.user.name}</div>
                      <div className="conversation-preview">
                        {conversation.lastMessage?.text.length > 30
                          ? `${conversation.lastMessage.text.substring(0, 30)}...`
                          : conversation.lastMessage?.text || "No messages yet"}
                      </div>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <div className="unread-badge">{conversation.unreadCount}</div>
                    )}
                  </div>
                ))
              ) : (
                <p className="no-conversations">No conversations found.</p>
              )}
            </div>
          )}
        </div>
        
        <div className="chat-area">
          {selectedConversation ? (
            {/* <ChatWindow conversation={selectedConversation} /> */}
          ) : (
            <div className="select-conversation-prompt">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .inbox-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        
        .inbox-content {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        
        .conversations-sidebar {
          width: 300px;
          border-right: 1px solid #e0e0e0;
          overflow-y: auto;
          background-color: #f8f9fa;
        }
        
        .inbox-title {
          padding: 15px;
          margin: 0;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .conversations-list {
          padding: 10px;
        }
        
        .conversation-item {
          display: flex;
          align-items: center;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 5px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .conversation-item:hover {
          background-color: #eaeaea;
        }
        
        .conversation-item.active {
          background-color: #e1f5fe;
        }
        
        .conversation-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 12px;
          background-color: #3498db;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
        }
        
        .conversation-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .conversation-details {
          flex: 1;
        }
        
        .conversation-name {
          font-weight: bold;
          margin-bottom: 3px;
        }
        
        .conversation-preview {
          font-size: 0.85rem;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .unread-badge {
          background-color: #ff5722;
          color: white;
          font-size: 0.75rem;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 20px;
          text-align: center;
        }
        
        .chat-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          background-color: #ffffff;
        }
        
        .select-conversation-prompt {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #666;
          font-size: 1.1rem;
        }
        
        .loading-text, .no-conversations {
          padding: 15px;
          color: #666;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default FreelanceInbox;