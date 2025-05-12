import React, { useEffect, useState } from "react";
import Natayla from "../assets/Natayla.webp";
import pen from "../assets/pen.webp";
import { CircularProgressbar } from "react-circular-progressbar";
import doubl from "../assets/doubletick.webp";
import doube from "../assets/duble.webp";
import { Button } from "@mui/material";
import { BsFillPencilFill, BsInstagram } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "../redux/store/store";
import { profileUpdate, userProfile } from "../redux/slices/profileSlice";
import { TagsAdd, usergetsTags } from "../redux/slices/dashboardSlice";
import emptyProfile from "../assets/emptyProfileModal.webp";
import { Badge, ProgressBar } from "react-bootstrap";

const Dashboardright = () => {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.profile);
  const { tagsList, isLoading } = useSelector((state) => state.dashboard);
  const UserData = JSON.parse(localStorage.getItem("UserData"));

  // Dummy percentages for circular progress bars
  const percentage1 = 0;
  const percentage2 = 0;
  const percentage3 = 0;

  // ---------- Name Update -----------
  const [firstName, setFirstName] = useState("");
  const handleNameSubmit = (e) => {
    e.preventDefault();
    let data = {
      fname: firstName,
    };
    dispatch(profileUpdate(data, handleResponse));
  };
  const handleResponse = (data) => {
    if (data?.status) {
      // Handle success (e.g., toast notification)
    } else {
      // Handle error
    }
  };

  // Fetch user profile on mount and update first name
  useEffect(() => {
    const data = {
      device_token: "123456789",
    };
    dispatch(userProfile(data));
  }, [dispatch]);

  useEffect(() => {
    if (userDetail) {
      setFirstName(userDetail.fname);
    }
  }, [userDetail]);

  // ------------- Skills Section -------------
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState([]);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleTagsAdd = (e) => {
    e.preventDefault();
    setShowModal(false);
    let data = {
      skill: tags,
    };
    dispatch(TagsAdd(data, handleResponseTagsAdd));
  };
  const handleResponseTagsAdd = (data) => {
    if (data?.status) {
      // Optionally handle success
    } else {
      // Optionally handle error
    }
  };

  useEffect(() => {
    dispatch(usergetsTags());
  }, [dispatch]);

  useEffect(() => {
    // Extract skill names from tagsList
    const skillArray = tagsList.map((val) => val.skill);
    setTags(skillArray);
  }, [tagsList]);

  // Current month for "Earned in" section
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

   // ----------- User Level Display Component -----------
   const UserLevelDisplayComponent = ({ userDetail }) => {
    // The user's level could be: "New", "Level 1", "Level 2", "Level 3", "Top Rated", etc.
    const userLevel = userDetail?.level || "New";

    // Map each level string to a percentage
    const levelMap = {
      "New": 0,
      "Level 1": 25,
      "Level 2": 50,
      "Level 3": 75,
      "Top Rated": 100,
    };

    // Convert the userLevel string into a numeric percentage
    const progressPercent = levelMap[userLevel] ?? 0;

    return (
      <div className="d-flex align-items-center">
        <Badge bg="primary" className="me-2" style={{ fontSize: "14px" }}>
          {userLevel}
        </Badge>
        <ProgressBar
          now={progressPercent}
          label={`${progressPercent}%`}
          style={{ width: "200px", height: "10px", fontSize: "10px" }}
        />
      </div>
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="Revie">
            <div className="text-center">
              <img
                src={UserData?.image ? UserData?.image : emptyProfile}
                className="rounded-circle"
                width={120}
                height={120}
                alt="Profile"
              />
              <div>
                <a
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  <h6 className="font-22 font-500 poppins mt-3">
                    {firstName}
                    <span>
                      <img
                        src={pen}
                        className="ms-1"
                        width={16}
                        height={16}
                        alt="Edit"
                      />
                    </span>
                  </h6>
                </a>
              </div>
              <p className="font-14 poppins">
                {userDetail ? userDetail.role : ""}
              </p>
              {/* Enhanced user level display */}
              <UserLevelDisplayComponent userDetail={userDetail} />
              <div className="d-flex mt-5 pb-5 text-center poppins">
                <div className="loader1">
                  <CircularProgressbar
                    className="w-75"
                    value={percentage1}
                    text={`${percentage1}%`}
                  />
                  <h6 className="mt-3 font-14 poppins blackcolor">
                    Project Success Ratio
                  </h6>
                </div>
                <div className="loader2">
                  <CircularProgressbar
                    className="w-75"
                    value={percentage2}
                    text={`${percentage2}%`}
                  />
                  <h6 className="mt-3 font-14 poppins blackcolor">
                    Total Order
                  </h6>
                </div>
                <div className="loader3">
                  <CircularProgressbar
                    className="w-75"
                    value={percentage3}
                    text={`${percentage3}%`}
                  />
                  <h6 className="mt-3 font-14 poppins blackcolor">
                    Complete <br />
                    Order
                  </h6>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="font-18 font-500 poppins blackcolor">
                    Last Activites
                  </h6>
                </div>
                <div>
                  <p className="font-16 poppins colororing">See All</p>
                </div>
              </div>
              <div
                className="d-flex rounded-4 px-3 mt-2 p-2 align-items-center"
                style={{ border: "1.5px solid #AC9E9E" }}
              >
                <div>
                  <img src={doubl} width={45} height={45} alt="Activity" />
                </div>
                <div>
                  <h6 className="ms-2 font-14 poppins mb-0">
                    No Activities Found :)
                  </h6>
                </div>
              </div>
            </div>
            <div className="d-flex mt-5 pb-5 text-center poppins">
              {/* Additional Dashboard Content */}
            </div>
          </div>
        </div>
        {/* ================== Skills Section ================== */}
        <div className="mt-lg-5 mt-md-3 mt-2">
          <h4 className="byerLine font-22 font-500 cocon blackcolor">Skills</h4>
          <div className="Revie p-3 mt-lg-4 mt-md-3 mt-2">
            <div className="text-end">
              <button
                type="button"
                className="font-12 poppins colororing border-0"
                onClick={toggleModal}
                style={{ backgroundColor: "transparent" }}
              >
                <BsFillPencilFill />
              </button>
            </div>
            <Modal className="poppins" isOpen={showModal} toggle={toggleModal}>
              <ModalHeader toggle={toggleModal}>Add Skills</ModalHeader>
              <form className="AddFaqs-step-three">
                <ModalBody>
                  <div className="form-group">
                    <div className="devices-tag-add">
                      <Autocomplete
                        multiple
                        id="tags"
                        options={[]}
                        freeSolo
                        value={tags}
                        onChange={(e, newValue) => {
                          setTags(newValue.slice(0, 5));
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Add tags..."
                          />
                        )}
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter className="border-0">
                  <Button
                    className="btn-stepper poppins px-3 me-2 font-16"
                    onClick={toggleModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleTagsAdd}
                    disabled={isLoading}
                    className="btn-stepper poppins px-3 font-16"
                  >
                    {isLoading ? <Spinner size="sm" color="light" /> : "Save Skills"}
                  </Button>
                </ModalFooter>
              </form>
            </Modal>
            <>
              {tagsList.map((value, index) => (
                <span
                  className="poppins m-1 rounded-4 haifwhite d-inline-flex"
                  key={index}
                >
                  <span className="mb-0 font-10 colorgray">{value.skill}</span>
                </span>
              ))}
            </>
          </div>
        </div>
        {/* ================== Orders Section ================== */}
        <div className="mt-lg-5 mt-md-3 mt-2">
          <h6 className="byerLine font-20 font-500 cocon blackcolor">Orders</h6>
          <div className="Revie mt-lg-4 mt-md-3 mt-2">
            <div className="d-flex justify-content-between">
              <div>
                <p className="font-18 font-500 poppins blackcolor">Active orders</p>
              </div>
              <div>
                <p className="font-18 font-500 poppins">0</p>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div>
                <p className="font-18 font-500 poppins">
                  Earned in {currentMonth}
                </p>
              </div>
              <div>
                <p className="font-18 font-500 poppins">$0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ================== Profile Update Modal ================== */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form onSubmit={handleNameSubmit} className="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <h6 className="font-20 font-500 poppins blackcolor">
                Write your display name
              </h6>
              <p className="font-14 takegraycolor poppins">
                Express your identity and personalize your presence by leaving
                your mark. Write your Job Title here and make a lasting impression.
              </p>
              <input
                className="form-control model-input p-3"
                type="text"
                placeholder="Product Designer"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="modal-footer border-0">
              <Button
                className="btn-stepper-border poppins me-3 px-3 p-2 rounded-2 font-16 w-auto"
                data-bs-dismiss="modal"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                data-bs-dismiss="modal"
                className="btn-stepper poppins px-3 p-2 rounded-2 font-16 w-auto"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Dashboardright;
