import { Button } from "@mui/material";
import { City, Country, State } from 'country-state-city';
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "reactstrap";
import ConnectWindows from "../../assets/ConnectWindows.webp";
import {
  PrifileOtp,
  getPhoneNumberVer,
  profileChangePassword,
  profileUpdate,
  userProfile
} from "../../redux/slices/profileSlice";
import { useDispatch, useSelector } from "../../redux/store/store";
import "../../style/profile.scss";
import Navbar from "../Navbar";
import ProfileSideBar from "./ProfileSideBar";


const ProfileUser = () => {
  const [tabState, setTabState] = useState("profile");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetail, isLoading, getError } = useSelector(
    (state) => state.profile
  );
  // -----------ERROR---CAUGH-------------
  const [isError, setIsError] = useState(false);
  const [isErrorShow, setIsErrorShow] = useState("");
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

  // Add these state variables to your existing state declarations:
const [countries, setCountries] = useState([]);
const [states, setStates] = useState([]);
const [cities, setCities] = useState([]);
  // --------profile-----------
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [value, setValue] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      fname: firstName,
      lname: lastName,
      phone: value,
      country: country,
      city: city,
      state: state,
      postalCode: zip,
      device_token: "123456",
    };
    dispatch(profileUpdate(data, handleResponse));
  };
  const handleResponse = (data) => {
    if (data?.status) {
      console.log(data?.message, "============if");
      toast.success("Successfully Update Profile", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      console.log(data?.message, "================else");
    }
  };


// Initialize countries on component mount
useEffect(() => {
  const countryData = Country.getAllCountries();
  setCountries(countryData);
}, []);

// Update states when country changes
useEffect(() => {
  if (country) {
    const countryStates = State.getStatesOfCountry(country);
    setStates(countryStates);
    setState(""); // Reset state
    setCities([]); // Reset cities
    setCity(""); // Reset city
  } else {
    setStates([]);
    setCities([]);
    setState("");
    setCity("");
  }
}, [country]);

// Update cities when state changes
useEffect(() => {
  if (country && state) {
    const stateCities = City.getCitiesOfState(country, state);
    setCities(stateCities);
    setCity(""); // Reset city
  } else {
    setCities([]);
    setCity("");
  }
}, [country, state]);


  useEffect(() => {
    const data = {
      device_token: "123456789",
    };
    dispatch(userProfile(data));
  }, [dispatch]);
  localStorage.setItem("UserData", JSON.stringify(userDetail));
  useEffect(() => {
    // console.log(userDetail, '==========================outer=useEffect');
    setFirstName(userDetail?.fname);
    setLastName(userDetail?.lname);
    setCountry(userDetail?.country);
    setCity(userDetail?.city);
    setState(userDetail?.state);
    setZip(userDetail?.postalCode);
    setValue(userDetail?.phone);
  }, [userDetail]);
  // ---------Security------------
  const [currentPas, setCurrentPas] = useState("");
  const [newPas, setNewPas] = useState("");
  const [confirmPas, setConfirmPas] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    let data = {
      password: currentPas,
      newPassword: newPas,
      confirmPassword: confirmPas,
    };
    dispatch(profileChangePassword(data, handleResponseChangePassword));
  };
  const handleResponseChangePassword = (data) => {
    if (data?.status) {
      // localStorage.setItem('accessToken', data?.access_token)
      // navigate('/profile')
      console.log(data?.message);
      setIsErrorShow("");
      setIsError(false);
      toast.success("Successfully Password Change", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      console.log(data?.message);
      //   alert(data?.message)
      setIsErrorShow(data?.message);
      setIsError(true);
    }
  };
  // -----------otp---send-----email-------
  const handleEmailverify = () => {
    dispatch(getPhoneNumberVer());
  };
  // --------------------OTP---VERIFY-----------
  const [otpStatus, setOtpStatus] = useState(false);

  const handleOTPVerify = (e) => {
    e.preventDefault();
    let data = {
      token: otp,
    };
    dispatch(PrifileOtp(data, handleResponsePrifileOtp));
  };
  const handleResponsePrifileOtp = (data) => {
    if (data?.status) {
      if (data?.status == true) {
        setIsErrorShow("");
        setIsError(false);
        setOtpStatus(false);
        setOtp("");
      }
    } else {
      // console.log(data?.message)
      if (data?.status == false) {
        setIsErrorShow(data?.message);
        setIsError(true);
        setOtpStatus(true);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar
        FirstNav="none"
        SecondNav="flex"
        userIcon={<HiOutlineUserCircle size={30} />}
        userMargin="auto"
      />
      <div className="container-fluid profileSetting poppins ">
        <div className="row mt-4">

          <div className="col-lg-3 col-md-3 col-12  px-0 ">
            <ProfileSideBar setupTabState={setTabState} tabStates={tabState} />
          </div>
          <div className="col-lg-9 col-md-9 col-12 px-0 mb-5 poppins">
            <div className="px-lg-5 px-md-4 px-2">
              {tabState === "profile" && (
                <>
                  <form
                    className="container-fluid mt-4 prof-fields"
                    onSubmit={handleSubmit}
                  >
                    <div className="row justify-content-between mt-3 ">
                      <div className="col-lg-6 col-md-6 col-12">
                        <label
                          for="firstName"
                          class="form-label font-18 poppins blackcolor"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control p-3  border-0  font-16 poppins"
                          placeholder="Tom"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          id="firstName"
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-12 mt-lg-0 mt-md-0 mt-sm-4 mt-3">
                        <label
                          for="LastName"
                          class="form-label font-18 poppins blackcolor"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control p-3  border-0  font-16 poppins"
                          placeholder="Ford"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          id="LastName"
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-4 mt-sm-4 mt-3">
                        <p class="font-18 mb-2 mt-lg-3 mt-md-3 poppins blackcolor">
                          Country
                        </p>
                     <select
  className="form-select border-0 font-16 poppins p-3"
  required
  aria-label="Country select"
  value={country}
  onChange={(e) => setCountry(e.target.value)}
>
  <option value="">Select Country</option>
  {countries.map((countryItem) => (
    <option key={countryItem.isoCode} value={countryItem.isoCode}>
      {countryItem.name}
    </option>
  ))}
</select>
                      </div>
                      <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-4 mt-sm-4 mt-3">
                        <p class="font-18 mb-2 mt-lg-3 mt-md-3 poppins blackcolor">
                          Ciity
                        </p>
                        <select
  className="form-select border-0 font-16 poppins p-3"
  required
  aria-label="City select"
  value={city}
  onChange={(e) => setCity(e.target.value)}
  disabled={!state || cities.length === 0}
>
  <option value="">
    {state ? 
      (cities.length > 0 ? "Select City" : "No cities available") : 
      "First select a state"
    }
  </option>
  {cities.map((cityItem, index) => (
    <option key={index} value={cityItem.name}>
      {cityItem.name}
    </option>
  ))}
</select>
                      </div>
                      <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-4 mt-sm-4 mt-3">
                        <label
                          for="firstName"
                          class="form-label font-18 poppins blackcolor"
                        >
                          State/Province
                        </label>
                  <select
  className="form-select border-0 font-16 poppins p-3"
  required
  aria-label="State select"
  value={state}
  onChange={(e) => setState(e.target.value)}
  disabled={!country || states.length === 0}
>
  <option value="">
    {country ? 
      (states.length > 0 ? "Select State/Province" : "No states available") : 
      "First select a country"
    }
  </option>
  {states.map((stateItem) => (
    <option key={stateItem.isoCode} value={stateItem.isoCode}>
      {stateItem.name}
    </option>
  ))}
</select>
                      </div>
                      <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-4 mt-sm-4 mt-3">
                        <label
                          for="LastName"
                          class="form-label font-18 poppins blackcolor"
                        >
                          Zip/Postal Code
                        </label>
                        <input
                          type="text"
                          className="form-control p-3  border-0  font-16 poppins"
                          placeholder="Ford"
                          required
                          id="500"
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                        />
                      </div>
                      {/* <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-4 mt-sm-4 mt-3">
                                                <label for="Npass" class="form-label font-18 poppins blackcolor">New Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control p-3  border-0  font-16 poppins"
                                                    placeholder="Tom"
                                                    id="Npass"
                                                    maxLength={8}
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                />
                                                <p className="font-16 poppins mt-3 mb-0" style={{ color: '#1D2B3C' }}>8 characters or longer. Combine upper and
                                                    lowercase letters and numbers.</p>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-4 mt-sm-4 mt-3">
                                                <label for="cPass" class="form-label font-18 poppins blackcolor">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control p-3  border-0  font-16 poppins"
                                                    placeholder="Ford"
                                                    id="cPass"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </div> */}
                      <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-4 mt-sm-4 mt-3 phone-number">
                        <p class="font-18 mb-2 mt-lg-3 mt-md-3 poppins blackcolor">
                          Country
                        </p>
                        <PhoneInput
                          placeholder="Enter phone number"
                          value={value}
                          international
                          defaultCountry="PK"
                          required
                          onChange={setValue}
                        />
                      </div>
                      <div className="text-end  mt-lg-4 mt-md-4 mt-sm-4 mt-3">
                        <Button
                          type="submit"
                          className=" btn-stepper poppins me-3 px-3 p-2 rounded-2 font-16 w-auto"
                        >
                          Update Profile
                        </Button>
                        <Button className="btn-stepper-border poppins px-3 p-2 rounded-2  font-16 w-auto">
                          Discard Changes
                        </Button>
                      </div>
                    </div>
                  </form>
                </>
              )}

              {tabState === "MyOrders" && (
                <>
                  <div className="ps-2">
                    <h3 className=" font-28 colororing  poppins">
                      Change Password
                    </h3>
                  </div>
                  <div className="container-fluid mt-4">
                    <form
                      className="row justify-content-between mt-3 "
                      onSubmit={handleChangePassword}
                    >
                      <div className="col-lg-6 col-md-6 col-12 prof-fields">
                        <label
                          for="Current"
                          class="form-label font-18 poppins blackcolor"
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={currentPas}
                          onChange={(e) => setCurrentPas(e.target.value)}
                          className="form-control p-3  border-0  font-16 poppins"
                          required
                          id="Current"
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-12 mt-lg-0 mt-md-0 mt-4 d-flex align-items-end prof-fields">
                        <p className="font-18 poppins mb-0 colororing">
                          Forgot Password?
                        </p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-4 mt-sm-4 mt-3 prof-fields">
                        <label
                          for="New"
                          class="form-label font-18 mt-lg-3 mt-md-3 poppins blackcolor"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          value={newPas}
                          onChange={(e) => setNewPas(e.target.value)}
                          className="form-control p-3  border-0  font-16 poppins"
                          required
                          id="New"
                        />
                        <p className="font-16 takegraycolor poppins mt-3 mb-0">
                          8 characters or longer. Combine upper and lowercase
                          letters and numbers.
                        </p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-4 mt-sm-4 mt-3 prof-fields">
                        <label
                          for="Confirm"
                          class="form-label mt-lg-3 mt-md-3 font-18 poppins blackcolor"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          value={confirmPas}
                          onChange={(e) => setConfirmPas(e.target.value)}
                          className="form-control p-3  border-0  font-16 poppins"
                          required
                          id="Confirm"
                        />
                      </div>
                      {isError && (
                        <div
                          className="alert alert-danger mt-3 poppins text-center"
                          role="alert"
                        >
                          {isErrorShow}
                        </div>
                      )}
                      <div className="text-end  mt-lg-4 mt-md-4 mt-sm-4 mt-3 prof-fields">
                        <Button
                          type="submit"
                          loading={true}
                          disabled={isLoading}
                          className="btn-stepper-border poppins px-4  font-16 w-auto"
                        >
                          {profileChangePassword ? (
                            isLoading ? (
                              <Spinner size="sm" color="light" />
                            ) : (
                              "Save Changes"
                            )
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </div>
                    </form>
                    <div className="row justify-content-between  ">
                      <div className="col-12 ">
                        <hr
                          className="my-4 "
                          style={{
                            opacity: "80%",
                            height: "1px",
                            backgroundColor: "#667085",
                            border: "none",
                          }}
                        />
                      </div>
                      <div className="col-12">
                        <h3 className="font-28 colororing poppins">
                          Phone Verification
                        </h3>
                        <p className="mt-4">
                          Your phone is verified with GrapeTask. Click Edit to
                          change your phone number
                        </p>
                        <div className="text-end">
                          <Button
                            className="btn-stepper poppins px-5  font-16 w-auto"
                            data-bs-target="#verfyModal1"
                            data-bs-toggle="modal"
                          >
                            Edit
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
                                      You are trying to add a payout method.
                                      Choose a verification method so we can
                                      make sure it’s you.
                                    </p>
                                  </div>
                                  <div className="modal-footer border-0 justify-content-center text-center">
                                    <Button
                                      className="btn-stepper poppins px-5 m-2 font-16 w-auto"
                                      data-bs-target="#verfyModal3"
                                      data-bs-toggle="modal"
                                    >
                                      Varify By SMS
                                    </Button>
                                    <Button
                                      onClick={handleEmailverify}
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
                                      <div className="row justify-content-center me-lg-5 me-md-5 login-right-side">
                                        <div className="col-lg-10 col-md-10 col-12 ">
                                          <form
                                            className="row mt-2 text-center justify-content-center"
                                            onSubmit={handleOTPVerify}
                                          >
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
                                                numInputs={6}
                                                renderSeparator={
                                                  <span>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                  </span>
                                                }
                                                renderInput={renderInput}
                                              />
                                              <button
                                                type="button"
                                                className="mt-3 poppins border-0 colororing"
                                                style={{
                                                  backgroundColor:
                                                    "transparent",
                                                }}
                                              >
                                                Resend Code
                                              </button>
                                            </div>

                                            {isError && (
                                              <div
                                                className="alert alert-danger mt-3"
                                                role="alert"
                                              >
                                                {isErrorShow}
                                              </div>
                                            )}

                                            <Button
                                              type="submit"
                                              className={` mt-4 poppins px-5  font-16  w-auto ${
                                                otp
                                                  ? "btn-stepper"
                                                  : "btn-stepper-border"
                                              }`}
                                              data-bs-dismiss={`${
                                                otpStatus ? "modal" : ""
                                              }`}
                                            >
                                              Submit
                                            </Button>
                                          </form>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* ---------MODAL--3-------- */}
                            <div
                              className="modal fade"
                              id="verfyModal3"
                              aria-hidden="true"
                              aria-labelledby="exampleModalToggleLabel3"
                              tabIndex={-1}
                            >
                              <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content p-3">
                                  <div className="modal-header border-0 d-flex justify-content-end p-0">
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    />
                                  </div>
                                  <div className="modal-body prof-fields text-start">
                                    <h3 className="font-24 poppins blackcolor">
                                      Enter your Phone Details
                                    </h3>
                                    <div className=" col-12 mt-lg-4 mt-md-4 mt-sm-4 mt-3">
                                      <label
                                        for="country"
                                        class="form-label font-18 poppins blackcolor fw-medium"
                                      >
                                        Enter your country
                                      </label>
                                      <input
                                        type="text"
                                        id="country"
                                        className="form-control p-3  border-0  font-16 poppins"
                                        placeholder="Ford"
                                      />
                                    </div>
                                    <div className=" col-12 mt-lg-4 mt-md-4 mt-sm-4 mt-3 phone-number">
                                      <p class="font-18 mb-2 mt-lg-3 mt-md-3 poppins blackcolor fw-medium">
                                        Enter your Phone Number
                                      </p>
                                      <PhoneInput
                                        placeholder="Enter phone number"
                                        value={value}
                                        international
                                        defaultCountry="AU"
                                        onChange={setValue}
                                      />
                                    </div>
                                  </div>
                                  <div className="modal-footer border-0 mt-3 justify-content-center">
                                    <Button className="btn-stepper poppins px-5  font-16 w-auto">
                                      Submit
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* ====================== */}
                        </div>
                        <hr
                          className="my-4 "
                          style={{
                            opacity: "80%",
                            height: "1px",
                            backgroundColor: "#667085",
                            border: "none",
                          }}
                        />
                        <h3 className="font-28 colororing poppins">
                          Connected Devices
                        </h3>
                        <div
                          className="d-flex px-4 p-4 align-items-center justify-content-between rounded-3 mt-4"
                          style={{ backgroundColor: "#F5F5FF" }}
                        >
                          <div className="d-flex align-items-center">
                            <img
                              src={ConnectWindows}
                              width={50}
                              height={40}
                              alt="w8"
                            />
                            <div className="ms-2">
                              <h5 className="font-16 poppins blackcolor mb-2">
                                Chrome 83, Windows
                              </h5>
                              <p className="font-14 takegraycolor poppins mb-0">
                                Last Activity 30 minutes ago. Lahore, PB,
                                Pakistan
                              </p>
                            </div>
                          </div>
                          <h4 className="font-18 text-decoration-underline">
                            Sign Out
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUser;
