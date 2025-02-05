import React, { useState } from "react";
import { useDispatch, useSelector } from "../redux/store/store";
import logo from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import { userResetPassword } from "../redux/slices/userSlice";
import Loginleft from "../components/Loginleft";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, getError } = useSelector((state) => state.user);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isErrorShow, setIsErrorShow] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      password: newPassword,
      confirm_password: confirmPassword,
    };
    dispatch(userResetPassword(data, handleResponse));
  };
  const handleResponse = async (data) => {
    if (data?.status) {
      toast.success("Successfully Reset Password", {
        position: "top-right",
        autoClose: 2000,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/freelancers");
      // console.log(data?.message)
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
      <div className="container-fluid  poppins">
        <div className="row" style={{ minHeight: "100vh" }}>
          <Loginleft />
          <div className="col-lg-6 col-md-6 col-12 d-flex flex-column justify-content-between pt-lg-5 pt-md-5 pt-3 px-0">
            <div className="container-fluid">
              <div className="row justify-content-center login-right-side">
                <div className="col-lg-10 col-md-10 col-12 ">
                  <img src={logo} className=" mt-2" width={"40%"} alt="" />
                  <div className="row mt-2">
                    <h3 className="mt-3  cocon colororing">
                      Reset your Password
                    </h3>
                  </div>

                  <form
                    class="col-lg-12 col-md-12 col-12 mt-lg-3 mt-md-2 mt-2"
                    onSubmit={handleSubmit}
                  >
                    <ToastContainer />

                    <label htmlFor="new" className="font-14 fw-medium">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new"
                      className="form-control input-field p-3 mt-2"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label htmlFor="confirm" className="font-14 mt-3 fw-medium">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      id="confirm"
                      className="form-control input-field p-3 mt-2"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {isError && (
                      <div className="alert alert-danger mt-3" role="alert">
                        {isErrorShow}
                      </div>
                    )}
                    <button
                      loading={true}
                      type="submit"
                      className="btn-fill mt-4"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Spinner size="sm" color="light" />
                      ) : (
                        "Change Password"
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
}

export default ResetPassword;
