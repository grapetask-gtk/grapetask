import { Autocomplete, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Badge, ProgressBar } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import { BsFillPencilFill } from "react-icons/bs";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import doubl from "../assets/doubletick.webp";
import emptyProfile from "../assets/emptyProfileModal.webp";
import pen from "../assets/pen.webp";
// Fixed imports - using the correct exports from dashboardSlice
import { addUserTag, fetchUserActivities, fetchUserStats, fetchUserTags } from "../redux/slices/dashboardSlice";
import { profileUpdate, userProfile } from "../redux/slices/profileSlice";
import { useDispatch, useSelector } from "../redux/store/store";

const Dashboardright = () => {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.profile);
  const { tagsList, isLoading, userStats, activities } = useSelector((state) => state.dashboard);
  const UserData = JSON.parse(localStorage.getItem("UserData"));

  // Get user role from userDetail or UserData
  const userRole = userDetail?.role || UserData?.role || "client";

  // Real progress data from userStats
  const getProgressData = () => {
    if (!userStats) {
      return { percentage1: 0, percentage2: 0, percentage3: 0 };
    }

    switch (userRole.toLowerCase()) {
      case "expert/freelancer":
        return {
          percentage1: userStats.projectSuccessRatio || 0,
          percentage2: userStats.totalOrders || 0,
          percentage3: userStats.completeOrders || 0,
        };
      case "bd":
      case "bidder/company representative/middleman":
        return {
          percentage1: userStats.clientConversionRate || 0,
          percentage2: userStats.totalLeads || 0,
          percentage3: userStats.convertedLeads || 0,
        };
      case "client":
      default:
        return {
          percentage1: userStats.projectsPosted || 0,
          percentage2: userStats.activeProjects || 0,
          percentage3: userStats.completedProjects || 0,
        };
    }
  };

  const { percentage1, percentage2, percentage3 } = getProgressData();

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

  // Fetch user profile and stats on mount
  useEffect(() => {
    const data = {
      device_token: "123456789",
    };
    dispatch(userProfile(data));
    // Fetch user statistics - Fixed function calls
    dispatch(fetchUserStats());
    // Fetch user activities - Fixed function calls
    dispatch(fetchUserActivities());
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
    // Fixed function call - using addUserTag instead of TagsAdd
    dispatch(addUserTag(data, handleResponseTagsAdd));
  };
  const handleResponseTagsAdd = (data) => {
    if (data?.status) {
      // Optionally handle success
    } else {
      // Optionally handle error
    }
  };

  useEffect(() => {
    if (userRole.toLowerCase() === "expert/freelancer" || userRole.toLowerCase() === "bidder/company representative/middleman") {
      // Fixed function call - using fetchUserTags instead of usergetsTags
      dispatch(fetchUserTags());
    }
  }, [dispatch, userRole]);

  useEffect(() => {
    // Extract skill names from tagsList
    const skillArray = tagsList.map((val) => val.skill);
    setTags(skillArray);
  }, [tagsList]);

  // Current month for "Earned in" section
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  // ----------- User Level Display Component -----------
  const UserLevelDisplayComponent = ({ userDetail, userRole }) => {
    // Different level systems based on role
    const getLevelData = () => {
      const role = userRole.toLowerCase();
      const userLevel = userDetail?.level || "New";

      switch (role) {
        case "expert/freelancer":
          const freelancerLevelMap = {
            "New": { percent: 0, color: "secondary" },
            "Level 1": { percent: 25, color: "info" },
            "Level 2": { percent: 50, color: "primary" },
            "Level 3": { percent: 75, color: "warning" },
            "Top Rated": { percent: 100, color: "success" },
          };
          return freelancerLevelMap[userLevel] || { percent: 0, color: "secondary" };

        case "bd":
        case "bidder/company representative/middleman":
          const bdLevelMap = {
            "New": { percent: 0, color: "secondary" },
            "Junior BD": { percent: 30, color: "info" },
            "Senior BD": { percent: 60, color: "primary" },
            "BD Manager": { percent: 90, color: "warning" },
            "BD Director": { percent: 100, color: "success" },
          };
          return bdLevelMap[userLevel] || { percent: 0, color: "secondary" };

        case "client":
        default:
          const clientLevelMap = {
            "New": { percent: 0, color: "secondary" },
            "Verified": { percent: 50, color: "primary" },
            "Premium": { percent: 100, color: "success" },
          };
          return clientLevelMap[userLevel] || { percent: 0, color: "secondary" };
      }
    };

    const { percent, color } = getLevelData();
    const userLevel = userDetail?.level || "New";

    return (
      <div className="d-flex align-items-center justify-content-center">
        <Badge bg={color} className="me-2" style={{ fontSize: "14px" }}>
          {userLevel}
        </Badge>
        <ProgressBar
          now={percent}
          label={`${percent}%`}
          variant={color}
          style={{ width: "200px", height: "10px", fontSize: "10px" }}
        />
      </div>
    );
  };

  // Role-based progress bar labels
  const getProgressLabels = () => {
    switch (userRole.toLowerCase()) {
      case "expert/freelancer":
        return {
          label1: "Project Success Ratio",
          label2: "Total Orders",
          label3: "Complete Orders"
        };
      case "bd":
      case "bidder/company representative/middleman":
        return {
          label1: "Client Conversion Rate",
          label2: "Total Leads",
          label3: "Converted Leads"
        };
      case "client":
      default:
        return {
          label1: "Projects Posted",
          label2: "Active Projects",
          label3: "Completed Projects"
        };
    }
  };

  const { label1, label2, label3 } = getProgressLabels();

  // Role-based orders section with real data
  const renderOrdersSection = () => {
    if (!userStats) {
      return <div>Loading...</div>;
    }

    switch (userRole.toLowerCase()) {
      case "expert/freelancer":
        return (
          <div className="mt-lg-5 mt-md-3 mt-2">
            <h6 className="byerLine font-20 font-500 cocon blackcolor">Orders</h6>
            <div className="Revie mt-lg-4 mt-md-3 mt-2">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="font-18 font-500 poppins blackcolor">Active orders</p>
                </div>
                <div>
                  <p className="font-18 font-500 poppins">{userStats.activeOrders || 0}</p>
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
                  <p className="font-18 font-500 poppins">${userStats.monthlyEarnings || 0}</p>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div>
                  <p className="font-18 font-500 poppins">Total Earnings</p>
                </div>
                <div>
                  <p className="font-18 font-500 poppins">${userStats.totalEarnings || 0}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "bd":
      case "bidder/company representative/middleman":
        return (
          <div className="mt-lg-5 mt-md-3 mt-2">
            <h6 className="byerLine font-20 font-500 cocon blackcolor">Performance</h6>
            <div className="Revie mt-lg-4 mt-md-3 mt-2">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="font-18 font-500 poppins blackcolor">Active Leads</p>
                </div>
                <div>
                  <p className="font-18 font-500 poppins">{userStats.activeLeads || 0}</p>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div>
                  <p className="font-18 font-500 poppins">
                    Conversions in {currentMonth}
                  </p>
                </div>
                <div>
                  <p className="font-18 font-500 poppins">{userStats.monthlyConversions || 0}</p>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div>
                  <p className="font-18 font-500 poppins">Revenue Generated</p>
                </div>
                <div>
                  <p className="font-18 font-500 poppins">${userStats.revenueGenerated || 0}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "client":
      default:
        return (
          <div className="mt-lg-5 mt-md-3 mt-2">
            <h6 className="byerLine font-20 font-500 cocon blackcolor">Projects</h6>
            <div className="Revie mt-lg-4 mt-md-3 mt-2">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="font-18 font-500 poppins blackcolor">Active Projects</p>
                </div>
                <div>
                  <p className="font-18 font-500 poppins">{userStats.activeProjects || 0}</p>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div>
                  <p className="font-18 font-500 poppins">
                    Spent in {currentMonth}
                  </p>
                </div>
                <div>
                  <p className="font-18 font-500 poppins">${userStats.monthlySpent || 0}</p>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div>
                  <p className="font-18 font-500 poppins">Total Projects</p>
                </div>
                <div>
                  <p className="font-18 font-500 poppins">{userStats.totalProjects || 0}</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  // Render activities with real data
  const renderActivities = () => {
    if (!activities || activities.length === 0) {
      return (
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
      );
    }

    return activities.slice(0, 3).map((activity, index) => (
      <div
        key={index}
        className="d-flex rounded-4 px-3 mt-2 p-2 align-items-center"
        style={{ border: "1.5px solid #AC9E9E" }}
      >
        <div>
          <img src={activity.icon || doubl} width={45} height={45} alt="Activity" />
        </div>
        <div>
          <h6 className="ms-2 font-14 poppins mb-0">
            {activity.description}
          </h6>
          <p className="ms-2 font-12 poppins text-muted mb-0">
            {new Date(activity.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    ));
  };

  // Role-based skills section visibility
  const shouldShowSkillsSection = () => {
    return userRole.toLowerCase() === "expert/freelancer" || userRole.toLowerCase() === "bidder/company representative/middleman";
  };

  // Role-based modal title and placeholder
  const getModalContent = () => {
    switch (userRole.toLowerCase()) {
      case "expert/freelancer":
        return {
          title: "Write your professional title",
          placeholder: "Full Stack Developer",
          description: "Express your expertise and attract the right clients. Write your professional title here and showcase your skills."
        };
      case "bd":
      case "bidder/company representative/middleman":
        return {
          title: "Write your business role",
          placeholder: "Senior Business Development Manager",
          description: "Define your business development role and expertise. This helps clients and team members understand your capabilities."
        };
      case "client":
      default:
        return {
          title: "Write your display name",
          placeholder: "Company Name or Your Name",
          description: "Express your identity and personalize your presence. This name will be visible to freelancers and service providers."
        };
    }
  };

  const { title: modalTitle, placeholder: modalPlaceholder, description: modalDescription } = getModalContent();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="Revie">
            <div className="text-center">
              <img
                src={userDetail?.image || UserData?.image || emptyProfile}
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
                {userDetail ? userDetail.role : userRole}
              </p>
              {/* Enhanced user level display */}
              <UserLevelDisplayComponent userDetail={userDetail} userRole={userRole} />
              
              <div className="d-flex mt-5 pb-5 text-center poppins">
                <div className="loader1">
                  <CircularProgressbar
                    className="w-75"
                    value={percentage1}
                    text={`${percentage1}%`}
                  />
                  <h6 className="mt-3 font-14 poppins blackcolor">
                    {label1}
                  </h6>
                </div>
                <div className="loader2">
                  <CircularProgressbar
                    className="w-75"
                    value={percentage2}
                    text={`${percentage2}%`}
                  />
                  <h6 className="mt-3 font-14 poppins blackcolor">
                    {label2}
                  </h6>
                </div>
                <div className="loader3">
                  <CircularProgressbar
                    className="w-75"
                    value={percentage3}
                    text={`${percentage3}%`}
                  />
                  <h6 className="mt-3 font-14 poppins blackcolor">
                    {label3}
                  </h6>
                </div>
              </div>
              
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="font-18 font-500 poppins blackcolor">
                    Last Activities
                  </h6>
                </div>
                <div>
                  <p className="font-16 poppins colororing">See All</p>
                </div>
              </div>
              {renderActivities()}
            </div>
            <div className="d-flex mt-5 pb-5 text-center poppins">
              {/* Additional Dashboard Content */}
            </div>
          </div>
        </div>
        
        {/* ================== Skills Section (Only for Freelancers and BD) ================== */}
        {shouldShowSkillsSection() && (
          <div className="mt-lg-5 mt-md-3 mt-2">
            <h4 className="byerLine font-22 font-500 cocon blackcolor">
              {userRole.toLowerCase() === "expert/freelancer" ? "Skills" : "Expertise Areas"}
            </h4>
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
                <ModalHeader toggle={toggleModal}>
                  {userRole.toLowerCase() === "expert/freelancer" ? "Add Skills" : "Add Expertise Areas"}
                </ModalHeader>
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
                              placeholder={userRole.toLowerCase() === "expert/freelancer" ? "Add skills..." : "Add expertise areas..."}
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
                      {isLoading ? <Spinner size="sm" color="light" /> : 
                        `Save ${userRole.toLowerCase() === "expert/freelancer" ? "Skills" : "Expertise"}`}
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
        )}
        
        {/* ================== Role-based Orders/Performance/Projects Section ================== */}
        {renderOrdersSection()}
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
                {modalTitle}
              </h6>
              <p className="font-14 takegraycolor poppins">
                {modalDescription}
              </p>
              <input
                className="form-control model-input p-3"
                type="text"
                placeholder={modalPlaceholder}
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