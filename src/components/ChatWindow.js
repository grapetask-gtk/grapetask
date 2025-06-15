import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../redux/slices/messageSlice";



const ChatWindow = ({ conversation }) => {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  // const currentUser = useSelector((state) => state.auth.user);

  const messages = conversation?.messages || []; // or however you're managing messages
  const loading = false; // adjust if you have a message-loading state

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
  // console.log("Conversation:", conversation);
}, [conversation]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      dispatch(sendMessage({
        conversationId: conversation.id,
        content: newMessage.trim()
      }));
      setNewMessage("");
    }
  };

  return (
    <>
      {/* Chat Header */}
      <div className="border-b border-gray-300 p-4 flex items-center">
        {conversation && (
          <>
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 mr-3">
              {conversation?.user?.fname?.charAt(0).toUpperCase() || "?"}
            </div>
            <div>
              <h3 className="font-medium">{conversation?.user?.fname || "Unknown"}</h3>
              <p className="text-sm text-gray-500">{conversation?.user?.status || "Online"}</p>
            </div>
          </>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {loading ? (
          <div className="flex justify-center">
            <div className="loader">Loading messages...</div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages?.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex `}
                >
                {/* ${
                    message.senderId === currentUser?.id ? "justify-end" : "justify-start"
                  }
                   */}
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg `}
                  >

                  {/* ${
                      message.senderId === currentUser?.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    } */}

                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                No messages in this conversation yet.
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-300 p-4">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatWindow;