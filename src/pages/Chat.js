import React, { useState } from "react";
import "../style/chat.scss";
import UsersChat from "../components/Chat/UsersChat";
import Chating from "../components/Chat/Chating";
import ChatUserProfile from "../components/Chat/ChatUserProfile";
import Navbar from "../components/Navbar";
import client from "../assets/client-video-call.webp";
import callEnd from "../assets/call-end.webp";
import Peer from "simple-peer";
import { useEffect } from "react";
import echo from "./echo"; // Import WebSocket config
import axios from "axios";
import videoStop from "../assets/videoStop.webp";
import mute from "../assets/callVoiceMute.webp";
import MicroStop from "../assets/callMicrophone.webp";
import Slider from "@mui/material/Slider";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { Box } from "@mui/material";

const Chat = () => {
  const [video, setVideo] = useState(false); //  State to manage video call visibility
  const [isMuted, setIsMuted] = useState(false); // State to manage mute status
  const [isVideoStopped, setIsVideoStopped] = useState(false); // State to manage video stop status
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    //  Subscribe to chat channel (Laravel broadcasts to 'chat' channel)
    echo.channel("chat").listen("MessageSent", (e) => {
      setMessages((prevMessages) => [...prevMessages, e.message]);
    });

    return () => {
      echo.leaveChannel("chat"); //  Clean up listener on unmount
    };
  }, []);

  const sendMessage = async () => {
    if (!newMessage) return;

    await axios.post("/api/send-message", { message: newMessage });
    setNewMessage(""); //  Clear input after sending
  };

  // Toggle video call
  const handleVideo = () => {
    setVideo(!video);
  };

  //  End video call
  const handleCallEnd = () => {
    setVideo(false);
    setIsMuted(false);
    setIsVideoStopped(false);
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Toggle video stop
  const toggleVideoStop = () => {
    setIsVideoStopped(!isVideoStopped);
  };

  // Prevent horizontal keyboard navigation for the volume slider
  const preventHorizontalKeyboardNavigation = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  };

  return (
    <>
      <Navbar FirstNav="none" />
      <div>
        <div className="chat-window">
          {messages.map((msg, index) => (
            <p key={index}>{msg.text}</p>
          ))}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      {/* <div className="container-fluid mt-4 poppins">
         <div className="row px-lg-3 px-md-3 mt-3 mb-3 justify-content-center">
          
           {video && (
             <div className="video-call col-10 rounded-3 p-4 position-relative d-flex justify-content-between flex-column">
           
               <div className="d-flex justify-content-end">
                 <div
                   className="position-relative"
                   style={{ width: "90px", height: "85px" }}
                 >
                   <img
                     src={client}
                     className="rounded-3 w-100 h-100"
                     alt="Client"
                   />
                   {isMuted && (
                     <img
                       src={mute}
                       className="callMuteMicero"
                       width={30}
                       height={30}
                       alt="Mute"
                     />
                   )}
                 </div>
               </div>

              
               <div className="text-center">
                 <div>
                   <img
                     src={isVideoStopped ? videoStop : client}
                     width={50}
                     height={50}
                     alt="Video Stop"
                     onClick={toggleVideoStop}
                     style={{ cursor: "pointer" }}
                   />
                   <img
                     src={callEnd}
                     className="mx-3"
                     style={{ cursor: "pointer" }}
                     onClick={handleCallEnd}
                     width={80}
                     height={70}
                     alt="Call End"
                   />
                   <img
                     src={isMuted ? MicroStop : mute}
                     width={50}
                     height={50}
                     alt="Microphone"
                     onClick={toggleMute}
                     style={{ cursor: "pointer" }}
                   />
                 </div>
               </div>

            
               <Box className="video-call-volume" sx={{ height: 200 }}>
                 <Slider
                   sx={{
                     '& input[type="range"]': {
                       WebkitAppearance: "slider-vertical",
                     },
                   }}
                   orientation="vertical"
                   defaultValue={30}
                   aria-label="Volume"
                   valueLabelDisplay="auto"
                   onKeyDown={preventHorizontalKeyboardNavigation}
                 />
                 <VolumeUp className="mt-3" />
               </Box>
             </div>
           )}

        
           {!video && (
             <>
               <div className="col-lg-3 col-12">
                 <UsersChat />
               </div>
               <div className="col-lg-6 col-12 mt-lg-0 mt-3">
                 <Chating video={video} handlevideo={handleVideo} />
               </div>
             
               <div className="col-lg-3 col-12 mt-lg-0 mt-3">
                 <ChatUserProfile />
               </div>
             </>
           )}
         </div>
       </div> */}
    </>
  );
};

export default Chat;

// const Chat = () => {
//   return (

//   );
// };
