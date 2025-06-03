import { useEffect } from "react";
import { useSelector } from "react-redux";
import userFallback from "../../../assets/chatImg.webp";


const ChatUserProfile = () => {
  const { selectedConversation } = useSelector((state) => state.message);
  const currentUser = JSON.parse(localStorage.getItem("UserData") || "{}");


  useEffect(() => {
  console.log("selectedConversation in user profile:", selectedConversation);
}, [selectedConversation]);




  const otherUser = selectedConversation?.user;
  // const otherUser = selectedConversation?.user?.id !== currentUser.id ? selectedConversation.user : null;

  if (!otherUser) {
    return (
      <div className="bg-white h-100 rounded-3 d-flex justify-content-center align-items-center">
        <p className="text-muted">Select a conversation to view profile</p>
      </div>
    );
  }

  return (
    <div className="bg-white h-100 rounded-3" style={{ boxShadow: "0px -2px 10px 0px #00000014" }}>
      <div className="d-flex p-3">
        <img
          src={otherUser?.image || userFallback}
          width={50}
          height={50}
          alt="profile"
          style={{ clipPath: "circle(50%)", objectFit: "cover" }}
        />
        <div className="ms-2 w-100">
          <p className="fw-medium font-16 mb-0" style={{ color: "#1D2B3C" }}>
            {otherUser?.fname} {otherUser.lname}
          </p>
          <p className="font-14 mb-0" style={{ color: "#667085" }}>
            {otherUser.role || "Freelancer"}
          </p>
        </div>
      </div>

      <hr className="border-0 mt-1 mb-1" style={{ height: "1.5px", opacity: "50%", backgroundColor: "#667085" }} />

      <div className="d-flex p-3 justify-content-between align-items-center">
        <p className="fw-medium font-14 mb-0" style={{ color: "#1D2B3C" }}>Orders with you</p>
        <p className="font-12 takegraycolor mb-0">Total (1)</p> {/* You can replace with dynamic count */}
      </div>

      <hr className="border-0 mt-1 mb-1" style={{ height: "1.5px", opacity: "50%", backgroundColor: "#667085" }} />

      <div className="p-3">
        <div className="d-flex justify-content-between align-items-center">
          <p className="fw-medium font-14 mb-0" style={{ color: "#1D2B3C" }}>From</p>
          <p className="font-12 takegraycolor mb-0">{otherUser?.country || "N/A"}</p>
        </div>
        <div className="d-flex mt-2 justify-content-between align-items-center">
          <p className="fw-medium font-14 mb-0" style={{ color: "#1D2B3C" }}>English</p>
          <p className="font-12 takegraycolor mb-0">{otherUser?.english_level || "Basic"}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatUserProfile;
