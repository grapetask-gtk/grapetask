import React, { useState } from "react";
import Loginleft from "../components/Loginleft";
import logo from "../assets/logo.png";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../redux/store/store";
import { userOtp } from "../redux/slices/userSlice";
import { Spinner } from "reactstrap";
const Otp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, getError } = useSelector((state) => state.user);
  const [otp, setOtp] = useState("");
  const [isError, setIsError] = useState(false);
  const [isErrorShow, setIsErrorShow] = useState("");
  // console.log(otp);
  const renderInput = (inputProps, index) => {
    const isFilled = otp.length > index; // Check if OTP value is present

    // Apply different background colors based on whether OTP value is present or not
    const backgroundColor = isFilled
      ? "rgba(241, 99, 54, 1)"
      : "rgba(245, 245, 255, 1)";
    const color = isFilled ? "white" : "rgba(0, 0, 0, 1)";

    return (
      <input
        {...inputProps}
        style={{ backgroundColor, color }}
        maxLength={1} // Set max length to 1 to allow only one character
      />
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      token: otp,
      is_wm: 1,
    };
    dispatch(userOtp(data, handleResponse));
  };
  const handleResponse = (data) => {
    if (data?.status) {
      localStorage.setItem("accessToken", data?.access_token);
      localStorage.setItem("UserData", JSON.stringify(data?.data));
      navigate("/dashboard");
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
                        renderInput={renderInput}
                      />
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
                      className={` mt-4 ms-2 ${
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
