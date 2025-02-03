import React, { useState } from "react";
import Loginleft from "../components/Loginleft";
import logo from "../assets/logo.png";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../redux/store/store";
import { userOtp } from "../redux/slices/userSlice";
import { Spinner } from "reactstrap";
import axios from "axios";

const Otp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, getError } = useSelector((state) => state.user);
  const [otp, setOtp] = useState("");
  const [isError, setIsError] = useState(false);
  const [isErrorShow, setIsErrorShow] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate OTP
    if (otp.length !== 6) {
      setIsError(true);
      setIsErrorShow("Please enter a valid 6-digit OTP.");
      return;
    }

    // Prepare data for API
    const data = {
      token: otp,
      is_wm: 1,
    };

    try {
      // Verify OTP using the API
      const response = await axios.post(
        "https://portal.grapetask.co/api/verify-otp",
        data
      );

      if (response.data.status) {
        // Store access token and user data in localStorage
        localStorage.setItem("accessToken", response.data.access_token);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        navigate("/dashboard"); // Navigate to the dashboard after successful verification
      } else {
        setIsError(true);
        setIsErrorShow(response.data.message || "OTP verification failed.");
      }
    } catch (error) {
      setIsError(true);
      setIsErrorShow("OTP verification failed. Please try again.");
    }
  };

  return (
    <>
      <div className="container-fluid min-100vh">
        <div className="row justify-content-center poppins min-100vh">
          <Loginleft />
          <div className="col-lg-8 col-md-8 col-12 d-flex flex-column justify-content-between pt-lg-5 pt-md-5 pt-3 px-0">
            <div className="container-fluid">
              <div className="row justify-content-center me-lg-5 me-md-5 login-right-side">
                <div className="col-lg-8 col-md-8 col-12 ">
                  <img src={logo} className=" mt-2" width={"40%"} alt="" />
                  <form className="row mt-2" onSubmit={handleSubmit}>
                    <h3 className="mt-3  cocon colororing">OTP Verification</h3>
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
