// import React, { useState } from "react";
// import Loginleft from "../components/Loginleft";
// import logo from "../assets/logo.webp";
// import OtpInput from "react-otp-input";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "../redux/store/store";
// import { userOtp } from "../redux/slices/userSlice";
// import { Spinner } from "reactstrap";
// import axios from "axios";

// const Otp = ({ formType }) => {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const { isLoading, getError } = useSelector((state) => state.user);
//   const [otp, setOtp] = useState("");
//   const [isError, setIsError] = useState(false);
//   const [isErrorShow, setIsErrorShow] = useState("");

//   const handleSubmit = async (e) => {
//     // Determine the API endpoint and payload based on the form type
//     const endpoint = formType === "signup" ? "signup" : "forgot-password";
//     const payload = formType === "signup" ? { email, password } : { email };

//     try {
//       // Make the API request
//       const response = await axios.post(
//         `https://portal.grapetask.co/api/${endpoint}`,
//         payload,
//         {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Handle the response
//       if (response.data.status) {
//         if (formType === "signup") {
//           // Redirect to the dashboard after successful signup
//           navigate("/dashboard");
//         } else if (formType === "forgot-password") {
//           // Redirect to the update password page after successful forgot password request
//           navigate("/update-password");
//         }
//       } else {
//         // Handle API errors (e.g., invalid email or signup failure)
//         alert(`Error: ${response.data.message}`);
//       }
//     } catch (error) {
//       // Handle network or server errors
//       alert(`Error: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   // Validate OTP
//   if (otp.length !== 6) {
//     setIsError(true);
//     setIsErrorShow("Please enter a valid 6-digit OTP.");
//     return;
//   }

//   // Prepare data for API
//   const data = {
//     token: otp,
//     // is_wm: 1,
//   };

//   // try {
//   //   // Verify OTP using the API
//   //   const response = await axios.post(
//   //     "https://portal.grapetask.co/api/otp-verify",
//   //     data
//   //   );

//   //   if (response.data.status) {
//   //     // Store access token and user data in localStorage
//   //     // localStorage.setItem("accessToken", response.data.access_token);
//   //     localStorage.setItem("userData", JSON.stringify(response.data.data));
//   //     navigate("/dashboard"); // Navigate to the dashboard after successful verification
//   //   } else {
//   //     setIsError(true);
//   //     setIsErrorShow(response.data.message || "OTP verification failed.");
//   //   }
//   // } catch (error) {
//   //   setIsError(true);
//   //   setIsErrorShow("OTP verification failed. Please try again.");
//   // }
//   // };

//   return (
//     <>
//       <div className="container-fluid min-100vh">
//         <div className="row justify-content-center poppins min-100vh">
//           <Loginleft />
//           <div className="col-lg-8 col-md-8 col-12 d-flex flex-column justify-content-between pt-lg-5 pt-md-5 pt-3 px-0">
//             <div className="container-fluid">
//               <div className="row justify-content-center me-lg-5 me-md-5 login-right-side">
//                 <div className="col-lg-8 col-md-8 col-12 ">
//                   <img src={logo} className=" mt-2" width={"40%"} alt="" />
//                   <form className="row mt-2" onSubmit={handleSubmit}>
//                     <h3 className="mt-3  cocon colororing">OTP Verification</h3>
//                     <p
//                       className="mt-3 font-14 mb-0"
//                       style={{ color: "rgba(148, 148, 148, 1)" }}
//                     >
//                       Enter code that you have received on email
//                     </p>
//                     <div className="otp initian-Otp">
//                       <OtpInput
//                         value={otp}
//                         onChange={setOtp}
//                         numInputs={6}
//                         renderSeparator={<span>&nbsp;&nbsp;</span>}
//                         renderInput={(props) => (
//                           <input
//                             {...props}
//                             style={{
//                               backgroundColor:
//                                 otp.length > props.index
//                                   ? "rgba(241, 99, 54, 1)"
//                                   : "rgba(245, 245, 255, 1)",
//                               color:
//                                 otp.length > props.index ? "white" : "black",
//                             }}
//                           />
//                         )}
//                       />
//                     </div>

//                     {isError && (
//                       <div className="alert alert-danger mt-3" role="alert">
//                         {isErrorShow}
//                       </div>
//                     )}

//                     <button
//                       type="submit"
//                       disabled={isLoading}
//                       className={`mt-4 ms-2 ${
//                         otp ? "otp-btn" : "otp-btn-border"
//                       }`}
//                     >
//                       {isLoading ? (
//                         <Spinner size="sm" color="light" />
//                       ) : (
//                         "Verify"
//                       )}
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-5">
//               <hr
//                 className="border-0"
//                 style={{
//                   opacity: "1",
//                   height: "1px",
//                   backgroundColor: "rgba(111, 111, 111, 1)",
//                 }}
//               />
//               <div className="d-flex justify-content-between flex-wrap colorgray px-4 pb-3">
//                 <span className="mt-2 ms-2 font-14">Terms & Conditions</span>
//                 <span className="mt-2 ms-2 font-14">Privacy Policy</span>
//                 <span className="mt-2 ms-2 font-14">Cookie Policy</span>
//                 <span className="mt-2 ms-2 font-14">
//                   Copyright 2023 GrapeTask. All rights reserved.
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Otp;
import React, { useState, useEffect } from "react";
import Loginleft from "../components/Loginleft";
import logo from "../assets/logo.webp";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../redux/store/store";
import { userOtp } from "../redux/slices/userSlice";
import { Spinner } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Otp = ({ formType }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isLoading, getError } = useSelector((state) => state.user);
  const [otp, setOtp] = useState("");
  const [isError, setIsError] = useState(false);
  const [isErrorShow, setIsErrorShow] = useState("");

  // ✅ FIX: Move OTP validation to useEffect to prevent re-renders
  useEffect(() => {
    if (otp.length === 6) {
      setIsError(false);
      setIsErrorShow("");
    }
  }, [otp]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if OTP is valid before sending request
    if (otp.length !== 6) {
      setIsError(true);
      setIsErrorShow("Please enter a valid 6-digit OTP.");
      return;
    }

    // Prepare data for API
    const data = {
      token: otp,
    };
 dispatch(userOtp(data, handleResponse));
 
    // try {
    //   // Verify OTP using the API
    //   const response = await axios.post(
    //     "https://portal.grapetask.co/api/otp-verify",
    //     data,
    //     {
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (response.data.status) {
    //     // Store user data securely
    //     localStorage.setItem("userData", JSON.stringify(response.data.data));

    //     // Redirect to dashboard after successful verification
    //     navigate("/dashboard");
    //   } else {
    //     setIsError(true);
    //     setIsErrorShow(response.data.message || "OTP verification failed.");
    //   }
    // } catch (error) {
    //   setIsError(true);
    //   setIsErrorShow(
    //     error.response?.data?.message ||
    //       "OTP verification failed. Please try again."
    //   );
    // }
  };
 const handleResponse = async (data) => {
  console.log('response data in otpResetPassword file:',data);
    if (data?.status) {
            localStorage.setItem("accessToken", data?.access_token);
      localStorage.setItem("UserData", JSON.stringify(data?.data));
      localStorage.setItem("Role", data?.data.role);

      toast.success("otp verified", {
        position: "top-right",
        autoClose: 2000,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/resetPassword");
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

  return (
    <>
      <div className="container-fluid min-100vh">
        <div className="row justify-content-center poppins min-100vh">
          <Loginleft />
          <div className="col-lg-6 col-md-6 col-12 d-flex flex-column justify-content-between pt-lg-5 pt-md-5 pt-3 px-0">
            <div className="container-fluid">
              <div className="row justify-content-center me-lg-5 me-md-5 login-right-side">
                <div className="col-lg-8 col-md-8 col-12">
                  <img src={logo} className=" mt-2" width={"40%"} alt="" />
                  <form className="row mt-2" onSubmit={handleSubmit}>
                    <h3 className="mt-3 cocon colororing">OTP Verification</h3>
                    <p
                      className="mt-3 font-14 mb-0"
                      style={{ color: "rgba(148, 148, 148, 1)" }}
                    >
                      Enter code that you have received on email
                    </p>
                    <div className="otp initian-Otp">
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>&nbsp;&nbsp;</span>}
                        renderInput={(props) => (
                          <input
                            {...props}
                            style={{
                              backgroundColor:
                                otp.length > props.index
                                  ? "rgba(241, 99, 54, 1)"
                                  : "rgba(245, 245, 255, 1)",
                              color:
                                otp.length > props.index ? "white" : "black",
                            }}
                          />
                        )}
                      />
                    </div>

                    {isError && (
                      <div className="alert alert-danger mt-3" role="alert">
                        {isErrorShow}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`mt-4 ms-2 ${
                        otp ? "otp-btn" : "otp-btn-border"
                      }`}
                    >
                      {isLoading ? (
                        <Spinner size="sm" color="light" />
                      ) : (
                        "Verify"
                      )}
                    </button>
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
        </div>
      </div>
    </>
  );
};

export default Otp;
