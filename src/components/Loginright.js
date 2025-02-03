// import React, { useState } from "react";
// import { useDispatch, useSelector } from "../redux/store/store";
// import Button from "../components/Button";
// import logo from "../assets/logo.png";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { userRegister } from "../redux/slices/userSlice";
// import { Spinner } from "reactstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// const Loginright = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const referralCode = queryParams.get("referral");
//   console.log(referralCode, "=======referral");
//   const { isLoadingRegister, getError } = useSelector((state) => state.user);
//   // const SetRoleName = useSelector((state) => state.role);
//   // const role = localStorage.getItem("Role");
//   // console.log(SetRoleName,'======role');
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [role, setrole] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [terms, setTerms] = useState(0);
//   const [isError, setIsError] = useState(false);
//   const [isErrorShow, setIsErrorShow] = useState("");
//   // console.log(terms);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (referralCode) {
//       let data = {
//         fname: firstName,
//         lname: lastName,
//         email: email,
//         role: role,
//         password: password,
//         agree_with_terms: terms,
//         referral_code: referralCode,
//       };
//       dispatch(userRegister(data, handleResponse));
//     } else {
//       let data = {
//         fname: firstName,
//         lname: lastName,
//         email: email,
//         role: role,
//         password: password,
//         agree_with_terms: terms,
//       };
//       dispatch(userRegister(data, handleResponse));
//     }
//   };
//   const handleResponse = async (data) => {
//     if (data?.status) {
//       console.log(data?.access_token, "======devicetoken");
//       // localStorage.setItem('accessToken', data?.access_token)
//       // localStorage.setItem('UserData',JSON.stringify(data?.data))

//       toast.success("Successfully Register! Please verify your email", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       navigate("/otp");
//       //   alert(data?.message)
//       if (data?.status == true) {
//         setIsErrorShow("");
//         setIsError(false);
//       }
//     } else {
//       // console.log(data?.message)
//       if (data?.status == false) {
//         setIsErrorShow(data?.message);
//         setIsError(true);
//       }
//     }
//   };
//   return (
//     <>
//       <div className="col-lg-8 col-md-8 col-12 d-flex flex-column justify-content-between pt-lg-5 pt-md-5 pt-3 px-0">
//         <div className="container-fluid">
//           <div className="row justify-content-center me-lg-5 me-md-5 login-right-side">
//             <div className="col-lg-8 col-md-8 col-12 ">
//               <img src={logo} className=" mt-2" width={"40%"} alt="" />
//               <form className="row mt-2" onSubmit={handleSubmit}>
//                 <ToastContainer />

//                 <div class="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
//                   <input
//                     type="text"
//                     required
//                     class="form-control input-field  p-3"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     placeholder="First name"
//                     aria-label="First name"
//                   />
//                 </div>
//                 <div class="col-lg-6 col-md-6 col-sm-12 col-12  mt-3">
//                   <input
//                     type="text"
//                     required
//                     className="form-control input-field  p-3"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     placeholder="Last name"
//                     aria-label="Last name"
//                   />
//                 </div>
//                 <div class="col-lg-6 col-md-6 col-sm-12 col-12  mt-3">
//                   <input
//                     type="text"
//                     required
//                     className="form-control input-field  p-3"
//                     value={role}
//                     onChange={(e) => setrole(e.target.value)}
//                     placeholder="enter your role"
//                     aria-label="enter your  role"
//                   />
//                 </div>
//                 <div class="col-lg-6 col-md-6 col-sm-12 col-12  mt-3">
//                   <input
//                     type="email"
//                     required
//                     className="form-control input-field p-3"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value.toLowerCase())}
//                     placeholder="Email Address"
//                     aria-label="Email Address"
//                   />
//                 </div>
//                 <div class=" col-12 mt-4">
//                   <input
//                     type="password"
//                     required
//                     className="form-control input-field p-3"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     aria-label="Password"
//                   />
//                   {isError && (
//                     <div className="alert alert-danger mt-3" role="alert">
//                       {isErrorShow}
//                     </div>
//                   )}
//                   <button
//                     type="submit "
//                     loading={true}
//                     disabled={isLoadingRegister}
//                     className="btn-fill mt-4"
//                   >
//                     {isLoadingRegister ? (
//                       <Spinner size="sm" color="light" />
//                     ) : (
//                       "Let’s go"
//                     )}
//                   </button>
//                 </div>
//                 <div class="col-12 mt-3 ">
//                   <div class="form-check colororing">
//                     <input
//                       class="form-check-input "
//                       checked
//                       onChange={(e) => setTerms(e.target.checked ? 1 : 0)}
//                       type="checkbox"
//                       id="gridCheck"
//                     />
//                     <label class="form-check-label colorgray" for="gridCheck">
//                       I am agreed with Terms of Service, Privacy Policy, and
//                       GrapeTask default Notification Settings.
//                     </label>
//                   </div>
//                   <p class="font-16 poppins colorgray credit-lines d-flex justify-content-center align-items-center mt-3 mb-4">
//                     &nbsp;&nbsp;or&nbsp;&nbsp;
//                   </p>
//                 </div>
//                 <Button text="Sign up with Google" />
//                 <p className="font-15 mt-3 colorgray">
//                   Already a member?{" "}
//                   <Link to="/login" className="colororing">
//                     LOG IN HERE
//                   </Link>{" "}
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//         <div className="mt-5">
//           <hr
//             className="border-0"
//             style={{
//               opacity: "1",
//               height: "1px",
//               backgroundColor: "rgba(111, 111, 111, 1)",
//             }}
//           />
//           <div className="d-flex justify-content-between flex-wrap colorgray px-4 pb-3">
//             <span className="mt-2 ms-2 font-14">Terms & Conditions</span>
//             <span className="mt-2 ms-2 font-14">Privacy Policy</span>
//             <span className="mt-2 ms-2 font-14">Cookie Policy</span>
//             <span className="mt-2 ms-2 font-14">
//               Copyright 2023 GrapeTask. All rights reserved.
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Loginright;
import React, { useState } from "react";
import { useDispatch, useSelector } from "../redux/store/store";
import Button from "../components/Button";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userRegister } from "../redux/slices/userSlice";
import { Spinner } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Loginright = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const referralCode = queryParams.get("referral");

  const { isLoadingRegister, getError } = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(true); // Initialize as true (checkbox is checked by default)
  const [isError, setIsError] = useState(false);
  const [isErrorShow, setIsErrorShow] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    if (!firstName || !lastName || !role || !email || !password || !terms) {
      setIsError(true);
      setIsErrorShow("All fields are required.");
      return;
    }

    // Prepare data for API
    const data = {
      fname: firstName,
      lname: lastName,
      username: email.split("@")[0], // ✅ Generate a basic username
      email: email,
      role: role,
      password: password,
      agree_with_terms: terms ? 1 : 0,
      referral_code: referralCode || "0",
    };
    console.log("Data being sent:", data); // ✅ Log to check data before sending

    // Dispatch the userRegister action
    dispatch(userRegister(data, handleResponse));
  };
  const handleResponse = async (data) => {
    if (data?.status) {
      toast.success("Successfully Registered! Please verify your email.", {
        position: "top-right",
        autoClose: 2000,
      });

      // Store access token in localStorage
      if (data?.access_token) {
        localStorage.setItem("accessToken", data.access_token);
      }

      // Store user data in localStorage
      if (data?.data) {
        localStorage.setItem("userData", JSON.stringify(data.data));
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/otp"); // Navigate to OTP page after successful registration
    } else {
      setIsError(true);
      setIsErrorShow(data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <>
      <div className="col-lg-8 col-md-8 col-12 d-flex flex-column justify-content-between pt-lg-5 pt-md-5 pt-3 px-0">
        <div className="container-fluid">
          <div className="row justify-content-center me-lg-5 me-md-5 login-right-side">
            <div className="col-lg-8 col-md-8 col-12">
              <img src={logo} className="mt-2" width={"40%"} alt="" />
              <form className="row mt-2" onSubmit={handleSubmit}>
                <ToastContainer />

                {/* First Name */}
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                  <input
                    type="text"
                    required
                    className="form-control input-field p-3"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    aria-label="First name"
                  />
                </div>

                {/* Last Name */}
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                  <input
                    type="text"
                    required
                    className="form-control input-field p-3"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    aria-label="Last name"
                  />
                </div>

                {/* Role */}
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                  <input
                    type="text"
                    required
                    className="form-control input-field p-3"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Enter your role"
                    aria-label="Enter your role"
                  />
                </div>

                {/* Email */}
                <div className="col-12 mt-4">
                  <input
                    type="email"
                    required
                    className="form-control input-field p-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    placeholder="Email Address"
                    aria-label="Email Address"
                  />
                </div>

                {/* Password */}
                <div className="col-12 mt-4">
                  <input
                    type="password"
                    required
                    className="form-control input-field p-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    aria-label="Password"
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="col-12 mt-3">
                  <div className="form-check colororing">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                      checked={terms}
                      onChange={(e) => setTerms(e.target.checked)}
                      required
                    />
                    <label
                      className="form-check-label colorgray"
                      htmlFor="gridCheck"
                    >
                      I agree with the Terms of Service, Privacy Policy, and
                      GrapeTask default Notification Settings.
                    </label>
                  </div>
                </div>

                {/* Error Message */}
                {isError && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {isErrorShow}
                  </div>
                )}

                {/* Submit Button */}
                <div className="col-12 mt-4">
                  <button
                    type="submit"
                    className="btn-fill w-100"
                    disabled={isLoadingRegister}
                  >
                    {isLoadingRegister ? (
                      <Spinner size="sm" color="light" />
                    ) : (
                      "Let’s go"
                    )}
                  </button>
                </div>

                {/* Additional Links */}
                <div className="col-12 mt-3">
                  <p className="font-15 mt-3 colorgray">
                    Already a member?{" "}
                    <Link to="/login" className="colororing">
                      LOG IN HERE
                    </Link>
                  </p>
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

export default Loginright;
