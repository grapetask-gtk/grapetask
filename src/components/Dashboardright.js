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

const Dashboardright = () => {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.profile);
  const { tagsList, isLoading } = useSelector((state) => state.dashboard);
  const UserData = JSON.parse(localStorage.getItem("UserData"));

  const percentage1 = 0;
  const percentage2 = 0;
  const percentage3 = 0;

  // ---------- NAme --------update------
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
      // console.log(data?.message, '============if')
      // toast.success("Successfully Update Profile", {
      //     position: "top-right",
      //     autoClose: 2000,
      // })
    } else {
      // console.log(data?.message, '================else')
      //   alert(data?.message)
    }
  };

  useEffect(() => {
    const data = {
      device_token: "123456789",
    };
    dispatch(userProfile(data));
  }, [dispatch]);
  useEffect(() => {
    setFirstName(userDetail?.fname);
  }, [userDetail]);
  // console.log(userDetail?.role, '======================role');

  // ==============
  //    SKILL ADD
  // ===============
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = React.useState([]);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // ===================
  // Post Tag
  //   ==================
  const handleTagsAdd = (e) => {
    e.preventDefault();
    setShowModal(false);
    // console.log(tags, '==========================================tags');
    let data = {
      skill: tags,
    };
    dispatch(TagsAdd(data, handleResponseTagsAdd));

    // }
  };
  const handleResponseTagsAdd = (data) => {
    if (data?.status) {
      // alert(data?.message)
    } else {
      // alert(data?.message)
    }
  };
  // ===================
  //  Get tags
  //   ===================

  useEffect(() => {
    dispatch(usergetsTags());
  }, [dispatch]);
  useEffect(() => {
    let skillarry = [];
    tagsList.map((val) => {
      skillarry.push(val.skill);
    });
    setTags(skillarry);
  }, [tagsList]);

  // Create a new Date object
  var currentDate = new Date();

  // Get the current month (months are zero-based, so January is 0, February is 1, etc.)
  var currentMonth = currentDate.toLocaleString("default", { month: "long" });
  // console.log(tagsList, '=============getsTags');
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="Revie">
            <div className="text-center">
              <img
                src={UserData?.image ? UserData?.image : emptyProfile}
                className="rounded-circle "
                width={120}
                height={120}
                alt="w8"
              />

              <div>
                {/* Button trigger modal */}
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
                        alt="w8"
                      />
                    </span>
                  </h6>
                </a>
              </div>
              {/* <a type="button" data-bs-toggle="modal" data-bs-target="#staticBackdropone"> */}
              <p className="font-14 poppins">
                {userDetail ? userDetail?.role : ""}
              </p>
              {/* </a> */}
            </div>
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
                <h6 className="mt-3 font-14 poppins blackcolor">Total Order</h6>
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
                <img src={doubl} width={45} height={45} alt="w8" />
              </div>
              <div>
                <h6 className=" ms-2 font-14 poppins mb-0">
                  No Activities Found :)
                </h6>
              </div>
            </div>
            {/* <div className='d-flex rounded-4 px-3 p-2 mt-4 align-items-center' style={{ border: '1.5px solid #AC9E9E' }}>
              <div><img src={doube} width={45} height={45} alt="w8" /></div>
              <div>
                <h6 className=' ms-2 font-14 poppins mb-0'><span className='takegraycolor'>Your Application has</span> accept <br className='d-lg-block d-none' />
                  3 Companies</h6>
              </div>
            </div> */}
            {/* <div className='mt-5'><h6 className='font-18 font-500 poppins'>About me</h6>
              <p className='font-14 poppins textgray'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual.</p>
            </div> */}
          </div>
        </div>
        {/* ==============
        Skills
        ================ */}
        <div className="mt-lg-5 mt-md-3 mt-2">
          <h4 className="byerLine font-22 font-500 cocon blackcolor">Skills</h4>
          <div className=" Revie p-3 mt-lg-4 mt-md-3 mt-2">
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
                        maxi
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
                    className="btn-stepper poppins px-3 me-2  font-16"
                    onClick={toggleModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleTagsAdd}
                    loading={true}
                    disabled={isLoading}
                    className="btn-stepper poppins px-3   font-16"
                  >
                    {isLoading ? (
                      <Spinner size="sm" color="light" />
                    ) : (
                      "Save Skills"
                    )}
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
                  <span className="mb-0 font-10 colorgray"> {value.skill}</span>
                </span>
              ))}
            </>
          </div>
        </div>
        <div className="mt-lg-5 mt-md-3 mt-2">
          <h6 className="byerLine font-20 font-500 cocon blackcolor">Orders</h6>
          <div className="Revie mt-lg-4 mt-md-3 mt-2">
            <div className="d-flex justify-content-between">
              <div>
                <p className="font-18 font-500 poppins blackcolor">
                  {" "}
                  Active orders{" "}
                </p>
              </div>
              <div>
                <p className="font-18 font-500 poppins">0</p>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div>
                <p className="font-18 font-500 poppins">
                  Earned in {currentMonth}{" "}
                </p>
              </div>
              <div>
                <p className="font-18 font-500 poppins">$0 </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='mt-lg-5 mt-md-3 mt-2'>
          <h6 className='byerLine font-20 font-500 cocon blackcolor'>On the web</h6>
          <div className='mt-lg-4 mt-md-3 mt-2'>
            <Button className=' btn-stepper poppins me-3 px-3 p-2 rounded-2 font-16 w-100' >
              <FaFacebookSquare className='me-2' size={20} /> facebook
            </Button>
            <Button className='btn-stepper-border poppins mt-3 px-3 p-2 rounded-2  font-16 w-100'>
              <BsInstagram className='me-2' size={20} /> Instagram
            </Button>
          </div>
        </div> */}
      </div>

      {/* Modal */}
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
                your mark. Write your Job Title here and make a lasting
                impression.
              </p>
              <input
                className="form-control model-input p-3 "
                type="text"
                placeholder="Product Designer"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="modal-footer border-0">
              <Button
                className="btn-stepper-border poppins me-3 px-3 p-2 rounded-2  font-16 w-auto"
                data-bs-dismiss="modal"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                data-bs-dismiss="modal"
                className=" btn-stepper poppins  px-3 p-2 rounded-2 font-16 w-auto"
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
