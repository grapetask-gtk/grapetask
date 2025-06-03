import moment from "moment";
import userFallback from "../../../assets/chatImg.webp";

const UnRead = ({ conversation, onClick, isSelected }) => {
  const currentUser = JSON.parse(localStorage.getItem("UserData") || "{}");
  const otherUser = conversation?.user && conversation.user.id !== currentUser.id ? conversation.user : null;

const lastMessage = conversation.lastMessage || "No messages yet";

  const time = conversation.lastMessageTime
    ? moment(conversation.lastMessageTime).format("HH:mm")
    : "";

  return (
    <div
      className={`d-flex mt-3 p-3 rounded-3 ${isSelected ? "border border-primary" : ""}`}
      style={{ backgroundColor: "#F5F5FF", cursor: "pointer" }}
      onClick={onClick}
    >
      <img
        src={otherUser?.image || userFallback}
        width={50}
        height={50}
        alt="user"
        style={{ clipPath: "circle(50%)", objectFit: "cover" }}
      />

      <div className="ms-2 w-100">
        <div className="d-flex justify-content-between align-items-center">
          <p className="fw-medium font-16 mb-0" style={{ color: "#1D2B3C" }}>
            {otherUser.fname}
          </p>
          <p className="msg-time mb-0">{time}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="font-14 mb-0" style={{ color: "#667085" }}>
            {lastMessage.length > 30 ? `${lastMessage.slice(0, 30)}...` : lastMessage}
          </p>
          <p className="mb-0 msg-length">{conversation.unreadCount}</p>
        </div>
      </div>
    </div>
  );
};

export default UnRead;
