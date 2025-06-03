import moment from "moment";
import userFallback from "../../../assets/chatImg.webp";

const ReadChat = ({ conversation, onClick, isSelected }) => {
  const currentUser = JSON.parse(localStorage.getItem("UserData") || "{}");
    const otherUser = conversation?.user && conversation.user.id !== currentUser.id ? conversation.user : null;

const lastMessage = conversation.lastMessage || "No messages yet";
  const time = conversation.lastMessage?.created_at
    ? moment(conversation.lastMessage.created_at).format("HH:mm")
    : "";

  return (
    <>
      <div
        className={`d-flex mt-3 p-3 ${isSelected ? "bg-light rounded-3" : ""}`}
        onClick={onClick}
        style={{ cursor: "pointer" }}
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
            <p className="msg-time ms-3 mb-0">{time}</p>
          </div>
          <p className="font-14 mb-0" style={{ color: "#667085" }}>
            {lastMessage.length > 30 ? `${lastMessage.slice(0, 30)}...` : lastMessage}
          </p>
        </div>
      </div>
      <hr
        className="border-0 mt-1 mb-1"
        style={{ height: "2px", opacity: "50%", backgroundColor: "#667085" }}
      />
    </>
  );
};

export default ReadChat;
