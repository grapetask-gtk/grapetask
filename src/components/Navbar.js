import { useEffect, useRef, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {
  FaAngleDown,
  FaAngleUp,
  FaCircle,
  FaPowerOff,
  FaRegEnvelope,
  FaUserCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import logo1 from "../assets/logo.webp";
// import dropdownimg from "../assets/grapetask.webp";
// import NotificationPopup from "./NotificationPopup";

const Navbar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("accessToken");
  const UserRole = localStorage.getItem("Role");

  let UserData = {};
  try {
    UserData = JSON.parse(localStorage.getItem("UserData") || "{}");
  } catch (e) {
    console.warn("Failed to parse UserData in localStorage", e);
  }

  // States
  const [showActivities, setShowActivities] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Refs for dropdowns
  const activitiesRef = useRef(null);
  const profileRef = useRef(null);

  // Handle outside clicks
  const handleClickOutside = (event) => {
    if (activitiesRef.current && !activitiesRef.current.contains(event.target)) {
      setShowActivities(false);
    }
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Actions
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const handleJoinButton = () => navigate("/signup");

  // Redux notifications (not fully wired, just kept)
  const notificationsState = useSelector((state) => state.notifications) || {};
  const { notifications = [] } = notificationsState;

  return (
    <div className="container-fluid" style={{ backgroundColor: "#ededed" }}>
      <header>
        <nav className="navbar navbar-expand-lg pt-3 pb-3 poppins">
          <div className="container-fluid mx-lg-4 mx-md-3 mx-0">
            {/* Logo */}
            <Link className="nav-link" to={token ? "/dashboard" : "/"}>
              <img src={logo1} className="logo" alt="Logo" />
            </Link>

            {/* Mobile Toggle */}
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

            <div
              className="collapse navbar-collapse mt-lg-0 mt-3"
              id="navbarSupportedContent"
            >
              {/* First Nav (Before login) */}
              <ul
                className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center"
                style={{ display: props.FirstNav }}
              >
                <li className="nav-item ms-3 mt-lg-0 mt-2">
                  <NavLink className="nav-link" to="/whygrapetask">
                    Why GrapeTask
                  </NavLink>
                </li>
                <li className="nav-item ms-3 mt-lg-0 mt-2">
                  <NavLink className="nav-link" to="/aboutus">
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item ms-3 mt-lg-0 mt-2">
                  <NavLink className="nav-link" to="/blog">
                    Blog
                  </NavLink>
                </li>

                {!token ? (
                  <li className="nav-item ms-3 mt-lg-0 mt-2">
                    <NavLink className="nav-link colororing" to="/login">
                      Log In
                    </NavLink>
                  </li>
                ) : (
                  <li
                    className="list py-2 font-16 row justify-content-center"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="col-1">
                      <FaPowerOff size={16} className="me-3" />
                    </div>
                    <div className="col-3">
                      <p className="mb-0">Logout</p>
                    </div>
                  </li>
                )}
              </ul>

              {/* Second Nav (After login) */}
              {token && (
                <ul
                  className="navbar-nav me-auto mb-2 mb-lg-0 ps-4"
                  style={{ display: props.SecondNav }}
                >
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard">
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/freelancers">
                      Browse
                    </NavLink>
                  </li>

                  {UserRole !== "Client" && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/earning">
                        Earnings
                      </NavLink>
                    </li>
                  )}

                  {UserRole === "Client" && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/spending">
                        Spendings
                      </NavLink>
                    </li>
                  )}

                  {UserRole === "bidder/company representative/middleman" && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/hireExpert">
                        Hire Expert
                      </NavLink>
                    </li>
                  )}

                  {/* My Activities Dropdown */}
                  <li className="position-relative" ref={activitiesRef}>
                    <span
                      className="nav-link fw-medium"
                      role="button"
                      onClick={() => setShowActivities((p) => !p)}
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
                        {(UserRole === "bidder/company representative/middleman" ||
                          UserRole === "expert/freelancer") && (
                          <NavLink to="/userBuyerRequest" className="font-14">
                            <li>Buyer Requests</li>
                          </NavLink>
                        )}
                        {UserRole === "expert/freelancer" && (
                          <NavLink to="/jobInvitation" className="font-14">
                            <li>Job Invitation</li>
                          </NavLink>
                        )}
                        {UserRole === "bidder/company representative/middleman" && (
                          <NavLink to="/buyerRequest" className="font-14">
                            <li>Create Buyer Request</li>
                          </NavLink>
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
                    <Link to="/Inbox">
                      <FaRegEnvelope color="#74767E" size={25} className="mx-4" />
                    </Link>
                    <Link to="/help">
                      <AiOutlineQuestionCircle color="#74767E" size={25} />
                    </Link>

                    {/* Client Orders Shortcut */}
                    {UserRole === "client" && (
                      <ul className="ps-lg-3 navbar-nav">
                        <NavLink to="/order" className="font-14">
                          <li>Orders</li>
                        </NavLink>
                      </ul>
                    )}

                    {/* Profile Dropdown */}
                    <div className="position-relative" ref={profileRef}>
                      <span
                        className="position-relative p-2 ms-2 cursor-pointer"
                        onClick={() => setShowProfile((p) => !p)}
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

                      {showProfile && (
                        <ul className="p-3 px-3 mt-3 second-profile-drop position-absolute poppins">
                          <NavLink to={`/${UserData?.fname}`} className="font-14">
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

                    {/* Bids Info */}
                    {(UserRole === "bidder/company representative/middleman" ||
                      UserRole === "expert/freelancer") && (
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
  );
};

export default Navbar;
