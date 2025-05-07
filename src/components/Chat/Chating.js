import React, { useEffect, useState, useRef } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import user from "../../assets/chatImg.webp";
import videos from "../../assets/VideoCall.webp";
import voice from "../../assets/VoiceCall.webp";
import { AiOutlineLink } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import { BsEmojiSmile, BsThreeDotsVertical } from "react-icons/bs";
import { IoMdAttach } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa";
import { Button } from "@mui/material";
import Pusher from "pusher-js";

const Chating = ({ handlevideo, video }) => {
  const inputReference = useRef(null);
  const scrollRef = useRef(null);
  const [getInputVal, setGetInputVal] = useState("");
  const [text, setText] = useState([]);
  const [showDail, setShowDail] = useState(false);

  // Pusher configuration
  const pusher_key = "9f595c24255fa4029398";
  const channel_name = "my-channel";
  const event_name = "chat-message-sent";

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher(pusher_key, {
      cluster: "mt1",
      encrypted: true,
    });

    // Subscribe to the channel
    const channel = pusher.subscribe(channel_name);

    // Listen for the event
    channel.bind(event_name, (data) => {
      setText((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup
    return () => {
      pusher.unsubscribe(channel_name);
      pusher.disconnect();
    };
  }, []);

  // Send message
  const sendMessage = () => {
    if (!getInputVal) return;

    const newMessage = {
      user: "admin", // or "user" depending on the sender
      message: getInputVal,
      name: "Admin", // or the user's name
    };

    // Simulate sending the message to Pusher (you would typically send this to your backend)
    setText((prevMessages) => [...prevMessages, newMessage]);
    setGetInputVal("");

    // Clear input and focus
    inputReference.current.focus();
  };

  // Handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  // Toggle dial (for mobile)
  const toggleDail = () => {
    setShowDail(!showDail);
  };

  return (
    <div className="h-100 poppins">
      <div className="cahting h-100">
        <div className="card h-100 justify-content-between">
          <div>
            <div className="scroll px-3">
              {text.length > 0 ? (
                text.map((curelem, ind) => (
                  <div
                    key={ind}
                    className={`d-flex justify-content-${
                      curelem.user === "admin" ? "end" : "start"
                    } mb-4 position-relative p-3 ${
                      curelem.user === "admin" ? "user-msg" : "my-msg"
                    }`}
                  >
                    <div>
                      <img
                        src={user}
                        width={42}
                        className="user_img_msg"
                        alt="user"
                      />
                    </div>
                    <div
                      className={`msg_cotainer${
                        curelem.user === "admin" ? "" : "_user"
                      } ps-lg-3 ps-md-3 ps-4`}
                    >
                      <p
                        className="fw-medium font-16 mb-1"
                        style={{ color: "#1D2B3C" }}
                      >
                        {curelem.name}{" "}
                        <span className="msg-time ms-3">13.00</span>
                      </p>
                      <p className="font-12">{curelem.message}</p>
                      {curelem.user === "admin" && (
                        <Button type="button" className="px-3 mb-lg-3 font-14">
                          View Detail
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <h3 className="mt-5">
                  Please Select any Chat to view messages
                </h3>
              )}
            </div>
          </div>

          <div className="p-3">
            <div className="card-footer pt-0 pb-0 border-0 rounded-3 position-relative">
              <div className="call-option">
                <div>
                  <img
                    src={videos}
                    width={30}
                    height={30}
                    style={{ cursor: "pointer" }}
                    onClick={handlevideo}
                    alt="video"
                  />
                </div>
                <img
                  src={voice}
                  width={30}
                  className="mt-2"
                  height={30}
                  alt="voice"
                />
              </div>

              {showDail && (
                <div
                  className="chat-icons bg-gray mobile-link"
                  style={{ width: "fit-content" }}
                >
                  <span className="cursor-pointer text-white">
                    <IoMdAttach size={20} className="ms-2" />
                  </span>
                  <span className="cursor-pointer">
                    <FaMicrophone size={20} className="mx-2 text-white" />
                  </span>
                  <span className="cursor-pointer text-white">
                    <BsThreeDotsVertical size={25} />
                  </span>
                </div>
              )}

              <div className="input-group align-items-center">
                <span
                  className={`input-group-text addIcon d-lg-none d-md-none d-block ${
                    showDail === false
                      ? "mbl-btn-rotate-befor"
                      : "mbl-btn-rotate-after"
                  }`}
                  id="basic-addon1"
                  onClick={toggleDail}
                >
                  +
                </span>
                <input
                  className="form-control type_msg font-12 pt-0 pb-0"
                  ref={inputReference}
                  id="input"
                  type="text"
                  value={getInputVal}
                  style={{ color: "black" }}
                  onChange={(e) => setGetInputVal(e.target.value)}
                  autoFocus={true}
                  placeholder="Type here...."
                  onKeyDown={handleKeyDown}
                />
                <button className="btn-snd px-1" onClick={sendMessage}>
                  <RiSendPlaneFill size={20} />
                </button>
                <span className="cursor-pointer d-lg-block d-md-block d-none">
                  <IoMdAttach size={20} color="#F16336" className="ms-2" />
                </span>
                <span className="cursor-pointer d-lg-block d-md-block d-none">
                  <FaMicrophone size={20} className="mx-2 takegraycolor" />
                </span>
                <span className="cursor-pointer d-lg-block d-md-block d-none takegraycolor">
                  <BsThreeDotsVertical size={30} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chating;
