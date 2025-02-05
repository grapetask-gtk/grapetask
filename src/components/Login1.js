import React from "react";
import { useDispatch, useSelector } from "../redux/store/store";
import logo from "../assets/logo.webp";
import line from "../assets/line.webp";
import join from "../assets/join.webp";
import Button from "../components/Button";
import { userLogin } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import app from "../pages/firebase";
import { getMessaging, getToken } from "firebase/messaging"; // Import Firebase messaging functions
import { useEffect } from "react";

const Login1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, getError } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isErrorShow, setIsErrorShow] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let data = {
    //   email: email,
    //   password: password,
    //   device_token: "1234567890"
    // }
    try {
      // const messaging = getMessaging(app); // Initialize messaging with the Firebase app instance
      // const deviceToken = await getToken(messaging); // Use getToken from Firebase messaging
      // console.log(deviceToken);
      // if (deviceToken) {
      const data = {
        email: email, // Add the email field if needed
        password: password,
      };

      dispatch(userLogin(data, handleResponse));
      // } else {
      //   console.log('No registration token available.');
      // }
    } catch (err) {
      console.log("An error occurred while retrieving token:", err);
    }
    // dispatch(userLogin(data, handleResponse))
  };
  const handleResponse = async (data) => {
    if (data?.status) {
      localStorage.setItem("accessToken", data?.access_token);
      toast.success("Successfully Login", {
        position: "top-right",
        autoClose: 2000,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/freelancers");
      localStorage.setItem("UserData", JSON.stringify(data?.data));
      localStorage.setItem("Role", data?.data.role);

      //   alert(data?.message)
      if (data?.status == true) {
        setIsErrorShow("");
        setIsError(false);
      }
    } else {
      // console.log(data?.message)
      if (data?.status == false) {
        setIsErrorShow(data?.message);
        setIsError(true);
      }
    }
  };
  // -------- setrole -------------
  const handleFreelancerRole = () => {
    localStorage.setItem("Role", "Freelancer");
    navigate("/signup");
  };
  const handleClientRole = () => {
    localStorage.setItem("Role", "Client");
    navigate("/signup");
  };
  const handleBDRole = () => {
    localStorage.setItem("Role", "Business Developer");
    navigate("/signup");
  };

  return (
    <>
      <div className="col-lg-6 col-md-6 col-12 d-flex flex-column justify-content-between pt-lg-5 pt-md-5 pt-3 px-0">
        <div className="container-fluid">
          <div className="row justify-content-center me-lg-5 me-md-5 login-right-side">
            <div className="col-lg-8 col-md-8 col-12 ">
              <img src={logo} className=" mt-2" width={"40%"} alt="" />
              <form className="row mt-2" onSubmit={handleSubmit}>
                <ToastContainer />

                <div class=" col-12 mt-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    required
                    className="form-control input-field p-3"
                    placeholder="Email Address"
                    aria-label="Email Address"
                  />
                </div>
                <div class=" col-12 mt-4">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control input-field p-3"
                    placeholder="Password"
                    aria-label="Password"
                  />
                  <div className="text-end mt-3">
                    <h5
                      className="cursor-pointer"
                      onClick={() => navigate("/forgot")}
                    >
                      Forgot password
                    </h5>
                  </div>
                  {isError && (
                    <div className="alert alert-danger mt-3" role="alert">
                      {isErrorShow}
                    </div>
                  )}

                  <button
                    type="submit "
                    loading={true}
                    disabled={isLoading}
                    className="btn-fill mt-4"
                  >
                    {isLoading ? (
                      <Spinner size="sm" color="light" />
                    ) : (
                      "Let’s go"
                    )}
                  </button>
                </div>

                <div class="col-12 mt-2 ">
                  <p class="font-16 poppins colorgray credit-lines d-flex justify-content-center align-items-center mt-3 mb-4">
                    &nbsp;&nbsp;Or&nbsp;&nbsp;
                  </p>
                </div>
                <Button text="Sign up with Google" />
                <p className="font-15 mt-3 colorgray">
                  Not a member yet{" "}
                  <span
                    data-bs-toggle="modal"
                    data-bs-target="#JoinUSModal"
                    className="colororing cursor-pointer"
                  >
                    SIGNUP HERE
                  </span>{" "}
                </p>
                {/* Modal */}
                <div
                  class="modal fade"
                  id="JoinUSModal"
                  tabindex="-1"
                  aria-labelledby="JoinUSModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-body p-lg-5 p-md-4 p-3">
                        <div className="row justify-content-center">
                          <h2 className="font-28 text-center cocon">
                            Join as a Expert, Client or Business Developer.
                          </h2>
                          <div className="d-flex justify-content-center">
                            <img
                              src={line}
                              className="text-center w-25"
                              alt=""
                            />
                          </div>
                          <div className="container">
                            <div className="row justify-content-center">
                              <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-5">
                                <div
                                  className="cursor-pointer  h-100 outsouces pt-4 pb-4  position-relative "
                                  onClick={handleFreelancerRole}
                                  data-bs-dismiss="modal"
                                >
                                  {/* <img src={cardLine} alt="w8" /> */}
                                  <div className="px-4">
                                    <img
                                      src={join}
                                      width={60}
                                      height={60}
                                      className="shadow join-img "
                                      alt=""
                                    />

                                    <h6 className="pt-4 font-16 position-relative z-3">
                                      I’m a Expert looking for work
                                    </h6>

                                    <Link
                                      data-bs-dismiss="modal"
                                      className="position-relative font-16 z-3"
                                    >
                                      Get Started &gt;
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-5">
                                <div
                                  className="cursor-pointer h-100  outsouces pt-4 pb-4  position-relative "
                                  onClick={handleClientRole}
                                  data-bs-dismiss="modal"
                                >
                                  {/* <img src={cardLine} alt="w8" /> */}
                                  <div className="px-4">
                                    <img
                                      src={join}
                                      width={60}
                                      height={60}
                                      className="shadow join-img "
                                      alt=""
                                    />

                                    <h6 className="pt-4 font-16 position-relative z-3">
                                      I'm a Client looking for Business
                                      Developer
                                    </h6>

                                    <Link
                                      data-bs-dismiss="modal"
                                      className=" position-relative font-16 z-3"
                                    >
                                      Get Started &gt;
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-5">
                                <div
                                  className="cursor-pointer h-100  outsouces pt-4 pb-4  position-relative "
                                  onClick={handleBDRole}
                                  data-bs-dismiss="modal"
                                >
                                  {/* <img src={cardLine} alt="w8" /> */}
                                  <div className="px-4">
                                    <img
                                      src={join}
                                      width={60}
                                      height={60}
                                      className="shadow join-img "
                                      alt=""
                                    />
                                    <h6 className="pt-4 position-relative z-3 font-16">
                                      I’m a Business Developer looking for work
                                    </h6>

                                    <Link
                                      data-bs-dismiss="modal"
                                      className=" position-relative font-16 z-3"
                                    >
                                      Get Started &gt;
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <button type='button ' data-bs-dismiss="modal" onClick={() => naviagte('/signup')} className='btn-fill rounded-2  w-50 mt-lg-5 mt-4 font-16'>Create Account</button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <hr
            className="border-0"
            style={{
              opacity: "1",
              height: "1px",
              backgroundColor: "rgba(111, 111, 111, 1)",
            }}
          />
          <div className="d-flex justify-content-between flex-wrap colorgray px-4 pb-3">
            <span className="mt-2 ms-2 font-14">Terms & Conditions</span>
            <span className="mt-2 ms-2 font-14">Privacy Policy</span>
            <span className="mt-2 ms-2 font-14">Cookie Policy</span>
            <span className="mt-2 ms-2 font-14">
              Copyright 2023 GrapeTask. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login1;
