import React, { useEffect, useState, useRef } from "react";
import user from "../../../assets/chatImg.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdAttach } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa";
import { Button } from "@mui/material";
import BasicPromo from "../BasicPromo";
const Chating = () => {
    const inputReference = useRef(null);
    const scrollRef = useRef(null);
    const [getInputVal, setGetInputVal] = useState("");
    //  array of objects
    const messesges = [
        {
            user: "sen",
            message:
                "I hope you're enjoying good health. I am an expert designer with more than 2 years of experience",
            name: "Aura margaret",
            key: "1",
        },
        {
            user: "rec",
            message:
                "I hope you're enjoying good health. I am an expert designer with more than 2 years of experience. ",
            name: "Aura margaret",
            key: "2",
        },

    ];
    // will ad to another array
    const [text, setText] = useState(messesges);
    //  onclick of user button
    const addItems = () => {
        if (!getInputVal) {
            // alert("add some value")
        } else {
            setText([...text, { user: "rec", message: getInputVal, name: "Ahmad" }]);
            setGetInputVal("");
            inputReference.current.focus();
        }
    };

    // let Curtime = new Date().toLocaleTimeString();

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setText([...text, { user: "sen", message: getInputVal }]);
            setGetInputVal("");
        }
    };

    // useEffect(() => {
    //     inputReference.current.focus();
    //     scrollRef.current.scrollIntoView({ behavior: "smooth" });
    // }, [getInputVal]);

    const [showDail, setShowDail] = useState(false);

    const toggleDail = () => {
        setShowDail(!showDail);
    };
// ------------video-calll---------------

    return (
        <div className="h-100 poppins">

            <div className="cahting h-100">
         
           
                <div className="card h-100 justify-content-between  ">
                 <div >
                        <div>
                            <div className="p-3">

                                <div className="rounded-3 p-3" style={{ backgroundColor: '#F5F5FF' }}>
                                    <p className="font-16 fw-medium blackcolor mb-1">Kah Tung Yong, Legends Technology</p>
                                    <p className="font-14 takegraycolor mb-0">1:50 PM GMT+7Recruiting Web & APP UI/UX Designer</p>
                                </div>
                            </div>
                            <div className="todayChat mt-2 mb-4 text-center">
                                <p class="font-14 poppins text-black credit-lines d-flex justify-content-center align-items-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wed,&nbsp;Jul&nbsp;13,&nbsp;2022&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                            </div>
                        </div>
                        <div className="scroll px-3 ">
                            <BasicPromo/>
                            <div className="todayChat mt-2 mb-4 text-center">
                            <p class="font-14 poppins text-black credit-lines d-flex justify-content-center align-items-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Service&nbsp;Started&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                            </div>
                            {text?.length > 0 &&
                                text.map((curelem, ind) => {
                                    if (curelem.user == "rec") {
                                        return (
                                            <div className="d-flex justify-content-start mb-4 position-relative  p-3 my-msg">
                                                <div className="">
                                                    <img src={user} width={42} className="user_img_msg" />
                                                </div>
                                                <div className="msg_cotainer_user ps-lg-3 ps-md-3 ps-4">
                                                    <p className=" fw-medium font-16 mb-1" style={{ color: '#1D2B3C' }}>{curelem.name}<span className="msg-time ms-3">13.00</span></p>                                                <p className="text-blue font-12">{curelem.message}</p>

                                                </div>

                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div className="d-flex justify-content-start mb-4 position-relative  p-3 user-msg">
                                                <div className="">
                                                    <img src={user} className=" user_img_msg" />
                                                </div>
                                                <div className="msg_cotainer pe-lg-3 pe-md-3 pe-4">
                                                    <p className=" fw-medium font-16 mb-1" style={{ color: '#1D2B3C' }}>{curelem.name}<span className="msg-time ms-3">13.00</span></p>
                                                    <p className=" font-12 ">{curelem.message}</p>
                                                 
                                                </div>
                                                <div ref={scrollRef} />
                                            </div>
                                        );
                                    }
                                })}

                        </div>
                    </div>
                    <div className="p-3">

                        <div className="card-footer pt-0 pb-0 border-0 rounded-3 position-relative">
                           
                            {showDail && <div className="chat-icons bg-gray mobile-link" style={{ width: 'fit-content' }}>
                               

                                <span className="cursor-pointer text-white">
                                    <IoMdAttach size={20}  className="ms-2" />
                                </span>
                                <span className="cursor-pointer">
                                    <FaMicrophone size={20} className="mx-2  text-white" />
                                </span>
                                <span className="cursor-pointer  text-white">
                                    <BsThreeDotsVertical size={25} className="" />
                                </span>
                            </div>}
                            <div className="input-group align-items-center">

                                <span className={`input-group-text addIcon d-lg-none d-md-none d-block 
                 ${showDail == false ? 'mbl-btn-rotate-befor' : 'mbl-btn-rotate-after'}`} id="basic-addon1" onClick={toggleDail}>+</span>
                                <input
                                    className="form-control type_msg font-12 pt-0 pb-0 "
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


                                <button className="btn-snd px-1" onClick={addItems}>
                                    <RiSendPlaneFill size={20} />
                                </button>

                                <span className="cursor-pointer d-lg-block d-md-block d-none">
                                    <IoMdAttach size={20} color="#F16336" className="ms-2" />
                                </span>
                                <span className="cursor-pointer d-lg-block d-md-block d-none">
                                    <FaMicrophone size={20} className="mx-2 takegraycolor" />
                                </span>
                                <span className="cursor-pointer d-lg-block d-md-block d-none takegraycolor">
                                    <BsThreeDotsVertical size={30} className="" />
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
