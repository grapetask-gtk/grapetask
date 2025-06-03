// import React, { useState } from "react";
// import { useDispatch, useSelector } from "../redux/store/store";
// import logo1 from "../assets/logo.webp";
// import line from "../assets/line.webp";
// import join from "../assets/join.webp";
// import "../App.css";
// import dropdownimg from "../assets/grapetask.webp";
// import { Link, NavLink, json, useNavigate } from "react-router-dom";
// import notifaction from "../assets/Autolayout.webp";
// import profil from "../assets/profil.webp";
// import { AiOutlineQuestionCircle } from "react-icons/ai";
// import {
//   FaAngleDown,
//   FaAngleUp,
//   FaCircle,
//   FaRegEnvelope,
//   FaSearch,
//   FaUserAlt,
//   FaUserCircle,
// } from "react-icons/fa";
// // import { SetRole } from '../redux/slices/roleSlice'
// import search from "../assets/searchbar.webp";
// import { IoNotificationsOutline } from "react-icons/io5";

// const Navbar = (props) => {
//   const token = localStorage.getItem("accessToken");
//   const UserRole = localStorage.getItem("Role");
//   const dispatch = useDispatch();
//   const UserData = JSON.parse(localStorage.getItem("UserData"));

//   // const  CheckRole  = useSelector((state) => state.role);
//   // console.log(CheckRole,'role');
//   const naviagte = useNavigate();

//   const [showDiv, setShowDiv] = useState(false);
//   const [profile, setProfile] = useState(false);

//   const toggleDiv = () => {
//     setShowDiv(!showDiv);
//   };
//   const toggleProfile = () => {
//     setProfile(!profile);
//   };
//   const Drop1 = React.useRef(null);
//   const Drop2 = React.useRef(null);
//   const handleClickOutside = (event) => {
//     if (
//       Drop1.current &&
//       !Drop1.current.contains(event.target) &&
//       Drop2.current &&
//       !Drop2.current.contains(event.target)
//     ) {
//       setShowDiv(false);
//       setProfile(false);
//     }
//   };
//   React.useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);
//   // -------join--us ------learn-----more
//   const handleModalButton = () => {
//     naviagte("");
//   };
//   // -------- setrole -------------
//   const handleFreelancerRole = () => {
//     // localStorage.setItem("Role", "Freelancer");
//     naviagte("/signup");
//   };
//   const handleClientRole = () => {
//     // localStorage.setItem("Role", "Client");
//     naviagte("/signup");
//   };
//   const handleBDRole = () => {
//     // localStorage.setItem("Role", "Business Developer");
//     naviagte("/signup");
//   };

//   return (
//     <>
//       <div className="container-fluid" style={{ backgroundColor: "#ededed" }}>
//         <header>
//           <nav class="navbar navbar-expand-lg pt-3 pb-3 poppins">
//             <div class="container-fluid mx-lg-4 mx-md-3 mx-xm-3 mx-0">
//               <Link class="nav-link  " to={token ? "/dashboard" : "/"}>
//                 <img src={logo1} className="logo" alt="w8" />
//               </Link>
//               <button
//                 class="navbar-toggler"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#navbarSupportedContent"
//                 aria-controls="navbarSupportedContent"
//                 aria-expanded="false"
//                 aria-label="Toggle navigation"
//               >
//                 <span class="navbar-toggler-icon"></span>
//               </button>
//               <div
//                 class="collapse navbar-collapse mt-lg-0 mt-3"
//                 id="navbarSupportedContent"
//               >
//                 {/* ================
//                                 First Nav Lists
//                                 ================ */}
//                 <ul
//                   class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center"
//                   style={{ display: props.FirstNav }}
//                 >
//                   <li class="nav-item ms-3 mt-lg-0 mt-2">
//                     <NavLink class="nav-link " to="/whygrapetask">
//                       Why GrapeTask
//                     </NavLink>
//                   </li>
//                   <li class="nav-item ms-3 mt-lg-0 mt-2">
//                     <NavLink class="nav-link" to="/aboutus">
//                       About US
//                     </NavLink>
//                   </li>
//                   <li class="nav-item ms-3 mt-lg-0 mt-2">
//                     <NavLink class="nav-link" to="/blog">
//                       Blog
//                     </NavLink>
//                   </li>
//                   <li class="nav-item ms-3 mt-lg-0 mt-2 ">
//                     <NavLink className="nav-link colororing" to="/login">
//                       Log In
//                     </NavLink>
//                   </li>
//                   {/* <li class="nav-item ms-3 mt-lg-0 mt-2">
//                     <button
//                       class=" btn-fill mt-lg-0 mt-2 ms-lg-4 ms-3"
//                       type="button"
//                       data-bs-toggle="modal"
//                       data-bs-target="#JoinUSModal"
//                     >
//                       Join
//                     </button>
//                   </li> */}
//                 </ul>

//                 {/* ================
//                                 Second Nav Lists Start
//                                 ================ */}
//                 <ul
//                   class={`navbar-nav  me-auto mb-2 mb-lg-0 ps-4
//                                 `}
//                   style={{ display: props.SecondNav }}
//                 >
//                   <li className="nav-item">
//                     <NavLink className="nav-link " to="/dashboard">
//                       Dashboard
//                     </NavLink>
//                   </li>
//                   {UserRole !== "Client" && (
//                     <li className="nav-item">
//                       <NavLink className="nav-link" to="/earning">
//                         Earning Orders
//                       </NavLink>
//                     </li>
//                   )}
//                   {UserRole === "Business Developer" && (
//                     <li className="nav-item">
//                       <NavLink className="nav-link" to="/hireExpert">
//                         Hire Expert
//                       </NavLink>
//                     </li>
//                   )}
//                   <li className=" position-relative ">
//                     <span
//                       className="nav-link fw-medium"
//                       role="button"
//                       ref={Drop1}
//                       onClick={toggleDiv}
//                     >
//                       My Activities {showDiv ? <FaAngleUp /> : <FaAngleDown />}
//                     </span>
//                     {showDiv && (
//                       <ul className="p-3 px-3 mt-2 second-nav-drop position-absolute poppins">
//                         {/* <NavLink to='/profileSetting' className=" font-14"><li>Profile</li></NavLink> */}
//                         <NavLink to="/search/gigs" className=" font-14">
//                           <li>Gigs</li>
//                         </NavLink>
//                         {UserData?.role === "Client" && (
//                           <NavLink to="/buyerRequest" className="font-14">
//                             <li>Create Buyer Request</li>
//                           </NavLink>
//                         )}
//                         {UserRole === "Business Developer" && (
//                           <NavLink to="/userBuyerRequest" className="font-14">
//                             <li>Buyer Request</li>
//                           </NavLink>
//                         )}
//                         <NavLink to="/order" className="font-14">
//                           <li>Orders</li>
//                         </NavLink>
//                       </ul>
//                     )}
//                   </li>
//                   {/*
//                                             <li className="nav-item">
//                                                 <NavLink className="nav-link" to="/recruitProcess">Recruit Process</NavLink>
//                                             </li> */}
//                 </ul>
//                 {/* ================
//                                 First Nav Last Div
//                                 ================ */}
//                 {token ? (
//                   ""
//                 ) : (
//                   <div style={{ display: props.FirstNav }}>
//                     <div class="d-flex">
//                       <button
//                         class=" btn-fill mt-lg-0 mt-2 ms-lg-4 ms-3"
//                         type="button"
//                         data-bs-toggle="modal"
//                         data-bs-target="#JoinUSModal"
//                       >
//                         Join
//                       </button>
//                       {/* Modal */}
//                       <div
//                         class="modal fade"
//                         id="JoinUSModal"
//                         tabindex="-1"
//                         aria-labelledby="JoinUSModalLabel"
//                         aria-hidden="true"
//                       >
//                         <div class="modal-dialog modal-dialog-centered">
//                           <div class="modal-content">
//                             <div class="modal-body p-lg-5 p-md-4 p-3">
//                               <div className="row justify-content-center">
//                                 <h2 className="font-28 text-center cocon">
//                                   Join as a Expert, Client or Business
//                                   Developer.
//                                 </h2>
//                                 <div className="d-flex justify-content-center">
//                                   <img
//                                     src={line}
//                                     className="text-center w-25"
//                                     alt=""
//                                   />
//                                 </div>
//                                 <div className="container">
//                                   <div className="row justify-content-center">
//                                     <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-5">
//                                       <div
//                                         className="cursor-pointer  h-100 outsouces pt-4 pb-4  position-relative "
//                                         onClick={handleFreelancerRole}
//                                         data-bs-dismiss="modal"
//                                       >
//                                         {/* <img src={cardLine} alt="w8" /> */}
//                                         <div className="px-4">
//                                           <img
//                                             src={join}
//                                             width={60}
//                                             height={60}
//                                             className="shadow join-img "
//                                             alt=""
//                                           />

//                                           <h6 className="pt-4 font-16 position-relative z-3">
//                                             I’m a Expert looking for work
//                                           </h6>

//                                           <Link
//                                             data-bs-dismiss="modal"
//                                             onClick={handleModalButton}
//                                             className="position-relative font-16 z-3"
//                                           >
//                                             Get Started &gt;
//                                           </Link>
//                                         </div>
//                                       </div>
//                                     </div>
//                                     <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-5">
//                                       <div
//                                         className="cursor-pointer h-100  outsouces pt-4 pb-4  position-relative "
//                                         onClick={handleClientRole}
//                                         data-bs-dismiss="modal"
//                                       >
//                                         {/* <img src={cardLine} alt="w8" /> */}
//                                         <div className="px-4">
//                                           <img
//                                             src={join}
//                                             width={60}
//                                             height={60}
//                                             className="shadow join-img "
//                                             alt=""
//                                           />

//                                           <h6 className="pt-4 font-16 position-relative z-3">
//                                             I'm a Client looking for Business
//                                             Developer
//                                           </h6>

//                                           <Link
//                                             data-bs-dismiss="modal"
//                                             onClick={handleModalButton}
//                                             className=" position-relative font-16 z-3"
//                                           >
//                                             Get Started &gt;
//                                           </Link>
//                                         </div>
//                                       </div>
//                                     </div>
//                                     <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-5">
//                                       <div
//                                         className="cursor-pointer h-100  outsouces pt-4 pb-4  position-relative "
//                                         onClick={handleBDRole}
//                                         data-bs-dismiss="modal"
//                                       >
//                                         {/* <img src={cardLine} alt="w8" /> */}
//                                         <div className="px-4">
//                                           <img
//                                             src={join}
//                                             width={60}
//                                             height={60}
//                                             className="shadow join-img "
//                                             alt=""
//                                           />
//                                           <h6 className="pt-4 position-relative z-3 font-16">
//                                             I’m a Business Developer looking for
//                                             work
//                                           </h6>

//                                           <Link
//                                             data-bs-dismiss="modal"
//                                             onClick={handleModalButton}
//                                             className=" position-relative font-16 z-3"
//                                           >
//                                             Get Started &gt;
//                                           </Link>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 {/* <button type='button ' data-bs-dismiss="modal" onClick={() => naviagte('/signup')} className='btn-fill rounded-2  w-50 mt-lg-5 mt-4 font-16'>Create Account</button> */}
//                                 <p
//                                   className="text-center mt-4 font-16"
//                                   data-bs-dismiss="modal"
//                                 >
//                                   Already have an account?{" "}
//                                   <Link
//                                     data-bs-dismiss="modal"
//                                     onClick={() => naviagte("/login")}
//                                     className="colororing text-decoration-underline"
//                                   >
//                                     {" "}
//                                     Log In
//                                   </Link>{" "}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 {/* ================
//                                 Second Nav Last Div
//                                 ================ */}
//                 <div style={{ display: props.SecondNav }}>
//                   <div class="d-flex align-items-center ">
//                     <div className="dropdown-center notifaction-dropdon">
//                       <div
//                         className=" dropdown-toggle"
//                         type="button"
//                         data-bs-toggle="dropdown"
//                         aria-expanded="false"
//                       >
//                         <Link>
//                           <IoNotificationsOutline color="#74767E" size={25} />
//                         </Link>
//                       </div>
//                       <ul className="dropdown-menu">
//                         <li>
//                           <a className="dropdown-item" href="#">
//                             <div className="d-flex">
//                               <div>
//                                 <img
//                                   src={dropdownimg}
//                                   width={30}
//                                   height={30}
//                                   alt=""
//                                 />
//                               </div>
//                               <p className="font-9 poppins ms-2 mb-0">
//                                 Welcome to GrapeTask Marketplace
//                               </p>
//                             </div>
//                           </a>
//                         </li>
//                       </ul>
//                     </div>

//                     <div>
//                       <Link to="/chat">
//                         <FaRegEnvelope
//                           color="#74767E"
//                           size={25}
//                           className=" mx-4"
//                         />
//                       </Link>
//                     </div>
//                     <div>
//                       <Link to="/help">
//                         <AiOutlineQuestionCircle
//                           color="#74767E"
//                           size={25}
//                           className=" "
//                         />
//                       </Link>
//                     </div>
//                     {UserRole == "Client" ? (
//                       <ul className="ps-lg-3 navbar-nav ">
//                         <NavLink to="/order" className="font-14">
//                           <li>Orders</li>
//                         </NavLink>
//                       </ul>
//                     ) : (
//                       ""
//                     )}
//                     <div className="position-relative">
//                       <span
//                         ref={Drop2}
//                         className="position-relative p-2 ms-2 cursor-pointer"
//                         onClick={toggleProfile}
//                       >
//                         {UserData?.image ? (
//                           <img
//                             src={UserData?.image}
//                             width={40}
//                             className="rounded-circle "
//                             alt="w8"
//                           />
//                         ) : (
//                           <FaUserCircle size={40} color="black" />
//                         )}
//                         <FaCircle
//                           className="position-absolute bottom-0 "
//                           style={{ right: "3px" }}
//                           size={13}
//                           color="#18e718"
//                         />
//                       </span>
//                       {profile && (
//                         <ul className="p-3 px-3 mt-3  second-profile-drop  position-absolute poppins">
//                           <NavLink
//                             to={"/" + UserData?.username}
//                             className=" font-14"
//                           >
//                             <li>Profile</li>
//                           </NavLink>
//                           <NavLink to="/payoutMethod" className="font-14">
//                             <li>Billing and Payment</li>
//                           </NavLink>
//                           <NavLink to="/bonousReward" className="font-14">
//                             <li>Bonus and Rewards</li>
//                           </NavLink>
//                           {UserRole !== "Client" && (
//                             <>
//                               <NavLink
//                                 to="/profile/referral/link"
//                                 className=" font-14"
//                               >
//                                 <li>Refer a Friend</li>
//                               </NavLink>
//                               <NavLink
//                                 to="/profile/referrals"
//                                 className="font-14"
//                               >
//                                 <li>Referral List</li>
//                               </NavLink>
//                             </>
//                           )}
//                           {/* <NavLink to='/accept' className="font-14" ><li>Start a Job</li></NavLink> */}
//                           <NavLink to={"/profileSetting"} className=" font-14">
//                             <li>Settings</li>
//                           </NavLink>
//                         </ul>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 {/* <div className={`ms-${props.userMargin}`}>

//                                     {props.userIcon}
//                                 </div> */}
//               </div>
//             </div>
//           </nav>
//         </header>
//       </div>
//       <style>{`
//                 .modal {
//                     --bs-modal-width: 900px !important;
//                 }
//                 `}</style>
//     </>
//   );
// };
//

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {
  FaAngleDown,
  FaAngleUp,
  FaCircle,
  FaPowerOff,
  FaRegEnvelope,
  FaUserCircle
} from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import dropdownimg from "../assets/grapetask.webp";
import logo1 from "../assets/logo.webp";
import { fetchNotifications } from "../redux/slices/notificationsSlice";
import NotificationPopup from "./NotificationPopup"; // File in same folder

const Navbar = (props) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const token = localStorage.getItem("accessToken");
  // const UserRole = localStorage.getItem("Role")?.toLowerCase();
  const storedUserData = localStorage.getItem("UserData");
  // const UserData = storedUserData ? JSON.parse(storedUserData) : null;

  
  const token = localStorage.getItem("accessToken");
  const UserRole = localStorage.getItem("Role");
  const dispatch = useDispatch();
  const UserData = JSON.parse(localStorage.getItem("UserData"));
  const [showDiv, setShowDiv] = useState(false);
  const [profile, setProfile] = useState(false);


  // Local states for toggling dropdowns and for the notification popup
  const [showActivities, setShowActivities] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Redux: Retrieve notifications from the notifications slice
  const notificationsState = useSelector((state) => state.notifications) || {};
  const { notifications = [] } = notificationsState;

  // Fetch notifications on mount
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  // Debug: log current user role
  useEffect(() => {
    console.log("Current role:", UserRole);
  }, [UserRole]);

  // Accept invitation handler called from NotificationPopup
  const handleAcceptInvitation = async (notif) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      // Assuming notif.data includes offer_id and order_id
      const { offer_id, order_id } = notif.data;
      await axios.post(
        "/api/accept-offer-invitation",
        { offer_id, order_id },
        {
          headers: {
            "Authorization": "Bearer " + accessToken,
          },
        }
      );
      alert("Invitation accepted. Order has started!");
      setSelectedNotification(null);
      // Optionally, dispatch(fetchNotifications()) to refresh the list
    } catch (err) {
      console.error("Failed to accept invitation", err);
      alert("Failed to accept invitation. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };


  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };
  const toggleProfile = () => {
    setProfile(!profile);
  };
  const Drop1 = React.useRef(null);
  const Drop2 = React.useRef(null);
  const handleClickOutside = (event) => {
    if (
      Drop1.current &&
      !Drop1.current.contains(event.target) &&
      Drop2.current &&
      !Drop2.current.contains(event.target)
    ) {
      setShowDiv(false);
      setProfile(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  const toggleActivities = () => {
    setShowActivities((prev) => !prev);
  };

  

  // Refs for detecting clicks outside of dropdowns
  const profileRef = useRef(null);
  const activitiesRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleJoinButton = () => {
    navigate("/signup");
  };

  const handleNotificationClick = (notif) => {
    setSelectedNotification(notif);
  };

  const handleClosePopup = () => {
    setSelectedNotification(null);
  };

  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "#ededed" }}>
        <header>
          <nav className="navbar navbar-expand-lg pt-3 pb-3 poppins">
            <div className="container-fluid mx-lg-4 mx-md-3 mx-xm-3 mx-0">
              <Link className="nav-link" to={token ? "/dashboard" : "/"}>
                <img src={logo1} className="logo" alt="Logo" />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse mt-lg-0 mt-3" id="navbarSupportedContent">
                {/* First Nav Lists */}
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center" style={{ display: props.FirstNav }}>
                  <li className="nav-item ms-3 mt-lg-0 mt-2">
                    <NavLink className="nav-link" to="/whygrapetask">Why GrapeTask</NavLink>
                  </li>
                  <li className="nav-item ms-3 mt-lg-0 mt-2">
                    <NavLink className="nav-link" to="/aboutus">About US</NavLink>
                  </li>
                  <li className="nav-item ms-3 mt-lg-0 mt-2">
                    <NavLink className="nav-link" to="/blog">Blog</NavLink>
                  </li>
                  {!token ? (
                    <li className="nav-item ms-3 mt-lg-0 mt-2">
                      <NavLink className="nav-link colororing" to="/login">Log In</NavLink>
                    </li>
                  ) : (
                    <li
                      className="list py-2 font-16 row justify-content-center"
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="col-1"><FaPowerOff size={16} className="me-3" /></div>
                      <div className="col-3"><p className="mb-0">Logout</p></div>
                    </li>
                  )}
                </ul>

          {/* Second Nav Lists */}
{token && (
  <ul className="navbar-nav me-auto mb-2 mb-lg-0 ps-4" style={{ display: props.SecondNav }}>
    <li className="nav-item">
      <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
    </li>
    {UserRole !== "Client" && (
      <li className="nav-item">
        <NavLink className="nav-link" to="/earning">Earning Orders</NavLink>
      </li>
    )}
    {UserRole === "Client" && (
      <li className="nav-item">
        <NavLink className="nav-link" to="/spending">Spending Orders</NavLink>
      </li>
    )}
    
    {UserRole === "bidder/company representative/middleman" && (
      <li className="nav-item">
        <NavLink className="nav-link" to="/hireExpert">Hire Expert</NavLink>
      </li>
    )}
    <li className="position-relative">
      <span 
        className="nav-link fw-medium" 
        role="button" 
        ref={activitiesRef} 
        onClick={toggleActivities}
      >
        My Activities {showActivities ? <FaAngleUp /> : <FaAngleDown />}
      </span>
      {showActivities && (
        <ul className="p-3 px-3 mt-2 second-nav-drop position-absolute poppins">
          {UserRole !== "Client" && (
            <NavLink to="/search/gigs" className="font-14">
              <li>Gigs</li>
            </NavLink>
          )}
          {UserData?.role === "Client" && (
            <NavLink to="/buyerRequest" className="font-14">
              <li>Create Buyer Request</li>
            </NavLink>
          )}
          {(UserRole === "bidder/company representative/middleman" || UserRole === "expert/freelancer") && (
            <>
              <NavLink to="/userBuyerRequest" className="font-14">
                <li>Buyer Requests</li>
              </NavLink>
            
            </>
          )}
          {( UserRole === "expert/freelancer") && (
            <>
              <NavLink to="/jobInvitation" className="font-14">
                <li>Job Invitation</li>
              </NavLink>
            
            </>
          )}

          {(UserRole === "bidder/company representative/middleman") && (
            <>
          <NavLink to="/buyerRequest" className="font-14">
                <li>Create Buyer Request</li>
              </NavLink>
              </>
            )}
          <NavLink to="/order" className="font-14">
            <li>Orders</li>
          </NavLink>
        </ul>
      )}
    </li>
  </ul>
)}

                {/* First Nav Last Div */}
                {!token && (
                  <div style={{ display: props.FirstNav }}>
                    <div className="d-flex">
                      <button
                        className="btn-fill mt-lg-0 mt-2 ms-lg-4 ms-3"
                        type="button"
                        onClick={handleJoinButton}
                      >
                        Join
                      </button>
                    </div>
                  </div>
                )}

                {/* Second Nav Last Div */}
                {token && (
                  <div style={{ display: props.SecondNav }}>
                    <div className="d-flex align-items-center">
                      {/* Notifications Dropdown */}
                      <div className="dropdown-center notifaction-dropdon">
                      <div
                  className="dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Link>
                    <IoNotificationsOutline color="#74767E" size={25} />
                  </Link>
                </div>
                <ul className="dropdown-menu">
  {notifications && notifications.length > 0 ? (
    notifications.map((notif) => (
      <li key={notif?.id}>
        <a
          className="dropdown-item"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNotificationClick(notif);
          }}
        >
          <div className="d-flex align-items-center">
            <img src={dropdownimg} width={30} height={30} alt="Notification icon" />
            <div className="ms-2">
              <p className="font-9 poppins mb-0">
                {notif.data?.data["buyer_request-title"] || "New Job Invitation"}
              </p>
            </div>
          </div>
        </a>
      </li>
    ))
  ) : (
    <li className="dropdown-item">No notifications yet</li>
  )}
</ul>
{selectedNotification && (
  <NotificationPopup
    selectedNotification={selectedNotification}
    onClose={handleClosePopup}
    onAccepted={handleAcceptInvitation}
  />
)}

                      </div>
                      <div>
                        <Link to="/Inbox">
                          <FaRegEnvelope color="#74767E" size={25} className="mx-4" />
                        </Link>
                      </div>
                      <div>
                        <Link to="/help">
                          <AiOutlineQuestionCircle color="#74767E" size={25} />
                        </Link>
                      </div>
                      {UserRole === "client" ? (
                        <ul className="ps-lg-3 navbar-nav">
                          <NavLink to="/order" className="font-14">
                            <li>Orders</li>
                          </NavLink>
                        </ul>
                      ) : null}
                      <div className="position-relative">
                <span
                  ref={Drop2}
                  className="position-relative p-2 ms-2 cursor-pointer"
                  onClick={toggleProfile}
                >
                  {UserData?.image ? (
                    <img
                      src={UserData?.image}
                      width={40}
                      className="rounded-circle"
                      alt="Profile"
                    />
                  ) : (
                    <FaUserCircle size={40} color="black" />
                  )}
                  <FaCircle
                    className="position-absolute bottom-0"
                    style={{ right: "3px" }}
                    size={13}
                    color="#18e718"
                  />
                </span>
                {profile && (
                  <ul className="p-3 px-3 mt-3 second-profile-drop position-absolute poppins">
                    <NavLink to={`/${UserData?.username}`} className="font-14">
                      <li>Profile</li>
                    </NavLink>
                    <NavLink to="/payoutMethod" className="font-14">
                      <li>Billing and Payment</li>
                    </NavLink>
                    <NavLink to="/bonousReward" className="font-14">
                      <li>Bonus and Rewards</li>
                    </NavLink>
                    {UserRole !== "Client" && (
                      <>
                        <NavLink to="/profile/referral/link" className="font-14">
                          <li>Refer a Friend</li>
                        </NavLink>
                        <NavLink to="/profile/referrals" className="font-14">
                          <li>Referral List</li>
                        </NavLink>
                      </>
                    )}
                    <NavLink to="/profileSetting" className="font-14">
                      <li>Settings</li>
                    </NavLink>
                  </ul>
                )}
              </div>
                      {UserRole === "bidder/company representative/middleman" && (
                        <div className="d-flex align-items-center me-3">
                       
                        <NavLink to="/buy-bids" className="font-14">
                      <li>
                    
                          <span className="font-14 fw-medium">Available Bids:</span>
                          <span className="ms-1">{UserData?.total_bids}</span>
                          </li>
                          </NavLink>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </header>
      </div>
      <style>{`
        .modal {
          --bs-modal-width: 900px !important;
        }
      `}</style>
    </>
  );
};

export default Navbar;
