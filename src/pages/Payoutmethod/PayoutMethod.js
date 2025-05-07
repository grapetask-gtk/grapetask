import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import Earnings from "../../assets/Earnings.webp";
import resent from "../../assets/resend.webp";
import "../../style/payout.css";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../../style/profile.scss";
import { useState } from "react";
import { Button } from "@mui/material";
import OtpInput from "react-otp-input";
import { FaAngleLeft, FaRegUserCircle } from "react-icons/fa";
const PayoutMethod = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  // ------------MODAL---2-----Verified---------
  const [otp, setOtp] = useState("");
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
  return (
    <>
      <Navbar FirstNav="none" />
      <div className="container-fluid p-5 pt-5 pb-5 poppins">
        <h6
          className="font-16 fw-semibold blackcolor"
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft size={22} /> Back to Earnings
        </h6>
        <div className="row Earnings p-4 px-3 mt-4 rounded-3">
          <div className="col-6 d-flex align-items-center">
            <div>
              <h4 className="font-28 font-500 poppins">Withdraw balence</h4>
              <h5 className="font-28 poppins mt-3 textearning">
                Available for withdrawl
              </h5>
              <h4 className="font-32 font-500 poppins">$0</h4>
              <div className="mt-3">
                <h5 className=" font-28 poppins textearning">
                  You can add your payout method once your earning will be
                  greater then 100$
                </h5>

                {/* button model */}
                <div>
                  {/* <Button className='btn-stepper poppins px-5  font-16 w-auto' data-bs-target="#verfyModal1" data-bs-toggle="modal">
                    Add Payout Method
                  </Button> */}

                  <Button
                    onClick={() => navigate("/paymentcard")}
                    className="btn-stepper poppins px-5  font-16 w-auto"
                    disabled
                  >
                    Add Payout Method
                  </Button>
                  {/* ====================== */}
                  {/* Modal verification */}
                  <div className="Modal-verification">
                    {/* ---------MODAL--1-------- */}
                    <div
                      className="modal fade"
                      id="verfyModal1"
                      aria-hidden="true"
                      aria-labelledby="exampleModalToggleLabel"
                      tabIndex={-1}
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content px-3 p-3">
                          <div className="modal-header p-0 border-0">
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <div className="modal-body text-start ">
                            <h3
                              className=" font-28 poppins"
                              id="exampleModalToggleLabel"
                            >
                              Let’s Varify It’s You
                            </h3>
                            <p className="takegraycolor font-18 poppins">
                              You are trying to add a payout method. Choose a
                              verification method so we can make sure it’s you.
                            </p>
                          </div>
                          <div className="modal-footer border-0 justify-content-center text-center">
                            <Button
                              className="btn-stepper-border  poppins m-2  px-5  font-16 w-auto"
                              data-bs-target="#verfyModal2"
                              data-bs-toggle="modal"
                            >
                              Varify By EMAIL
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ----MODAL--2----------------- */}
                    <div
                      className="modal fade"
                      id="verfyModal2"
                      aria-hidden="true"
                      aria-labelledby="exampleModalToggleLabel2"
                      tabIndex={-1}
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-3">
                          <div className="modal-header border-0 d-flex justify-content-between p-0">
                            <button
                              type="button"
                              className="border-0"
                              style={{ backgroundColor: "transparent" }}
                              data-bs-target="#verfyModal1"
                              data-bs-toggle="modal"
                            >
                              <FaAngleLeft size={30} />
                            </button>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <div className="modal-body">
                            <div className="container-fluid">
                              <div className="row justify-content-center login-right-side">
                                <div className="col-lg-10 col-md-10 col-12 ">
                                  <div className="row mt-2 text-center justify-content-center">
                                    <h3 className="mt-3 font-24  poppins blackcolor">
                                      Varifcation Code Sent To:
                                    </h3>
                                    <p
                                      className=" font-16 takegraycolor mb-0"
                                      style={{
                                        color: "rgba(148, 148, 148, 1)",
                                      }}
                                    >
                                      your...@domain.com
                                    </p>
                                    <div className="otp">
                                      <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={4}
                                        renderSeparator={
                                          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        }
                                        renderInput={renderInput}
                                      />
                                      <button
                                        type="button"
                                        className="mt-3 poppins border-0 colororing"
                                        style={{
                                          backgroundColor: "transparent",
                                        }}
                                        data-bs-target="#verfyModal1"
                                        data-bs-toggle="modal"
                                      >
                                        Resend Code
                                      </button>
                                    </div>

                                    <Button
                                      className={` mt-4 poppins px-5  font-16  w-auto ${
                                        otp
                                          ? "btn-stepper"
                                          : "btn-stepper-border"
                                      }`}
                                      data-bs-dismiss="modal"
                                      onClick={() => navigate("/paymentcard")}
                                    >
                                      Submit
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <img src={Earnings} className="w-100" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PayoutMethod;
