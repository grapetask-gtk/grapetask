import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "reactstrap";
import join from "../assets/join.webp";
import line from "../assets/line.webp";
import logo from "../assets/logo.webp";
import Button from "../components/Button";
import { userLogin } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "../redux/store/store";

const Login1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isErrorShow, setIsErrorShow] = useState("");

  const handleRoleSelect = (role) => {
    localStorage.setItem("Role", role);
    navigate("/signup");
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    data: { email, password },
    handleClose: (res) => {
      handleResponse(res);
    },
  };

  try {
    await dispatch(userLogin(payload)).unwrap();
  } catch (error) {
    toast.error(error || 'Login failed');
  }
};

const handleResponse = async (data) => {
  if (data?.status) {
    localStorage.setItem("accessToken", data?.access_token);
    localStorage.setItem("UserData", JSON.stringify(data?.data));
    localStorage.setItem("Role", data?.data.role);

    toast.success("Successfully Logged In", {
      position: "top-right",
      autoClose: 2000,
    });

    setIsError(false);
    setIsErrorShow("");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    navigate(data?.data?.role === "admin" ? "/admin" : "/freelancers");
  } else {
    setIsError(true);
    setIsErrorShow(data?.message || "Login failed. Try again.");
    toast.error(data?.message || "Login failed. Try again.");
  }
};

  return (
    <>
      <div className="col-lg-6 col-md-6 col-12 d-flex flex-column justify-content-between pt-lg-5 pt-md-5 pt-3 px-0">
        <div className="container-fluid">
          <div className="row justify-content-center me-lg-5 me-md-5 login-right-side">
            <div className="col-lg-8 col-md-8 col-12">
              <img src={logo} className="mt-2" width={"40%"} alt="Logo" />
              <form className="row mt-2" onSubmit={handleSubmit}>
                <ToastContainer />
                <div className="col-12 mt-4">
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
                <div className="col-12 mt-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                    type="submit"
                    className="btn-fill mt-4"
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner size="sm" color="light" /> : "Let’s go"}
                  </button>
                </div>

                <div className="col-12 mt-2">
                  <p className="font-16 poppins colorgray credit-lines d-flex justify-content-center align-items-center mt-3 mb-4">
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
                  </span>
                </p>

                {/* Modal */}
                <div
                  className="modal fade"
                  id="JoinUSModal"
                  tabIndex="-1"
                  aria-labelledby="JoinUSModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-body p-lg-5 p-md-4 p-3">
                        <div className="row justify-content-center">
                          <h2 className="font-28 text-center cocon">
                            Join as a Expert, Client or Business Developer.
                          </h2>
                          <div className="d-flex justify-content-center">
                            <img src={line} className="text-center w-25" alt="Line" />
                          </div>
                          <div className="container">
                            <div className="row justify-content-center">
                              {[
                                {
                                  text: "I’m a Expert looking for work",
                                  role: "freelancer",
                                  handler: handleRoleSelect,
                                },
                                {
                                  text: "I'm a Client looking for Business Developer",
                                  role: "client",
                                  handler: handleRoleSelect,
                                },
                                {
                                  text: "I’m a Business Developer looking for work",
                                  role: "bd",
                                  handler: handleRoleSelect,
                                },
                              ].map(({ text, role, handler }, index) => (
                                <div
                                  className="col-lg-4 col-md-6 col-sm-6 col-12 mt-5"
                                  key={index}
                                >
                                  <div
                                    className="cursor-pointer h-100 outsouces pt-4 pb-4 position-relative"
                                    onClick={() => handler(role)}
                                    data-bs-dismiss="modal"
                                  >
                                    <div className="px-4">
                                      <img
                                        src={join}
                                        width={60}
                                        height={60}
                                        className="shadow join-img"
                                        alt="Join Option"
                                      />
                                      <h6 className="pt-4 font-16 position-relative z-3">
                                        {text}
                                      </h6>
                                      <Link
                                        to="#"
                                        data-bs-dismiss="modal"
                                        className="position-relative font-16 z-3"
                                      >
                                        Get Started &gt;
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5">
          <hr
            className="border-0"
            style={{
              opacity: 1,
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
